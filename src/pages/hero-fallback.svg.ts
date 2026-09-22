/**
 * /hero-fallback.svg — the Tux grid the hero shows when JavaScript is off.
 *
 * Its own file, not markup inside index.html: nobody with JavaScript ever sees
 * this artwork (the canvases paint over it) and phones hide it too, yet inlined
 * it added 47KB to the HTML of every single visit. As a CSS background of an
 * element that is `display: none` in both of those cases, browsers never even
 * request it — see StaticHeroBackground.astro.
 *
 * Built once at build time (`output: 'static'`), so the rasterizer never runs
 * per request.
 */
import type { APIRoute } from 'astro';
import { computeTuxBitmap } from '@lib/tuxBitmap.ts';
import { sampleTuxMask } from '@lib/tux.ts';
import tuxSvg from '/tux.svg?raw';

// One grid for the whole desktop range, at 16:10. Uniform scaling (the caller
// uses background-size: contain) keeps the cells square at any viewport and
// Tux whole; the leftover space is covered by the same CSS gradient the canvas
// version uses, so fallback and live version line up.
const CELL = 10;
const GAP = 2;
const COLS = 128;
const ROWS = 80;
const TUX_HEIGHT_FRACTION = 0.86;
const TUX_X_FRACTION = 0.9;
const FILL = '#ece7d8'; // --color-gul-ink

export const GET: APIRoute = async () => {
  const tuxBitmap = await computeTuxBitmap(Buffer.from(tuxSvg), 80, 80);
  const tuxMask = sampleTuxMask(tuxBitmap, COLS, ROWS, TUX_HEIGHT_FRACTION, TUX_X_FRACTION);

  // Lit cells only: the rest of the background is CSS.
  const rects = [...tuxMask]
    .map((lit, index) =>
      lit
        ? `<rect x="${(index % COLS) * CELL}" y="${Math.floor(index / COLS) * CELL}" width="${CELL - GAP}" height="${CELL - GAP}"/>`
        : '',
    )
    .join('');

  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${COLS * CELL} ${ROWS * CELL}" fill="${FILL}">${rects}</svg>`,
    { headers: { 'Content-Type': 'image/svg+xml' } },
  );
};
