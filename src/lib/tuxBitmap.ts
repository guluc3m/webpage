/**
 * tuxBitmap.ts — rasterizes tux.svg with sharp. BUILD-TIME ONLY: import this
 * only from .astro frontmatter (Node), never from a client <script> — sharp is
 * a native Node module and must never end up in the browser bundle.
 */
import sharp from 'sharp';
import type { TuxBitmap } from './tux.ts';

export async function computeTuxBitmap(
  svg: Buffer,
  height: number,
  alphaThreshold = 128, // 0-255, ignores the SVG's antialiased edge pixels
): Promise<TuxBitmap> {
  const { data, info } = await sharp(svg)
    .resize({ height })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let mask = '';
  for (let i = 0; i < info.width * info.height; i++) {
    mask += data[i * info.channels + 3] > alphaThreshold ? '1' : '0';
  }
  return { width: info.width, height: info.height, mask };
}
