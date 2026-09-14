import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReveal } from "@/hooks/useReveal";
import { site } from "@/data/site";
import { projectBadges, projects, type Project } from "@/data/projects";

const PER_PAGE = 8; // 2 fileiras × 4 colunas no desktop
const PAGE_COUNT = Math.ceil(projects.length / PER_PAGE);

const ProjectsSection = () => {
  const { t, lang } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLDivElement>();
  const reduce = useReducedMotion();
  const [[page, dir], setPage] = useState<[number, number]>([0, 0]);

  const goTo = useCallback(
    (next: number) => setPage(([current]) => [next, next > current ? 1 : -1]),
    [],
  );

  // Link "#projeto-<slug>" (vindo da seção Tecnologias): abre a página certa e rola até o card.
  useEffect(() => {
    const jump = () => {
      const match = window.location.hash.match(/^#projeto-(.+)$/);
      if (!match) return;
      const index = projects.findIndex((p) => p.slug === match[1]);
      if (index < 0) return;
      setPage(([current]) => {
        const target = Math.floor(index / PER_PAGE);
        return [target, target > current ? 1 : -1];
      });
      requestAnimationFrame(() => {
        document
          .getElementById(`projeto-${match[1]}`)
          ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      });
    };
    jump();
    window.addEventListener("hashchange", jump);
    return () => window.removeEventListener("hashchange", jump);
  }, [reduce]);

  const start = page * PER_PAGE;
  const shown = projects.slice(start, start + PER_PAGE);

  const listVariants: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, x: dir * 40 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.32, ease: "easeOut", staggerChildren: 0.055, delayChildren: 0.05 },
        },
        exit: { opacity: 0, x: dir * -40, transition: { duration: 0.2 } },
      };

  const cardVariants: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, y: 24, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0 },
      };

  return (
    <section id="projetos" className="section-divider bg-section-alt py-24">
      <div ref={ref} className={`container-page ${revealClass}`}>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow mb-3">{t("projects.eyebrow")}</p>
            <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-[34px]">
              {t("projects.title.1")}{" "}
              <span className="text-gradient">{t("projects.title.2")}</span>
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65] text-muted-foreground">
              {t("projects.desc")}
            </p>
          </div>

          <div className="flex items-center gap-6 md:flex-col md:items-end">
            <a
              href={`${site.links.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-hover
            >
              {t("projects.viewAll")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            {PAGE_COUNT > 1 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => goTo(page - 1)}
                  disabled={page === 0}
                  aria-label={t("projects.prev")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-30 disabled:hover:border-hairline disabled:hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-hover
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(page + 1)}
                  disabled={page === PAGE_COUNT - 1}
                  aria-label={t("projects.next")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-30 disabled:hover:border-hairline disabled:hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-hover
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.ul
              key={page}
              custom={dir}
              variants={listVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
            >
              {shown.map((project, i) => (
                <motion.li
                  key={project.slug}
                  id={`projeto-${project.slug}`}
                  variants={cardVariants}
                  className="scroll-mt-24"
                >
                  {/* Linha compacta — telas pequenas */}
                  <div className="sm:hidden">
                    <ProjectListRow project={project} lang={lang} t={t} />
                  </div>
                  {/* Card com imagem — sm e acima */}
                  <div className="hidden h-full sm:block">
                    <ProjectCard
                      project={project}
                      index={start + i + 1}
                      lang={lang}
                      t={t}
                      reduce={!!reduce}
                    />
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {PAGE_COUNT > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: PAGE_COUNT }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${t("projects.page")} ${i + 1}`}
                aria-current={i === page}
                className={`h-1.5 rounded-full transition-all ${
                  i === page
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
                data-hover
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/** Moldura da imagem: vira link (abre o projeto) quando há URL, senão fica estática. */
const MediaFrame = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) => {
  const className =
    "relative block aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/15 to-secondary/15";

  if (!href) {
    return <div className={className}>{children}</div>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${className} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring`}
      data-hover
    >
      {children}
    </a>
  );
};

