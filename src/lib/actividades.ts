// Shape agreed in guluc3m/webpage#9. Data lives in actividades.yaml (edit
// entries there); this file only types it.
import { parse, YAMLParseError } from 'yaml';

// Tipo de actividad: vocabulario cerrado. Cada entrada declara exactamente uno
// (antes se deducía de tags "fijados" a mano; ahora es un campo explícito).
export const ACTIVIDAD_TYPES = [
  'Charla',
  'Taller',
  'Hackathon',
  'Install party',
  'Game jam',
  'Jornadas Técnicas',
  'Pódcast',
  'Congreso',
  'Feria de Asociaciones',
] as const;
export type ActividadType = (typeof ACTIVIDAD_TYPES)[number];

export interface Participant {
  name: string;
  link?: string;
}

export interface Actividad {
  title: string;
  date: string; // yyyy/mm/dd
  type: ActividadType;
  description?: string;
  jornadas?: number; // jornadas técnicas edition
  poster?: string;
  video?: string;
  link?: string;
  source?: string;
  slides?: string;
  photo?: string; // usually one OR the other of cartel/photo, not both
  participants?: Participant[];
  tags?: string[]; // temas (Git, C, Hardware…); el tipo ya no va aquí
}

// En el YAML un participante puede ser un nombre suelto (`- Ana`) o un objeto.
// El `link` es opcional y solo hace falta escribirlo una vez por persona en
// todo el fichero: resolveParticipantLinks lo copia al resto por nombre.
function normalizeParticipant(p: unknown): Participant | null {
  if (typeof p === 'string') {
    const name = p.trim();
    return name ? { name } : null;
  }
  if (p && typeof p === 'object') {
    const { name, link } = p as { name?: unknown; link?: unknown };
    if (typeof name !== 'string' || !name.trim()) return null;
    return typeof link === 'string' && link.trim()
      ? { name: name.trim(), link: link.trim() }
      : { name: name.trim() };
  }
  return null;
}

// Un enlace solo hay que escribirlo en una actividad: el primero que aparezca
// para cada nombre se aplica a las demás apariciones, así no se repite.
export function resolveParticipantLinks(actividades: Actividad[]): Actividad[] {
  const links = new Map<string, string>();
  for (const a of actividades)
    for (const p of a.participants ?? [])
      if (p.link && !links.has(p.name)) links.set(p.name, p.link);

  return actividades.map((a) => ({
    ...a,
    participants: a.participants?.map((p) => (p.link ? p : { ...p, link: links.get(p.name) })),
  }));
}

const dateRe = /^\d{4}\/\d{2}\/\d{2}$/;

// Why an entry is unusable, or null if it is fine.
function actividadProblem(a: unknown): string | null {
  if (!a || typeof a !== 'object' || Array.isArray(a)) return 'no es un objeto';
  const { title, date, type, participants, tags } = a as Record<string, unknown>;
  if (typeof title !== 'string' || !title) return 'falta title';
  if (typeof date !== 'string' || !dateRe.test(date)) return 'date no es yyyy/mm/dd';
  if (!(ACTIVIDAD_TYPES as readonly string[]).includes(type as string))
    return `type desconocido: ${JSON.stringify(type)}`;
  if (participants !== undefined && !Array.isArray(participants))
    return 'participants no es una lista';
  if (tags !== undefined && !Array.isArray(tags)) return 'tags no es una lista';
  return null;
}

/**
 * Parses actividades.yaml one entry at a time, so a broken entry (bad YAML or
 * a missing field) is reported and dropped without taking the rest with it.
 * An entry starts at every `- ` in column 0; a misindented one ends up glued
 * to the entry above and usually breaks that one too.
 */
export function parseActividades(raw: string): { actividades: Actividad[]; errors: string[] } {
  const actividades: Partial<Actividad>[] = [];
  const errors: string[] = [];
  const lines = raw.split('\n');
  const starts = lines.flatMap((line, i) => (line.startsWith('- ') ? [i] : []));

  starts.forEach((start, n) => {
    const chunk = lines.slice(start, starts[n + 1] ?? lines.length).join('\n');
    let entries: unknown;
    try {
      entries = parse(chunk);
    } catch (err) {
      if (!(err instanceof YAMLParseError)) throw err;
      // The parser counts lines from the start of the chunk, not of the file.
      const line = start + (err.linePos?.[0].line ?? 1);
      errors.push(`línea ${line}: ${err.message.split(' at line ')[0]}`);
      return;
    }
    for (const a of Array.isArray(entries) ? entries : [entries]) {
      const problem = actividadProblem(a);
      if (problem) errors.push(`línea ${start + 1}: ${problem}: ${JSON.stringify(a)}`);
      else actividades.push(a as Partial<Actividad>);
    }
  });

  const normalized = actividades.map((a) => ({
    ...a,
    participants: a.participants
      ?.map(normalizeParticipant)
      .filter((p): p is Participant => p !== null),
  })) as Actividad[];
  return { actividades: resolveParticipantLinks(normalized), errors };
}

// Build-time loader: a bad hand-edit must not take the static build down, so
// broken entries are left out with a warning. CI fails on them instead.
export function loadActividades(raw: string): Actividad[] {
  const { actividades, errors } = parseActividades(raw);
  for (const e of errors) console.warn(`[actividades] entrada rota, no sale: ${e}`);
  return actividades;
}
