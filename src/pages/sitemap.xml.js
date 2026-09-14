import { getCollection } from 'astro:content';

const staticPaths = ['', 'about', 'blog', 'affiliate-disclosure', 'privacy-policy'];

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const site = context.site?.toString().replace(/\/$/, '') ?? '';

  const urls = [
    ...staticPaths.map((p) => `${site}/${p}`.replace(/\/$/, '/')),
    ...posts.map((post) => `${site}/blog/${post.slug}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
