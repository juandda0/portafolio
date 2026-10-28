import type { ImageMetadata } from 'astro';

import sonrisaPoster from '../assets/projects/sonrisa/poster.jpg';
import sonrisaCover from '../assets/projects/sonrisa/1-portada.webp';
import sonrisaAgenda from '../assets/projects/sonrisa/3-agenda.webp';
import sonrisaRecord from '../assets/projects/sonrisa/4-historia.webp';
import sonrisaFinance from '../assets/projects/sonrisa/6-finanzas.webp';
import sigcorpCover from '../assets/projects/sigcorp/1-portada.jpg';
import sigcorpStats from '../assets/projects/sigcorp/3-estadisticas.jpg';
import sigcorpCalendar from '../assets/projects/sigcorp/2-calendario.jpg';
import sigcorpDetail from '../assets/projects/sigcorp/5-detalle.jpg';
import sgoCover from '../assets/projects/sgo/1-portada.jpg';
import sgoProjects from '../assets/projects/sgo/2-proyectos.jpg';
import sgoAttendance from '../assets/projects/sgo/5-asistencia.jpg';
import sgoClient from '../assets/projects/sgo/6-portal-cliente.jpg';
import cetiCover from '../assets/projects/ceti/1-portada.webp';
import cetiLearn from '../assets/projects/ceti/2-aprender.webp';
import cetiFinance from '../assets/projects/ceti/3-finanzas.webp';
import cetiActivity from '../assets/projects/ceti/4-actividad.webp';
import biomechPoster from '../assets/projects/biomech/poster.jpg';
import biomechCover from '../assets/projects/biomech/1-portada.jpg';
import biomechAthlete from '../assets/projects/biomech/2-atleta.jpg';
import biomechTrainer from '../assets/projects/biomech/3-entrenador.jpg';
import dinoPoster from '../assets/projects/purple-dino/poster.jpg';
import dinoBattle from '../assets/projects/purple-dino/1-batalla.jpg';
import dinoRoom from '../assets/projects/purple-dino/2-sala.jpg';
import dinoUnits from '../assets/projects/purple-dino/3-unidades.jpg';

type Text = { es: string; en: string };