/** Linha compacta usada na lista mobile: thumb + título/descrição/tags + ações. */
const ProjectListRow = ({
  project,
  lang,
  t,
}: {
  project: Project;
  lang: "pt" | "en";
  t: (k: string) => string;
}) => {
  const [imgOk, setImgOk] = useState(true);
  const description = project.description[lang] || t("projects.todoDesc");
  const visibleTags = project.tags.slice(0, 2);
  const extraTags = project.tags.length - visibleTags.length;

  return (
    <article className="flex items-center gap-3 rounded-xl border border-hairline bg-card p-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/15 to-secondary/15">
        {imgOk ? (
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-[10px] text-foreground/25">
              {`<${project.name.split(" ")[0]}/>`}
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[14px] font-medium">{project.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-[12px] leading-[1.5] text-muted-foreground">
          {description}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-hairline bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {extraTags > 0 && (
            <span className="rounded-md border border-hairline bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground">
              +{extraTags}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("projects.viewSite")} — ${project.name}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-hover
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("projects.viewCode")} — ${project.name}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-hover
          >
            <Github className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
};

const ProjectCard = ({
  project,
  index,
  lang,
  t,
  reduce,
}: {
  project: Project;
  index: number;
  lang: "pt" | "en";
  t: (k: string) => string;
  reduce: boolean;
}) => {
  const [imgOk, setImgOk] = useState(true);
  const cardRef = useRef<HTMLElement>(null);
  const description = project.description[lang] || t("projects.todoDesc");

  // Clicar na imagem abre o projeto no ar (Vercel); sem site, cai pro repositório.
  const mediaHref = project.live || project.repo;

  // Spotlight que segue o cursor (desligado com prefers-reduced-motion).
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_-18px_hsl(var(--glow-primary)/0.45)] focus-within:-translate-y-1 focus-within:border-primary/30"
    >
      {/* Spotlight radial seguindo o mouse */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 0%), hsl(var(--glow-primary) / 0.16), transparent 65%)",
        }}
      />
      {/* Borda que acende no hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-xl ring-1 ring-inset ring-transparent transition-colors duration-300 group-hover:ring-primary/25"
      />

      <MediaFrame href={mediaHref} label={`${t("projects.viewSite")} — ${project.name}`}>
        {imgOk ? (
          <img
            src={project.image}
            alt={`Prévia do projeto ${project.name}`}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-sm text-foreground/25">
              {`<${project.name.split(" ")[0]} />`}
            </span>
          </div>
        )}

        {/* Scrim inferior — dá profundidade e destaca o conteúdo abaixo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/70 via-card/0 to-card/0 opacity-60 transition-opacity duration-300 group-hover:opacity-90"
        />

        <span className="absolute right-3 top-3 font-mono text-[11px] tabular-nums text-foreground/40 transition-colors duration-300 group-hover:text-foreground/70">
          {String(index).padStart(2, "0")}
        </span>

        {project.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-hairline bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
            {projectBadges[project.badge][lang]}
          </span>
        )}

        {mediaHref && (
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 inline-flex h-8 w-8 translate-y-2 items-center justify-center rounded-full border border-hairline bg-background/85 text-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:shadow-[0_0_18px_hsl(var(--glow-primary)/0.5)]"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        )}
      </MediaFrame>

      <div className="relative flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-medium">
          <span className="bg-gradient-to-r from-primary to-secondary bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
            {project.name}
          </span>
        </h3>
        <p className="mt-1.5 line-clamp-3 text-[13px] leading-[1.6] text-muted-foreground">
          {description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-hairline bg-muted/50 px-2 py-0.5 text-[11px] text-muted-foreground transition-colors duration-300 group-hover:border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {(project.live || project.repo) && (
          <div className="mt-4 flex items-center gap-4 border-t border-hairline pt-3 text-[13px]">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1 rounded text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-hover
              >
                {t("projects.viewSite")}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-hover
              >
                <Github className="h-3.5 w-3.5" />
                {t("projects.viewCode")}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectsSection;
