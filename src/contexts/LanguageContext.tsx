import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "pt" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.home": { pt: "Início", en: "Home" },
  "nav.projects": { pt: "Projetos", en: "Projects" },
  "nav.journey": { pt: "Trajetória", en: "Journey" },
  "nav.tech": { pt: "Tecnologias", en: "Technologies" },
  "nav.about": { pt: "Sobre", en: "About" },
  "nav.contact": { pt: "Contato", en: "Contact" },
  "nav.stack": { pt: "Stack", en: "Stack" },
  "nav.profile": { pt: "Perfil", en: "Profile" },

  // Hero
  "hero.greeting": { pt: "Olá, eu sou", en: "Hi, I'm" },
  "hero.role": {
    pt: "Desenvolvedora de aplicações web e experiências digitais.",
    en: "Developer of web applications and digital experiences.",
  },
  "hero.tagline": {
    pt: "Eu transformo ideias em soluções reais, com foco em performance, boas experiências e um código que faz sentido.",
    en: "I turn ideas into real solutions, focused on performance, good experiences and code that makes sense.",
  },
  "hero.projects": { pt: "Ver projetos", en: "View projects" },
  "hero.contact": { pt: "Contato", en: "Contact" },
  "hero.captionRole": { pt: "Front-End Developer", en: "Front-End Developer" },
  "hero.terminalNote": { pt: "ideias · código · projetos · realidade", en: "ideas · code · projects · reality" },

  // About
  "about.label": { pt: "Sobre mim", en: "About me" },
  "about.title.1": { pt: "Quem está por trás do ", en: "The person behind the " },
  "about.title.highlight": { pt: "código", en: "code" },
  "about.p1": {
    pt: "Sou desenvolvedora front-end com foco em JavaScript e criação de interfaces funcionais, organizadas e com identidade visual própria. Gosto de transformar layouts em experiências reais — com código limpo, estruturado e que faça sentido para quem usa.",
    en: "I'm a front-end developer focused on JavaScript and building functional, well-organized interfaces with a distinctive visual identity. I enjoy turning layouts into real experiences — with clean, structured code that makes sense for the end user.",
  },
  "about.p2": {
    pt: "Estou em constante evolução, explorando novas ferramentas e formas de construir para a web. Tenho base em Node.js e PostgreSQL, o que me dá uma visão mais ampla do ciclo de desenvolvimento. Meu objetivo é sempre entregar algo que funcione bem e que seja agradável de manter.",
    en: "I'm constantly evolving, exploring new tools and ways to build for the web. I have a foundation in Node.js and PostgreSQL, which gives me a broader view of the development cycle. My goal is always to deliver something that works well and is pleasant to maintain.",
  },
  "about.motto": {
    pt: "Sempre aprendendo, sempre construindo.",
    en: "Always learning, always building.",
  },
  "about.badge.frontend": { pt: "Front-End", en: "Front-End" },

  // Stack
  "stack.label": { pt: "Stack", en: "Stack" },
  "stack.title.1": { pt: "Minhas ", en: "My " },
  "stack.title.highlight": { pt: "ferramentas", en: "tools" },
  "stack.category.frontend": { pt: "Front-end", en: "Front-end" },
  "stack.category.backend": { pt: "Back-end", en: "Back-end" },
  "stack.category.database": { pt: "Bancos de Dados", en: "Databases" },
  "stack.category.cloud": { pt: "Cloud & Tools", en: "Cloud & Tools" },
  "stack.advanced": { pt: "Avançado", en: "Advanced" },
  "stack.intermediate_advanced": { pt: "Avançado", en: "Advanced" },
  "stack.intermediate": { pt: "Intermediário", en: "Intermediate" },
  "stack.basic_intermediate": { pt: "Intermediário", en: "Intermediate" },
  "stack.basic": { pt: "Intermediário", en: "Intermediate" },

  // Profile
  "profile.label": { pt: "Perfil", en: "Profile" },
  "profile.title.1": { pt: "Meu ", en: "My " },
  "profile.title.highlight": { pt: "perfil", en: "profile" },
  "profile.teamwork": { pt: "Trabalho em equipe", en: "Teamwork" },
  "profile.communication": { pt: "Comunicação clara", en: "Clear communication" },
  "profile.organization": { pt: "Organização", en: "Organization" },
  "profile.learning": { pt: "Facilidade de aprendizado", en: "Fast learner" },
  "profile.commitment": { pt: "Comprometimento", en: "Commitment" },
  "profile.detail": { pt: "Atenção aos detalhes", en: "Attention to detail" },

  // Projects
  "projects.label": { pt: "Projetos", en: "Projects" },
  "projects.title.1": { pt: "Trabalhos em ", en: "Featured " },
  "projects.title.highlight": { pt: "destaque", en: "work" },
  "projects.barber.desc": {
    pt: "Sistema Full Stack completo com agendamentos, painel administrativo, faturamento automático e integração com WhatsApp.",
    en: "Complete Full Stack system with bookings, admin panel, automatic revenue calculation, and WhatsApp integration.",
  },
  "projects.dashboard.desc": {
    pt: "Dashboard Full Stack para gestão de rotina, hábitos e finanças com suporte multi-idioma e interface personalizada.",
    en: "Full Stack Dashboard for routine, habit, and finance management with multi-language support and custom interface.",
  },
  "projects.taskmanager.desc": {
    pt: "App de gerenciamento de tarefas com drag & drop, categorias e modo escuro.",
    en: "Task management app with drag & drop, categories and dark mode.",
  },
  "projects.portfolio.desc": {
    pt: "Template de portfólio responsivo e animado com design minimalista e moderno.",
    en: "Responsive and animated portfolio template with minimalist, modern design.",
  },

  // Contact
  "contact.label": { pt: "Contato", en: "Contact" },
  "contact.title.1": { pt: "Vamos ", en: "Let's " },
  "contact.title.highlight": { pt: "trabalhar juntos", en: "work together" },
  "contact.title.2": { pt: "?", en: "?" },
  "contact.subtitle": {
    pt: "Estou sempre aberta a novas oportunidades, projetos interessantes e conversas sobre tecnologia.",
    en: "I'm always open to new opportunities, interesting projects and conversations about technology.",
  },
  "contact.github": { pt: "Veja meu código", en: "See my code" },
  "contact.linkedin": { pt: "Conecte-se comigo", en: "Connect with me" },
  "contact.email": { pt: "Envie uma mensagem", en: "Send a message" },
  "contact.footer": {
    pt: "Feito com 💜 por Paloma Lorenzon",
    en: "Made with 💜 by Paloma Lorenzon",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("portfolio-lang");
    return (saved === "en" ? "en" : "pt") as Lang;
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("portfolio-lang", l);
  };

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
