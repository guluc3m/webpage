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
] as const;
export type ActividadType = (typeof ACTIVIDAD_TYPES)[number];

export interface Actividad {
  title: string;
  date: string; // yyyy/mm/dd
  type: ActividadType;
  description?: string;
  cartel?: string; // poster image URL
  video?: string; // YouTube link
  repository?: string;
  transparencias?: string;
  photo?: string; // usually one OR the other of cartel/photo, not both
  participants?: { name: string; link?: string }[];
  tags?: string[]; // temas (Git, C, Hardware…); el tipo ya no va aquí
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
    return (parse(rawActividades) as Partial<Actividad>[]).filter(isValidActividad);
  } catch (err) {
    console.warn(`[actividades] actividades.yaml inválido, se muestra vacío: ${err}`);
    return [];
  }
}
