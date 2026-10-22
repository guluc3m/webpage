/**
 * Checks for congresos.yaml and its loader. Run with `pnpm test` (Node's
 * built-in test runner — no framework).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { congresoDates, loadCongresos, parseCongresos } from './congresos.ts';
import { loadActividades, type Actividad } from './actividades.ts';

// What the parser would return for a one-activity congreso.
const abril = (...n: number[]): Actividad[] =>
  n.map((d) => ({
    title: `A${d}`,
    date: `2015/03/${String(d).padStart(2, '0')}`,
    type: 'Charla',
  }));

test('the real congresos.yaml has no broken entries', () => {
  const raw = readFileSync(new URL('../data/congresos.yaml', import.meta.url), 'utf8');
  const { congresos, errors } = parseCongresos(raw);
  assert.deepEqual(errors, []);
  assert.ok(congresos.length > 0);
  // Las Jornadas Técnicas vienen de más atrás en el tiempo que el GUL Jamón;
  // lo que el YAML declara no puede repetir edición dentro de cada tipo.
  const editions = new Set();
  for (const c of congresos) {
    const key = `${c.series} ${c.edition}`;
    assert.ok(!editions.has(key), `edition repeated: ${key}`);
    editions.add(key);
    assert.ok(c.activities.length > 0, `${c.title} came out empty`);
  }
});

test('a new series needs no vocabulary: any series is accepted', () => {
  const { congresos, errors } = parseCongresos(
    '- title: A\n  series: Jornadas Tejas\n  edition: 1\n',
  );
  assert.deepEqual(errors, []);
  assert.equal(congresos[0]!.series, 'Jornadas Tejas');
});

test('a congreso without a series is a broken entry', () => {
  const { congresos, errors } = parseCongresos('- title: A\n  edition: 1\n');
  assert.deepEqual(congresos, []);
  assert.match(errors[0], /falta series/);
});

test('a broken inner activity is dropped without taking the congreso with it', () => {
  const { congresos, errors } = parseCongresos(
    '- title: XXIV Jornadas Técnicas\n' +
      '  series: Jornadas Técnicas\n' +
      '  edition: 24\n' +
      '  activities:\n' +
      '    - title: Buena\n' +
      '      date: 2014/03/17\n' +
      '      type: Charla\n' +
      '    - title: Rota\n' +
      '      date: 2014-03-17\n' +
      '      type: Charla\n',
  );
  assert.deepEqual(
    congresos[0]!.activities.map((a) => a.title),
    ['Buena'],
  );
  assert.match(errors[0], /en "XXIV Jornadas Técnicas", la actividad "Rota"/);
});

test('a participant link written once resolves for the whole congreso', () => {
  const { congresos } = parseCongresos(
    '- title: XXV Jornadas Técnicas\n' +
      '  series: Jornadas Técnicas\n' +
      '  edition: 25\n' +
      '  activities:\n' +
      '    - title: A\n' +
      '      date: 2014/11/10\n' +
      '      type: Charla\n' +
      '      participants:\n' +
      '        - name: Uno\n' +
      '          link: https://ejemplo.org/\n' +
      '    - title: B\n' +
      '      date: 2014/11/13\n' +
      '      type: Charla\n' +
      '      participants:\n' +
      '        - Uno\n',
  );
  assert.deepEqual(
    congresos[0]!.activities.map((a) => a.participants?.[0]?.link),
    ['https://ejemplo.org/', 'https://ejemplo.org/'],
  );
});

test('links from actividades.yaml also apply inside congresos', () => {
  const known = loadActividades(
    '- title: Fuera\n  date: 2020/01/02\n  type: Charla\n  participants:\n' +
      '    - name: Uno\n      link: https://ejemplo.org/\n',
  );
  const congresos = loadCongresos(
    '- title: IX Jornadas Técnicas\n  series: Jornadas Técnicas\n  edition: 9\n' +
      '  activities:\n' +
      '    - title: A\n      date: 2007/03/19\n      type: Charla\n' +
      '      participants:\n        - Uno\n',
    known,
  );
  assert.equal(congresos[0]!.activities[0]!.participants?.[0]!.link, 'https://ejemplo.org/');
});

test('congresoDates covers same month, same year and cross-year', () => {
  assert.equal(congresoDates([]), '');
  assert.equal(congresoDates(abril(12)), '12 marzo 2015');
  assert.equal(congresoDates(abril(12, 15)), '12-15 marzo 2015');
  assert.equal(congresoDates(abril(12, 13, 14, 15)), '12-15 marzo 2015');

  const crossMonth = congresoDates([
    { title: 'A', date: '2007/11/14', type: 'Charla' },
    { title: 'B', date: '2007/12/03', type: 'Charla' },
  ]);
  assert.equal(crossMonth, '14 nov - 3 dic 2007');

  const crossYear = congresoDates([
    { title: 'A', date: '2008/11/14', type: 'Charla' },
    { title: 'B', date: '2009/03/13', type: 'Charla' },
  ]);
  assert.equal(crossYear, '14 nov 2008 - 13 mar 2009');

  // Un `00` como día = "mes solo".
  const noDay = congresoDates([
    { title: 'A', date: '2015/03/00', type: 'Charla' },
    { title: 'B', date: '2015/03/15', type: 'Charla' },
  ]);
  assert.equal(noDay, 'marzo 2015');
});
