/**
 * Minimal checks for tux.ts. Run with `pnpm test` (Node's built-in test runner).
 * Not wired into CI.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sampleTuxMask } from './tux.ts';
import { computeTuxBitmap } from './tuxBitmap.ts';

test('computeTuxBitmap: opaque SVG rasterizes to an all-"1" mask', async () => {
  const svg = Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="black"/></svg>',
  );
  const bitmap = await computeTuxBitmap(svg, 4);
  assert.equal(bitmap.mask.length, bitmap.width * bitmap.height);
  assert.equal(/^1+$/.test(bitmap.mask), true);
});

test('computeTuxBitmap: empty SVG rasterizes to an all-"0" mask', async () => {
  const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"></svg>');
  const bitmap = await computeTuxBitmap(svg, 4);
  assert.equal(/^0+$/.test(bitmap.mask), true);
});

test('sampleTuxMask: nearest-neighbor upscale preserves bitmap corners', () => {
  const bitmap = { width: 2, height: 2, mask: '1001' }; // top-left and bottom-right "on"
  const result = sampleTuxMask(bitmap, 4, 4, 1);
  const at = (x: number, y: number) => result[y * 4 + x];
  assert.equal(at(0, 0), 1);
  assert.equal(at(1, 1), 1);
  assert.equal(at(2, 2), 1);
  assert.equal(at(3, 3), 1);
  assert.equal(at(3, 0), 0);
  assert.equal(at(0, 3), 0);
});

test('sampleTuxMask: heightFraction < 1 shrinks and bottom-aligns the box', () => {
  const bitmap = { width: 1, height: 1, mask: '1' };
  const result = sampleTuxMask(bitmap, 6, 4, 0.5); // boxH=2, boxW=2, dx=2, dy=2
  const at = (x: number, y: number) => result[y * 6 + x];
  assert.equal(at(2, 2), 1);
  assert.equal(at(3, 3), 1);
  assert.equal(at(0, 0), 0);
  assert.equal(at(5, 3), 0);
});
