/**
 * Lista de projetos. Editar só aqui — as seções Projetos e Tecnologias leem daqui.
 * Campo vazio ("") esconde o botão correspondente no card.
 * `image` aponta para /public; se o arquivo não existir, o card usa um placeholder.
 * `highlights` é opcional: 2-3 diferenciais reais do projeto, mostrados no modal.
 */

export type ProjectGroup = "destaques" | "aplicados" | "desenvolvimento" | "academicos";
export type ProjectBadge = "" | "dev" | "course";

/** Ícones disponíveis pros diferenciais — mapeados pra um componente lucide-react em ProjectsSection.tsx. */
export type HighlightIcon =
  | "login"
  | "telegram"
  | "wifi-off"
  | "map-pin"
  | "smartphone"
  | "pen"
  | "calculator"
  | "route"
  | "trending-up"
  | "code"
  | "calendar-check"
  | "boxes"
  | "sparkles"
  | "eye"
  | "mic"
  | "shield-check"
  | "file-text"
  | "pie-chart"
  | "dice"
  | "trophy"
  | "gamepad"
  | "cart"
  | "credit-card";

export interface ProjectHighlight {
  icon: HighlightIcon;
  title: { pt: string; en: string };
  caption: { pt: string; en: string };
}

export interface Project {
  slug: string;
  name: string;
  /** Categoria curta e humana (ex.: "Dashboard", "Jogo") — mostrada como pill no modal. */
  kind: { pt: string; en: string };
  description: { pt: string; en: string };
  tags: string[];
  repo: string;
  live: string;
  image: string;
  badge: ProjectBadge;
  group: ProjectGroup;
  highlights?: ProjectHighlight[];
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
    slug: "minha-rotina",
    name: "Minha Rotina",
    kind: { pt: "Dashboard", en: "Dashboard" },
    description: {
      pt: "Tarefas, hábitos, finanças e notas num só painel, com bot do Telegram e PWA.",
      en: "Tasks, habits, finances and notes in one dashboard, with a Telegram bot and PWA.",
    },
    tags: ["React", "TypeScript", "Firebase", "Tailwind", "PWA"],
    repo: "https://github.com/palomagl/dashboard",
    live: "https://dashboard-three-khaki-68.vercel.app",
    image: "/projects/minha-rotina.webp",
    badge: "",
    group: "destaques",
    highlights: [
      {
        icon: "login",
        title: { pt: "Login com Google", en: "Login with Google" },
        caption: { pt: "Sem senha pra lembrar", en: "No password to remember" },
      },
      {
        icon: "telegram",
        title: { pt: "Bot do Telegram", en: "Telegram bot" },
        caption: { pt: "Manda \"gastei 30\" e pronto", en: "Text \"spent 30\" and it's logged" },
      },
      {
        icon: "wifi-off",
        title: { pt: "Funciona offline", en: "Works offline" },
        caption: { pt: "Sincroniza quando a internet volta", en: "Syncs when you're back online" },
      },
    ],
  },
  {
    slug: "doe-mais-rs",
    name: "DOE+ RS",
    kind: { pt: "App mobile", en: "Mobile app" },
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
    highlights: [
      {
        icon: "route",
        title: { pt: "Quiz de elegibilidade", en: "Eligibility quiz" },
        caption: { pt: "Descobre se pode doar em 2 min", en: "Find out if you can donate in 2 min" },
      },
      {
        icon: "map-pin",
        title: { pt: "Mapa de hemocentros", en: "Blood-center map" },
        caption: { pt: "Acha o mais perto de você", en: "Finds the nearest one to you" },
      },
      {
        icon: "smartphone",
        title: { pt: "Instala no celular", en: "Installs on your phone" },
        caption: { pt: "App nativo com Capacitor", en: "Native app built with Capacitor" },
      },
    ],
  },
  {
    slug: "meu-semestre",
    name: "Meu Semestre",
    kind: { pt: "Organizador", en: "Organizer" },
    description: {
      pt: "Organizador da faculdade EAD: prazos, notas, caderno à mão e calculadora 12C.",
      en: "College organizer: deadlines, grades, handwritten notes and a 12C calculator.",
    },
    tags: ["HTML5", "JavaScript", "Firebase", "PWA"],
    repo: "https://github.com/palomagl/college-organizer-app",
    live: "https://college-organizer-app.vercel.app",
    image: "/projects/meu-semestre.webp",
    badge: "",
    group: "destaques",
    highlights: [
      {
        icon: "pen",
        title: { pt: "Caderno à mão", en: "Handwritten notebook" },
        caption: { pt: "Resolve contas com caneta touch", en: "Solve problems with a stylus" },
      },
      {
        icon: "calculator",
        title: { pt: "Calculadora 12C", en: "12C calculator" },
        caption: { pt: "Abre por cima de qualquer tela", en: "Opens over any screen" },
      },
      {
        icon: "wifi-off",
        title: { pt: "Funciona sem internet", en: "Works without internet" },
        caption: { pt: "Sincroniza sozinho depois", en: "Syncs by itself later" },
      },
    ],
  },
  {
    slug: "studymaps",
    name: "StudyMaps",
    kind: { pt: "App de estudos", en: "Study app" },
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
    highlights: [
      {
        icon: "route",
        title: { pt: "Trilha visual", en: "Visual track" },
        caption: { pt: "Nodes interativos por módulo", en: "Interactive nodes per module" },
      },
      {
        icon: "trending-up",
        title: { pt: "Progresso salvo", en: "Saved progress" },
        caption: { pt: "Vê o que já estudou", en: "See what you've studied" },
      },
    ],
  },
  {
    slug: "baly-sabores",
    name: "Baly Sabores",
    kind: { pt: "Landing page", en: "Landing page" },
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
    highlights: [
      {
        icon: "sparkles",
        title: { pt: "Uma cena por sabor", en: "One scene per flavor" },
        caption: { pt: "Cada rolagem muda a página", en: "Each scroll changes the page" },
      },
      {
        icon: "code",
        title: { pt: "Zero frameworks", en: "Zero frameworks" },
        caption: { pt: "Só HTML, CSS e JS puro", en: "Plain HTML, CSS and JS" },
      },
    ],
  },
  {
    slug: "barbershop",
    name: "BarberShop",
    kind: { pt: "Sistema web", en: "Web system" },
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
    highlights: [
      {
        icon: "calendar-check",
        title: { pt: "Agenda o horário", en: "Books the appointment" },
        caption: { pt: "Direto no site, sem WhatsApp", en: "Right on the site, no WhatsApp" },
      },
      {
        icon: "login",
        title: { pt: "Login de cliente", en: "Client login" },
        caption: { pt: "Autenticação com JWT", en: "JWT authentication" },
      },
    ],
  },
  {
    slug: "marmoraria",
    name: "Vértice Mármores", // nome fictício (a marca DF Mármores saiu)
    kind: { pt: "Sistema web", en: "Web system" },
    description: {
      pt: "Sistema para marmorarias: peças em 2D/3D, orçamentos e arquivos pra produção.",
      en: "System for stonework shops: 2D/3D pieces, quotes and production files.",
    },
    tags: ["TypeScript", "PostgreSQL", "CSS"],
    repo: "https://github.com/palomagl/vertice-marmores",
    live: "https://vertice-marmores.vercel.app",
    // TODO(Paloma): o repo/domínio já foram renomeados, mas o app por dentro
    // (textos, README, talvez algum print) ainda fala "DF Mármores e Granitos".
    // Print novo só depois de trocar isso lá dentro.
    image: "/projects/marmoraria.webp",
    badge: "",
    group: "destaques",
    highlights: [
      {
        icon: "boxes",
        title: { pt: "Peças em 2D e 3D", en: "2D and 3D pieces" },
        caption: { pt: "Visualiza antes de fechar", en: "Preview before closing the deal" },
      },
      {
        icon: "calculator",
        title: { pt: "Orçamento automático", en: "Automatic quotes" },
        caption: { pt: "Calcula o total na hora", en: "Calculates the total on the spot" },
      },
    ],
  },

  {
    slug: "bruto-burger",
    name: "Bruto",
    kind: { pt: "Loja de delivery", en: "Delivery store" },
    description: {
      pt: "Loja de delivery multi-loja: cardápio, carrinho, checkout e painel de pedidos.",
      en: "Multi-tenant delivery storefront: menu, cart, checkout and an order dashboard.",
    },
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind", "Zod"],
    repo: "https://github.com/palomagl/borapedir-delivery/tree/main/bruto",
    live: "https://borapedir-delivery.vercel.app/bruto",
    image: "/projects/bruto-burger.webp",
    badge: "",
    group: "destaques",
    highlights: [
      {
        icon: "cart",
        title: { pt: "Pedido sem app", en: "Order with no app" },
        caption: { pt: "Cardápio, carrinho e checkout no navegador", en: "Menu, cart and checkout in the browser" },
      },
      {
        icon: "credit-card",
        title: { pt: "Pix, cartão, dinheiro", en: "Pix, card, cash" },
        caption: { pt: "E também vale-refeição", en: "Meal vouchers too" },
      },
      {
        icon: "boxes",
        title: { pt: "Pronta pra 2ª loja", en: "Ready for a 2nd store" },
        caption: { pt: "A mesma base aguenta outro estabelecimento", en: "The same base can hold another business" },
      },
    ],
  },

  // ---------- Clientes e projetos aplicados ----------
  {
    slug: "nath-lorenzon-beauty",
    name: "Nath Lorenzon Beauty",
    kind: { pt: "Landing page", en: "Landing page" },
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
    highlights: [
      {
        icon: "smartphone",
        title: { pt: "Do Instagram pro WhatsApp", en: "From Instagram to WhatsApp" },
        caption: { pt: "Agenda em um clique", en: "Books in one click" },
      },
    ],
  },

  // ---------- Em desenvolvimento ----------
  {
    slug: "nexa-ia",
    name: "NEXA IA",
    kind: { pt: "Plataforma com IA", en: "AI platform" },
    description: {
      pt: "Plataforma pra criar sites e apps com IA, com backend próprio em Express.",
      en: "Platform to build sites and apps with AI, backed by a custom Express server.",
    },
    tags: ["React", "TypeScript", "Zustand", "Express", "Sandpack"],
    repo: "https://github.com/palomagl/nexa_ia",
    live: "https://nexa-ia-vert.vercel.app",
    image: "/projects/nexa-ia.webp",
    badge: "dev",
    group: "desenvolvimento",
    highlights: [
      {
        icon: "sparkles",
        title: { pt: "Cria com IA", en: "Builds with AI" },
        caption: { pt: "Descreve e o app nasce", en: "Describe it and the app appears" },
      },
      {
        icon: "eye",
        title: { pt: "Preview ao vivo", en: "Live preview" },
        caption: { pt: "Vê o código rodando na hora", en: "See the code run instantly" },
      },
      {
        icon: "mic",
        title: { pt: "Comando por voz", en: "Voice commands" },
        caption: { pt: "Dá pra falar em vez de digitar", en: "Speak instead of typing" },
      },
    ],
  },

  // ---------- Acadêmicos ----------
  {
    slug: "hotel-system",
    name: "Hotel System",
    kind: { pt: "Sistema desktop", en: "Desktop system" },
    description: {
      pt: "Sistema hoteleiro em JavaFX: reservas, check-in/out, dashboard e fatura em PDF.",
      en: "JavaFX hotel system: bookings, check-in/out, dashboard and PDF invoices.",
    },
    tags: ["Java", "JavaFX", "PostgreSQL"],
    repo: "https://github.com/palomagl/hotel_system",
    live: "",
    image: "/projects/hotel-system.webp", // TODO: prints reais do sistema
    badge: "course",
    group: "academicos",
    highlights: [
      {
        icon: "shield-check",
        title: { pt: "Trava overbooking", en: "Blocks overbooking" },
        caption: { pt: "Não deixa reservar quarto ocupado", en: "Won't book an occupied room" },
      },
      {
        icon: "file-text",
        title: { pt: "Fatura em PDF", en: "PDF invoice" },
        caption: { pt: "Gera e abre sozinha", en: "Generates and opens on its own" },
      },
      {
        icon: "pie-chart",
        title: { pt: "Dashboard com gráfico", en: "Dashboard with charts" },
        caption: { pt: "Ocupação em tempo real", en: "Real-time occupancy" },
      },
    ],
  },
  {
    slug: "jogo-da-forca",
    name: "Jogo da Forca",
    kind: { pt: "Jogo", en: "Game" },
    description: {
      pt: "Jogo da forca com interface gráfica, 3 dificuldades e minigame Termo.",
      en: "Hangman game with a GUI, three difficulty levels and a Wordle-style mini-game.",
    },
    tags: ["Python", "Tkinter"],
    repo: "https://github.com/palomagl/jogo-da-forca",
    live: "",
    image: "/projects/jogo-da-forca.webp",
    badge: "course",
    group: "academicos",
    highlights: [
      {
        icon: "dice",
        title: { pt: "3 dificuldades", en: "3 difficulty levels" },
        caption: { pt: "A dica some no nível difícil", en: "The hint disappears on hard" },
      },
      {
        icon: "gamepad",
        title: { pt: "Minigame Termo", en: "Termo mini-game" },
        caption: { pt: "Escondido no botão do topo", en: "Hidden in the top button" },
      },
      {
        icon: "trophy",
        title: { pt: "Pontuação com combo", en: "Combo scoring" },
        caption: { pt: "Streak de acertos vale mais", en: "Win streaks are worth more" },
      },
    ],
  },
];
