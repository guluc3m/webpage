/**
 * color.ts — saca de los píxeles de un cartel la paleta del banner de evento (fondo, texto,
 * acento…) y garantiza que cada par de colores se pueda leer (contraste WCAG AA). Sin sharp
 * ni Node: solo matemáticas sobre píxeles, así que se prueba sin imágenes. Quien lee el
 * fichero de la imagen es paletaImagen.ts.
 */

export type RGB = [number, number, number];

export interface Paleta {
  /** Fondo del banner: el color que domina el cartel, ajustado lo justo para que se lea el texto. */
  fondo: string;
  /** Título y datos. */
  texto: string;
  /** Descripción y etiquetas pequeñas: texto atenuado, también con contraste AA. */
  apagado: string;
  /** Contorno y separadores. */
  borde: string;
  /** El color más vistoso del cartel que no es el del fondo: botón principal y dithering. */
  acento: string;
  /** Texto sobre `acento` (blanco o casi negro, el que más contraste dé). */
  textoAcento: string;
}

const NEGRO: RGB = [10, 10, 9]; // el --color-gul-bg de la web
const NEGRO_PURO: RGB = [0, 0, 0];
const BLANCO: RGB = [255, 255, 255];

const AA_TEXTO = 4.5;
const AA_COMPONENTE = 3;
// Margen sobre 4,5 al elegir colores: el canvas del dithering redondea cada canal a entero y el
// navegador puede diferir en ±1 nivel, que son centésimas de contraste.
const AA_CON_MARGEN = 4.6;
const AA_COMPONENTE_CON_MARGEN = 3.1;
// El fondo se ajusta a más de 4,5 para que el texto atenuado tenga margen de ser más tenue.
const MARGEN_TEXTO = 5.5;

export function hexARgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbAHex([r, g, b]: RGB): string {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
}

/** "r, g, b", el formato con que PixelDissolve recibe su color. */
export function rgbATriplete(rgb: RGB): string {
  return rgb.map((v) => Math.round(v)).join(', ');
}

/** Luminancia relativa WCAG, 0 (negro) a 1 (blanco). */
export function luminancia([r, g, b]: RGB): number {
  const lineal = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lineal(r) + 0.7152 * lineal(g) + 0.0722 * lineal(b);
}

/** Razón de contraste WCAG, de 1 (iguales) a 21 (blanco sobre negro). */
export function contraste(a: RGB, b: RGB): number {
  const [claro, oscuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (oscuro + 0.05);
}

/** h en grados (0-360), s y l en 0-1. */
export function rgbAHsl([r, g, b]: RGB): [number, number, number] {
  const [R, G, B] = [r / 255, g / 255, b / 255];
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  const h = max === R ? ((G - B) / d) % 6 : max === G ? (B - R) / d + 2 : (R - G) / d + 4;
  return [(h * 60 + 360) % 360, s, l];
}

export function hslARgb([h, s, l]: [number, number, number]): RGB {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r, g, b] =
    h < 60
      ? [c, x, 0]
      : h < 120
        ? [x, c, 0]
        : h < 180
          ? [0, c, x]
          : h < 240
            ? [0, x, c]
            : h < 300
              ? [x, 0, c]
              : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

const redondear = (rgb: RGB): RGB => [Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2])];

/**
 * El texto para poner sobre `fondo` (un botón): blanco, el negro de la web o negro puro, el
 * primero que llegue a 4,5:1. Con luminosidades medias el negro de la web (#0a0a09) se queda
 * en 4,4, por eso el recurso al negro puro, que siempre llega (con blanco o con él se supera 4,58).
 */
export function textoSobre(fondo: RGB): RGB {
  return [BLANCO, NEGRO, NEGRO_PURO].find((t) => contraste(t, fondo) >= AA_TEXTO) ?? NEGRO_PURO;
}

