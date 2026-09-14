#!/usr/bin/env node
/**
 * SoloStack — automated article generator (Track 2: full auto-publish).
 *
 * Reads content-calendar.json, finds the next "queued" topic whose targetDate
 * has arrived, asks Claude (with server-side web search enabled) to research
 * and draft a complete .mdx article that follows CLAUDE.md, writes it into
 * src/content/blog/, and marks the calendar entry "drafted".
 *
 * Requires: ANTHROPIC_API_KEY environment variable.
 * Run manually with:  ANTHROPIC_API_KEY=sk-... node scripts/generate-article.mjs
 * Run automatically via .github/workflows/weekly-content.yml
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CALENDAR_PATH = path.join(ROOT, 'content-calendar.json');
const CLAUDE_MD_PATH = path.join(ROOT, 'CLAUDE.md');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');

// Update this if Anthropic renames/retires the model slug — see
// https://docs.claude.com/en/docs/about-claude/models for the current list.
const MODEL = process.env.SOLOSTACK_MODEL ?? 'claude-sonnet-5';

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not set. Aborting.');
    process.exit(1);
  }

  const calendar = JSON.parse(await readFile(CALENDAR_PATH, 'utf-8'));
  const claudeMd = await readFile(CLAUDE_MD_PATH, 'utf-8');

  const today = new Date().toISOString().slice(0, 10);
  const topic = calendar.topics.find(
    (t) => t.status === 'queued' && t.targetDate <= today
  );

  if (!topic) {
    console.log('No queued topic is due yet. Nothing to do.');
    return;
  }

  console.log(`Generating article for: ${topic.title} (${topic.slug})`);

  const prompt = `You are the SoloStack editorial agent. Follow the governance rules in
CLAUDE.md below exactly — structure, word count, frontmatter, affiliate CTA usage, and the
rule against inventing prices or statistics. Use web search to verify any current pricing,
plan limits, or affiliate commission details you reference before writing them down.

=== CLAUDE.md ===
${claudeMd}
=== END CLAUDE.md ===

Write the complete article for this calendar entry:
- slug: ${topic.slug}
- working title: ${topic.title}
- category: ${topic.category}
- pubDate to use in frontmatter: ${today}

Output requirements:
1. Research current, real facts with web search before writing anything price- or
   feature-specific.
2. Produce one complete .mdx file: YAML frontmatter (title, description, pubDate, category,
   tags, draft: false) followed by the MDX body, including
   \`import CTA from '../../components/CTA.astro';\` right after the frontmatter and at least
   one <CTA tool="..." href="..." /> for a genuinely relevant tool (use a placeholder affiliate
   href like "https://example.com/?ref=YOUR_AFFILIATE_ID" if you are not certain of the real
   affiliate URL format).
3. Wrap the ENTIRE final file content — frontmatter and body — between the literal markers
   <ARTICLE> and </ARTICLE>, with nothing else outside those markers in your final answer.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${body}`);
  }

  const data = await response.json();
  const text = data.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n');

  const match = text.match(/<ARTICLE>([\s\S]*?)<\/ARTICLE>/);
  if (!match) {
    console.error('Could not find <ARTICLE> markers in the model output. Raw output was:');
    console.error(text);
    process.exit(1);
  }
  const articleContent = match[1].trim() + '\n';

  const outPath = path.join(BLOG_DIR, `${topic.slug}.mdx`);
  await writeFile(outPath, articleContent, 'utf-8');
  console.log(`Wrote ${outPath}`);

  topic.status = 'drafted';
  topic.draftedDate = today;
  await writeFile(CALENDAR_PATH, JSON.stringify(calendar, null, 2) + '\n', 'utf-8');
  console.log('Updated content-calendar.json');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
