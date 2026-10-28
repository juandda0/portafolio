# Portafolio · Juan Diego Díaz

Sitio personal estático hecho con [Astro](https://astro.build), en español (`/`) e inglés (`/en/`). No usa frameworks de UI; el único JavaScript es un script pequeño para los videos, el visor de imágenes y el botón de copiar correo.

## Comandos

Requiere Node 22.23.4 o superior (ver `.nvmrc`).

| Comando | Qué hace |
| :-- | :-- |
| `npm install` | Instala las dependencias |
| `npm run dev` | Servidor local en `localhost:4321` |
| `npm run build` | Genera el sitio en `dist/` |
| `npm run preview` | Sirve la build de `dist/` |
| `node scripts/media.mjs` | Vuelve a generar videos, pósters y capturas desde las carpetas originales de cada proyecto |

## Dónde se edita cada cosa

- `src/data/content.ts`: textos de todas las secciones, experiencia, premios y ponencias (ES y EN).
- `src/data/projects.ts`: proyectos, sus imágenes y videos.
- `src/data/profile.ts`: correo, LinkedIn, GitHub, Workana y CV.
- `src/styles/global.css`: colores (modo claro y oscuro), tipografía y espaciado.
- `public/cv/`: CV en PDF que se descargan desde el sitio.

Las capturas en `src/assets/projects/` se optimizan al compilar (WebP y varios tamaños). Los videos de `public/media/` ya están comprimidos (H.264, ~1,4 MB cada uno) y solo se descargan cuando entran en pantalla.

## Publicar

Es un sitio estático: sirve en Vercel, Netlify, Cloudflare Pages o GitHub Pages sin configuración extra (comando `npm run build`, carpeta `dist`). Cuando tengas el dominio, agrégalo como `site` en `astro.config.mjs` para generar las etiquetas canonical y hreflang.
