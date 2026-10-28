// Prepara los medios del portafolio a partir de los archivos originales de cada proyecto.
// Uso: node scripts/media.mjs  (requiere las carpetas originales en ~/Desktop/Me)
// - Videos: los comprime a H.264 (720p o 540p), audio AAC 64 kbps y faststart, en public/media/.
// - Pósters, fotogramas y capturas: van a src/assets/projects/ para que Astro los optimice (WebP).
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import ffmpeg from 'ffmpeg-static';

const ME = join(homedir(), 'Desktop/Me');
const SONRISA = join(ME, 'freelance/Proyecto odontologia-saas/anuncio-sonrisa/out');
const DINO = join(ME, 'Proyectos personales/PurpleDinosaur/promo/out/purple-dino-trailer.mp4');
const WORKANA = join(ME, 'Cvs/Workana-imagenes');
// Capturas de la UI nueva de CETI y Sonrisa, ya compuestas a 1600×900.
const COMPOSED = join(ME, 'Cvs/portafolio-web/public/img');
const ASSETS = 'src/assets/projects';
const PUBLIC = 'public/media';

const videos = [
  { src: join(SONRISA, 'sonrisa-un-dia-16x9.mp4'), out: 'sonrisa.mp4', scale: '1280:-2', crf: 30, poster: 'sonrisa/poster.jpg', posterAt: '00:00:11' },
  { src: join(ME, 'freelance/Biomech/design/tutorial-atleta/biomech-tutorial-atleta.mp4'), out: 'biomech.mp4', scale: '540:-2', crf: 30, poster: 'biomech/poster.jpg', posterAt: '00:00:01' },
  { src: DINO, out: 'purple-dino.mp4', scale: '1280:-2', crf: 32, poster: 'purple-dino/poster.jpg', posterAt: '00:01:17' },
];

// Fotogramas del tráiler de Purple Dino para la galería.
const frames = [
  { src: DINO, at: '00:00:21', out: 'purple-dino/1-batalla.jpg' },
  { src: DINO, at: '00:01:03', out: 'purple-dino/2-sala.jpg' },
  { src: DINO, at: '00:01:10', out: 'purple-dino/3-unidades.jpg' },
];

const workana = {
  sigcorp: ['1-portada', '3-estadisticas', '2-calendario', '5-detalle'],
  sgo: ['1-portada', '2-proyectos', '5-asistencia', '6-portal-cliente'],
  biomech: ['1-portada', '2-atleta', '3-entrenador'],
};

const composed = {
  ceti: ['ceti-1-portada', 'ceti-2-aprender', 'ceti-3-finanzas', 'ceti-4-actividad'],
  sonrisa: ['sonrisa-1-portada', 'sonrisa-3-agenda', 'sonrisa-4-historia', 'sonrisa-6-finanzas'],
};

const run = (args) => execFileSync(ffmpeg, ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
const ensure = (file) => mkdirSync(dirname(file), { recursive: true });

// Primero las capturas compuestas: se borra la carpeta para no dejar capturas viejas.
for (const [slug, names] of Object.entries(composed)) {
  rmSync(join(ASSETS, slug), { recursive: true, force: true });
  for (const name of names) {
    const dest = join(ASSETS, slug, `${name.replace(`${slug}-`, '')}.webp`);
    ensure(dest);
    copyFileSync(join(COMPOSED, `${name}.webp`), dest);
  }
  console.log('images', slug);
}

for (const v of videos) {
  const out = join(PUBLIC, v.out);
  ensure(out);
  run(['-i', v.src, '-vf', `scale=${v.scale}`, '-c:v', 'libx264', '-preset', 'slow', '-crf', String(v.crf),
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart', out]);
  const poster = join(ASSETS, v.poster);
  ensure(poster);
  run(['-ss', v.posterAt, '-i', v.src, '-frames:v', '1', '-q:v', '2', poster]);
  console.log('video', out);
}

for (const f of frames) {
  const out = join(ASSETS, f.out);
  ensure(out);
  run(['-ss', f.at, '-i', f.src, '-frames:v', '1', '-q:v', '2', out]);
}
console.log('frames purple-dino');

for (const [slug, names] of Object.entries(workana)) {
  for (const name of names) {
    const dest = join(ASSETS, slug, `${name}.jpg`);
    ensure(dest);
    copyFileSync(join(WORKANA, slug, `${name}.jpg`), dest);
  }
  console.log('images', slug);
}
