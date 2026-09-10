import { useLanguage } from "@/contexts/LanguageContext";
import { useReveal } from "@/hooks/useReveal";
import { site } from "@/data/site";
import { orbitalTech, secondaryTech } from "@/data/technologies";
import { projects } from "@/data/projects";

/** Raio do grafo orbital, em % a partir do centro do container. */
const RADIUS = 34;

const orbitNodes = orbitalTech.map((tech, i) => {
  const angle = (i / orbitalTech.length) * 2 * Math.PI - Math.PI / 2;
  return {
    ...tech,
    label: tech.short ?? tech.name,
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  };
});

const TechSection = () => {
  const { t } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLDivElement>();

  return (
    <section id="tecnologias" className="section-divider py-24">
      <div
        ref={ref}
        className={`container-page ${revealClass} grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16`}
      >
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-3">{t("tech.eyebrow")}</p>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-[34px]">
            {t("tech.title")}
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-muted-foreground">
            {t("tech.desc")}
          </p>
        </div>

        <div className="space-y-10">
          {/* Grafo orbital (sm+) */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[380px] py-4 sm:block">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
            />

            <svg
              className="absolute inset-0 h-full w-full text-border"
              viewBox="0 0 100 100"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {orbitNodes.map((node) => (
                <line
                  key={node.name}
                  x1="50"
                  y1="50"
                  x2={node.x}
                  y2={node.y}
                  stroke="currentColor"
                  strokeWidth="0.25"
                  strokeOpacity="0.5"
                />
              ))}
              <circle
                cx="50"
                cy="50"
                r={RADIUS}
                stroke="currentColor"
                strokeWidth="0.3"
                strokeDasharray="0.9 1.8"
                strokeOpacity="0.8"
              />
            </svg>

            <div
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-hairline bg-card shadow-sm"
              style={{ boxShadow: "0 0 40px hsl(var(--glow-primary) / 0.22)" }}
            >
              <img src={site.logo} alt="" aria-hidden="true" className="h-11 w-11 object-cover" />
            </div>

            {orbitNodes.map((node) => {
              const Icon = node.Icon;
              return (
                <div
                  key={node.name}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-card shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-[22px] w-[22px]" style={{ color: node.color }} aria-hidden="true" />
                  </span>
                  <span className="absolute left-1/2 top-[calc(100%+6px)] -translate-x-1/2 whitespace-nowrap text-[11px] text-muted-foreground">
                    {node.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Grade (mobile) */}
          <ul className="grid grid-cols-3 gap-3 sm:hidden">
            {orbitalTech.map((tech) => {
              const Icon = tech.Icon;
              return (
                <li
                  key={tech.name}
                  className="flex flex-col items-center gap-2 rounded-xl border border-hairline bg-card p-4"
                >
                  <Icon className="h-6 w-6" style={{ color: tech.color }} aria-hidden="true" />
                  <span className="text-center text-[11px] text-muted-foreground">{tech.short ?? tech.name}</span>
                </li>
              );
            })}
          </ul>

          {/* Também trabalho com */}
          <div className="border-t border-hairline pt-10">
            <p className="eyebrow mb-4">{t("tech.secondary")}</p>
            <ul className="flex flex-wrap gap-2">
              {secondaryTech.map((tech) => {
                const Icon = tech.Icon;
                return (
                  <li
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-muted/30 px-3 py-1.5 text-[12px] text-muted-foreground"
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: tech.color }} aria-hidden="true" />
                    {tech.name}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Projetos que usam essas tecnologias */}
          <div className="border-t border-hairline pt-10">
            <p className="eyebrow mb-4">{t("tech.projects")}</p>
            <ul className="flex flex-wrap gap-2">
              {projects.map((project) => (
                <li key={project.slug}>
                  <a
                    href={`#projeto-${project.slug}`}
                    className="inline-flex rounded-full border border-hairline px-3 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    data-hover
                  >
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
