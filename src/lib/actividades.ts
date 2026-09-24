// Shape agreed in guluc3m/webpage#9. Data lives in actividades.yaml (edit
// entries there); this file only types it.
import { parse } from 'yaml';
import rawActividades from '@data/actividades.yaml?raw'; // ?raw: a plain string, so invalid YAML syntax doesn't blow up the import itself.

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
  poster?: string; // poster image URL
  video?: string; // YouTube link
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

// A malformed entry (bad hand-edit) must not take the whole static build down —
// drop it and warn instead of letting a missing field throw mid-render.
export function isValidActividad(a: Partial<Actividad>): a is Actividad {
  const ok =
    !!a.title &&
    !!a.date &&
    dateRe.test(a.date) &&
    (ACTIVIDAD_TYPES as readonly string[]).includes(a.type ?? '') &&
    (a.participants === undefined || Array.isArray(a.participants)) &&
    (a.tags === undefined || Array.isArray(a.tags));
  if (!ok) console.warn(`[actividades] entrada incompleta, se omite: ${JSON.stringify(a)}`);
  return ok;
}

// Parse by hand (rather than a static YAML import) so a broken hand-edit — invalid YAML
// syntax, not just a missing field — degrades to an empty list instead of taking the whole
// build down with the parser's own error page.
export function loadActividades(): Actividad[] {
  try {
    const valid = (parse(rawActividades) as Partial<Actividad>[]).filter(isValidActividad);
    const normalized = valid.map((a) => ({
      ...a,
      participants: a.participants
        ?.map(normalizeParticipant)
        .filter((p): p is Participant => p !== null),
    }));
    return resolveParticipantLinks(normalized);
  } catch (err) {
    console.warn(`[actividades] actividades.yaml inválido, se muestra vacío: ${err}`);
    return [];
  }
}
