// Comprime los videos de los proyectos para la web a partir de los archivos originales.
// Uso: npm run media  (requiere las carpetas originales en ~/Desktop/Me)
// H.264 a 720p (540p el vertical), audio AAC 64 kbps y faststart, en public/media/.
// Las capturas y los pósters vienen del diseño de referencia: ver scripts/sync-reference.mjs.
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import ffmpeg from 'ffmpeg-static';

const ME = join(homedir(), 'Desktop/Me');
const MEDIA = 'public/media';

const videos = [
  { src: 'freelance/Proyecto odontologia-saas/anuncio-sonrisa/out/sonrisa-un-dia-16x9.mp4', out: 'sonrisa.mp4', scale: '1280:-2', crf: 30 },
  { src: 'freelance/Biomech/design/tutorial-atleta/biomech-tutorial-atleta.mp4', out: 'biomech.mp4', scale: '540:-2', crf: 30 },
  { src: 'Proyectos personales/PurpleDinosaur/promo/out/purple-dino-trailer.mp4', out: 'purple-dino.mp4', scale: '1280:-2', crf: 32 },
];

mkdirSync(MEDIA, { recursive: true });
for (const v of videos) {
  execFileSync(ffmpeg, ['-v', 'error', '-y', '-i', join(ME, v.src), '-vf', `scale=${v.scale}`, '-c:v', 'libx264',
    '-preset', 'slow', '-crf', String(v.crf), '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '64k',
    '-movflags', '+faststart', join(MEDIA, v.out)], { stdio: 'inherit' });
  console.log('video', v.out);
}
