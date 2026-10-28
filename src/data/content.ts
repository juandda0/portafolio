import type { Lang } from './profile';

export interface Job {
  role: string;
  org: string;
  place: string;
  period: string;
  /** Un punto puede llevar un título en negrita (`lead`) cuando es una responsabilidad aparte. */
  points: (string | { lead: string; text: string })[];
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
    role: string;
    stackline: string;
    pitch: string;
    /** Resumen que se muestra a la derecha como respuesta JSON de `GET /me`. */
    json: [string, string | boolean | string[]][];
    available: string;
    cv: string;
    stats: { value: string; label: string }[];
  };
  experience: { title: string; work: string; freelance: string; jobs: Job[]; gigs: Job[] };
  projects: {
    title: string;
    intro: string;
    role: string;
    stack: string;
    also: string;
    open: string;
    close: string;
    sound: string;
    prev: string;
    next: string;
  };
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
      title: 'Juan Diego Díaz · Desarrollador backend',
      description:
        'Desarrollador backend con Java, Spring Boot y Node.js en Montería, Colombia. Experiencia, proyectos en producción, premios y contacto.',
    },
    nav: { experience: 'Experiencia', projects: 'Proyectos', awards: 'Logros', contact: 'Contacto' },
    hero: {
      role: 'Desarrollador Backend',
      stackline: 'Java, Spring Boot, Node.js, PostgreSQL',
      json: [
        ['name', 'Juan Diego Díaz Avendaño'],
        ['role', 'Desarrollador Backend'],
        ['secondary', ['Mobile', 'Frontend']],
        ['stack', ['Java', 'Spring Boot', 'Node.js', 'PostgreSQL', 'Docker']],
        ['experience', '3 años'],
        ['location', 'Montería, Colombia'],
        ['remote', true],
        ['available', 'inmediata'],
        ['english', 'C1'],
      ],
      pitch:
        'Diseño y construyo APIs REST y microservicios con Java y Spring Boot: seguridad, modelo de datos, pruebas y despliegue. Cuando el proyecto lo pide, también entrego el frontend o la app móvil.',
      available: 'Disponible para trabajo remoto',
      cv: 'Descargar CV',
      stats: [
        { value: '3', label: 'años de experiencia' },
        { value: '6', label: 'proyectos publicados' },
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
            {
              lead: 'SIGCORP',
              text: 'Construí de punta a punta la plataforma de solicitudes de la Oficina de Comunicaciones: APIs REST en Spring Boot, Spring Security con JWT, JPA/Hibernate y Flyway, bloqueo optimista en flujos concurrentes y despliegue con Docker y Nginx.',
            },
            {
              lead: 'E-commerce institucional',
              text: 'Integré la pasarela de pagos Wompi con confirmación asíncrona por webhooks y un microservicio de notificaciones en Node.js.',
            },
            {
              lead: 'Sitio web institucional',
              text: 'Participé en la migración de unas 200 páginas del sitio de la universidad.',
            },
          ],
          stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Node.js', 'Docker', 'Nginx', 'Scrum'],
        },
      ],
      gigs: [
        {
          role: 'Backend y líder técnico',
          org: 'Sonrisa — gestión odontológica',
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
          stack: ['Firebase', 'Security Rules', 'React', 'TypeScript'],
        },
        {
          role: 'Desarrollador full-stack',
          org: 'CETI — educación financiera con IA',
          place: 'Remoto',
          period: 'abr 2025 — sep 2025',
          points: [
            'Flujo de IA en Cloud Functions que convierte texto y voz en acciones, datos aislados por colegio y curso, y la app móvil y web en React Native.',
          ],
          stack: ['Firebase', 'Cloud Functions', 'IA', 'React Native'],
        },
        {
          role: 'Desarrollador full-stack',
          org: 'Biomech — app para entrenadores',
          place: 'Remoto',
          period: 'may 2023 — jun 2025',
          points: [
            'Backend serverless con más de 30 Cloud Functions, pagos con Wompi y suscripciones con RevenueCat; app de dos lados publicada en App Store.',
          ],
          stack: ['Firebase', 'Cloud Functions', 'RevenueCat', 'React Native'],
        },
      ],
    },
    projects: {
      title: 'Proyectos',
      intro: 'Productos publicados. En cada uno me encargué del backend y, cuando el proyecto lo pedía, también de la app o el frontend.',
      role: 'Rol',
      stack: 'Stack',
      also: 'También',
      open: 'Ampliar imagen',
      close: 'Cerrar',
      sound: 'Ver con sonido',
      prev: 'Proyecto anterior',
      next: 'Proyecto siguiente',
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
          detail: 'Unimarket, como CTO del equipo.',
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
      detail: '7.º semestre · graduación estimada 2027',
    },
    contact: {
      title: '¿Trabajamos juntos?',
      text: 'Estoy abierto a nuevas posiciones como desarrollador. Escríbeme y te respondo pronto.',
      copy: 'Copiar correo',
      copied: 'Copiado',
    },
    footer: 'Hecho con Astro · ver el código',
    switchLang: { label: 'EN', href: '/en/' },
  },
  en: {
    meta: {
      title: 'Juan Diego Díaz · Backend developer',
      description:
        'Backend developer working with Java, Spring Boot and Node.js, based in Colombia. Experience, shipped products, awards and contact.',
    },
    nav: { experience: 'Experience', projects: 'Projects', awards: 'Awards', contact: 'Contact' },
    hero: {
      role: 'Backend Developer',
      stackline: 'Java, Spring Boot, Node.js, PostgreSQL',
      json: [
        ['name', 'Juan Diego Díaz Avendaño'],
        ['role', 'Backend Developer'],
        ['secondary', ['Mobile', 'Frontend']],
        ['stack', ['Java', 'Spring Boot', 'Node.js', 'PostgreSQL', 'Docker']],
        ['experience', '3 years'],
        ['location', 'Montería, Colombia'],
        ['remote', true],
        ['available', 'immediately'],
        ['english', 'C1'],
      ],
      pitch:
        'I design and build REST APIs and microservices with Java and Spring Boot: security, data model, testing and deployment. When a project needs it, I also ship the frontend or the mobile app.',
      available: 'Available for remote work',
      cv: 'Download CV',
      stats: [
        { value: '3', label: 'years of experience' },
        { value: '6', label: 'shipped projects' },
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
            {
              lead: 'SIGCORP',
              text: 'Built the Communications Office request platform end to end: Spring Boot REST APIs, Spring Security with JWT, JPA/Hibernate and Flyway, optimistic locking for concurrent workflows, and Docker and Nginx deployment.',
            },
            {
              lead: 'University e-commerce',
              text: 'Integrated the Wompi payment gateway with asynchronous webhook confirmation and a Node.js notification microservice.',
            },
            {
              lead: 'University website',
              text: 'Helped migrate about 200 pages of the university website.',
            },
          ],
          stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Node.js', 'Docker', 'Nginx', 'Scrum'],
        },
      ],
      gigs: [
        {
          role: 'Backend developer & team lead',
          org: 'Sonrisa — dental practice management',
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
          stack: ['Firebase', 'Security Rules', 'React', 'TypeScript'],
        },
        {
          role: 'Full-stack developer',
          org: 'CETI — AI financial education',
          place: 'Remote',
          period: 'Apr 2025 — Sep 2025',
          points: [
            'AI workflow on Cloud Functions that turns text and voice into actions, data isolated per school and class, and the React Native mobile and web app.',
          ],
          stack: ['Firebase', 'Cloud Functions', 'AI', 'React Native'],
        },
        {
          role: 'Full-stack developer',
          org: 'Biomech — app for personal trainers',
          place: 'Remote',
          period: 'May 2023 — Jun 2025',
          points: [
            'Serverless backend with 30+ Cloud Functions, Wompi payments and RevenueCat subscriptions; two-sided app live on the App Store.',
          ],
          stack: ['Firebase', 'Cloud Functions', 'RevenueCat', 'React Native'],
        },
      ],
    },
    projects: {
      title: 'Projects',
      intro: 'Shipped products. I owned the backend of each one and, when the project needed it, the app or frontend too.',
      role: 'Role',
      stack: 'Stack',
      also: 'Also',
      open: 'Enlarge image',
      close: 'Close',
      sound: 'Play with sound',
      prev: 'Previous project',
      next: 'Next project',
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
          detail: 'Unimarket, as the team’s CTO.',
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
      detail: '7th semester · expected 2027',
    },
    contact: {
      title: 'Let’s work together',
      text: 'I’m open to new developer positions. Drop me a line and I’ll get back to you soon.',
      copy: 'Copy email',
      copied: 'Copied',
    },
    footer: 'Built with Astro · view the source',
    switchLang: { label: 'ES', href: '/' },
  },
};
