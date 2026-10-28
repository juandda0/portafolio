// JSON-LD (@graph con WebSite, ProfilePage y Person) sacado del texto visible de cada idioma, para que
// los datos estructurados no digan nada que la página no muestre. Si cambia la estructura de la
// referencia y falta alguna pieza, el build falla.
import { parse, type Node } from 'ultrahtml';
import { querySelector, querySelectorAll } from 'ultrahtml/selector';
import { textOf } from './markdown';
import { pageMarkup } from './reference';
import { profile, type Lang } from '../data/profile';

const MONTHS: Record<string, string> = {
  ene: '01', jan: '01', feb: '02', mar: '03', abr: '04', apr: '04', may: '05', jun: '06',
  jul: '07', ago: '08', aug: '08', sep: '09', oct: '10', nov: '11', dic: '12', dec: '12',
};

const text = (n: Node) => textOf(n).replace(/\s+/g, ' ').trim();

function one(root: Node, selector: string) {
  const n = querySelector(root, selector);
  if (!n) throw new Error(`La referencia ya no tiene "${selector}": revisa src/lib/structured.ts`);
  return n;
}

function monthYear(s: string) {
  const m = /([a-z]{3})[a-z]*\.?\s+(\d{4})/i.exec(s);
  const month = m && MONTHS[m[1].toLowerCase()];
  if (!month) throw new Error(`Fecha que no se entiende: "${s}"`);
  return `${m[2]}-${month}`;
}

interface Page {
  site: URL;
  url: string;
  title: string;
  description: string;
  image: string;
  dateModified: string;
}

export function structuredData(lang: Lang, page: Page) {
  const doc = parse(pageMarkup(lang));
  const home = new URL('/', page.site).href;
  const personId = `${home}#person`;
  const es = lang === 'es';

  const job = one(doc, '#empresas .job');
  const [startDate, endDate] = text(one(job, '.period')).split('–').map(monthYear);

  const projects = querySelectorAll(doc, '#proyectos-personales article').flatMap((a) => {
    const repo = querySelectorAll(a, 'a').find((l) => /^https:\/\/github\.com\/juandda0\/[\w.-]+$/.test(l.attributes.href ?? ''));
    if (!repo) return [];
    return [{
      '@type': 'SoftwareSourceCode',
      name: text(one(a, 'h3')),
      description: text(one(a, '.lede')),
      codeRepository: repo.attributes.href,
      keywords: querySelectorAll(a, '.chips li').map(text).join(', '),
      author: { '@id': personId },
    }];
  });

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    jobTitle: text(one(doc, '.hero-role span')),
    description: text(one(doc, '.hero-lede')),
    url: home,
    image: page.image,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Montería', addressRegion: 'Córdoba', addressCountry: 'CO' },
    knowsAbout: querySelectorAll(one(doc, '#habilidades'), 'li').map(text),
    knowsLanguage: [
      { '@type': 'Language', name: es ? 'Español' : 'Spanish', alternateName: 'es' },
      { '@type': 'Language', name: es ? 'Inglés' : 'English', alternateName: 'en' },
    ],
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad de Córdoba' },
    worksFor: {
      '@type': 'EmployeeRole',
      roleName: text(one(job, '.job-role')),
      startDate,
      endDate,
      worksFor: { '@type': 'CollegeOrUniversity', name: text(one(job, 'h4')) },
    },
    // "Premio (organizador · proyecto)", con el texto del <h3> y su <small>.
    award: querySelectorAll(one(doc, '#premios'), 'h3').map((h3) => {
      const small = querySelector(h3, 'small');
      const detail = small ? text(small) : '';
      return detail ? `${text(h3).replace(detail, '').trim()} (${detail})` : text(h3);
    }),
    subjectOf: {
      '@type': 'DigitalDocument',
      name: es ? 'CV (PDF)' : 'Résumé (PDF)',
      url: new URL(`/cv/Juan-Diaz-CV-${es ? 'ES' : 'EN'}.pdf`, page.site).href,
      encodingFormat: 'application/pdf',
      inLanguage: lang,
    },
    sameAs: [profile.linkedin, profile.github],
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${home}#website`,
        url: home,
        name: profile.name,
        inLanguage: ['es', 'en'],
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${page.url}#profilepage`,
        url: page.url,
        name: page.title,
        description: page.description,
        inLanguage: lang,
        isPartOf: { '@id': `${home}#website` },
        dateModified: page.dateModified,
        mainEntity: { '@id': personId },
      },
      person,
      ...projects,
    ],
  };
}
