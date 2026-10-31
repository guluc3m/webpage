/**
 * Checks for actividades.yaml and its loader. Run with `pnpm test` (Node's
 * built-in test runner — no framework).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseActividades, recursosOf } from './actividades.ts';

const entry = (title: string, date = '2020/01/01') =>
  `- title: ${title}\n  date: ${date}\n  type: Charla\n`;

test('the real actividades.yaml has no broken entries', () => {
  const raw = readFileSync(new URL('../data/actividades.yaml', import.meta.url), 'utf8');
  const { actividades, errors } = parseActividades(raw);
  assert.deepEqual(errors, []);
  assert.ok(actividades.length > 0);
});

test('a misindented entry is dropped without taking the rest with it', () => {
  // Same mistake as a real fortunas PR: an entry indented one level too deep.
  const raw = entry('A') + '\n  - title: B\n  date: 2020/01/02\n  type: Charla\n\n' + entry('C');
  const { actividades, errors } = parseActividades(raw);
  assert.deepEqual(
    actividades.map((a) => a.title),
    ['C'],
  );
  assert.equal(errors.length, 1);
  // The parser points at the blank line before the misindented entry.
  assert.match(errors[0], /^línea 4: /);
});

test('an entry with a bad field is dropped, naming its line and the reason', () => {
  const raw = entry('A') + '\n' + entry('B', '2020-01-02') + '\n' + entry('C');
  const { actividades, errors } = parseActividades(raw);
  assert.deepEqual(
    actividades.map((a) => a.title),
    ['A', 'C'],
  );
  assert.equal(errors.length, 1);
  assert.match(errors[0], /^línea 5: date no es yyyy\/mm\/dd/);
});

test('an unknown type is a broken entry', () => {
  const { errors } = parseActividades('- title: A\n  date: 2020/01/01\n  type: Fiesta\n');
  assert.match(errors[0], /type desconocido: "Fiesta"/);
});

test('photos must be a list, a lone URL is a broken entry', () => {
  const { errors } = parseActividades(entry('A') + '  photos: https://example.org/a.jpg\n');
  assert.match(errors[0], /photos no es una lista/);
});

test('tags are case-insensitive: same tag, different casing, one chip', () => {
  const raw =
    entry('A') +
    '  tags: [Linux, Terminal]\n' +
    '- title: B\n  date: 2020/01/02\n  type: Charla\n  tags: [LINUX, terminal, Linux]\n';
  const { actividades } = parseActividades(raw);
  // La primera grafía vista gana; lo demás se le iguala y no se repite.
  assert.deepEqual(actividades[0]!.tags, ['Linux', 'Terminal']);
  assert.deepEqual(actividades[1]!.tags, ['Linux', 'Terminal']);
});

test('recursosOf lists video, repository and slides, in the order the card links them', () => {
  assert.deepEqual(recursosOf({}), []);
  assert.deepEqual(
    recursosOf({ slides: 'a.pdf', video: 'a.ogg', source: 'a/' }),
    ['video', 'repositorio', 'transparencias'],
  );
});
