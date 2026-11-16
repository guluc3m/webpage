/**
 * caducaEventos.ts — retira del DOM lo marcado con `data-evento` (+ `data-inicio`/`data-fin`)
 * cuando el evento ya ha acabado. El HTML se construyó antes y puede llegar tarde; el criterio
 * es el mismo que en el build (evento.ts). Lo importan el banner y la tarjeta de actividad.
 */
import { eventoVigente } from './evento.ts';

document.querySelectorAll<HTMLElement>('[data-evento]').forEach((el) => {
  const { inicio, fin } = el.dataset;
  if (inicio && !eventoVigente({ inicio, fin })) el.remove();
});