export interface Project {
  slug: string;
  name: string;
  kind: Text;
  summary: Text;
  role: Text;
  year: string;
  stack: string[];
  /** Lo de backend va primero; el frontend o la app se nombran aparte en `also`. */
  highlights: { es: string[]; en: string[] };
  also?: Text;
  links?: { label: Text; href: string }[];
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
    kind: { es: 'Gestión odontológica', en: 'Dental practice management' },
    summary: {
      es: 'Backend del sistema de gestión para consultorios odontológicos: pacientes, agenda, historia clínica con firma electrónica, odontograma, planes de tratamiento, pagos y finanzas.',
      en: 'Backend of a management system for dental practices: patients, scheduling, e-signed clinical records, odontogram, treatment plans, payments and finance.',
    },
    role: { es: 'Backend y líder técnico · equipo de 3', en: 'Backend & team lead · team of 3' },
    year: '2026',
    stack: ['Java 21', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'Flyway', 'Docker', 'Railway'],
    highlights: {
      es: [
        'Spring Security con JWT y refresh tokens, JPA/Hibernate y migraciones con Flyway sobre PostgreSQL.',
        'Historia clínica de 19 pasos con firma electrónica, historias firmadas inmutables y bitácora de accesos (Ley 1581, RIPS, CIE-10, CUPS).',
        'Lideré un equipo de tres: requisitos con la clienta, arquitectura, revisión de pull requests y despliegue con Docker.',
      ],
      en: [
        'Spring Security with JWT and refresh tokens, JPA/Hibernate and Flyway migrations on PostgreSQL.',
        '19-step e-signed clinical record, immutable signed records and an access audit log (Ley 1581, RIPS, ICD-10, CUPS).',
        'Led a team of three: requirements with the client, architecture, pull request reviews and Docker deployment.',
      ],
    },
    also: { es: 'integré el frontend en React + TypeScript.', en: 'integrated the React + TypeScript frontend.' },
    video: { src: '/media/sonrisa.mp4', poster: sonrisaPoster },
    cover: sonrisaPoster,
    gallery: [sonrisaCover, sonrisaAgenda, sonrisaRecord, sonrisaFinance],
    alt: { es: 'Pantallas de Sonrisa', en: 'Sonrisa screens' },
  },
  {
    slug: 'sigcorp',
    name: 'SIGCORP',
    kind: { es: 'Plataforma institucional · Universidad de Córdoba', en: 'Institutional platform · Universidad de Córdoba' },
    summary: {
      es: 'Plataforma de gestión de solicitudes de la Oficina de Comunicaciones: asignación, seguimiento de estados, acceso por roles y métricas en un solo lugar.',
      en: 'Request management platform for the Communications Office: assignment, status tracking, role-based access and metrics in one place.',
    },
    role: { es: 'Desarrollador full-stack, enfoque backend', en: 'Full-stack developer, backend focus' },
    year: '2025–2026',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'Flyway', 'Docker', 'Nginx'],
    highlights: {
      es: [
        'APIs REST en Spring Boot para asignación de solicitudes, seguimiento de estados y acceso por roles.',
        'Seguridad con Spring Security y JWT; persistencia con JPA/Hibernate y Flyway, con bloqueo optimista en flujos concurrentes.',
        'Contenericé y desplegué la plataforma con Docker, Docker Compose y Nginx en los servidores de la universidad.',
      ],
      en: [
        'Spring Boot REST APIs for request assignment, status tracking and role-based access.',
        'Security with Spring Security and JWT; persistence with JPA/Hibernate and Flyway, with optimistic locking in concurrent workflows.',
        'Containerized and deployed the platform with Docker, Docker Compose and Nginx on the university’s servers.',
      ],
    },
    also: { es: 'construí los dashboards en React + TypeScript.', en: 'built the dashboards in React + TypeScript.' },
    cover: sigcorpCover,
    gallery: [sigcorpStats, sigcorpCalendar, sigcorpDetail],
    alt: { es: 'Panel de control de SIGCORP', en: 'SIGCORP dashboard' },
  },
  {
    slug: 'sgo',
    name: 'SGO',
    kind: { es: 'Gestión operativa · ESCAMVIOS S.A.S.', en: 'Operations management · ESCAMVIOS S.A.S.' },
    summary: {
      es: 'Sistema que reemplazó el Excel de viajes, proyectos, empleados y asistencia de una empresa de demoliciones.',
      en: 'System that replaced a demolition company’s spreadsheets for trips, projects, staff and attendance.',
    },
    role: { es: 'Desarrollador full-stack', en: 'Full-stack developer' },
    year: '2026',
    stack: ['Firebase', 'Firestore', 'Security Rules', 'Spring Boot', 'PostgreSQL'],
    highlights: {
      es: [
        'Firestore Security Rules con aislamiento por rol y por proyecto, validación de escrituras y pruebas con emuladores.',
        'Migré y estructuré más de 550 registros históricos de viajes.',
        'Diseñé primero el backend en Spring Boot y PostgreSQL y luego lo migré a Firebase para ajustarlo a la escala y el presupuesto del cliente.',
      ],
      en: [
        'Firestore Security Rules with role- and project-level isolation, write validation and emulator tests.',
        'Migrated and structured 550+ historical trip records.',
        'First designed the backend on Spring Boot and PostgreSQL, then moved it to Firebase to fit the client’s scale and budget.',
      ],
    },
    also: {
      es: 'construí la aplicación web en React + TypeScript, con dashboards de KPIs y portal para clientes.',
      en: 'built the React + TypeScript web app, with KPI dashboards and a client portal.',
    },
    cover: sgoCover,
    gallery: [sgoProjects, sgoAttendance, sgoClient],
    alt: { es: 'Dashboard de SGO', en: 'SGO dashboard' },
  },
  {
    slug: 'ceti',
    name: 'CETI',
    kind: { es: 'Educación financiera con IA', en: 'AI-powered financial education' },
    summary: {
      es: 'Aprendizaje financiero gamificado para jóvenes y colegios, con un asistente de IA que entiende texto y voz. Presentado en un congreso internacional en México.',
      en: 'Gamified financial learning for teens and schools, with an AI assistant that understands text and voice. Presented at an international congress in Mexico.',
    },
    role: { es: 'Desarrollador full-stack', en: 'Full-stack developer' },
    year: '2025',
    stack: ['Firebase', 'Cloud Functions', 'Firestore', 'IA / LLM', 'Jest', 'Maestro'],
    highlights: {
      es: [
        'Flujo de IA en Cloud Functions que convierte texto y voz en acciones, con validación, confirmación del usuario y cuotas de uso.',
        'Datos aislados por colegio, curso y usuario con Custom Claims y Security Rules.',
        'Pruebas con Jest, Testing Library, el emulador de Firestore y flujos E2E con Maestro.',
      ],
      en: [
        'AI workflow on Cloud Functions that turns text and voice into actions, with validation, user confirmation and usage quotas.',
        'Data isolated per school, class and user with Custom Claims and Security Rules.',
        'Tested with Jest, Testing Library, the Firestore emulator and Maestro E2E flows.',
      ],
    },
    also: { es: 'construí la app móvil y web en React Native y Expo.', en: 'built the mobile and web app with React Native and Expo.' },
    links: [{ label: { es: 'Abrir CETI', en: 'Open CETI' }, href: 'https://ceti-d3769.web.app' }],
    cover: cetiCover,
    gallery: [cetiLearn, cetiFinance, cetiActivity],
    alt: { es: 'Pantallas de CETI', en: 'CETI screens' },
  },
  {
    slug: 'biomech',
    name: 'Biomech',
    kind: { es: 'App para entrenadores y atletas', en: 'App for trainers and athletes' },
    summary: {
      es: 'App de dos lados para entrenadores personales y sus atletas: clientes, rutinas, progreso, agenda, reservas y cobros. Publicada en App Store.',
      en: 'Two-sided app for personal trainers and their athletes: clients, routines, progress, scheduling, bookings and billing. Live on the App Store.',
    },
    role: { es: 'Desarrollador full-stack', en: 'Full-stack developer' },
    year: '2023–2025',
    stack: ['Firebase', 'Cloud Functions', 'Zod', 'App Check', 'Wompi', 'RevenueCat'],
    highlights: {
      es: [
        'Backend serverless con más de 30 Cloud Functions protegidas, validación con Zod y App Check.',
        'Multi-organización: sedes, entrenadores y clientes aislados con Security Rules de Firestore y Storage.',
        'Pagos con Wompi y suscripciones con RevenueCat en App Store y Android.',
      ],
      en: [
        'Serverless backend with 30+ protected Cloud Functions, Zod validation and App Check.',
        'Multi-organization: locations, trainers and clients isolated with Firestore and Storage Security Rules.',
        'Wompi payments and RevenueCat subscriptions on the App Store and Android.',
      ],
    },
    also: { es: 'construí la app en React Native y Expo.', en: 'built the app with React Native and Expo.' },
    links: [
      { label: { es: 'App Store', en: 'App Store' }, href: 'https://apps.apple.com/co/app/biomech/id6801688898' },
      { label: { es: 'Descargar APK (Android)', en: 'Download APK (Android)' }, href: 'https://biomech-studios-download.web.app/' },
    ],
    video: { src: '/media/biomech.mp4', poster: biomechPoster, portrait: true },
    cover: biomechCover,
    gallery: [biomechAthlete, biomechTrainer],
    alt: { es: 'Pantallas de Biomech', en: 'Biomech screens' },
  },
  {
    slug: 'purple-dino',
    name: 'Purple Dino',
    kind: { es: 'Juego multijugador en tiempo real', en: 'Real-time multiplayer game' },
    summary: {
      es: 'Batalla cooperativa de inglés para el aula: el profesor proyecta el juego, los estudiantes responden desde el celular y, si la mayoría acierta, el dinosaurio ataca.',
      en: 'Co-op English quiz battle for the classroom: the teacher projects the game, students answer on their phones and, if most of the class gets it right, the dino strikes.',
    },
    role: { es: 'Proyecto propio · de punta a punta', en: 'Personal project · end to end' },
    year: '2026',
    stack: ['Firebase Realtime Database', 'Firebase Auth', 'TypeScript', 'Vitest', 'React'],
    highlights: {
      es: [
        'Estado de la partida sincronizado en tiempo real con Firebase Realtime Database: salas con código de 4 dígitos y QR para unirse desde el celular.',
        'Reglas de seguridad de la base de datos cubiertas con pruebas automatizadas contra el emulador; acceso anónimo para los estudiantes.',
        'Despliegue protegido: el script valida la configuración de producción y publica reglas y app juntas.',
      ],
      en: [
        'Game state synced in real time with Firebase Realtime Database: rooms with a 4-digit code and a QR code to join from a phone.',
        'Database security rules covered by automated tests against the emulator; anonymous sign-in for students.',
        'Guarded deploys: the script checks the production config and ships rules and app together.',
      ],
    },
    also: { es: 'construí la vista del proyector y la del celular en React.', en: 'built the projector and phone views in React.' },
    links: [{ label: { es: 'Jugar', en: 'Play' }, href: 'https://purple-dino-juandda0.web.app' }],
    video: { src: '/media/purple-dino.mp4', poster: dinoPoster },
    cover: dinoPoster,
    gallery: [dinoBattle, dinoRoom, dinoUnits],
    alt: { es: 'Partida de Purple Dino', en: 'Purple Dino gameplay' },
  },
];
