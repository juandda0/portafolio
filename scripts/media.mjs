// Prepara los medios del portafolio a partir de los archivos originales de cada proyecto.
// Uso: node scripts/media.mjs  (requiere las carpetas originales en ~/Desktop/Me)
// - Videos: los comprime a H.264 (720p o 540p), audio AAC 64 kbps y faststart, en public/media/.
// - Pósters y capturas: los copia a src/assets/projects/ para que Astro los optimice (AVIF/WebP).
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import ffmpeg from 'ffmpeg-static';

const ME = join(homedir(), 'Desktop/Me');
const SONRISA = join(ME, 'freelance/Proyecto odontologia-saas/anuncio-sonrisa/out');
const WORKANA = join(ME, 'Cvs/Workana-imagenes');
const ASSETS = 'src/assets/projects';
const PUBLIC = 'public/media';

const videos = [
  { src: join(SONRISA, 'sonrisa-un-dia-16x9.mp4'), out: 'sonrisa.mp4', scale: '1280:-2', poster: 'sonrisa/poster.jpg', posterAt: '00:00:11' },
  { src: join(ME, 'freelance/Biomech/design/tutorial-atleta/biomech-tutorial-atleta.mp4'), out: 'biomech.mp4', scale: '540:-2', poster: 'biomech/poster.jpg', posterAt: '00:00:01' },
];

const images = {
  sigcorp: ['1-portada', '3-estadisticas', '2-calendario', '5-detalle'],
  sgo: ['1-portada', '2-proyectos', '5-asistencia', '6-portal-cliente'],
  ceti: ['1-portada', '2-aprendizaje', '3-finanzas'],
  biomech: ['1-portada', '2-atleta', '3-entrenador'],
};

const run = (args) => execFileSync(ffmpeg, ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
const ensure = (file) => mkdirSync(dirname(file), { recursive: true });

for (const v of videos) {
  const out = join(PUBLIC, v.out);
  ensure(out);
  run(['-i', v.src, '-vf', `scale=${v.scale}`, '-c:v', 'libx264', '-preset', 'slow', '-crf', '30',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart', out]);
  const poster = join(ASSETS, v.poster);
  ensure(poster);
  run(['-ss', v.posterAt, '-i', v.src, '-frames:v', '1', '-q:v', '2', poster]);
  console.log('video', out);
}

for (const [slug, names] of Object.entries(images)) {
  for (const name of names) {
    const dest = join(ASSETS, slug, `${name}.jpg`);
    ensure(dest);
    copyFileSync(join(WORKANA, slug, `${name}.jpg`), dest);
  }
  console.log('images', slug);
}

for (const still of ['still-640', 'still-1540', 'still-1960']) {
  const dest = join(ASSETS, 'sonrisa', `${still}.png`);
  copyFileSync(join(SONRISA, `${still}.png`), dest);
}
console.log('images sonrisa');
