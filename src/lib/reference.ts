// Adapta el diseño de referencia (src/reference/portfolio.html, el mismo fragmento que se publica
// como Artifact) para servirlo desde Astro sin cambiar su diseño:
// - fuentes Geist propias (fontsource) en lugar de Google Fonts;
// - capturas optimizadas por Astro (1600 px para la vista grande, 480 px para las miniaturas);
// - rutas absolutas, para que /en/ cargue los mismos archivos;
// - idioma inicial fijado por la ruta (/ → español, /en/ → inglés).
// Si la referencia cambia de forma que alguna de estas piezas ya no aparece, el build falla a propósito.
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import type { Lang } from '../data/profile';
import raw from '../reference/portfolio.html?raw';

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.webp', { eager: true });
const byName = new Map(Object.entries(images).map(([path, mod]) => [path.split('/').pop()!, mod.default]));

function expect(text: string, piece: string) {
  if (!text.includes(piece)) throw new Error(`La referencia ya no contiene "${piece}": revisa src/lib/reference.ts`);
}

async function imageUrl(name: string, width: number) {
  const src = byName.get(name);
  if (!src) throw new Error(`Falta la imagen ${name}: ejecuta npm run sync`);
  return (await getImage({ src, width: Math.min(width, src.width), format: 'webp', quality: 82 })).src;
}

async function replaceAsync(text: string, re: RegExp, fn: (...m: string[]) => Promise<string>) {
  const jobs: Promise<string>[] = [];
  text.replace(re, (...m) => (jobs.push(fn(...(m as string[]))), ''));
  const out = await Promise.all(jobs);
  return text.replace(re, () => out.shift()!);
}

export async function loadReference(lang: Lang) {
  for (const piece of ['<style>', '</style>', '<!-- end:head -->', '<script>', '</script>', "var saved = store('jd-lang');"]) {
    expect(raw, piece);
  }

  const css = raw
    .slice(raw.indexOf('<style>') + '<style>'.length, raw.indexOf('</style>'))
    .replaceAll('"Geist Mono"', '"Geist Mono Variable"')
    .replaceAll('"Geist"', '"Geist Variable"');

  let markup = raw.slice(raw.indexOf('<!-- end:head -->') + '<!-- end:head -->'.length, raw.lastIndexOf('<script>'));
  // Miniaturas de las galerías: versión pequeña.
  markup = await replaceAsync(markup, /<div class="g-thumbs">[\s\S]*?<\/div>/g, (block) =>
    replaceAsync(block, /<img src="img\/([\w.-]+\.webp)"/g, async (_m, name) => `<img src="${await imageUrl(name, 480)}"`),
  );
  // Resto de capturas (vista principal, data-src para el visor): versión grande.
  markup = await replaceAsync(markup, /"img\/([\w.-]+\.webp)"/g, async (_m, name) => `"${await imageUrl(name, 1600)}"`);
  markup = markup.replaceAll('"media/', '"/media/');

  const forced = lang === 'en' ? "'en'" : 'null';
  const script = raw
    .slice(raw.lastIndexOf('<script>') + '<script>'.length, raw.lastIndexOf('</script>'))
    .replace("var saved = store('jd-lang');", `var saved = ${forced} || store('jd-lang');`)
    .replaceAll("'media/", "'/media/");

  const ogImage = await imageUrl('sigcorp-1-portada.webp', 1200);
  return { css, markup, script, ogImage };
}
