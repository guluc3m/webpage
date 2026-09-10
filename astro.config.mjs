// @ts-check
// Astro build configuration for the GUL 2026 site.
//
// What the build does: `astro build` renders every route in src/pages/ to plain
// HTML and writes the result (plus hashed CSS/JS assets) into dist/. That's the
// whole deployable — no server (see CLAUDE.md: the site is a single static page).
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Canonical origin. Used for <link rel="canonical">, OG tags and sitemap.xml.
  site: 'https://gul.uc3m.es',
  // No SSR. Pages are prerendered at build time. This is the default; pinned
  // explicitly so a stray `getStaticPaths` / adapter change can't flip it.
  output: 'static',
  vite: {
    // Official Tailwind v4 integration for Astro. Tailwind is configured in CSS
    // (src/styles/global.css), not a tailwind.config.js file.
    plugins: [tailwindcss()],
  },
});
