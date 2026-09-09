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
      pt: "App para facilitar a doação de sangue no RS: quiz de elegibilidade, mapa de hemocentros, controle de intervalo entre doações e um jogo de conscientização integrado.",
      en: "App to make blood donation easier in RS: eligibility quiz, blood-center map, donation-interval tracking and a built-in awareness game.",
    },
    tags: ["React", "TypeScript", "Supabase", "Tailwind", "Capacitor"],
    repo: "https://github.com/palomagl/doe-mais-rs",
    live: "https://doe-mais-rs.vercel.app",
    image: "/projects/doe-mais-rs.png",
    badge: "",
    group: "destaques",
  },
  {
    slug: "iphone-17-concept",
    name: "iPhone 17 Concept",
    description: {
      pt: "Experiência de scrollytelling em 16 seções, com motor de scroll próprio escrito do zero, sem frameworks.",
      en: "16-section scrollytelling experience powered by a custom scroll engine written from scratch, no frameworks.",
    },
    tags: ["HTML5", "CSS3", "JavaScript"],
    repo: "https://github.com/palomagl/iphone-concept",
    live: "", // TODO: URL live do iPhone Concept
    image: "/projects/iphone-17-concept.png",
    badge: "",
    group: "destaques",
  },
  {
    slug: "baly-sabores",
    name: "Baly Sabores",
    description: {
      pt: "Landing page conceitual onde cada sabor tem seu momento visual e a transição acontece pelo scroll.",
      en: "Concept landing page where each flavor gets its own visual moment, with transitions driven by scroll.",
    },
    tags: ["HTML5", "CSS3", "JavaScript"],
    repo: "https://github.com/palomagl/baly-sabores",
    live: "https://baly-sabores.vercel.app",
    image: "/projects/baly-sabores.png",
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
    image: "/projects/personal-dashboard.png",
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
    image: "/projects/barbershop.png",
    badge: "",
    group: "destaques",
  },

  // ---------- Clientes e projetos aplicados ----------
  {
    slug: "nath-lorenzon-beauty",
    name: "Nath Lorenzon Beauty",
    description: {
      pt: "Landing page para estúdio de cílios e sobrancelhas, com fluxo direto do Instagram para o WhatsApp.",
      en: "Landing page for a lash and brow studio, with a direct Instagram-to-WhatsApp flow.",
    },
    tags: ["React", "TypeScript", "Tailwind", "shadcn/ui"],
    repo: "https://github.com/palomagl/nath-lash-beauty",
    live: "https://nath-lash-beauty.vercel.app",
    image: "/projects/nath-lorenzon-beauty.png",
    badge: "",
    group: "aplicados",
  },
  {
    slug: "df-marmores",
    name: "DF Mármores",
    description: {
      pt: "", // TODO: descrição do DF Mármores
      en: "",
    },
    tags: ["TypeScript"],
    repo: "", // repositório privado — botão fica escondido até tornar público
    live: "https://df-marmores.vercel.app",
    image: "/projects/df-marmores.png",
    badge: "",
    group: "aplicados",
  },

  // ---------- Em desenvolvimento ----------
  {
    slug: "nexa-ia",
    name: "NEXA IA",
    description: {
      pt: "Plataforma para criar sites e apps conversando com IA, com backend próprio em Express e cadeia de fallback entre provedores.",
      en: "Platform to build sites and apps by chatting with AI, with its own Express backend and a provider fallback chain.",
    },
    tags: ["React", "TypeScript", "Tailwind", "Zustand", "Express"],
    repo: "https://github.com/palomagl/nexa_ia",
    live: "", // ainda não publicado
    image: "/projects/nexa-ia.png",
    badge: "dev",
    group: "desenvolvimento",
  },
  {
    slug: "studymaps",
    name: "StudyMaps",
    description: {
      pt: "Trilhas de aprendizado visuais, com nodes interativos e controle de progresso por módulo.",
      en: "Visual learning tracks with interactive nodes and per-module progress tracking.",
    },
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    repo: "https://github.com/palomagl/study_maps",
    live: "https://study-maps.vercel.app",
    image: "/projects/studymaps.png",
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
    tags: ["Java", "Swing"],
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
