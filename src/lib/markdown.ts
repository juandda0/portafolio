// Convierte el marcado de la página (ya en un solo idioma) a Markdown para /index.md y /en/index.md.
// Sale del mismo HTML que ve el visitante, así que no puede decir nada distinto. Se omiten los
// controles (botones, menú, iconos) y las imágenes; el texto de "Leer más" y de todos los slides va completo.
import { parse, ELEMENT_NODE, TEXT_NODE, type Node } from 'ultrahtml';

const SKIP = new Set(['svg', 'script', 'style', 'template', 'button', 'img', 'video', 'source', 'picture', 'nav']);
const SKIP_CLASS = /\b(top|path|term-bar|car-bar|g-cap|lb|lightbox|n)\b/;
const BLOCK = new Set([
  'section', 'article', 'div', 'header', 'main', 'footer', 'aside', 'figure', 'ul', 'ol', 'dl',
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'blockquote', 'li', 'dt', 'dd', 'table', 'details', 'summary',
]);

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', mdash: '—', ndash: '–', middot: '·', hellip: '…' };
const decode = (s: string) =>
  s.replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e: string) =>
    e[0] === '#' ? String.fromCodePoint(parseInt(e[1].toLowerCase() === 'x' ? e.slice(2) : e.slice(1), e[1].toLowerCase() === 'x' ? 16 : 10)) : ENTITIES[e] ?? m,
  );
const squash = (s: string) => s.replace(/\s+/g, ' ').trim();

const skipped = (n: Node) =>
  SKIP.has(n.name) || n.attributes['aria-hidden'] === 'true' || 'hidden' in n.attributes || SKIP_CLASS.test(n.attributes.class ?? '');

export function textOf(n: Node): string {
  if (n.type === TEXT_NODE) return decode(n.value);
  if (n.type !== ELEMENT_NODE || skipped(n)) return '';
  return n.children.map(textOf).join('');
}

function inline(n: Node): string {
  if (n.type === TEXT_NODE) return decode(n.value);
  if (n.type !== ELEMENT_NODE || skipped(n)) return '';
  if (n.name === 'br') return ' ';
  // Elementos vecinos sin espacio entre sí (p. ej. dos <span> que el CSS separa) se leen separados.
  let inner = '';
  let prevElement = false;
  for (const c of n.children) {
    const t = inline(c);
    if (!t) continue;
    if (c.type === ELEMENT_NODE && prevElement && !/\s$/.test(inner) && !/^\s/.test(t)) inner += ' ';
    inner += t;
    prevElement = c.type === ELEMENT_NODE;
  }
  const text = squash(inner);
  if (!text) return '';
  switch (n.name) {
    case 'a': {
      const href = n.attributes.href ?? '';
      return href && !href.startsWith('#') ? `[${text}](${href})` : text;
    }
    case 'strong':
    case 'b':
      return `**${text}**`;
    case 'em':
    case 'i':
      return `*${text}*`;
    case 'code':
      return `\`${text}\``;
    default:
      // Rótulo de una línea como "Stack", "IA" o "También".
      return /\blbl\b/.test(n.attributes.class ?? '') ? `**${text}:** ` : inner;
  }
}

const isBlock = (n: Node) => n.type === ELEMENT_NODE && BLOCK.has(n.name);

function blocks(n: Node, out: string[]) {
  if (n.type !== ELEMENT_NODE && n.type !== 0) return;
  if (n.type === ELEMENT_NODE && skipped(n)) return;
  const name = n.type === ELEMENT_NODE ? n.name : '';
  const heading = /^h([1-6])$/.exec(name);
  if (heading) return void out.push(`${'#'.repeat(+heading[1])} ${squash(inline(n))}`);
  // Nombre de cada frente dentro de un puesto (SIGCORP, E-commerce, Migración).
  if (n.type === ELEMENT_NODE && /\bresp-label\b/.test(n.attributes.class ?? '')) return void out.push(`##### ${squash(inline(n))}`);
  if (name === 'p' || name === 'summary' || name === 'blockquote') {
    const t = squash(inline(n));
    if (t) out.push(name === 'blockquote' ? `> ${t}` : t);
    return;
  }
  if (name === 'pre') return void out.push('```json\n' + textOf(n).replace(/^\n+|\s+$/g, '') + '\n```');
  if (name === 'ul' || name === 'ol') {
    const lis = n.children.filter((c) => c.type === ELEMENT_NODE && c.name === 'li');
    // Listas de tarjetas (con títulos y párrafos dentro): cada elemento se lee como su propio bloque.
    if (lis.some((li) => li.children.some(isBlock))) return void lis.forEach((li) => blocks(li, out));
    const items = lis.map((li) => squash(inline(li))).filter(Boolean);
    if (!items.length) return;
    // Las pastillas de tecnologías se leen mejor en una sola línea.
    if (/\bchips\b/.test(n.attributes.class ?? '')) {
      const label = n.attributes['aria-label'];
      return void out.push((label ? `**${label}:** ` : '') + items.join(', '));
    }
    out.push(items.map((t, i) => (name === 'ol' ? `${i + 1}. ` : '- ') + t).join('\n'));
    return;
  }
  if (name === 'dl') {
    const rows: string[] = [];
    const visit = (c: Node) => {
      if (c.type !== ELEMENT_NODE) return;
      if (c.name === 'div') return c.children.forEach(visit);
      const t = squash(inline(c));
      if (!t) return;
      if (c.name === 'dt') rows.push(`- **${t}:**`);
      else if (c.name === 'dd') rows.length ? (rows[rows.length - 1] += ` ${t}`) : rows.push(`- ${t}`);
    };
    n.children.forEach(visit);
    if (rows.length) out.push(rows.join('\n'));
    return;
  }
  // Contenedor: el texto suelto entre bloques forma párrafos.
  let run = '';
  const flush = () => {
    const t = squash(run);
    if (t) out.push(t);
    run = '';
  };
  for (const c of n.children) {
    if (isBlock(c)) {
      flush();
      blocks(c, out);
    } else {
      const t = inline(c);
      if (t && c.type === ELEMENT_NODE && run && !/\s$/.test(run)) run += ' ';
      run += t;
    }
  }
  flush();
}

export function toMarkdown(html: string, intro: string) {
  const out: string[] = [];
  blocks(parse(html), out);
  return `${intro}\n\n${out.join('\n\n')}\n`;
}
