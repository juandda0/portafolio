// Genera public/og/og-es.jpg y og-en.jpg (1200×630): imagen para compartir el enlace en LinkedIn,
// WhatsApp, Slack, etc. El SVG lo arma scripts/og-image.py; aquí se pasa a JPEG.
// Requiere uv (https://docs.astral.sh/uv/). Uso: npm run og
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

mkdirSync('public/og', { recursive: true });
for (const lang of ['es', 'en']) {
  const svg = execFileSync('uv', ['run', '-q', '--with', 'fonttools', '--with', 'brotli', 'scripts/og-image.py', lang], {
    maxBuffer: 32 * 1024 * 1024,
  });
  await sharp(svg).jpeg({ quality: 88, mozjpeg: true }).toFile(`public/og/og-${lang}.jpg`);
  console.log(`public/og/og-${lang}.jpg`);
}
