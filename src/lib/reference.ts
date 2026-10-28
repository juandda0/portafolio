// Adapta el diseño de referencia (src/reference/portfolio.html, el mismo fragmento que se publica
// como Artifact) para servirlo desde Astro sin cambiar su diseño:
// - un idioma por URL: / solo lleva el español y /en/ solo el inglés (la referencia trae los dos
//   intercalados y el CSS oculta uno; aquí se quita el otro del HTML para que quien lo lea sin JS
//   reciba texto limpio), y el selector ES/EN navega entre las dos URL;
// - fuentes Geist propias (fontsource) en lugar de Google Fonts;
// - capturas optimizadas por Astro (1600 px para la vista grande, 480 px para las miniaturas);
// - rutas absolutas, para que /en/ cargue los mismos archivos.
// Si la referencia cambia de forma que alguna de estas piezas ya no aparece, el build falla a propósito.
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { parse, walkSync, ELEMENT_NODE } from 'ultrahtml';
import type { Lang } from '../data/profile';
import raw from '../reference/portfolio.html?raw';

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.webp', { eager: true });
const byName = new Map(Object.entries(images).map(([path, mod]) => [path.split('/').pop()!, mod.default]));

const LANG_CLICK = "b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang')); store('jd-lang', lang); });";

function expect(text: string, piece: string) {
  if (!text.includes(piece)) throw new Error(`La referencia ya no contiene "${piece}": revisa src/lib/reference.ts`);
}

export async function imageUrl(name: string, width: number) {
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

// Quita del HTML los elementos (y los atributos data-es/data-en) del otro idioma. Se recorta sobre el
// texto original con las posiciones del parser, así el resto del HTML queda byte a byte igual.
function keepLanguage(html: string, lang: Lang) {
  const other = lang === 'es' ? 'en' : 'es';
  const cuts: [number, number][] = [];
  walkSync(parse(html), (n) => {
    if (n.type !== ELEMENT_NODE || n.attributes.lang !== other) return;
    let start = n.loc[0].start;
    let end = (n.loc[1] ?? n.loc[0]).end;
    // Si el elemento ocupa su propia línea, se va la línea entera.
    const lineStart = html.lastIndexOf('\n', start - 1);
    const lineEnd = html.indexOf('\n', end);
    if (!html.slice(lineStart + 1, start).trim() && !html.slice(end, lineEnd).trim()) [start, end] = [lineStart, lineEnd];
    cuts.push([start, end]);
  });
  cuts.sort((a, b) => a[0] - b[0]);
  let out = '';
  let pos = 0;
  for (const [start, end] of cuts) {
    if (start < pos) continue; // anidado dentro de un recorte anterior
    out += html.slice(pos, start);
    pos = end;
  }
  out += html.slice(pos);
  return out.replace(new RegExp(` data-${other}="[^"]*"`, 'g'), '');
}

// Marcado de la página en un solo idioma, antes de optimizar imágenes (lo usan también las
// versiones Markdown y los datos estructurados).
export function pageMarkup(lang: Lang) {
  for (const piece of ['<style>', '</style>', '<!-- end:head -->', '<script>', '</script>', "var saved = store('jd-lang');", LANG_CLICK]) {
    expect(raw, piece);
  }
  const markup = raw.slice(raw.indexOf('<!-- end:head -->') + '<!-- end:head -->'.length, raw.lastIndexOf('<script>'));
  return keepLanguage(markup, lang);
}

export async function loadReference(lang: Lang) {
  const css = raw
    .slice(raw.indexOf('<style>') + '<style>'.length, raw.indexOf('</style>'))
    .replaceAll('"Geist Mono"', '"Geist Mono Variable"')
    .replaceAll('"Geist"', '"Geist Variable"');

  let markup = pageMarkup(lang);
  // Miniaturas de las galerías: versión pequeña.
  markup = await replaceAsync(markup, /<div class="g-thumbs">[\s\S]*?<\/div>/g, (block) =>
    replaceAsync(block, /<img src="img\/([\w.-]+\.webp)"/g, async (_m, name) => `<img src="${await imageUrl(name, 480)}"`),
  );
  // Resto de capturas (vista principal, data-src para el visor): versión grande.
  markup = await replaceAsync(markup, /"img\/([\w.-]+\.webp)"/g, async (_m, name) => `"${await imageUrl(name, 1600)}"`);
  markup = markup.replaceAll('"media/', '"/media/');

  // El idioma lo fija la URL; el selector guarda la preferencia y navega a la otra versión.
  const script = raw
    .slice(raw.lastIndexOf('<script>') + '<script>'.length, raw.lastIndexOf('</script>'))
    .replace("var saved = store('jd-lang');", `var saved = '${lang}';`)
    .replace(
      LANG_CLICK,
      "b.addEventListener('click', function () { var to = b.getAttribute('data-set-lang'); store('jd-lang', to); if (to !== lang) location.href = (to === 'en' ? '/en/' : '/') + location.hash; });",
    )
    .replaceAll("'media/", "'/media/");

  return { css, markup, script };
}
