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
   Si no sabes que cambiar, puede buscar en los `TODO()` que están por todos los lados en los comentarios.
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

Las fortunas viven en [`src/data/fortunas.yaml`](./src/data/fortunas.yaml).

```yaml
- quote: |-
    La cita
  author: El Autor
```

Reglas generales de formato:
- Usen siempre `quote: |-`
- Las fortunas simples, e.g. `"me gustan los pies"`, son de una línea; si tienen "setup" también; e.g.
    `"*luisda hablando del logo de GNOME* me gustan los pies"`, o
    `"(a # voz en grito en el despacho) ¡Debian la chupa!"`, o
    `"no os preoupéis, que no me voy a ir a ningún sitio *no se le volvió a ver*"`,
- Las conversaciones también en multilínea y con `-` y `"`, e.g.:
  ```
  - Profe: "Aquí tienes tu examen"
  - Alumno: "¿Cúando es la recuperación?"
  ```
- Como usan `|-` (sensible a saltos de línea), las fortunas de una línea dejadlas en una línea.
- Autores:
  - Si la fortuna la ha soltado un profe en clase, pues `"Profesor Con Apellidos (Asignatura)"`
  - Si es otro random/miembro, nombre/mote, e.g. `"Epi"`
  - Comentarios, etc. al final y en minúscula, e.g. `"Pepe (un grande)"` o `"Eumelia y su perrito"`


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
