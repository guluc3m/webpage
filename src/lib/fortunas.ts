/**
 * fortunas.ts — formatting for the GUL in-jokes/quotes ("fortunas").
 *
 * The quotes live in src/data/fortunas.json. This module turns a raw entry into
 * display text. It runs AT BUILD TIME only (the site is static) — Hero.astro
 * picks one at random while Astro builds the page, so nothing here ships to the
 * browser.
 */

export interface Fortuna {
  quote: string;
  author: string;
}

export interface FormattedFortuna {
  /** May contain one "\n": a *stage-direction* line kept outside the guillemets. */
  quote: string;
  /** "— Autor", or "" when the entry has no author. */
  author: string;
}

const isMultiline = (s: string): boolean => /\r\n|\r|\n/.test(s);

/**
 * Rules (single-line quotes only — multi-line quotes are left untouched)
 */
export function formatFortuna({ quote, author }: Fortuna): FormattedFortuna {
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

/** Pick a random entry. Called once per build. */
export function randomFortuna(fortunas: Fortuna[]): Fortuna {
  return fortunas[Math.floor(Math.random() * fortunas.length)];
}
