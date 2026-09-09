/** Etapas da seção "Como eu construo". Editar só aqui. */

interface L {
  pt: string;
  en: string;
}

export interface ProcessStep {
  icon: "understand" | "structure" | "build" | "review" | "ship";
  title: L;
  description: L;
}

export const process: ProcessStep[] = [
  {
    icon: "understand",
    title: { pt: "Entender o problema", en: "Understand the problem" },
    description: {
      pt: "Converso com quem vai usar antes de abrir o editor.",
      en: "I talk to the people who'll use it before opening the editor.",
    },
  },
  {
    icon: "structure",
    title: { pt: "Estruturar", en: "Structure" },
    description: {
      pt: "Defino as telas, os dados e o que entra na primeira versão.",
      en: "I define the screens, the data and what goes into the first version.",
    },
  },
  {
    icon: "build",
    title: { pt: "Construir", en: "Build" },
    description: {
      pt: "Código, testes e ajustes até funcionar de ponta a ponta.",
      en: "Code, tests and tweaks until it works end to end.",
    },
  },
  {
    icon: "review",
    title: { pt: "Revisar", en: "Review" },
    description: {
      pt: "Uso IA no fluxo para acelerar e revisar, mas leio e testo tudo antes de aceitar.",
      en: "I use AI in the flow to move faster and review, but I read and test everything before accepting it.",
    },
  },
  {
    icon: "ship",
    title: { pt: "Publicar", en: "Ship" },
    description: {
      pt: "Deploy na Vercel e acompanhamento depois que está no ar.",
      en: "Deploy on Vercel and follow-up once it's live.",
    },
  },
];
