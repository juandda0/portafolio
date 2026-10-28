# Portafolio · Juan Diego Díaz

Sitio personal hecho con [Astro](https://astro.build) y publicado en Firebase Hosting: https://juandiegodiaz-dev.web.app (`/` en español, `/en/` en inglés).

## Cómo está armado

El diseño y el contenido viven en un solo archivo de referencia, `src/reference/portfolio.html`: es el mismo fragmento que se publica como Artifact, donde se revisa el diseño. Astro lo sirve sin cambiar el diseño y le agrega lo de producción (`src/lib/reference.ts`):

- un idioma por URL: la referencia trae los dos idiomas intercalados y el CSS oculta uno; al compilar se quita el otro del HTML, así quien lo lea sin JavaScript (buscadores, asistentes de IA) recibe texto limpio. El selector ES/EN navega entre `/` y `/en/`;
- fuentes Geist y Geist Mono propias (fontsource), sin Google Fonts;
- capturas optimizadas al compilar: 1600 px para la vista grande y 480 px para las miniaturas;
- rutas absolutas para que `/en/` cargue los mismos archivos;
- metaetiquetas, canonical, hreflang (con `x-default`), Open Graph y JSON-LD (`src/layouts/Base.astro`).

Si la referencia cambia de forma que alguna de esas piezas ya no aparece, el build falla con un mensaje que dice cuál.

## Lectura por buscadores y asistentes de IA

Todo sale del mismo HTML que ve el visitante, así que no puede decir otra cosa:

- `src/lib/structured.ts`: JSON-LD con un `@graph` de `WebSite`, `ProfilePage` y `Person` (mismo `@id` en los dos idiomas), el puesto en Unicórdoba como `EmployeeRole` y los proyectos con repositorio público como `SoftwareSourceCode`. Las habilidades, premios, fechas y proyectos se leen del texto de la página.
- `src/lib/markdown.ts`: versión Markdown completa de cada idioma en `/index.md` y `/en/index.md` (enlazadas con `<link rel="alternate" type="text/markdown">`).
- `src/lib/documents.ts`: `/llms.txt` ([llmstxt.org](https://llmstxt.org)) y `/sitemap.xml` con hreflang.
- `public/robots.txt`: abierto a buscadores y a asistentes de IA, con la línea `Sitemap:`.
- `public/og/`: imagen para compartir de 1200×630 por idioma (`npm run og`).

No hay texto oculto ni instrucciones para IA, y el sitio no publica teléfono ni dirección exacta.

## Comandos

Requiere Node 22.23.4 o superior (ver `.nvmrc`).

| Comando | Qué hace |
| :-- | :-- |
| `npm run sync` | Trae la última versión de la referencia (`~/Desktop/Me/Cvs/portafolio-web`): el HTML y sus capturas WebP |
| `npm run media` | Vuelve a comprimir los videos de los proyectos en `public/media/` desde los archivos originales |
| `npm run og` | Regenera `public/og/og-es.jpg` y `og-en.jpg` (requiere [uv](https://docs.astral.sh/uv/)) |
| `npm run dev` | Servidor local en `localhost:4321` |
| `npm run build` | Genera el sitio en `dist/` |
| `npm run deploy` | Compila y publica en Firebase Hosting |

Para publicar un cambio de diseño o contenido: `npm run sync`, revisar con `npm run dev` y luego `npm run deploy`.

## Otros archivos

- `public/cv/`: CV en PDF que se descargan desde el sitio (versiones web, sin teléfono).
- `public/media/`: videos (H.264, se cargan solo cuando el proyecto está en pantalla).
- `firebase.json`: caché larga para `/_astro/**`, `Content-Type` de `.md` y `llms.txt` (con `X-Robots-Tag: noindex` para que no compitan con el HTML en los buscadores) y cabeceras básicas.
