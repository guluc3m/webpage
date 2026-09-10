/**
 * Minimal checks for formatFortuna. Run with `pnpm test` (Node's built-in test
 * runner — no framework). Not wired into CI; it's here so a change that breaks
 * the 2021 formatting rules fails loudly.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatFortuna } from './fortunas.ts';

test('wraps a plain single-line quote and strips the trailing period', () => {
  assert.deepEqual(formatFortuna({ quote: 'Hola mundo.', author: 'Nadie' }), {
    quote: '«Hola mundo»',
    author: '— Nadie',
  });
});

test('keeps an ellipsis', () => {
  assert.equal(formatFortuna({ quote: 'Pues no sé...', author: 'X' }).quote, '«Pues no sé...»');
});

test('*setup* at the start stays outside the guillemets, on its own line', () => {
  assert.equal(
    formatFortuna({ quote: '*Uno que pasaba* y le dije que no', author: 'X' }).quote,
    '*Uno que pasaba*\n«y le dije que no»',
  );
});

test('*action* at the end stays outside the guillemets, on its own line', () => {
  assert.equal(
    formatFortuna({ quote: 'eso lo tiene vim *dando saltitos*', author: 'X' }).quote,
    '«eso lo tiene vim»\n*dando saltitos*',
  );
});

test('multi-line quotes are left untouched', () => {
  const raw = 'Persona A: hola\nPersona B: adiós.';
  assert.equal(formatFortuna({ quote: raw, author: 'X' }).quote, raw);
});

test('no author -> no dash prefix', () => {
  assert.equal(formatFortuna({ quote: 'Sin autor.', author: '' }).author, '');
});
