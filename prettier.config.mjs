// Prettier config — the single source of truth for code formatting.
// Run it with `pnpm format`. VS Code's Astro extension also picks this up.
//
// Two plugins:
//  - prettier-plugin-astro       lets Prettier parse .astro files
//  - prettier-plugin-tailwindcss sorts Tailwind classes into a canonical order
//    (keeps diffs clean). MUST be last in the list.

/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  printWidth: 100,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  // Tailwind v4 has no tailwind.config.js — point the class sorter at the CSS
  // entrypoint that holds the @theme block.
  tailwindStylesheet: './src/styles/global.css',
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
};
