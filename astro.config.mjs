// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// A busca interna tem noindex; a página de erro não é uma entrada do acervo.
const excludedFromSitemap = new Set(['/pesquisa', '/404', '/404.html']);

// https://astro.build/config
export default defineConfig({
  site: 'https://www.galeria-2048.com.br',
  integrations: [
    sitemap({
      filter: (page) => !excludedFromSitemap.has(new URL(page).pathname.replace(/\/$/, '')),
    }),
  ],
});
