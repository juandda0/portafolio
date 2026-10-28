import type { Lang } from './profile';

export interface Job {
  role: string;
  org: string;
  place: string;
  period: string;
  points: string[];
  stack: string[];
}

export interface Award {
  year: string;
  title: string;
  org: string;
  detail: string;
  links: { label: string; href: string }[];
}

interface Content {
  meta: { title: string; description: string };
  nav: { experience: string; projects: string; awards: string; contact: string };
  hero: {
    eyebrow: string;
    title: string;
    pitch: string;
    available: string;
    cv: string;
    stats: { value: string; label: string }[];
  };
  experience: { title: string; work: string; freelance: string; jobs: Job[]; gigs: Job[] };
  projects: { title: string; intro: string; role: string; stack: string; open: string; close: string; sound: string };
  awards: { title: string; prizes: string; talks: string; items: Award[]; talksItems: Award[] };
  education: { title: string; degree: string; school: string; detail: string };
  contact: { title: string; text: string; copy: string; copied: string };
  footer: string;
  switchLang: { label: string; href: string };
}

const unicordobaNews =
  'https://unicordoba.edu.co/blog/estudiantes-de-unicordoba-crean-plataforma-para-ensenar-educacion-financiera-a-los-jovenes/';

export const content: Record<Lang, Content> = {
  es: {
    meta: {
      title: 'Juan Diego Díaz · Desarrollador backend y mobile',
      description:
        'Desarrollador backend (Java, Spring Boot) y mobile (React Native) en Montería, Colombia. Experiencia, proyectos en producción, premios y contacto.',
    },
    nav: { experience: 'Experiencia', projects: 'Proyectos', awards: 'Logros', contact: 'Contacto' },
    hero: {
      eyebrow: 'Desarrollador backend y mobile · Montería, Colombia',
      title: 'Construyo backends sólidos y apps que la gente usa.',
      pitch:
        'Trabajo con Java y Spring Boot en el backend y React Native en mobile. He llevado cinco productos reales —para una universidad, una empresa de demoliciones, un consultorio odontológico y dos startups— desde los requisitos hasta el despliegue.',
      available: 'Disponible para trabajo remoto',
      cv: 'Descargar CV',
      stats: [
        { value: '3', label: 'años de experiencia' },
        { value: '5', label: 'productos en uso' },
        { value: '3', label: 'premios en 2025' },
      ],
    },
    experience: {
      title: 'Experiencia',
      work: 'Empleo',
      freelance: 'Freelance',
      jobs: [
        {
          role: 'Desarrollador full-stack (enfoque backend)',
          org: 'Universidad de Córdoba',
          place: 'Montería · remoto',
          period: 'ago 2025 — jun 2026',
          points: [
            'Construí SIGCORP de punta a punta: la plataforma de solicitudes que usan 17 funcionarios para procesar unas 40 solicitudes al día.',
            'Diseñé la seguridad y la persistencia con Spring Security, JWT, JPA/Hibernate y Flyway, con bloqueo optimista en flujos concurrentes.',
            'Integré pagos Wompi con confirmación por webhooks y un microservicio de notificaciones en Node.js para el e-commerce institucional.',
            'Contenericé y desplegué con Docker y Nginx; participé en la migración de unas 200 páginas del sitio web.',
          ],
          stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Node.js', 'Docker', 'Nginx', 'Scrum'],
        },
      ],
      gigs: [
        {
          role: 'Backend y líder técnico',
          org: 'Sonrisa — SaaS odontológico',
          place: 'Remoto',
          period: 'ago 2026 — oct 2026',
          points: [
            'Backend en Java 21 / Spring Boot y PostgreSQL: pacientes, citas, historia clínica con firma electrónica, odontograma, planes y pagos.',
            'Lideré un equipo de tres: requisitos con la clienta, arquitectura, revisión de código y despliegue en Railway y Vercel.',
          ],
          stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'React', 'Docker'],
        },
        {
          role: 'Desarrollador full-stack',
          org: 'SGO — ESCAMVIOS S.A.S.',
          place: 'Remoto',
          period: 'may 2026 — jun 2026',
          points: [
            'Reemplacé un flujo de transporte en Excel por una aplicación web; migré más de 550 registros y construí dashboards con KPIs.',
          ],
          stack: ['React', 'TypeScript', 'Firebase'],
        },
        {
          role: 'Desarrollador full-stack mobile',
          org: 'CETI — Educación financiera con IA',
          place: 'Remoto',
          period: 'abr 2025 — sep 2025',
          points: [
            'App móvil y web con lecciones gamificadas y un flujo de IA que convierte texto y voz en acciones, con pruebas automatizadas de punta a punta.',
          ],
          stack: ['React Native', 'Expo', 'Firebase', 'IA'],
        },
        {
          role: 'Desarrollador full-stack mobile',
          org: 'Biomech — SaaS B2B de fitness',
          place: 'Remoto',
          period: 'may 2023 — jun 2025',
          points: [
            'App de dos lados publicada en App Store, con más de 30 Cloud Functions, pagos con Wompi y suscripciones con RevenueCat.',
          ],
          stack: ['React Native', 'Expo', 'Firebase', 'RevenueCat'],
        },
      ],
    },
    projects: {
      title: 'Proyectos',
      intro: 'Productos reales en los que trabajé, con capturas y videos de cada uno.',
      role: 'Rol',
      stack: 'Stack',
      open: 'Ampliar imagen',
      close: 'Cerrar',
      sound: 'Ver con sonido',
    },
    awards: {
      title: 'Logros',
      prizes: 'Premios',
      talks: 'Ponencias internacionales',
      items: [
        {
          year: '2025',
          title: 'Ganador · TechU Montería 2025',
          org: 'Alcaldía de Montería',
          detail: 'Unimarket, marketplace universitario con moneda digital propia. Fui el CTO. Uno de los 5 ganadores entre 72 propuestas.',
          links: [
            { label: 'Publicación', href: 'https://www.instagram.com/unicordoba_colombia/p/DKSEd_vt3i4/' },
            { label: 'Prensa', href: 'https://www.chicanoticias.com/2025/05/30/estudiantes-de-unicordoba-ganan-en-techu-2025-con-proyectos-que-impactan/' },
          ],
        },
        {
          year: '2025',
          title: '1.er lugar · Hackathon de Ingeniería de Sistemas',
          org: 'Universidad de Córdoba',
          detail: 'AulaLink, sistema de control de asistencia: backend en Express y TypeScript, web en Tailwind y app en Flutter.',
          links: [{ label: 'Publicación', href: 'https://www.instagram.com/p/DKDFZtpS4Vh/' }],
        },
        {
          year: '2025',
          title: 'Ganador · Feria de Innovación',
          org: 'Universidad de Córdoba',
          detail: 'Unimarket, como CTO del equipo del Semillero Innovarium.',
          links: [
            { label: 'Publicación', href: 'https://www.instagram.com/unicordoba_colombia/p/DKDdG7IyBaH/' },
            { label: 'Prensa', href: 'https://www.chicanoticias.com/2025/05/24/brillan-tecnologico-estudiantes/' },
          ],
        },
      ],
      talksItems: [
        {
          year: '2026',
          title: 'LUMIO: gestión y educación financiera automatizada',
          org: 'Congreso CIIDIES–COPEIN–RIISS · Celaya, México',
          detail: 'Autor principal.',
          links: [{ label: 'Programa', href: 'https://www.riiss-global.org/congreso-mexico-2026/' }],
        },
        {
          year: '2026',
          title: 'CETI: plataforma de educación financiera',
          org: 'Emprende Innova UG · Celaya, México',
          detail: 'Coautor.',
          links: [{ label: 'Noticia', href: unicordobaNews }],
        },
        {
          year: '2025',
          title: 'UNIMARKET',
          org: 'CITAE 2025 · REDIIE, Santiago de Chile',
          detail: 'Coautor.',
          links: [{ label: 'Certificado', href: 'https://rediie.cl/wp-content/uploads/Bru-y-otros_CITAE_2025.pdf' }],
        },
      ],
    },
    education: {
      title: 'Educación',
      degree: 'Ingeniería de Sistemas',
      school: 'Universidad de Córdoba',
      detail: '7.º semestre · graduación estimada 2027 · Semillero de Investigación Innovarium',
    },
    contact: {
      title: '¿Trabajamos juntos?',
      text: 'Busco trabajo remoto como desarrollador backend, mobile o full-stack, y proyectos freelance. Escríbeme y te respondo pronto.',
      copy: 'Copiar correo',
      copied: 'Copiado',
    },
    footer: 'Hecho con Astro · ver el código',
    switchLang: { label: 'EN', href: '/en/' },
  },
  en: {
    meta: {
      title: 'Juan Diego Díaz · Backend & mobile developer',
      description:
        'Backend (Java, Spring Boot) and mobile (React Native) developer based in Colombia. Experience, shipped products, awards and contact.',
    },
    nav: { experience: 'Experience', projects: 'Projects', awards: 'Awards', contact: 'Contact' },
    hero: {
      eyebrow: 'Backend & mobile developer · Montería, Colombia',
      title: 'I build solid backends and apps people actually use.',
      pitch:
        'I work with Java and Spring Boot on the backend and React Native on mobile. I have taken five real products —for a university, a demolition company, a dental clinic and two startups— from requirements to deployment.',
      available: 'Available for remote work',
      cv: 'Download CV',
      stats: [
        { value: '3', label: 'years of experience' },
        { value: '5', label: 'products in use' },
        { value: '3', label: 'awards in 2025' },
      ],
    },
    experience: {
      title: 'Experience',
      work: 'Employment',
      freelance: 'Freelance',
      jobs: [
        {
          role: 'Full-stack developer (backend focus)',
          org: 'Universidad de Córdoba',
          place: 'Montería · remote',
          period: 'Aug 2025 — Jun 2026',
          points: [
            'Built SIGCORP end to end: the request platform 17 staff members use to process about 40 requests a day.',
            'Designed security and persistence with Spring Security, JWT, JPA/Hibernate and Flyway, with optimistic locking for concurrent workflows.',
            'Integrated Wompi payments with webhook confirmation and a Node.js notification microservice for the university e-commerce.',
            'Containerized and deployed with Docker and Nginx; helped migrate about 200 pages of the university website.',
          ],
          stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Node.js', 'Docker', 'Nginx', 'Scrum'],
        },
      ],
      gigs: [
        {
          role: 'Backend developer & team lead',
          org: 'Sonrisa — Dental SaaS',
          place: 'Remote',
          period: 'Aug 2026 — Oct 2026',
          points: [
            'Java 21 / Spring Boot and PostgreSQL backend: patients, appointments, e-signed clinical records, odontogram, plans and payments.',
            'Led a team of three: requirements with the client, architecture, code review and deployment on Railway and Vercel.',
          ],
          stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'React', 'Docker'],
        },
        {
          role: 'Full-stack developer',
          org: 'SGO — ESCAMVIOS S.A.S.',
          place: 'Remote',
          period: 'May 2026 — Jun 2026',
          points: [
            'Replaced a spreadsheet-based transport workflow with a web app; migrated 550+ records and built KPI dashboards.',
          ],
          stack: ['React', 'TypeScript', 'Firebase'],
        },
        {
          role: 'Full-stack mobile developer',
          org: 'CETI — AI financial education',
          place: 'Remote',
          period: 'Apr 2025 — Sep 2025',
          points: [
            'Mobile and web app with gamified lessons and an AI workflow that turns text and voice into actions, covered by end-to-end tests.',
          ],
          stack: ['React Native', 'Expo', 'Firebase', 'AI'],
        },
        {
          role: 'Full-stack mobile developer',
          org: 'Biomech — B2B fitness SaaS',
          place: 'Remote',
          period: 'May 2023 — Jun 2025',
          points: [
            'Two-sided app live on the App Store, with 30+ Cloud Functions, Wompi payments and RevenueCat subscriptions.',
          ],
          stack: ['React Native', 'Expo', 'Firebase', 'RevenueCat'],
        },
      ],
    },
    projects: {
      title: 'Projects',
      intro: 'Real products I worked on, with screenshots and videos of each one.',
      role: 'Role',
      stack: 'Stack',
      open: 'Enlarge image',
      close: 'Close',
      sound: 'Play with sound',
    },
    awards: {
      title: 'Awards',
      prizes: 'Awards',
      talks: 'International talks',
      items: [
        {
          year: '2025',
          title: 'Winner · TechU Montería 2025',
          org: 'Montería City Hall',
          detail: 'Unimarket, a university marketplace with its own digital currency. I was the CTO. One of 5 winners out of 72 proposals.',
          links: [
            { label: 'Post', href: 'https://www.instagram.com/unicordoba_colombia/p/DKSEd_vt3i4/' },
            { label: 'Press', href: 'https://www.chicanoticias.com/2025/05/30/estudiantes-de-unicordoba-ganan-en-techu-2025-con-proyectos-que-impactan/' },
          ],
        },
        {
          year: '2025',
          title: '1st place · Systems Engineering Hackathon',
          org: 'Universidad de Córdoba',
          detail: 'AulaLink, an attendance-tracking system: Express and TypeScript backend, Tailwind web app and Flutter mobile app.',
          links: [{ label: 'Post', href: 'https://www.instagram.com/p/DKDFZtpS4Vh/' }],
        },
        {
          year: '2025',
          title: 'Winner · Innovation Fair',
          org: 'Universidad de Córdoba',
          detail: 'Unimarket, as CTO of the Innovarium research group team.',
          links: [
            { label: 'Post', href: 'https://www.instagram.com/unicordoba_colombia/p/DKDdG7IyBaH/' },
            { label: 'Press', href: 'https://www.chicanoticias.com/2025/05/24/brillan-tecnologico-estudiantes/' },
          ],
        },
      ],
      talksItems: [
        {
          year: '2026',
          title: 'LUMIO: automated financial management and education',
          org: 'CIIDIES–COPEIN–RIISS Congress · Celaya, Mexico',
          detail: 'Lead author.',
          links: [{ label: 'Program', href: 'https://www.riiss-global.org/congreso-mexico-2026/' }],
        },
        {
          year: '2026',
          title: 'CETI: financial education platform',
          org: 'Emprende Innova UG · Celaya, Mexico',
          detail: 'Co-author.',
          links: [{ label: 'News', href: unicordobaNews }],
        },
        {
          year: '2025',
          title: 'UNIMARKET',
          org: 'CITAE 2025 · REDIIE, Santiago, Chile',
          detail: 'Co-author.',
          links: [{ label: 'Certificate', href: 'https://rediie.cl/wp-content/uploads/Bru-y-otros_CITAE_2025.pdf' }],
        },
      ],
    },
    education: {
      title: 'Education',
      degree: 'B.S. in Systems Engineering',
      school: 'Universidad de Córdoba',
      detail: '7th semester · expected 2027 · Innovarium research group',
    },
    contact: {
      title: 'Let’s work together',
      text: 'I’m looking for remote backend, mobile or full-stack roles and freelance projects. Drop me a line and I’ll get back to you soon.',
      copy: 'Copy email',
      copied: 'Copied',
    },
    footer: 'Built with Astro · view the source',
    switchLang: { label: 'ES', href: '/' },
  },
};
