import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReveal } from "@/hooks/useReveal";
import { site } from "@/data/site";
import { projectBadges, projects, type Project } from "@/data/projects";

const ProjectsSection = () => {
  const { t, lang } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLDivElement>();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true, containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="projetos" className="section-divider bg-section-alt py-24">
      <div ref={ref} className={`container-page ${revealClass}`}>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
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
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              data-hover
            >
              {t("projects.viewAll")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canPrev}
                aria-label={t("projects.prev")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40 disabled:opacity-30 disabled:hover:text-muted-foreground disabled:hover:border-hairline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-hover
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canNext}
                aria-label={t("projects.next")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40 disabled:opacity-30 disabled:hover:text-muted-foreground disabled:hover:border-hairline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-hover
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <ul className="flex gap-5">
            {projects.map((project) => (
              <li
                key={project.slug}
                id={`projeto-${project.slug}`}
                className="min-w-0 shrink-0 basis-[85%] scroll-mt-24 sm:basis-[46%] lg:basis-[31%] xl:basis-[28%]"
              >
                <ProjectCard project={project} lang={lang} t={t} />
              </li>
            ))}
          </ul>
        </div>
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
                className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
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
                className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
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
