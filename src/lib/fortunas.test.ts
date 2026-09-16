/**
 * Minimal checks for formatFortuna. Run with `pnpm test` (Node's built-in test
 * runner — no framework).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatFortuna } from './fortunas.ts';

test('wraps a plain quote, removes one trailing period, and preserves the author', () => {
  assert.deepEqual(formatFortuna({ quote: 'Hola mundo.', author: 'Nadie' }), {
    quote: '«Hola mundo»',
    author: 'Nadie',
  });
});

test('keeps an ellipsis', () => {
  assert.equal(formatFortuna({ quote: 'Pues no sé...', author: 'X' }).quote, '«Pues no sé...»');
});

test('keeps a starred setup outside the guillemets on its own line', () => {
  assert.equal(
    formatFortuna({ quote: '*Uno que pasaba* y le dije que no', author: 'X' }).quote,
    '*Uno que pasaba*\n«y le dije que no»',
  );
});

test('keeps a starred action outside the guillemets on its own line', () => {
  assert.equal(
    formatFortuna({ quote: 'eso lo tiene vim *se va*', author: 'X' }).quote,
    '«eso lo tiene vim»\n*se va*',
  );
});

test('supports multiple actions', () => {
  assert.equal(
    formatFortuna({ quote: '*entra en clase* eso lo tiene vim *se va*', author: 'X' }).quote,
    '*entra en clase*\n«eso lo tiene vim»\n*se va*',
  );
});

test('no empty actions', () => {
  assert.equal(formatFortuna({ quote: '**', author: 'X' }).quote, '«**»');
  assert.equal(formatFortuna({ quote: 'hijo de p***', author: 'X' }).quote, '«hijo de p***»');
});

test('normalizes existing guillemets before formatting', () => {
  assert.equal(formatFortuna({ quote: 'Dice «hola».', author: 'X' }).quote, '«Dice "hola"»');
});

test('multi-line quotes are left untouched', () => {
  const raw = 'Persona A: hola\nPersona B: adiós.';
  assert.equal(formatFortuna({ quote: raw, author: 'X' }).quote, raw);
});

test('preserves an empty author', () => {
  assert.equal(formatFortuna({ quote: 'Sin autor.', author: '' }).author, '');
});
