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
