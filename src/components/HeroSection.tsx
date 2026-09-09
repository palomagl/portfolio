import { useState } from "react";
import { ArrowRight, Github, ImageIcon, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { site } from "@/data/site";

const HeroSection = () => {
  const { t } = useLanguage();
  const [photoState, setPhotoState] = useState<"loading" | "ok" | "error">("loading");

  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Brilhos de fundo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-secondary/10 blur-[130px]" />
      </div>

      <div className="container-page relative z-10 grid items-center gap-12 pb-16 pt-28 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Coluna esquerda */}
        <div>
          <p className="hero-rise eyebrow mb-4">{t("hero.greeting")}</p>

          <h1
            className="hero-rise text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[68px]"
            style={{ animationDelay: "0.08s" }}
          >
            Paloma <span className="text-gradient">Lorenzon</span>
          </h1>

          <p
            className="hero-rise mt-6 max-w-md text-xl font-normal text-foreground sm:text-2xl"
            style={{ animationDelay: "0.16s" }}
          >
            {t("hero.role")}
          </p>

          <p
            className="hero-rise mt-4 max-w-md text-[15px] leading-[1.65] text-muted-foreground"
            style={{ animationDelay: "0.24s" }}
          >
            {t("hero.tagline")}
          </p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium transition-all duration-300 hover:shadow-[0_0_30px_hsl(263_70%_58%/0.4)] hover:scale-105" data-hover>
            <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            {t("hero.projects")}
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-border text-foreground font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105" data-hover>
            <Mail className="w-4 h-4" />
            {t("hero.contact")}
          </a>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
