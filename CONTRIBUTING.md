# Contribuir
Gracias por echar una mano con la web del GUL. Esta guía es corta a propósito.
> CONTRIBUTING.md para la version de 2026

## Antes de nada

Lee la sección **"Cómo trabajar en la web"** del [`README.md`](./README.md):
requisitos (Node 22, pnpm 11), cómo levantar el entorno y qué hace cada comando.

## Flujo de trabajo

1. Crea una rama desde `web-2026`. Nombre: `tipo/descripcion-corta`
   (`fix/mapa-sin-pin`, `feat/linux-lo-mejor`, `docs/readme-deploy`).
2. Haz tus cambios. Que sean del tamaño de un PR: una cosa por rama.
3. Antes de abrir el Pull Request, comprueba que pasa todo:

   ```sh
   pnpm lint
   pnpm check
   pnpm test
   pnpm build
   ```

4. Abre el PR contra `web-2026`. Explica **qué** cambia y **por qué**.
5. Necesita la aprobación de al menos un maintainer para entrar. El mismo CI
   vuelve a correr los cuatro comandos de arriba.

### Mensajes de commit

Libres, pero claros: que se entienda el cambio leyendo solo el título.
[Conventional Commits](https://www.conventionalcommits.org) es bienvenido pero
no obligatorio.

## Añadir una fortuna

Las citas/frases internas viven en [`src/data/fortunas.json`](./src/data/fortunas.json),
una entrada por línea lógica:

```json
{ "quote": "La frase, tal cual se dijo", "author": "Quién y en qué contexto" }
```

- Edita el JSON **a mano** y abre un PR. Lo ideal es un commit de una línea.
- Si no tiene autor claro, deja `"author": ""`.
- El formateo (« », quitar el punto final, tramos `*entre asteriscos*`) lo hace
  `src/lib/fortunas.ts` en el build — tú solo metes el texto crudo. Si tocas ese
  fichero, añade o ajusta un caso en `src/lib/fortunas.test.ts`.

## Estilo

- **Prettier + ESLint** mandan sobre el formato y el estilo. No discutas con
  `pnpm format`; si algo te molesta, propón un cambio de config en su propio PR.
- **Cada fichero empieza con un comentario** de una línea diciendo qué es.
  Las líneas con lógica no obvia llevan un comentario del _porqué_, no una
  repetición de lo que hace el código.
- Español de España en todo el contenido. La web no tiene traducciones.

## Componentes compartidos

Los componentes con prefijo `gul-` (`gul-Header`, `gul-Nav`, `gul-Footer`) se
copian a otros repos del GUL. No metas en ellos nada específico de esta página:
pásale los datos por props y deja los enlaces externos en `src/config.ts`.

## Licencia

Al contribuir aceptas que tu aportación se publique bajo la
[GPLv3](./LICENSE) del proyecto.