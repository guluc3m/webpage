// ESLint config (flat config, ESLint 10). Run it with `pnpm lint`.
//
// Catches bugs and bad patterns; it does NOT format (that's Prettier's job — the
// `prettier` entry below switches off any rule that would fight the formatter).
//
// Layers, in order:
//  - js.configs.recommended        core JS rules
//  - tseslint.configs.recommended  TypeScript rules (frontmatter + src/lib)
//  - astro.configs.recommended     .astro-aware parsing + Astro-specific rules
//  - prettier                      disables stylistic rules Prettier owns

import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig([
  // Generated, not source.
  globalIgnores(['dist/', '.astro/']),

  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  prettier,

  {
    // Code here runs both at build time (Node) and, for islands, in the browser.
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
]);