/** `t` = 0 devuelve `a`; `t` = 1 devuelve `b`. */
export function mezclar(a: RGB, b: RGB, t: number): RGB {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

/**
 * Mueve la luminosidad de `color` (sin tocar tono ni saturación) hacia más claro o más
 * oscuro hasta que contraste `minimo` con `contra`. Devuelve el color y cuánto se ha movido
 * (0-1); si ni llegando al extremo se alcanza, devuelve el extremo con `ok: false`.
 */
export function ajustarContraste(
  color: RGB,
  contra: RGB,
  minimo: number,
  hacia: 'claro' | 'oscuro',
): { color: RGB; desplazamiento: number; ok: boolean } {
  const [h, s, l0] = rgbAHsl(color);
  const paso = hacia === 'claro' ? 0.01 : -0.01;
  let l = l0;
  for (;;) {
    const candidato = l === l0 ? color : hslARgb([h, s, l]);
    if (contraste(candidato, contra) >= minimo) {
      return { color: candidato, desplazamiento: Math.abs(l - l0), ok: true };
    }
    if ((paso > 0 && l >= 1) || (paso < 0 && l <= 0)) {
      return { color: candidato, desplazamiento: Math.abs(l - l0), ok: false };
    }
    l = Math.min(1, Math.max(0, l + paso));
  }
}

const distancia = (a: RGB, b: RGB) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

interface Cubo {
  rgb: RGB;
  parte: number;
}

/** Agrupa los píxeles (RGB seguidos) en cubos de 16 niveles por canal, con su color medio. */
function cubos(pixeles: ArrayLike<number>): Cubo[] {
  const total = Math.floor(pixeles.length / 3);
  const acumulado = new Map<number, { r: number; g: number; b: number; n: number }>();
  for (let i = 0; i < total; i++) {
    const [r, g, b] = [pixeles[i * 3], pixeles[i * 3 + 1], pixeles[i * 3 + 2]];
    const clave = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    const c = acumulado.get(clave) ?? { r: 0, g: 0, b: 0, n: 0 };
    c.r += r;
    c.g += g;
    c.b += b;
    c.n++;
    acumulado.set(clave, c);
  }
  return [...acumulado.values()].map((c) => ({
    rgb: [c.r / c.n, c.g / c.n, c.b / c.n] as RGB,
    parte: c.n / total,
  }));
}

/**
 * El color que domina la imagen. Un degradado (un cartel de fondo azul que se aclara hacia
 * una esquina) reparte sus píxeles entre muchos cubos vecinos, así que en vez de quedarse
 * con el cubo más lleno se promedia todo lo que está cerca de él.
 */
function dominante(todos: Cubo[]): RGB {
  const cima = todos.reduce((a, b) => (b.parte > a.parte ? b : a));
  let suma: RGB = [0, 0, 0];
  let peso = 0;
  for (const c of todos) {
    if (distancia(c.rgb, cima.rgb) > 60) continue;
    suma = [
      suma[0] + c.rgb[0] * c.parte,
      suma[1] + c.rgb[1] * c.parte,
      suma[2] + c.rgb[2] * c.parte,
    ];
    peso += c.parte;
  }
  return [suma[0] / peso, suma[1] / peso, suma[2] / peso];
}

/**
 * El color más vistoso que no se confunde con el fondo: mucha saturación, lejos del fondo y
 * con algo de presencia (un detalle de 5 píxeles no cuenta, pero el amarillo de unas
 * palabras destacadas sí). `undefined` si el cartel no tiene ninguno (p. ej. en blanco y negro).
 */
function acentoDe(todos: Cubo[], fondo: RGB): RGB | undefined {
  const [tonoFondo, satFondo] = rgbAHsl(fondo);
  let mejor: { rgb: RGB; puntos: number } | undefined;
  for (const { rgb, parte } of todos) {
    // Un cubo suelto (el amarillo puro se reparte entre varios) puede ser poco; el peso por
    // sqrt(parte) de abajo ya hace que un detalle diminuto no gane a algo con presencia.
    if (parte < 0.0005) continue;
    const [tono, s, l] = rgbAHsl(rgb);
    const lejos = distancia(rgb, fondo);
    if (s < 0.35 || l < 0.2 || l > 0.9 || lejos < 90) continue;
    // Otro TONO, no solo otro brillo: en un cartel de fondo azul, el azul claro del degradado
    // no es un acento (y como ocupa mucho gana por tamaño). Si el fondo es gris, da igual.
    const dif = Math.abs(tono - tonoFondo);
    const difTono = Math.min(dif, 360 - dif);
    if (satFondo >= 0.15 && difTono < 35) continue;
    const factorTono = satFondo >= 0.15 ? difTono / 180 : 1;
    // s al cuadrado: el borde de unas letras amarillas sobre azul se reescala a verdes
    // apagados que son más numerosos que el amarillo puro, y no deben ganarle.
    const puntos = s * s * (lejos / 255) * factorTono * Math.sqrt(parte);
    if (!mejor || puntos > mejor.puntos) mejor = { rgb, puntos };
  }
  return mejor?.rgb;
}

/**
 * Opacidad con que PixelDissolve pinta cada celda del dithering del banner. Está aquí, y no
 * suelta en el componente, porque la paleta depende de ella: el texto tiene que leerse también
 * sobre una celda pintada, que es el peor fondo posible (una sola capa, nunca dos).
 */
export const ALPHA_DITHERING = 0.26;

/** El fondo tal como se ve bajo una celda de dithering: el fondo con una capa de `acento` encima. */
export function fondoConDithering(fondo: RGB, acento: RGB): RGB {
  return mezclar(fondo, acento, ALPHA_DITHERING);
}

interface Candidata {
  paleta: Paleta;
  /** Cuánto se ha movido la luminosidad del fondo respecto a la del cartel (0-1). */
  desplazamiento: number;
}

/**
 * Busca, moviendo la luminosidad del fondo desde la del cartel hacia el lado contrario al del
 * texto, el primer fondo con el que todo se lee; `undefined` si ni llegando al extremo.
 */
function probar(base: RGB, original: RGB | undefined, claro: boolean): Candidata | undefined {
  const texto = redondear(mezclar(claro ? BLANCO : NEGRO, base, 0.08));
  const [tono, sat, l0] = rgbAHsl(base);
  const paso = claro ? -0.01 : 0.01;

  for (let i = 0; i <= 100; i++) {
    const l = l0 + paso * i;
    if (l < 0 || l > 1) break;
    const fondo = redondear(i === 0 ? base : hslARgb([tono, sat, l]));
    if (contraste(texto, fondo) < MARGEN_TEXTO) continue;

    // El acento solo se usa en el "##" del título (texto grande, 3:1), en el botón principal y en
    // el contorno de foco (componentes, 3:1): nunca en texto pequeño. Debe llegar a 3:1 sobre el
    // fondo Y sobre el fondo con dithering (que lleva el propio acento encima). Si el color del
    // cartel no puede, el acento pasa a ser el color del texto, que sí puede.
    const candidatos: RGB[] = [];
    if (original) {
      const ajustado = ajustarContraste(
        original,
        fondo,
        AA_COMPONENTE_CON_MARGEN,
        luminancia(fondo) < 0.5 ? 'claro' : 'oscuro',
      );
      if (ajustado.ok) candidatos.push(redondear(ajustado.color));
    }
    candidatos.push(texto);

    let acento: RGB | undefined;
    let bajoDithering: RGB = fondo;
    for (const candidato of candidatos) {
      const bajo = redondear(fondoConDithering(fondo, candidato));
      if (contraste(texto, bajo) < AA_CON_MARGEN) continue;
      if (candidato !== texto && contraste(candidato, bajo) < AA_COMPONENTE_CON_MARGEN) continue;
      acento = candidato;
      bajoDithering = bajo;
      break;
    }
    if (!acento) continue;

    // Texto atenuado: lo más cerca del fondo que siga cumpliendo 4,5:1 sobre fondo y dithering.
    let apagado = texto;
    for (let t = 0.4; t > 0; t -= 0.05) {
      const candidato = redondear(mezclar(texto, fondo, t));
      if (
        contraste(candidato, fondo) >= AA_CON_MARGEN &&
        contraste(candidato, bajoDithering) >= AA_CON_MARGEN
      ) {
        apagado = candidato;
        break;
      }
    }

    const textoAcento = textoSobre(acento);
    return {
      desplazamiento: Math.abs(l - l0),
      paleta: {
        fondo: rgbAHex(fondo),
        texto: rgbAHex(texto),
        apagado: rgbAHex(apagado),
        borde: rgbAHex(mezclar(fondo, texto, 0.22)),
        acento: rgbAHex(acento),
        textoAcento: rgbAHex(textoAcento),
      },
    };
  }
  return undefined;
}

/**
 * Paleta a partir de píxeles RGB seguidos (3 valores por píxel, sin alfa). Sea cual sea el
 * cartel, queda garantizado (y lo comprueba color.test.ts): texto y apagado ≥ 4,5:1 sobre el
 * fondo y también sobre el fondo con dithering encima, acento ≥ 3:1 sobre el fondo y
 * textoAcento ≥ 4,5:1 sobre el acento (WCAG AA).
 */
export function paletaDesdePixeles(pixeles: ArrayLike<number>): Paleta {
  const todos = cubos(pixeles);
  const base = dominante(todos);
  // El acento se elige respecto al color del cartel; `probar` lo corrige para cada fondo.
  const original = acentoDe(todos, base);

  // Texto claro (como el resto de la web, que es oscura) salvo que el cartel sea tan claro que
  // habría que ennegrecer el fondo casi hasta el negro: entonces, texto oscuro.
  const conClaro = probar(base, original, true);
  const conOscuro = probar(base, original, false);
  const elegida =
    conClaro && (conClaro.desplazamiento <= 0.3 || !conOscuro) ? conClaro : (conOscuro ?? conClaro);
  if (elegida) return elegida.paleta;

  // Inalcanzable en la práctica (blanco o negro puro siempre dan 21:1 con el texto opuesto),
  // pero que un cartel raro no rompa el build: texto claro sobre negro.
  return {
    fondo: rgbAHex(NEGRO),
    texto: rgbAHex(BLANCO),
    apagado: rgbAHex(mezclar(BLANCO, NEGRO, 0.25)),
    borde: rgbAHex(mezclar(NEGRO, BLANCO, 0.22)),
    acento: rgbAHex(BLANCO),
    textoAcento: rgbAHex(NEGRO),
  };
}

const esHex = (valor: string | undefined): valor is string => /^#[0-9a-f]{6}$/i.test(valor ?? '');

/**
 * Revisa una paleta (la sacada del cartel, fijada a mano o mezcla de ambas) y devuelve los
 * pares que NO cumplen AA, vacío si todo bien. Solo puede juzgar colores en #hex: los
 * `var(...)` o `rgb(...)` se saltan. `dithering` es el "r, g, b" del dithering si no es el acento.
 */
export function revisarContraste(
  c: Paleta & { dithering?: string },
): { par: string; contraste: number; minimo: number }[] {
  const fallos: { par: string; contraste: number; minimo: number }[] = [];
  const comprobar = (par: string, a: string, b: string, minimo: number) => {
    if (!esHex(a) || !esHex(b)) return;
    const ratio = contraste(hexARgb(a), hexARgb(b));
    if (ratio < minimo) fallos.push({ par, contraste: Math.round(ratio * 100) / 100, minimo });
  };

  comprobar('texto sobre fondo', c.texto, c.fondo, AA_TEXTO);
  comprobar('apagado sobre fondo', c.apagado, c.fondo, AA_TEXTO);
  comprobar('textoAcento sobre acento (botón principal)', c.textoAcento, c.acento, AA_TEXTO);
  comprobar('acento sobre fondo (botón y foco)', c.acento, c.fondo, AA_COMPONENTE);

  // Bajo una celda de dithering: el color del dithering (el acento, salvo que se fije otro).
  const tinta = c.dithering ? c.dithering.split(',').map(Number) : undefined;
  const colorDithering: RGB | undefined =
    tinta?.length === 3 && tinta.every(Number.isFinite)
      ? (tinta as RGB)
      : esHex(c.acento)
        ? hexARgb(c.acento)
        : undefined;
  if (colorDithering && esHex(c.fondo)) {
    const bajo = rgbAHex(fondoConDithering(hexARgb(c.fondo), colorDithering));
    comprobar('texto sobre dithering', c.texto, bajo, AA_TEXTO);
    comprobar('apagado sobre dithering', c.apagado, bajo, AA_TEXTO);
    comprobar('acento sobre dithering ("##" del título)', c.acento, bajo, AA_COMPONENTE);
  }
  return fallos;
}
