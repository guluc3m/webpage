/**
 * paletaImagen.ts — lee una imagen con sharp y devuelve su paleta (ver color.ts). SOLO EN BUILD:
 * impórtalo desde el frontmatter de un .astro (Node), nunca desde un <script> del navegador;
 * sharp es nativo y no puede acabar en el bundle del cliente. Mismo reparto que tux.ts/tuxBitmap.ts.
 */
import sharp from 'sharp';
import { paletaDesdePixeles, type Paleta } from './color.ts';

/** `origen`: ruta de un fichero o su contenido. */
export async function paletaDeImagen(origen: string | Buffer): Promise<Paleta> {
  const { data } = await sharp(origen)
    // Un PNG con transparencia se pinta sobre negro: lo que se ve en una web oscura.
    .flatten({ background: '#000000' })
    // 256 px de lado largo: pocos para que sea instantáneo, los suficientes para que unas
    // letras finas de color vivo (un detalle del cartel) no se diluyan con el fondo.
    .resize(256, 256, { fit: 'inside' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return paletaDesdePixeles(data);
}

/** Igual que paletaDeImagen, pero descargando la imagen de una URL: carteles que no
 * viven en el repo (public/). Es build-time como el resto, y si la descarga falla o
 * no trae una imagen, avisa y devuelve undefined: el que llama usa su paleta por
 * defecto, en vez de tumbar el build por un cielo nublado (o un 404). */
export async function paletaDeUrl(url: string): Promise<Paleta | undefined> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const tipo = res.headers.get('content-type') ?? '';
    if (!tipo.startsWith('image/')) throw new Error(`content-type ${tipo || 'desconocido'}`);
    return await paletaDeImagen(Buffer.from(await res.arrayBuffer()));
  } catch (err) {
    console.warn(
      `[paletaImagen] no se pudo leer ${url}: ${err instanceof Error ? err.message : err}`,
    );
    return undefined;
  }
}
