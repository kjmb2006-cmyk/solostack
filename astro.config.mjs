import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// If you change the subdomain name, update this to match (needed for canonical URLs, RSS, and the sitemap).
export default defineConfig({
  site: 'https://solostack.afriklearn-consulting.com',
  integrations: [mdx()],
});
