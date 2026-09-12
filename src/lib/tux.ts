/**
 * tux.ts — client-safe: resamples a precomputed Tux bitmap onto the Game of
 * Life grid. Kept separate from tuxBitmap.ts (which imports sharp) so this
 * module can be imported by the browser script without sharp — a Node-only
 * native module — ending up in the client bundle.
 */

export interface TuxBitmap {
  width: number;
  height: number;
  /** Row-major, one char per pixel: '1' inside the silhouette, '0' outside. */
  mask: string;
}

/**
 * Fits `bitmap` into a box of height `rows * heightFraction`, bottom-aligned and
 * horizontally centered in the grid (same placement the SVG used to be drawn at
 * directly), and nearest-neighbor samples it onto a cols x rows cell mask.
 */
export function sampleTuxMask(
  bitmap: TuxBitmap,
  cols: number,
  rows: number,
  heightFraction: number,
): Uint8Array {
  const mask = new Uint8Array(cols * rows);
  const boxH = Math.round(rows * heightFraction);
  const boxW = Math.round(boxH * (bitmap.width / bitmap.height));
  const dx = Math.round((cols - boxW) / 2);
  const dy = rows - boxH;

  for (let by = 0; by < boxH; by++) {
    const gy = dy + by;
    if (gy < 0 || gy >= rows) continue;
    const sy = Math.min(bitmap.height - 1, Math.floor((by * bitmap.height) / boxH));
    for (let bx = 0; bx < boxW; bx++) {
      const gx = dx + bx;
      if (gx < 0 || gx >= cols) continue;
      const sx = Math.min(bitmap.width - 1, Math.floor((bx * bitmap.width) / boxW));
      if (bitmap.mask[sy * bitmap.width + sx] === '1') mask[gy * cols + gx] = 1;
    }
  }
  return mask;
}
