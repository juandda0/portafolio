// Datos para las metaetiquetas, el JSON-LD, llms.txt y el sitemap; el contenido visible viene de
// src/reference/portfolio.html.
export const profile = {
  name: 'Juan Diego Díaz Avendaño',
  email: 'juandiegodiazave@gmail.com',
  linkedin: 'https://www.linkedin.com/in/juandiegodiaz-dev',
  github: 'https://github.com/juandda0',
} as const;

export type Lang = 'es' | 'en';

export const langs: Lang[] = ['es', 'en'];

export const pagePath = (lang: Lang) => (lang === 'es' ? '/' : '/en/');

export const pageMeta = {
  es: {
    title: 'Juan Diego Díaz Avendaño · Desarrollador Full-Stack',
    description: 'Juan Diego Díaz Avendaño, desarrollador full-stack (Java, Spring Boot, React, React Native). Montería, Colombia. Remoto.',
    ogAlt: 'Juan Diego Díaz Avendaño, desarrollador full-stack: Java, Spring Boot, React, React Native',
  },
  en: {
    title: 'Juan Diego Díaz Avendaño · Full-Stack Developer',
    description: 'Juan Diego Díaz Avendaño, full-stack developer (Java, Spring Boot, React, React Native). Montería, Colombia. Remote.',
    ogAlt: 'Juan Diego Díaz Avendaño, full-stack developer: Java, Spring Boot, React, React Native',
  },
} as const;

// Fecha de este build (dateModified en el JSON-LD y lastmod en el sitemap).
export const builtOn = new Date().toISOString().slice(0, 10);
