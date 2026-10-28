import type { ImageMetadata } from 'astro';

import sonrisaPoster from '../assets/projects/sonrisa/poster.jpg';
import sonrisaAgenda from '../assets/projects/sonrisa/still-640.png';
import sonrisaPlan from '../assets/projects/sonrisa/still-1540.png';
import sonrisaPagos from '../assets/projects/sonrisa/still-1960.png';
import sigcorpCover from '../assets/projects/sigcorp/1-portada.jpg';
import sigcorpStats from '../assets/projects/sigcorp/3-estadisticas.jpg';
import sigcorpCalendar from '../assets/projects/sigcorp/2-calendario.jpg';
import sigcorpDetail from '../assets/projects/sigcorp/5-detalle.jpg';
import biomechPoster from '../assets/projects/biomech/poster.jpg';
import biomechCover from '../assets/projects/biomech/1-portada.jpg';
import biomechAthlete from '../assets/projects/biomech/2-atleta.jpg';
import biomechTrainer from '../assets/projects/biomech/3-entrenador.jpg';
import sgoCover from '../assets/projects/sgo/1-portada.jpg';
import sgoProjects from '../assets/projects/sgo/2-proyectos.jpg';
import sgoAttendance from '../assets/projects/sgo/5-asistencia.jpg';
import sgoClient from '../assets/projects/sgo/6-portal-cliente.jpg';
import cetiCover from '../assets/projects/ceti/1-portada.jpg';
import cetiLearning from '../assets/projects/ceti/2-aprendizaje.jpg';
import cetiFinance from '../assets/projects/ceti/3-finanzas.jpg';

type Text = { es: string; en: string };

export interface Project {
  slug: string;
  name: string;
  kind: Text;
  summary: Text;
  role: Text;
  year: string;
  stack: string[];
  highlights: { es: string[]; en: string[] };
  /** Video principal; si es vertical se muestra junto a la portada. */
  video?: { src: string; poster: ImageMetadata; portrait?: boolean };
  cover: ImageMetadata;
  gallery: ImageMetadata[];
  alt: Text;
}

