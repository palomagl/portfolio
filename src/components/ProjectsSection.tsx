import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
              initial={reduce ? false : { opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="grid grid-cols-2 gap-5 lg:grid-cols-4"
            >
              {shown.map((project) => (
                <li key={project.slug} id={`projeto-${project.slug}`} className="scroll-mt-24">
                  <ProjectCard project={project} lang={lang} t={t} />
                </li>
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

const ProjectCard = ({
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

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-card transition-colors hover:border-primary/30">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/15 to-secondary/15">
        {imgOk ? (
          <img
            src={project.image}
            alt={`Prévia do projeto ${project.name}`}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-sm text-foreground/25">
              {`<${project.name.split(" ")[0]} />`}
            </span>
          </div>
        )}

        {project.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-hairline bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
            {projectBadges[project.badge][lang]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-medium">{project.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.6] text-muted-foreground">
          {description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-hairline bg-muted/50 px-2 py-0.5 text-[11px] text-muted-foreground"
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
                className="inline-flex items-center gap-1 rounded text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-hover
              >
                {t("projects.viewSite")}
                <ArrowUpRight className="h-3.5 w-3.5" />
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
