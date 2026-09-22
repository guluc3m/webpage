/**
 * /fortunas.json — every fortuna, already formatted, as its own file.
 *
 * The hero only needs one fortuna to render, and that one comes from the build.
 * The full list (50KB) exists only for the "Otra fortuna" button, so it lives
 * here and is fetched on the first click instead of riding inside the HTML of
 * every visit.
 *
 * `output: 'static'`, so this runs at build time and leaves a dist/fortunas.json
 * behind — there is no server executing it per request.
 */
import type { APIRoute } from 'astro';
import rawFortunas from '@data/fortunas.yaml?raw';
import { loadFortunas } from '@lib/fortunas.ts';

export const GET: APIRoute = () => Response.json(loadFortunas(rawFortunas));
