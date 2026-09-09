import { Briefcase, Code2, GraduationCap, LifeBuoy, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReveal } from "@/hooks/useReveal";
import { site } from "@/data/site";
import { journey, type Tone } from "@/data/journey";

const icons: LucideIcon[] = [Briefcase, LifeBuoy, GraduationCap, Code2];

const toneGradient: Record<Tone, string> = {
  orange: "from-orange-500 to-amber-400",
  violet: "from-violet-500 to-fuchsia-400",
  blue: "from-sky-500 to-blue-400",
  green: "from-emerald-500 to-teal-400",
};

const JourneySection = () => {
  const { t, lang } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLDivElement>();

  return (
    <section id="trajetoria" className="section-divider py-24">
      <div
        ref={ref}
        className={`container-page ${revealClass} grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16`}
      >
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-3">{t("journey.eyebrow")}</p>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-[34px]">
            {t("journey.title")}
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-muted-foreground">
            {t("journey.desc")}
          </p>
          {site.links.linkedin && (
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full border border-hairline px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-hover
            >
              Ver detalhes no LinkedIn
            </a>
          )}
        </div>

        <ol className="grid gap-8 md:grid-cols-4 md:gap-5">
          {journey.map((node, i) => {
            const Icon = icons[i] ?? Briefcase;
            const isLast = i === journey.length - 1;
            return (
              <li key={node.org.pt} className="relative flex gap-4 md:block">
                {/* Conector horizontal (desktop) */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-11 right-[-1.25rem] top-5 hidden h-px bg-gradient-to-r from-border to-transparent md:block"
                  />
                )}
                {/* Conector vertical (mobile) */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-2rem] left-[19px] top-11 w-px bg-border md:hidden"
                  />
                )}

                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${toneGradient[node.tone]}`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <div className="md:mt-4">
                  <h3 className="text-[15px] font-medium">{node.org[lang]}</h3>
                  {node.role[lang] && (
                    <p className="text-[13px] text-muted-foreground">{node.role[lang]}</p>
                  )}
                  <p className="mt-0.5 font-mono text-[12px] text-primary">{node.period[lang]}</p>
                  <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">
                    {node.description[lang]}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default JourneySection;
