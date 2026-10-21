/**
 * fortunas.ts — formatting for the GUL in-jokes/quotes ("fortunas").
 *
 * The quotes live in src/data/fortunas.yaml. This module turns a raw entry into
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
 * Strict loader: throws on a YAML syntax error (the message carries the line)
 * or on an entry without quote/author. The tests run this on the real file.
 */
export function parseFortunas(rawFortunas: string): Fortuna[] {
  const entries: unknown = parse(rawFortunas);
  if (!Array.isArray(entries)) throw new Error('fortunas.yaml debe ser una lista');

  return entries.map((f: Partial<Fortuna> | null, i) => {
    if (typeof f?.quote !== 'string' || !f.quote || typeof f.author !== 'string' || !f.author) {
      throw new Error(`la fortuna nº ${i + 1} no tiene quote y author: ${JSON.stringify(f)}`);
    }
    return formatFortuna({ quote: f.quote, author: f.author });
  });
}

// One broken entry invalidates the whole file, so the build swaps in this
// instead of crashing; CI is what catches the mistake.
export const FALLBACK_FORTUNA: Fortuna = {
  quote: '«Alguien ha roto fortunas.yaml»',
  author: 'el build',
};

// Build-time loader: never empty, never throws.
export function loadFortunas(rawFortunas: string): Fortuna[] {
  try {
    return parseFortunas(rawFortunas);
  } catch (err) {
    console.error(`[fortunas] fortunas.yaml inválido, se usa la fortuna de reserva: ${err}`);
    return [FALLBACK_FORTUNA];
  }
}
