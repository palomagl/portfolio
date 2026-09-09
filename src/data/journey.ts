/** Trajetória — nós da timeline. Editar só aqui. */

export type Tone = "orange" | "violet" | "blue" | "green";

interface L {
  pt: string;
  en: string;
}

export interface JourneyNode {
  org: L;
  role: L;
  period: L;
  description: L;
  tone: Tone;
}

export const journey: JourneyNode[] = [
  {
    org: { pt: "Karoane", en: "Karoane" },
    role: { pt: "Papelaria e Bazar", en: "Stationery & general store" },
    period: { pt: "2021 — atual", en: "2021 — present" },
    description: {
      pt: "Cuido da operação da loja online: cadastro de produtos, criação de anúncios e gestão das vendas na Shopee e no Mercado Livre. Também atendimento, estoque e caixa na loja física.",
      en: "I run the online store: product listings, ad creation and sales management on Shopee and Mercado Livre. Also customer service, inventory and register at the physical store.",
    },
    tone: "orange",
  },
  {
    org: { pt: "Meu Story TV", en: "Meu Story TV" },
    role: { pt: "Suporte e Desenvolvimento", en: "Support & Development" },
    period: { pt: "1 mês", en: "1 month" },
    description: {
      pt: "Primeira experiência em desenvolvimento dentro de uma empresa. Suporte ao cliente final, implementação de novas funcionalidades e melhorias no sistema em produção.",
      en: "First development experience inside a company. End-user support, new features and improvements to the system in production.",
    },
    tone: "violet",
  },
  {
    org: { pt: "Curso Técnico em Informática", en: "Technical Course in IT" },
    role: { pt: "Formação técnica", en: "Technical education" },
    period: { pt: "2025 — atual", en: "2025 — present" },
    description: {
      pt: "Java, Python, banco de dados e projetos acadêmicos.",
      en: "Java, Python, databases and academic projects.",
    },
    tone: "blue",
  },
  {
    org: { pt: "Projetos próprios e freelance", en: "Personal projects & freelance" },
    role: { pt: "Desenvolvimento web", en: "Web development" },
    period: { pt: "2025 — atual", en: "2025 — present" },
    description: {
      pt: "Aplicações web para clientes reais e projetos pessoais para acompanhar as tecnologias atuais.",
      en: "Web apps for real clients and personal projects to keep up with current technologies.",
    },
    tone: "green",
  },
];
