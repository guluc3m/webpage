/**
 * Comprobaciones de color.ts y paletaImagen.ts: la paleta que sale de un cartel tiene que
 * leerse (contraste WCAG AA) SEA CUAL SEA el cartel. Se ejecutan con `pnpm test`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import {
  contraste,
  hexARgb,
  hslARgb,
  paletaDesdePixeles,
  revisarContraste,
  rgbAHsl,
  type RGB,
} from './color.ts';
import { paletaDeImagen } from './paletaImagen.ts';

/** Imagen de `n` píxeles de un color, con una franja del 4 % en otro (el "detalle" del cartel). */
function cartel(fondo: RGB, detalle?: RGB, n = 2000): Uint8Array {
  const px = new Uint8Array(n * 3);
  const corte = detalle ? Math.floor(n * 0.96) : n;
  for (let i = 0; i < n; i++) px.set(i < corte ? fondo : detalle!, i * 3);
  return px;
}

test('contraste: blanco sobre negro es 21 y un color sobre sí mismo es 1', () => {
  assert.equal(Math.round(contraste([255, 255, 255], [0, 0, 0])), 21);
  assert.equal(contraste([12, 34, 56], [12, 34, 56]), 1);
});

test('hsl ida y vuelta conserva el color', () => {
  const rgb: RGB = [18, 100, 175];
  const vuelta = hslARgb(rgbAHsl(rgb));
  rgb.forEach((v, i) => assert.ok(Math.abs(v - vuelta[i]) < 1.5));
});

test('paleta: legible con TODO tipo de cartel (tonos × saturaciones × luminosidades × acentos)', () => {
  let casos = 0;
  for (let tono = 0; tono < 360; tono += 20) {
    for (const sat of [0, 0.25, 0.6, 1]) {
      for (const luz of [0, 0.05, 0.2, 0.4, 0.5, 0.6, 0.8, 0.95, 1]) {
        const fondo = hslARgb([tono, sat, luz]);
        // Sin acento, con un acento de otro tono y con uno del mismo tono que el fondo.
        for (const detalle of [
          undefined,
          hslARgb([(tono + 150) % 360, 1, 0.5]),
          hslARgb([tono, 1, 0.6]),
        ]) {
          const paleta = paletaDesdePixeles(cartel(fondo, detalle));
          const fallos = revisarContraste(paleta);
          assert.deepEqual(
            fallos,
            [],
            `h${tono} s${sat} l${luz} detalle=${detalle?.map(Math.round)} → ${JSON.stringify(paleta)}`,
          );
          casos++;
        }
      }
    }
  }
  assert.ok(casos > 1000, `solo ${casos} casos`);
});

test('paleta: un cartel azul con letras amarillas da fondo azul y acento amarillo', () => {
  const paleta = paletaDesdePixeles(cartel([59, 148, 238], [255, 255, 0]));
  const [tonoFondo] = rgbAHsl(hexARgb(paleta.fondo));
  const [tonoAcento] = rgbAHsl(hexARgb(paleta.acento));
  assert.ok(tonoFondo > 190 && tonoFondo < 235, `fondo h${tonoFondo}`);
  assert.ok(tonoAcento > 45 && tonoAcento < 75, `acento h${tonoAcento}`);
});

test('paleta: un cartel casi blanco usa texto oscuro en vez de ennegrecer el fondo', () => {
  const paleta = paletaDesdePixeles(cartel([250, 246, 235]));
  assert.ok(
    contraste(hexARgb(paleta.texto), [0, 0, 0]) < contraste(hexARgb(paleta.texto), [255, 255, 255]),
  );
  assert.deepEqual(revisarContraste(paleta), []);
});

test('revisarContraste: detecta colores ilegibles, también bajo el dithering', () => {
  const base = {
    // La paleta que sale hoy del cartel de ejemplo (azul con letras amarillas).
    fondo: '#105798',
    texto: '#eff7fd',
    apagado: '#eff7fd',
    borde: '#417aae',
    acento: '#f8fc18',
    textoAcento: '#0a0a09',
  };
  assert.deepEqual(revisarContraste(base), []);

  const malos = revisarContraste({ ...base, texto: '#6a9fd8', apagado: '#3a7fc4' });
  assert.ok(malos.some((f) => f.par === 'texto sobre fondo'));
  assert.ok(malos.some((f) => f.par === 'apagado sobre fondo'));

  // Blanco sobre #1c72cc cumple en liso (4,85:1) pero no bajo una celda de dithering blanco (3,4:1).
  const justo = {
    ...base,
    fondo: '#1c72cc',
    texto: '#ffffff',
    apagado: '#ffffff',
    acento: '#ffffff',
  };
  assert.deepEqual(revisarContraste({ ...justo, dithering: '0, 0, 0' }), []);
  assert.deepEqual(
    revisarContraste(justo).map((f) => f.par),
    ['texto sobre dithering', 'apagado sobre dithering'],
  );
});

test('revisarContraste: se salta lo que no es #hex (var(...), rgb(...))', () => {
  const fallos = revisarContraste({
    fondo: 'var(--color-gul-surface)',
    texto: 'rgb(1, 2, 3)',
    apagado: 'var(--color-gul-muted)',
    borde: 'var(--color-gul-line)',
    acento: 'var(--color-gul-blue)',
    textoAcento: '#ffffff',
  });
  assert.deepEqual(fallos, []);
});

test('paletaDeImagen: lee un fichero de verdad y sale legible (azul con amarillo)', async () => {
  // 100x100 azul con una franja amarilla, codificada como PNG para pasar por sharp de punta a punta.
  const raw = Buffer.alloc(100 * 100 * 3);
  for (let i = 0; i < 100 * 100; i++) {
    const amarillo = i % 100 >= 90;
    raw.set(amarillo ? [255, 255, 0] : [59, 148, 238], i * 3);
  }
  const png = await sharp(raw, { raw: { width: 100, height: 100, channels: 3 } })
    .png()
    .toBuffer();
  const paleta = await paletaDeImagen(png);
  assert.deepEqual(revisarContraste(paleta), []);
  assert.ok(rgbAHsl(hexARgb(paleta.acento))[0] < 75, 'el acento debería ser amarillo');
});

test('paletaDeImagen: PNG transparente se pinta sobre negro, no se rompe', async () => {
  const png = await sharp({
    create: { width: 20, height: 20, channels: 4, background: { r: 255, g: 0, b: 0, alpha: 0 } },
  })
    .png()
    .toBuffer();
  assert.deepEqual(revisarContraste(await paletaDeImagen(png)), []);
});

test('paletaDeImagen: todas las imágenes reales del repo dan una paleta legible', async () => {
  const carpetas = ['../assets/real', '../assets/eventos', '../../public/actividades'];
  let vistas = 0;
  for (const carpeta of carpetas) {
    const dir = new URL(carpeta + '/', import.meta.url).pathname;
    for (const f of readdirSync(dir).filter((n) => /\.(jpe?g|png)$/i.test(n))) {
      const paleta = await paletaDeImagen(join(dir, f));
      assert.deepEqual(revisarContraste(paleta), [], `${f} → ${JSON.stringify(paleta)}`);
      vistas++;
    }
  }
  assert.ok(vistas >= 8, `solo ${vistas} imágenes`);
});
