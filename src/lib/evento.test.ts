/**
 * Comprobaciones mínimas de evento.ts. Se ejecutan con `pnpm test` (el runner de Node).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { eventoVigente, formatearFecha, proximoEvento } from './evento.ts';

const inicio = '2026-12-05T10:00:00+01:00';
const fin = '2026-12-05T20:00:00+01:00';

test('eventoVigente: sigue vigente hasta que termina', () => {
  assert.equal(eventoVigente({ inicio, fin }, new Date('2026-11-10T12:00:00Z')), true);
  // En mitad del evento (ya empezó, no ha acabado): se sigue anunciando.
  assert.equal(eventoVigente({ inicio, fin }, new Date('2026-12-05T12:00:00+01:00')), true);
});

test('eventoVigente: deja de estar vigente al llegar el fin, ni un ms antes', () => {
  assert.equal(eventoVigente({ inicio, fin }, new Date('2026-12-05T19:59:59.999+01:00')), true);
  assert.equal(eventoVigente({ inicio, fin }, new Date('2026-12-05T20:00:00+01:00')), false);
});

test('eventoVigente: sin fin, caduca al empezar', () => {
  assert.equal(eventoVigente({ inicio }, new Date('2026-12-05T09:59:00+01:00')), true);
  assert.equal(eventoVigente({ inicio }, new Date('2026-12-05T10:00:00+01:00')), false);
});

test('eventoVigente: una fecha ilegible cuenta como no vigente', () => {
  assert.equal(eventoVigente({ inicio: 'mañana' }), false);
  assert.equal(eventoVigente({ inicio, fin: 'pronto' }), false);
});

test('proximoEvento: salta los pasados y elige el que antes empieza', () => {
  const ahora = new Date('2026-11-10T12:00:00Z');
  const eventos = [
    { nombre: 'pasado', inicio: '2026-03-01T10:00:00+01:00' },
    { nombre: 'lejano', inicio: '2027-02-01T10:00:00+01:00' },
    { nombre: 'cercano', inicio: '2026-12-05T10:00:00+01:00' },
  ];
  assert.equal(proximoEvento(eventos, ahora)?.nombre, 'cercano');
  // La lista original no se reordena.
  assert.equal(eventos[0].nombre, 'pasado');
});

test('proximoEvento: sin eventos vigentes devuelve undefined', () => {
  const ahora = new Date('2030-01-01T00:00:00Z');
  assert.equal(proximoEvento([{ inicio, fin }], ahora), undefined);
  assert.equal(proximoEvento([], ahora), undefined);
});

test('formatearFecha: un solo día, con día de la semana y horario', () => {
  const { dia, hora } = formatearFecha({ inicio, fin });
  assert.match(dia, /sábado/);
  assert.match(dia, /5 de diciembre/);
  assert.match(hora, /^10:00\D+20:00$/);
});

test('formatearFecha: respeta la hora peninsular aunque el servidor esté en otra zona', () => {
  // 23:30 UTC ya es el día siguiente (00:30) en Madrid en invierno.
  const { dia, hora } = formatearFecha({ inicio: '2026-12-05T23:30:00Z' });
  assert.match(dia, /6 de diciembre/);
  assert.equal(hora, '00:30');
});

test('formatearFecha: varios días se escribe como rango', () => {
  const { dia, hora } = formatearFecha({
    inicio: '2026-12-05T10:00:00+01:00',
    fin: '2026-12-06T14:00:00+01:00',
  });
  assert.match(dia, /5 de diciembre\D+6 de diciembre/);
  assert.equal(hora, '10:00');
});
