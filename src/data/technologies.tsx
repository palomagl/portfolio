/**
 * Tecnologias da seção "Tecnologias". Editar só aqui.
 * tier "orbital" = entra no grafo; tier "secondary" = bloco "Também trabalho com".
 */
import type { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiSupabase,
  SiPostgresql,
  SiGit,
  SiPython,
  SiHtml5,
  SiCss as SiCss3,
  SiJavascript,
  SiVuedotjs,
  SiExpress,
  SiPrisma,
  SiFramer,
  SiVite,
  SiMysql,
  SiCapacitor,
  SiVitest,
  SiLinux,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

export type TechTier = "orbital" | "secondary";

export interface Tech {
  name: string;
  Icon: IconType;
  color: string;
  tier: TechTier;
}

export const technologies: Tech[] = [
  // ---- Grafo orbital ----
  { name: "React", Icon: SiReact, color: "#61DAFB", tier: "orbital" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", tier: "orbital" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8", tier: "orbital" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E", tier: "orbital" },
  { name: "Supabase", Icon: SiSupabase, color: "#3FCF8E", tier: "orbital" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1", tier: "orbital" },
  { name: "Git", Icon: SiGit, color: "#F05032", tier: "orbital" },
  { name: "Python", Icon: SiPython, color: "#F7C948", tier: "orbital" },

  // ---- Também trabalho com ----
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26", tier: "secondary" },
  { name: "CSS3", Icon: SiCss3, color: "#1572B6", tier: "secondary" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", tier: "secondary" },
  { name: "Vue.js 3", Icon: SiVuedotjs, color: "#4FC08D", tier: "secondary" },
  { name: "Express", Icon: SiExpress, color: "#9CA3AF", tier: "secondary" },
  { name: "Prisma", Icon: SiPrisma, color: "#9CA3AF", tier: "secondary" },
  { name: "Framer Motion", Icon: SiFramer, color: "#BB6BD9", tier: "secondary" },
  { name: "Vite", Icon: SiVite, color: "#A78BFA", tier: "secondary" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1", tier: "secondary" },
  { name: "Java", Icon: FaJava, color: "#E76F00", tier: "secondary" },
  { name: "Capacitor", Icon: SiCapacitor, color: "#54BFFF", tier: "secondary" },
  { name: "Vitest", Icon: SiVitest, color: "#6E9F18", tier: "secondary" },
  { name: "Azure", Icon: VscAzure, color: "#3B9EDF", tier: "secondary" },
  { name: "Linux", Icon: SiLinux, color: "#9CA3AF", tier: "secondary" },
];

export const orbitalTech = technologies.filter((t) => t.tier === "orbital");
export const secondaryTech = technologies.filter((t) => t.tier === "secondary");
