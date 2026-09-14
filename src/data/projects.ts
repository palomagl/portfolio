/**
 * Lista de projetos. Editar só aqui — as seções Projetos e Tecnologias leem daqui.
 * Campo vazio ("") esconde o botão correspondente no card.
 * `image` aponta para /public; se o arquivo não existir, o card usa um placeholder.
 */

export type ProjectGroup = "destaques" | "aplicados" | "desenvolvimento" | "academicos";
export type ProjectBadge = "" | "dev" | "course";

export interface Project {
  slug: string;
  name: string;
  description: { pt: string; en: string };
  tags: string[];
  repo: string;
  live: string;
  image: string;
  badge: ProjectBadge;
  group: ProjectGroup;
}

export const projectGroups: { id: ProjectGroup; label: { pt: string; en: string } }[] = [
  { id: "destaques", label: { pt: "Destaques", en: "Highlights" } },
  { id: "aplicados", label: { pt: "Clientes e projetos aplicados", en: "Client & applied work" } },
  { id: "desenvolvimento", label: { pt: "Em desenvolvimento", en: "In progress" } },
  { id: "academicos", label: { pt: "Acadêmicos", en: "Academic" } },
];

export const projectBadges: Record<Exclude<ProjectBadge, "">, { pt: string; en: string }> = {
  dev: { pt: "Em desenvolvimento", en: "In progress" },
  course: { pt: "Projeto de curso", en: "Course project" },
};

export const projects: Project[] = [
  // ---------- Destaques ----------
  {
    slug: "doe-mais-rs",
    name: "DOE+ RS",
    description: {
      pt: "App de doação de sangue: quiz de elegibilidade e mapa de hemocentros.",
      en: "Blood donation app with an eligibility quiz and blood-center map.",
    },
    tags: ["React", "TypeScript", "Supabase", "Tailwind", "Capacitor"],
    repo: "https://github.com/palomagl/doe-mais-rs",
    live: "https://doe-mais-rs.vercel.app",
    image: "/projects/doe-mais.webp",
    badge: "",
    group: "destaques",
  },
  {
    slug: "studymaps",
    name: "StudyMaps",
    description: {
      pt: "Trilhas de aprendizado visuais, com nodes interativos e progresso por módulo.",
      en: "Visual learning tracks with interactive nodes and progress tracking.",
    },
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    repo: "https://github.com/palomagl/study_maps",
    live: "https://study-maps.vercel.app",
    image: "/projects/studymaps.webp",
    badge: "dev",
    group: "destaques",
  },
  {
    slug: "baly-sabores",
    name: "Baly Sabores",
    description: {
      pt: "Landing page onde cada sabor ganha seu momento visual no scroll.",
      en: "Landing page where each flavor gets its own visual moment on scroll.",
    },
    tags: ["HTML5", "CSS3", "JavaScript", "Motion"],
    repo: "https://github.com/palomagl/baly-sabores",
    live: "https://baly-sabores.vercel.app",
    image: "/projects/baly.webp",
    badge: "",
    group: "destaques",
  },
  {
    slug: "personal-dashboard",
    name: "Personal Dashboard",
    description: {
      pt: "Dashboard pessoal com autenticação e dados persistidos em PostgreSQL.",
      en: "Personal dashboard with authentication and data persisted in PostgreSQL.",
    },
    tags: ["React", "Node.js", "Prisma", "PostgreSQL", "Tailwind"],
    repo: "https://github.com/palomagl/dashboard",
    live: "https://dashboard-three-khaki-68.vercel.app",
    image: "/projects/dashboard.webp",
    badge: "",
    group: "destaques",
  },
  {
    slug: "barbershop",
    name: "BarberShop",
    description: {
      pt: "Sistema de barbearia com agendamento e login, integrado a uma API própria.",
      en: "Barbershop system with booking and login, integrated with its own API.",
    },
    tags: ["Vue 3", "Node.js", "PostgreSQL", "JWT"],
    repo: "https://github.com/palomagl/barbearia-frontend",
    live: "https://barbearia-frontend-woad.vercel.app",
    image: "/projects/barbershop.webp",
    badge: "",
    group: "destaques",
  },

  // ---------- Clientes e projetos aplicados ----------
  {
    slug: "nath-lorenzon-beauty",
    name: "Nath Lorenzon Beauty",
    description: {
      pt: "Landing page para estúdio de cílios e sobrancelhas, do Instagram pro WhatsApp.",
      en: "Landing page for a lash and brow studio, with an Instagram-to-WhatsApp flow.",
    },
    tags: ["React", "TypeScript", "TanStack Router", "Tailwind", "shadcn/ui"],
    repo: "https://github.com/palomagl/nath-lash-beauty",
    live: "https://nath-lash-beauty.vercel.app",
    image: "/projects/nath-beauty.webp",
    badge: "",
    group: "aplicados",
  },
  {
    slug: "df-marmores",
    name: "DF Mármores",
    description: {
      pt: "Sistema para marmorarias: peças em 2D/3D, orçamentos e arquivos pra produção.",
      en: "System for stonework shops: 2D/3D pieces, quotes and production files.",
    },
    tags: ["TypeScript", "PostgreSQL", "CSS"],
    repo: "", // repositório privado — botão fica escondido até tornar público
    live: "https://df-marmores.vercel.app",
    image: "/projects/df-marmores.webp",
    badge: "",
    group: "aplicados",
  },

  // ---------- Em desenvolvimento ----------
  {
    slug: "nexa-ia",
    name: "NEXA IA",
    description: {
      pt: "Plataforma pra criar sites e apps com IA, com backend próprio em Express.",
      en: "Platform to build sites and apps with AI, backed by a custom Express server.",
    },
    tags: ["React", "TypeScript", "Zustand", "Express", "Sandpack"],
    repo: "https://github.com/palomagl/nexa_ia",
    live: "https://nexa-ia-git-main-palomagls-projects.vercel.app",
    image: "/projects/nexa-ia.webp",
    badge: "dev",
    group: "desenvolvimento",
  },
  {
    slug: "iphone-17-concept",
    name: "iPhone 17 Concept",
    description: {
      pt: "Scrollytelling em 16 seções, com motor de scroll próprio escrito do zero.",
      en: "16-section scrollytelling experience with a custom scroll engine, no frameworks.",
    },
    tags: ["HTML5", "CSS3", "JavaScript"],
    repo: "https://github.com/palomagl/iphone-concept",
    live: "", // TODO: URL live do iPhone Concept
    image: "/projects/iphone-17-concept.png",
    badge: "dev",
    group: "desenvolvimento",
  },

  // ---------- Acadêmicos ----------
  {
    slug: "hotel-system",
    name: "Hotel System",
    description: {
      pt: "Sistema de gerenciamento hoteleiro em Java.",
      en: "Hotel management system built in Java.",
    },
    tags: ["Java", "JavaFX", "PostgreSQL"],
    repo: "https://github.com/palomagl/hotel_system",
    live: "",
    image: "/projects/hotel-system.png",
    badge: "course",
    group: "academicos",
  },
  {
    slug: "jogo-da-forca",
    name: "Jogo da Forca",
    description: {
      pt: "Jogo da forca em Python.",
      en: "Hangman game in Python.",
    },
    tags: ["Python"],
    repo: "https://github.com/palomagl/jogo-da-forca",
    live: "",
    image: "/projects/jogo-da-forca.png",
    badge: "course",
    group: "academicos",
  },
];
