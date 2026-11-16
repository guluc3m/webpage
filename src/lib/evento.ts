/**
 * evento.ts — lógica del banner de próximo evento (EventoBanner.astro): cuál toca
 * enseñar y cómo se escribe su fecha. Sin dependencias de Astro ni de Node: lo importan
 * el componente (en el build), su <script> (en el navegador) y el test.
 */

/** Las fechas del evento se escriben y se muestran siempre en hora peninsular. */
export const ZONA_HORARIA = 'Europe/Madrid';

export interface FechasEvento {
  /** ISO 8601 con desfase, p. ej. `2026-12-05T10:00:00+01:00` (invierno) o `+02:00` (verano). */
  inicio: string;
  /** Igual que `inicio`. Si falta, el evento se da por pasado en cuanto empieza. */
  fin?: string;
}

/** Desfase de Madrid (`+01:00`/`+02:00`) en el instante dado. */
function desfase(instante: Date): string {
  const parte = new Intl.DateTimeFormat('en', {
    timeZone: ZONA_HORARIA,
    timeZoneName: 'longOffset',
  })
    .formatToParts(instante)
    .find((p) => p.type === 'timeZoneName');
  return parte?.value.replace('GMT', '') || 'Z';
}

/** `yyyy-mm-dd` + `HH:MM` en hora peninsular → ISO 8601 con desfase. */
function isoMadrid(dia: string, hora: string): string {
  const [y, mes, d] = dia.split('-').map(Number);
  const [h, min] = hora.split(':').map(Number);
  // Se mira el desfase en esa hora tomada como UTC: solo falla en la hora exacta de los cambios
  // de horario (madrugada), donde no hay actividades.
  return `${dia}T${hora}:00${desfase(new Date(Date.UTC(y!, mes! - 1, d!, h, min)))}`;
}

/**
 * Fechas de una actividad de actividades.yaml. Sin `time` dura el día entero; con `time` pero sin
 * `endTime`, caduca al empezar. `undefined` si no tiene día concreto (`2026/11/00`).
 */
export function fechasDe(a: {
  date: string;
  time?: string;
  endTime?: string;
}): FechasEvento | undefined {
  const dia = a.date.replaceAll('/', '-');
  if (dia.endsWith('-00')) return undefined;
  if (!a.time) {
    const [y, mes, d] = dia.split('-').map(Number);
    const siguiente = new Date(Date.UTC(y!, mes! - 1, d! + 1)).toISOString().slice(0, 10);
    return { inicio: isoMadrid(dia, '00:00'), fin: isoMadrid(siguiente, '00:00') };
  }
  return { inicio: isoMadrid(dia, a.time), fin: a.endTime && isoMadrid(dia, a.endTime) };
}

/** Añade `inicio`/`fin` a cada actividad que tiene día concreto; el resto se descarta. */
export function conFechas<T extends { date: string; time?: string; endTime?: string }>(
  actividades: readonly T[],
): Array<T & FechasEvento> {
  return actividades.flatMap((a) => {
    const fechas = fechasDe(a);
    return fechas ? [{ ...a, ...fechas }] : [];
  });
}

/** Instante (ms) a partir del cual el evento ya no se anuncia; NaN si la fecha no se entiende. */
function corte({ inicio, fin }: FechasEvento): number {
  return Date.parse(fin ?? inicio);
}

/**
 * ¿Sigue sin haber terminado el evento? Una fecha mal escrita cuenta como "no vigente":
 * es mejor que el banner desaparezca a que enseñe un "Invalid Date".
 */
export function eventoVigente(fechas: FechasEvento, ahora: Date = new Date()): boolean {
  const limite = corte(fechas);
  return Number.isFinite(limite) && ahora.getTime() < limite;
}

/** El evento vigente que antes empieza; `undefined` si no queda ninguno (→ no hay banner). */
export function proximoEvento<T extends FechasEvento>(
  eventos: readonly T[],
  ahora: Date = new Date(),
): T | undefined {
  return eventos
    .filter((evento) => eventoVigente(evento, ahora))
    .sort((a, b) => Date.parse(a.inicio) - Date.parse(b.inicio))[0];
}

const formato = (fecha: Date, opciones: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('es-ES', { timeZone: ZONA_HORARIA, ...opciones }).format(fecha);

/**
 * Fecha y hora legibles: `{ dia: 'sábado, 5 de diciembre', hora: '10:00 – 20:00' }`.
 * Si el evento dura varios días, `dia` es el rango (`5 de diciembre – 6 de diciembre`) y
 * `hora` la de inicio. Necesita fechas válidas: pásalo solo por eventos vigentes.
 */
export function formatearFecha({ inicio, fin }: FechasEvento): { dia: string; hora: string } {
  const desde = new Date(inicio);
  const hasta = fin ? new Date(fin) : undefined;
  const soloDia = { day: 'numeric', month: 'long' } as const;
  const soloHora = { hour: '2-digit', minute: '2-digit' } as const;

  // Se compara el día en hora peninsular, no en UTC: un evento que acaba a las 00:30 ya es "otro día".
  const variosDias = hasta && formato(desde, soloDia) !== formato(hasta, soloDia);
  if (hasta && variosDias) {
    return {
      dia: `${formato(desde, soloDia)} – ${formato(hasta, soloDia)}`,
      hora: formato(desde, soloHora),
    };
  }
  return {
    dia: formato(desde, { weekday: 'long', ...soloDia }),
    hora: hasta
      ? `${formato(desde, soloHora)} – ${formato(hasta, soloHora)}`
      : formato(desde, soloHora),
  };
}
