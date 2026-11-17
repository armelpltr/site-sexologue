// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// URL définitive du site, à remplacer avant la mise en ligne.
const SITE_URL = 'https://www.exemple-cabinet-sexologie.fr';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !/\/(merci|404)\/?$/.test(page) })],
  vite: {
    plugins: [tailwindcss()],
  },
});
