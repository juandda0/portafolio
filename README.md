# Portafolio · Juan Diego Díaz

Sitio personal hecho con [Astro](https://astro.build) y publicado en Firebase Hosting: https://juandiegodiaz-dev.web.app (`/` en español, `/en/` en inglés).

## Cómo está armado

El diseño y el contenido viven en un solo archivo de referencia, `src/reference/portfolio.html`: es el mismo fragmento que se publica como Artifact, donde se revisa el diseño. Astro lo sirve sin cambiar el diseño y le agrega lo de producción (`src/lib/reference.ts`):

- fuentes Geist y Geist Mono propias (fontsource), sin Google Fonts;
- capturas optimizadas al compilar: 1600 px para la vista grande y 480 px para las miniaturas;
- rutas absolutas para que `/en/` cargue los mismos archivos, e idioma inicial según la ruta;
- metaetiquetas, canonical, hreflang, Open Graph y JSON-LD (`src/layouts/Base.astro`).

Si la referencia cambia de forma que alguna de esas piezas ya no aparece, el build falla con un mensaje que dice cuál.

## Comandos

Requiere Node 22.23.4 o superior (ver `.nvmrc`).

| Comando | Qué hace |
| :-- | :-- |
| `npm run sync` | Trae la última versión de la referencia (`~/Desktop/Me/Cvs/portafolio-web`): el HTML y sus capturas WebP |
| `npm run media` | Vuelve a comprimir los videos de los proyectos en `public/media/` desde los archivos originales |
| `npm run dev` | Servidor local en `localhost:4321` |
| `npm run build` | Genera el sitio en `dist/` |
| `npm run deploy` | Compila y publica en Firebase Hosting |

Para publicar un cambio de diseño o contenido: `npm run sync`, revisar con `npm run dev` y luego `npm run deploy`.

## Otros archivos

- `public/cv/`: CV en PDF que se descargan desde el sitio.
- `public/media/`: videos (H.264, se cargan solo cuando el proyecto está en pantalla).
- `firebase.json`: caché larga para `/_astro/**` y cabeceras básicas.
