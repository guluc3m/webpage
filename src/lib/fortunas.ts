/**
 * fortunas.ts — formatting for the GUL in-jokes/quotes ("fortunas").
 *
 * The quotes live in src/data/fortunas.json. This module turns a raw entry into
 * display text. It runs AT BUILD TIME only (the site is static) — Hero.astro
 * picks one at random while Astro builds the page, so nothing here ships to the
 * browser.
 */

import { parse } from 'yaml';

export interface Fortuna {
  quote: string;
  author: string;
}

const isMultiline = (s: string): boolean => /\r\n|\r|\n/.test(s);

/**
 * Transforms the one-line setup/action into multiple lines. Supports multiple delimeters.
 * e.g. `"*se sienta* saben aquel que diu..."` a `"*se sienta*\nsaben aquel que diu..."`
 * @param s string
 * @returns
 */
function splitAtActions(s: string): string {
  const action = /\*[^*\n]+?\*/g;
  const parts: string[] = [];
  let cursor = 0;

  for (const match of s.matchAll(action)) {
    const before = s.slice(cursor, match.index).trim();
    if (before) parts.push(before);
    parts.push(match[0]);
    cursor = (match.index ?? 0) + match[0].length;
  }

  const after = s.slice(cursor).trim();
  if (after) parts.push(after);

  return parts.length ? parts.join('\n') : s;
}

/**
 * Formats the fortuna by adding guillemets in the correct places and other things
 */
export function formatFortuna({ quote, author }: Fortuna): Fortuna {
  let q = quote;

  if (!isMultiline(q)) {
    // remove stray "."
    if (q.endsWith('.') && !q.endsWith('...')) {
      q = q.slice(0, -1);
    }

    // normalise stray guillemets
    q = q.replace('«', '"').replace('»', '"');

    // split setup/action
    q = splitAtActions(q);

    // add guillemets to the quote, leaving setup/action lines alone.
    const lines = q.split('\n');
    const isAction = (line: string): boolean => /^\*[^*\n]+\*$/.test(line);

    if (lines.some(isAction)) {
      let quoteFound = false;
      q = lines
        .map((line) => {
          if (isAction(line) || quoteFound) return line;
          quoteFound = true;
          return `«${line}»`;
        })
        .join('\n');
    } else {
      q = `«${q}»`;
    }
  }

  // multilines are left untouched

  return { quote: q, author };
}

/**
 * Checks if a fortuna is valid
 * @param f fortuna to check (Object format)
 * @returns `true` if valid fortuna, `false` otherwise
 */
export function isValidFortuna(f: Partial<Fortuna>): f is Fortuna {
  const ok = !!f.quote && !!f.author;
  if (!ok) console.warn(`[fortunas] entrada incompleta, se omite: ${JSON.stringify(f)}`);
  return ok;
}

// Loads and formats fortunas
export function loadFortunas(rawFortunas: string): Fortuna[] {
  try {
    return (parse(rawFortunas) as Partial<Fortuna>[]).filter(isValidFortuna).map(formatFortuna);
  } catch (err) {
    console.warn(`[fortunas] fortunas.yaml inválido, se muestra vacío: ${err}`);
    return [];
  }
}
