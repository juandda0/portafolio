// Versiones para lectores automáticos: Markdown por idioma, llms.txt (formato de llmstxt.org) y sitemap.
// Todo sale del mismo marcado que la página, así que dice lo mismo que ella.
import { parse } from 'ultrahtml';
import { querySelector } from 'ultrahtml/selector';
import { textOf, toMarkdown } from './markdown';
import { pageMarkup } from './reference';
import { builtOn, langs, pagePath, profile, type Lang } from '../data/profile';

const abs = (site: URL, path: string) => new URL(path, site).href;

export function markdownPage(lang: Lang, site: URL) {
  const intro =
    lang === 'es'
      ? `> Versión en Markdown de ${abs(site, '/')} · English version: ${abs(site, '/en/index.md')}`
      : `> Markdown version of ${abs(site, '/en/')} · Versión en español: ${abs(site, '/index.md')}`;
  return toMarkdown(pageMarkup(lang), intro);
}

export function llmsTxt(site: URL) {
  const doc = parse(pageMarkup('en'));
  const text = (selector: string) => textOf(querySelector(doc, selector)!).replace(/\s+/g, ' ').trim();
  return [
    `# ${profile.name}`,
    '',
    `> ${text('.hero-role span')} · ${text('.hero-role .stackline')}. ${text('.hero-lede')}`,
    '',
    `Portfolio in Spanish (${abs(site, '/')}) and English (${abs(site, '/en/')}). Each page has a full Markdown version with the same content.`,
    '',
    '## Portfolio',
    '',
    `- [Portfolio in English (Markdown)](${abs(site, '/en/index.md')}): about, work experience (companies and freelance), personal projects, awards, international talks, skills and contact`,
    `- [Portafolio en español (Markdown)](${abs(site, '/index.md')}): el mismo contenido en español`,
    '',
    '## CV',
    '',
    `- [CV in English (PDF)](${abs(site, '/cv/Juan-Diaz-CV-EN.pdf')})`,
    `- [CV en español (PDF)](${abs(site, '/cv/Juan-Diaz-CV-ES.pdf')})`,
    '',
    '## Contact',
    '',
    `- [Email](mailto:${profile.email}): ${profile.email}`,
    `- [LinkedIn](${profile.linkedin})`,
    `- [GitHub](${profile.github})`,
    '',
  ].join('\n');
}

export function sitemap(site: URL) {
  const alternates = [
    ...langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(site, pagePath(l))}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(site, '/')}"/>`,
  ].join('\n');
  const urls = langs
    .map((l) => `  <url>\n    <loc>${abs(site, pagePath(l))}</loc>\n    <lastmod>${builtOn}</lastmod>\n${alternates}\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}
