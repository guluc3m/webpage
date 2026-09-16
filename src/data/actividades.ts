// Shape agreed in guluc3m/webpage#9. Data lives in actividades.yaml (edit
// entries there); this file only types it.
import { parse } from 'yaml';
import rawActividades from './actividades.yaml?raw'; // ?raw: a plain string, so invalid YAML syntax doesn't blow up the import itself.

export interface Actividad {
  title: string;
  date: string; // yyyy/mm/dd
  description?: string;
  cartel?: string; // poster image URL
  video?: string; // YouTube link
  repository?: string;
  transparencias?: string;
  photo?: string; // usually one OR the other of cartel/photo, not both
  speakers?: { name: string; link?: string }[];
  tags: string[];
}

const dateRe = /^\d{4}\/\d{2}\/\d{2}$/;

// A malformed JSON entry (bad hand-edit) must not take the whole static build down —
// drop it and warn instead of letting a missing field throw mid-render.
export function isValidActividad(a: Partial<Actividad>): a is Actividad {
  const ok =
    !!a.title &&
    !!a.date &&
    dateRe.test(a.date) &&
    (a.speakers === undefined || Array.isArray(a.speakers)) &&
    Array.isArray(a.tags);
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
