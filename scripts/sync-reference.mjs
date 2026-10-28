// Trae el diseño de referencia (el Artifact que mantiene la sesión de diseño) al proyecto.
// Uso: npm run sync  →  luego npm run build y desplegar.
// - Copia el fragmento HTML (estilos, marcado y script) a src/reference/portfolio.html.
// - Copia sus capturas WebP a src/assets/img/, de donde Astro genera las versiones optimizadas.
import { copyFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const REFERENCE = join(homedir(), 'Desktop/Me/Cvs/portafolio-web');
const IMG = 'src/assets/img';

mkdirSync('src/reference', { recursive: true });
copyFileSync(join(REFERENCE, 'src/index.html'), 'src/reference/portfolio.html');
console.log('src/reference/portfolio.html');

rmSync(IMG, { recursive: true, force: true });
mkdirSync(IMG, { recursive: true });
const images = readdirSync(join(REFERENCE, 'public/img')).filter((f) => f.endsWith('.webp'));
for (const file of images) copyFileSync(join(REFERENCE, 'public/img', file), join(IMG, file));
console.log(`${images.length} imágenes en ${IMG}`);