export const projects: Project[] = [
  {
    slug: 'sonrisa',
    name: 'Sonrisa',
    kind: { es: 'SaaS · Salud', en: 'SaaS · Healthcare' },
    summary: {
      es: 'Software de gestión para consultorios odontológicos: agenda, historia clínica con firma electrónica, odontograma, planes de tratamiento y pagos.',
      en: 'Practice management software for dental clinics: scheduling, e-signed clinical records, odontogram, treatment plans and payments.',
    },
    role: { es: 'Backend y líder técnico · equipo de 3', en: 'Backend & team lead · team of 3' },
    year: '2026',
    stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Spring Security', 'Flyway', 'React', 'TypeScript', 'Docker'],
    highlights: {
      es: [
        'Historia clínica de 19 pasos con firma electrónica, historias firmadas inmutables y bitácora de accesos.',
        'Cumple la normativa colombiana de datos clínicos: Ley 1581, RIPS, CIE-10 y CUPS.',
        'Levanté requisitos con la clienta, definí la arquitectura y revisé los pull requests del equipo.',
      ],
      en: [
        '19-step clinical record with e-signature, immutable signed records and an access audit log.',
        'Compliant with Colombian health-data rules: Ley 1581, RIPS, ICD-10 and CUPS.',
        'Gathered requirements with the client, defined the architecture and reviewed the team’s pull requests.',
      ],
    },
    video: { src: '/media/sonrisa.mp4', poster: sonrisaPoster },
    cover: sonrisaPoster,
    gallery: [sonrisaAgenda, sonrisaPlan, sonrisaPagos],
    alt: { es: 'Pantallas de Sonrisa', en: 'Sonrisa screens' },
  },
  {
    slug: 'sigcorp',
    name: 'SIGCORP',
    kind: { es: 'Plataforma institucional', en: 'Institutional platform' },
    summary: {
      es: 'Gestión de solicitudes de la Oficina de Comunicaciones de la Universidad de Córdoba: asignación, seguimiento de estados y métricas en un solo lugar.',
      en: 'Request management for the Universidad de Córdoba Communications Office: assignment, status tracking and metrics in one place.',
    },
    role: { es: 'Desarrollador full-stack con enfoque backend', en: 'Full-stack developer, backend focus' },
    year: '2025–2026',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Flyway', 'React', 'TypeScript', 'Docker', 'Nginx'],
    highlights: {
      es: [
        'Usada por 17 funcionarios para procesar unas 40 solicitudes al día.',
        'Bloqueo optimista para mantener la consistencia de los datos en flujos concurrentes.',
        'Desplegada con Docker, Docker Compose y Nginx en los servidores de la universidad.',
      ],
      en: [
        'Used by 17 staff members to process about 40 requests a day.',
        'Optimistic locking to keep data consistent across concurrent workflows.',
        'Deployed with Docker, Docker Compose and Nginx on the university’s servers.',
      ],
    },
    cover: sigcorpCover,
    gallery: [sigcorpStats, sigcorpCalendar, sigcorpDetail],
    alt: { es: 'Panel de control de SIGCORP', en: 'SIGCORP dashboard' },
  },
  {
    slug: 'biomech',
    name: 'Biomech',
    kind: { es: 'App móvil · SaaS B2B', en: 'Mobile app · B2B SaaS' },
    summary: {
      es: 'App de dos lados para entrenadores personales y sus atletas: clientes, rutinas, progreso, agenda, reservas y cobros. Publicada en App Store.',
      en: 'Two-sided app for personal trainers and their athletes: clients, routines, progress, scheduling, bookings and billing. Live on the App Store.',
    },
    role: { es: 'Desarrollador full-stack mobile', en: 'Full-stack mobile developer' },
    year: '2023–2025',
    stack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Cloud Functions', 'Wompi', 'RevenueCat'],
    highlights: {
      es: [
        'Backend serverless con más de 30 Cloud Functions protegidas, validación con Zod y App Check.',
        'Multi-organización: sedes, entrenadores y clientes aislados con Security Rules.',
        'Pagos con Wompi y suscripciones con RevenueCat en App Store y Android.',
      ],
      en: [
        'Serverless backend with 30+ protected Cloud Functions, Zod validation and App Check.',
        'Multi-organization: locations, trainers and clients isolated with Security Rules.',
        'Wompi payments and RevenueCat subscriptions on the App Store and Android.',
      ],
    },
    video: { src: '/media/biomech.mp4', poster: biomechPoster, portrait: true },
    cover: biomechCover,
    gallery: [biomechAthlete, biomechTrainer],
    alt: { es: 'Pantallas de Biomech', en: 'Biomech screens' },
  },
  {
    slug: 'sgo',
    name: 'SGO',
    kind: { es: 'Aplicación web · ESCAMVIOS S.A.S.', en: 'Web app · ESCAMVIOS S.A.S.' },
    summary: {
      es: 'Sistema de gestión operativa que reemplazó el Excel de viajes, proyectos, empleados y asistencia de una empresa de demoliciones.',
      en: 'Operations system that replaced a demolition company’s spreadsheets for trips, projects, staff and attendance.',
    },
    role: { es: 'Desarrollador full-stack', en: 'Full-stack developer' },
    year: '2026',
    stack: ['React', 'TypeScript', 'Firebase', 'Firestore', 'Security Rules'],
    highlights: {
      es: [
        'Migré y estructuré más de 550 registros históricos de viajes.',
        'Dashboards con KPIs, gráficas, filtros, búsqueda y portal para clientes.',
        'Primero lo diseñé en Spring Boot y PostgreSQL; lo migré a Firebase para ajustarlo a la escala y el presupuesto del cliente.',
      ],
      en: [
        'Migrated and structured 550+ historical trip records.',
        'KPI dashboards, charts, filters, search and a client portal.',
        'First designed on Spring Boot and PostgreSQL, then moved to Firebase to fit the client’s scale and budget.',
      ],
    },
    cover: sgoCover,
    gallery: [sgoProjects, sgoAttendance, sgoClient],
    alt: { es: 'Dashboard de SGO', en: 'SGO dashboard' },
  },
  {
    slug: 'ceti',
    name: 'CETI',
    kind: { es: 'App móvil y web · EdTech', en: 'Mobile & web app · EdTech' },
    summary: {
      es: 'Educación financiera gamificada para jóvenes y colegios, con un asistente de IA que entiende texto y voz. Presentada en un congreso internacional en México.',
      en: 'Gamified financial education for teens and schools, with an AI assistant that understands text and voice. Presented at an international congress in Mexico.',
    },
    role: { es: 'Desarrollador full-stack mobile', en: 'Full-stack mobile developer' },
    year: '2025',
    stack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'IA / LLM', 'Jest', 'Maestro'],
    highlights: {
      es: [
        'Flujo de IA en Cloud Functions que convierte texto y voz en acciones, con confirmación del usuario y cuotas de uso.',
        'Datos aislados por colegio, curso y usuario con Custom Claims y Security Rules.',
        'Pruebas con Jest, Testing Library, el emulador de Firestore y flujos E2E con Maestro.',
      ],
      en: [
        'AI workflow on Cloud Functions that turns text and voice into actions, with user confirmation and usage quotas.',
        'Data isolated per school, class and user with Custom Claims and Security Rules.',
        'Tested with Jest, Testing Library, the Firestore emulator and Maestro E2E flows.',
      ],
    },
    cover: cetiCover,
    gallery: [cetiLearning, cetiFinance],
    alt: { es: 'Pantallas de CETI', en: 'CETI screens' },
  },
];
