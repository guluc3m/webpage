/**
 * fortunas.ts — formatting for the GUL in-jokes/quotes ("fortunas").
 *
 * The quotes live in src/data/fortunas.json. This module turns a raw entry into
 * display text. It runs AT BUILD TIME only (the site is static) — Hero.astro
 * picks one at random while Astro builds the page, so nothing here ships to the
 * browser.
 */

import { parse } from 'yaml';
import rawFortunas from '@data/fortunas.yaml?raw'; // ?raw: a plain string, so invalid YAML syntax doesn't blow up the import itself.

export interface Fortuna {
  quote: string;
  author: string;
}

const isMultiline = (s: string): boolean => /\r\n|\r|\n/.test(s);

/**
 * Rules (single-line quotes only — multi-line quotes are left untouched)
 */
function formatFortuna({ quote, author }: Fortuna): Fortuna {
  let q = quote;

  if (!isMultiline(q)) {
    if (q.endsWith('.') && !q.endsWith('...')) {
      q = q.slice(0, -1);
    }

    // Normalise stray guillemets to plain quotes.
    q = q.replace('«', '"').replace('»', '"');

    const first = q.indexOf('*');
    const last = q.lastIndexOf('*');
    if (first >= 0 && first !== last) {
      if (first === 0) {
        // *setup* at the start — "+ 2" skips the "*" and the space after it.
        q = q.slice(0, last + 1) + '\n«' + q.slice(last + 2) + '»';
      } else if (last === q.length - 1) {
        // *action* at the end — "- 1" drops the space before the "*".
        q = '«' + q.slice(0, first - 1) + '»\n' + q.slice(first);
      }
    } else {
      q = `«${q}»`;
    }
  }

  return { quote: q, author: author ? `— ${author}` : '' };
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
export function loadFortunas(): Fortuna[] {
  try {
    return (parse(rawFortunas) as Partial<Fortuna>[]).filter(isValidFortuna).map(formatFortuna);
  } catch (err) {
    console.warn(`[fortunas] fortunas.yaml inválido, se muestra vacío: ${err}`);
    return [];
  }
}
