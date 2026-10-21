// Same agreement as actividades.ts, but for congresos.yaml: congresos (las
// Jornadas Técnicas y demás) que agrupan Actividads, uno por edición del tipo.
// This file only types it and loads it.
import {
  actividadProblem,
  harvestParticipantLinks,
  normalizeParticipant,
  parseYamlChunks,
  resolveParticipantLinks,
  type Actividad,
  type Participant,
} from './actividades.ts';

// Tipo de congreso: vocabulario cerrado. Cada congreso declara el suyo y su
// número de edición de ese tipo.
export const CONGRESO_TYPES = ['GUL Jamón', 'Jornadas Técnicas', 'Semana de Asociaciones'] as const;
export type CongresoType = (typeof CONGRESO_TYPES)[number];

export interface Congreso {
  title: string;
  type: CongresoType;
  edition: number; // for the type
  poster?: string;
  url?: string;
  activities: Actividad[];
}

// Why a congreso is unusable, or null if it is fine.
function congresoProblem(c: unknown): string | null {
  if (!c || typeof c !== 'object' || Array.isArray(c)) return 'no es un objeto';
  const { title, type, edition, poster, url, activities, ...rest } = c as Record<string, unknown>;
  if (typeof title !== 'string' || !title) return 'falta title';
  if (!(CONGRESO_TYPES as readonly string[]).includes(type as string))
    return `type desconocido: ${JSON.stringify(type)}`;
  if (typeof edition !== 'number') return 'falta edition';
  if (activities !== undefined && !Array.isArray(activities)) return 'activities no es una lista';
  if (poster !== undefined && typeof poster !== 'string') return 'poster no es un texto';
  if (url !== undefined && typeof url !== 'string') return 'url no es un texto';
  const leftover = Object.keys(rest);
  if (leftover.length > 0) return `campos sobrantes: ${leftover.join(', ')}`;
  return null;
}

// yyyy/mm/dd sorts correctly as a plain string; the title is the tiebreak.
// (Un día `00`, "todavía sin día", ordena antes que el 1: en un congreso de
// días seguidos, la charla sin fecha exacta queda al principio del mes.)
export function sortActividades(actividades: Actividad[]): Actividad[] {
  return [...actividades].sort((a, b) =>
    `${a.date} ${a.title}`.localeCompare(`${b.date} ${b.title}`, 'es'),
  );
}

/**
 * Parses congresos.yaml exactly like parseActividades does its file: an entry
 * starts at every `- ` in column 0, and a broken one is reported and dropped
 * without taking the rest with it (a broken inner activity is dropped from
 * its congreso instead of taking the congreso down too). Activities come out
 * sorted by date (and title), so the page renders them in the given order.
 */
export function parseCongresos(raw: string): { congresos: Congreso[]; errors: string[] } {
  const congresos: Congreso[] = [];
  const errors: string[] = [];

  for (const { line, entries, error } of parseYamlChunks(raw)) {
    if (error) {
      errors.push(`línea ${line}: ${error}`);
      continue;
    }
    for (const raw of entries) {
      const problem = congresoProblem(raw);
      if (problem) {
        errors.push(`línea ${line}: ${problem}: ${JSON.stringify(raw)}`);
        continue;
      }
      const { activities, ...congreso } = raw as {
        activities?: unknown[];
        title: string;
        type: string;
        edition: number;
      };
      const actividades: Actividad[] = [];
      for (const a of (activities ?? []) as unknown[]) {
        const innerProblem = actividadProblem(a);
        if (innerProblem) {
          const title = (a as { title?: unknown }).title;
          errors.push(
            `línea ${line}: en ${JSON.stringify(congreso.title)}, la actividad ${JSON.stringify(
              title,
            )}: ${innerProblem}`,
          );
        } else {
          actividades.push({
            ...(a as Partial<Actividad>),
            participants: (a as Partial<Actividad>).participants
              ?.map(normalizeParticipant)
              .filter((p): p is Participant => p !== null),
          } as Actividad);
        }
      }
      // Los links de participants se escriben una vez por fichero: el propio
      // de las activities del congreso resuelve al resto (loadCongresos añade
      // los de actividades.yaml).
      congresos.push({
        ...(congreso as Omit<Congreso, 'activities'>),
        activities: sortActividades(
          resolveParticipantLinks(actividades, harvestParticipantLinks(actividades)),
        ),
      });
    }
  }
  return { congresos, errors };
}

// Build-time loader: a bad hand-edit must not take the static build down, so
// broken entries are left out with a warning. CI fails on them instead.
// Un link aparecido en actividades.yaml también resuelve aquí, así no se
// repiten entre los dos ficheros.
export function loadCongresos(raw: string, knownActividades: Actividad[] = []): Congreso[] {
  const { congresos, errors } = parseCongresos(raw);
  for (const e of errors) console.warn(`[congresos] entrada rota, no sale: ${e}`);
  const links = harvestParticipantLinks(knownActividades);
  return congresos.map((c) => ({
    ...c,
    activities: resolveParticipantLinks(c.activities, links),
  }));
}

// Fechas del congreso deducidas de sus activities, ordenadas: "12-15 marzo
// 2015" (mismo mes), "28 nov - 3 dic 2007" (mismo año) o "14 nov 2008 - 13
// mar 2009" (cruzando años); una sola actividad dice directo "8 marzo 2014".
const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];
const MESES_CORTOS = MESES.map((m) => m.slice(0, 3));

export function congresoDates(activities: Actividad[]): string {
  const dates = [...new Set(sortActividades(activities).map((a) => a.date))].sort().map((d) => ({
    year: Number(d.slice(0, 4)),
    month: Number(d.slice(5, 7)),
    day: Number(d.slice(8, 10)), // 0 = "todavía sin día", el mes va solo
  }));
  if (dates.length === 0) return '';

  const first = dates[0]!;
  const last = dates[dates.length - 1]!;
  const sameYear = first.year === last.year;
  const sameMonth = sameYear && first.month === last.month;
  // Con un solo `00` en el rango, nadie enseña números de día.
  const withDays = dates.every((d) => d.day > 0);

  // "12 marzo"... el año solo lo pintan los rangos que cruzan años (cada
  // extremo el suyo) o el final del de un mismo año.
  const dia = (d: (typeof dates)[number]) => (withDays ? `${d.day} ` : '');
  if (dates.length === 1) {
    return first.day > 0
      ? `${first.day} ${MESES[first.month - 1]} ${first.year}`
      : `${MESES[first.month - 1]} ${first.year}`;
  }
  if (sameMonth) {
    return withDays
      ? `${first.day}-${last.day} ${MESES[first.month - 1]} ${last.year}`
      : `${MESES[first.month - 1]} ${last.year}`;
  }
  if (sameYear) {
    return `${dia(first)}${MESES_CORTOS[first.month - 1]} - ${dia(last)}${
      MESES_CORTOS[last.month - 1]
    } ${last.year}`;
  }
  return `${dia(first)}${MESES_CORTOS[first.month - 1]} ${first.year} - ${dia(last)}${
    MESES_CORTOS[last.month - 1]
  } ${last.year}`;
}
