<!--
  README del repositorio de la web del GUL (edición 2026).
  Contiene: cómo montar el entorno y trabajar en el sitio, y una introducción a
  Astro y Tailwind pensada para quien no los ha usado nunca. Si vas a tocar el
  código, léete al menos las secciones "Puesta en marcha" y "Qué es Astro".
-->

# Página web del GUL

![license](https://img.shields.io/github/license/guluc3m/webpage?style=flat-square)

## Edición 2026

Web de la Asociación GUL (Grupo de Usuarios de Linux) de la Universidad Carlos III
de Madrid: <https://gul.uc3m.es>

Es un sitio de **una sola página** y **estático**: no hay servidor ni base de
datos. Se construye con [Astro](https://astro.build) y se sirve como HTML plano.

---

## Requisitos

- **Node.js 22** (la versión LTS «Jod»). El fichero `.nvmrc` la fija: si usas
  [nvm](https://github.com/nvm-sh/nvm), basta con `nvm use` dentro del repo.
- **pnpm 11** (gestor de paquetes). Si no lo tienes:

  ```sh
  corepack enable        # viene con Node; activa pnpm
  # o bien:  npm install -g pnpm
  ```

No hace falta nada más. Todo lo demás lo instala `pnpm`.

---

## Puesta en marcha

```sh
pnpm install     # instala dependencias — una vez, y cada vez que cambie package.json
pnpm dev         # arranca el servidor de desarrollo
```

Abre <http://localhost:4321>. Al guardar un fichero, la página se recarga sola.

### Comandos

| Comando        | Qué hace                                                                  |
| -------------- | ------------------------------------------------------------------------- |
| `pnpm dev`     | Servidor local con recarga en caliente. Es lo que usas mientras trabajas. |
| `pnpm build`   | Genera el sitio final en `dist/` (HTML + CSS + JS ya optimizados).        |
| `pnpm preview` | Sirve `dist/` tal cual, para revisar el resultado real del `build`.       |
| `pnpm check`   | Comprueba los tipos de TypeScript y busca errores en los `.astro`.        |

Antes de abrir un Pull Request (PR), que pasen `pnpm build` y `pnpm check`.

---

## Cómo se despliega

TO DO

---

## Qué es Astro (para quien no lo ha usado nunca)

Astro es un generador de sitios estáticos. Escribes componentes (trozos de HTML
reutilizables), y Astro los **monta en HTML plano al construir**. El navegador
recibe HTML y CSS; **JavaScript, solo el imprescindible** (y aquí casi ninguno).

### El flujo de trabajo

```sh
pnpm dev      # trabajas aquí: ves los cambios al instante
pnpm build    # genera dist/ = el sitio listo para subir
pnpm preview  # compruebas dist/ antes de publicar
```

Astro se ejecuta en tu ordenador (o en el CI), **nunca en producción**. Lo que se
publica es el contenido de `dist/`: ficheros estáticos.

### Rutas = ficheros dentro de `src/pages/`

Cada fichero `.astro` en `src/pages/` se convierte en una página:

```
src/pages/index.astro   ->  /            (dist/index.html)
```

Como esta web es **una sola página**, solo hay `index.astro`.

### Anatomía de un componente `.astro`

Un fichero `.astro` tiene dos partes separadas por `---`:

```astro
---
// PARTE DE ARRIBA ("frontmatter"): JavaScript/TypeScript que se ejecuta AL
// CONSTRUIR, nunca en el navegador. Aquí importas cosas y preparas datos.
import BaseLayout from '../layouts/BaseLayout.astro';
import fortunas from '../data/fortunas.json';

const cita = fortunas[Math.floor(Math.random() * fortunas.length)];
---

<!-- PARTE DE ABAJO: HTML. Las llaves { } insertan valores de la parte de arriba. -->
<BaseLayout title="GUL UC3M">
  <h1>Hola</h1>
  <blockquote>
    {cita.quote} — {cita.author}
  </blockquote>
</BaseLayout>
```

Que el `frontmatter` se ejecute solo al construir tiene una consecuencia
importante: si lees un JSON ahí, el navegador recibe únicamente el HTML final con
el texto ya puesto. El JSON no viaja. Por eso las fortunas se formatean en el
`build` y no en el navegador.

### Componentes y layouts

Los componentes viven en `src/components/`. Se importan y se usan como etiquetas:

```astro
---
import Faq from '../components/Faq.astro';
---

<Faq />
```

Un **layout** (`src/layouts/`) es un componente que envuelve páginas. Usa
`<slot />` como hueco donde se mete el contenido:

```astro
---
// src/layouts/BaseLayout.astro
interface Props {
  title: string;
}
const { title } = Astro.props; // así se reciben los datos que le pasan
import '../styles/global.css';
---

<html lang="es">
  <head>
    <title>{title}</title>
    <!-- meta, Open Graph, favicon… -->
  </head>
  <body>
    <slot /> <!-- aquí entra el contenido de la página -->
  </body>
</html>
```

Todo el `<head>` (SEO, Open Graph, favicon) se escribe aquí una sola vez.

### Cero JavaScript por defecto: las «islas»

Un `.astro` normal es solo plantilla: **no manda nada de JS al navegador**.
Cuando una parte concreta sí necesita JavaScript en el cliente (el mapa de
Leaflet, la animación del Juego de la Vida del fondo), se marca con una
directiva `client:*`:

```astro
<Map client:visible /> <!-- carga su JS cuando entra en pantalla -->
<GameOfLife client:idle /> <!-- carga cuando el navegador está ocioso -->
```

Eso es una «isla»: un trozo interactivo dentro de una página por lo demás
estática. `client:visible` es justo lo que queremos para el mapa y la animación
(que no gasten nada hasta que se ven).

### Tailwind aquí

El CSS se escribe con [Tailwind](https://tailwindcss.com) v4: clases de utilidad
directamente en el marcado.

```astro
<main class="mx-auto max-w-2xl p-8">…</main>
```

- **Configuración**: `src/styles/global.css`. Tailwind v4 **no tiene**
  `tailwind.config.js`; la paleta y las fuentes del GUL van en el bloque
  `@theme { … }` de ese fichero.
- Tailwind escanea los `.astro`, ve qué clases usas y genera **solo ese CSS**.
- `global.css` lo importa `BaseLayout.astro`, así que llega a todas las páginas.

Como todo el estilo viaja en las clases y en ese único `global.css`, los
componentes con prefijo `gul-` (cabecera, pie, navegación) se pueden copiar tal
cual a los otros repos del GUL.

### Datos

Los datos van en `src/data/` (por ejemplo `fortunas.json`) y se importan desde el
`frontmatter` como un objeto normal. La lógica en TypeScript (formatear las
fortunas, etc.) va en `src/lib/`.

---

## Estructura del proyecto

```
webpage/
├── astro.config.mjs      Configuración del build (output estático, plugin de Tailwind)
├── tsconfig.json         Configuración de TypeScript (modo estricto)
├── pnpm-workspace.yaml   Ajustes de pnpm (no es un monorepo)
├── .nvmrc                Versión de Node (22)
├── public/               Ficheros que se copian TAL CUAL a la raíz del sitio:
│                         favicon, robots.txt, llms.txt, imágenes…
├── src/
│   ├── pages/
│   │   └── index.astro   La única página. Aquí se componen las secciones en orden.
│   ├── layouts/
│   │   └── BaseLayout.astro   El <head> (SEO/OG/favicon) y el esqueleto <html>.
│   ├── components/       Un componente por sección (Hero, WhatIsGul, Faq, Projects,
│   │                     Qrs, WhereWeAre) + los compartidos gul-Header/Footer/Nav
│   │                     + GameOfLife.astro y Map.astro.
│   ├── data/
│   │   └── fortunas.json  Las citas/frases internas, una por entrada.
│   ├── lib/              Lógica en TypeScript (p. ej. el formateador de fortunas).
│   └── styles/
│       └── global.css   Importa Tailwind y define la paleta en @theme.
└── dist/                 Salida de `pnpm build`. No se toca ni se sube a git.
```

`public/` frente a `src/`: lo de `public/` se sirve sin procesar (útil para
`robots.txt` o un favicon); lo de `src/` pasa por el build (se optimiza, se le
pone hash al nombre…).

---

## Tareas típicas

| Quiero…                         | Toco…                                                          |
| ------------------------------- | -------------------------------------------------------------- |
| Añadir una frase a las fortunas | `src/data/fortunas.json` (una entrada `{ "quote", "author" }`) |
| Cambiar el texto de una sección | El componente correspondiente en `src/components/`             |
| Cambiar colores o fuentes       | El bloque `@theme` de `src/styles/global.css`                  |
| Cambiar meta tags / SEO         | `src/layouts/BaseLayout.astro`                                 |
| Reordenar las secciones         | `src/pages/index.astro`                                        |

---

## Editor (VS Code)

Al abrir el repo, VS Code te propondrá instalar dos extensiones (están en
`.vscode/extensions.json`):

- **Astro** (`astro-build.astro-vscode`): resaltado, autocompletado y errores en
  los `.astro`. Es lo que hace que el editor «entienda» Astro.
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`): autocompletado de
  clases de Tailwind.

Si usas otro editor, `pnpm check` te da los mismos errores de tipos desde la
terminal.

---

## Licencia

GPLv3. Ver [`LICENSE`](./LICENSE).
