import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, ImageIcon, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { site } from "@/data/site";

const HeroSection = () => {
  const { t } = useLanguage();
  const [photoState, setPhotoState] = useState<"loading" | "ok" | "error">("loading");

  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const blobA = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 90]);
  const blobB = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -70]);

  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Brilhos de fundo (parallax no scroll) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ y: blobA }}
          className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[130px]"
        />
        <motion.div
          style={{ y: blobB }}
          className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-secondary/10 blur-[130px]"
        />
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

          <div className="hero-rise mt-8 flex flex-wrap gap-4" style={{ animationDelay: "0.32s" }}>
            <a
              href="#projetos"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-hover
            >
              {t("hero.projects")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-hover
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>

          <ul
            className="hero-rise mt-8 flex items-center gap-5 text-muted-foreground"
            style={{ animationDelay: "0.4s" }}
          >
            <li>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-hover
              >
                <Github className="h-5 w-5" />
              </a>
            </li>
            {site.links.linkedin && (
              <li>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-hover
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </li>
            )}
            <li>
              <a
                href={site.links.emailCompose}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enviar e-mail"
                className="inline-flex rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-hover
              >
                <Mail className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>

        {/* Coluna direita */}
        <div className="hero-rise relative mx-auto w-full max-w-[340px] sm:max-w-[360px]" style={{ animationDelay: "0.24s" }}>
          <div className="relative aspect-[9/11] w-full">
            {/* Placeholder — some sozinho quando /paloma.jpg entrar na pasta public */}
            {photoState !== "ok" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-foreground/15 bg-muted/60 text-muted-foreground">
                <ImageIcon className="h-6 w-6" aria-hidden="true" />
                <span className="font-mono text-[11px]">/paloma.jpg · 900×1100</span>
              </div>
            )}
            <img
              src={site.photo}
              alt="Paloma Lorenzon"
              width={900}
              height={1100}
              hidden={photoState === "error"}
              onLoad={() => setPhotoState("ok")}
              onError={() => setPhotoState("error")}
              className="relative h-full w-full object-cover"
              style={{
                WebkitMaskImage:
                  "radial-gradient(80% 78% at 52% 42%, #000 55%, transparent 100%)",
                maskImage:
                  "radial-gradient(80% 78% at 52% 42%, #000 55%, transparent 100%)",
              }}
            />
          </div>

          {/* Card de terminal */}
          <div className="absolute -left-5 top-14 rounded-lg border border-hairline bg-card/95 p-3.5 font-mono text-[11px] shadow-xl shadow-black/30 backdrop-blur-sm sm:-left-14 sm:top-16">
            <div className="mb-2 flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            </div>
            {["build", "create", "improve"].map((line) => (
              <p key={line} className="leading-5">
                <span className="text-primary">&gt;</span> {line}
              </p>
            ))}
            <p className="leading-5">
              <span className="text-primary">&gt;</span> repeat
              <span className="blink">_</span>
            </p>
          </div>

          {/* Glifo </> */}
          <span
            className="absolute right-2 top-2 font-mono text-4xl text-primary"
            style={{ textShadow: "0 0 24px hsl(var(--glow-primary) / 0.5)" }}
            aria-hidden="true"
          >
            &lt;/&gt;
          </span>

          {/* Texto manuscrito — 4 palavras empilhadas */}
          <div
            className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-[38%] rotate-6 flex-col items-start gap-1 font-hand text-[26px] leading-none text-muted-foreground lg:flex"
            aria-hidden="true"
          >
            {t("hero.terminalNote")
              .split(" · ")
              .map((word) => (
                <span key={word}>{word}</span>
              ))}
          </div>

          {/* Doodles */}
          <svg
            className="absolute -bottom-3 left-4 hidden h-12 w-16 text-muted-foreground/60 sm:block"
            viewBox="0 0 64 48"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 42 C 18 46, 40 40, 54 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M54 16 l -8 4 M54 16 l -1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <svg
            className="absolute -left-5 top-12 h-4 w-4 text-primary/70"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0 L9.6 6.4 L16 8 L9.6 9.6 L8 16 L6.4 9.6 L0 8 L6.4 6.4 Z" />
          </svg>

          {/* Legenda */}
          <div className="absolute -bottom-2 right-2 flex items-center gap-3">
            <span className="h-8 w-px bg-foreground/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <div className="leading-tight">
              <p className="text-xs font-medium">{site.name}</p>
              <p className="text-[11px] text-muted-foreground">{t("hero.captionRole")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
