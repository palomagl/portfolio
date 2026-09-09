import { Code2, LayoutGrid, Lightbulb, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReveal } from "@/hooks/useReveal";
import { process, type ProcessStep } from "@/data/process";

const stepIcons: Record<ProcessStep["icon"], LucideIcon> = {
  understand: Lightbulb,
  structure: LayoutGrid,
  build: Code2,
  review: Sparkles,
  ship: Rocket,
};

const ProcessSection = () => {
  const { t, lang } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLDivElement>();

  return (
    <section id="processo" className="section-divider bg-section-alt py-24">
      <div
        ref={ref}
        className={`container-page ${revealClass} grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16`}
      >
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-3">{t("process.eyebrow")}</p>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-[34px]">
            {t("process.title")}
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-muted-foreground">
            {t("process.desc")}
          </p>
        </div>

        <ol className="grid gap-8 md:grid-cols-5 md:gap-4">
          {process.map((step, i) => {
            const Icon = stepIcons[step.icon];
            const isLast = i === process.length - 1;
            return (
              <li key={step.icon} className="relative flex gap-4 md:block">
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[52px] right-[-1rem] top-6 hidden h-px bg-gradient-to-r from-border to-transparent md:block"
                  />
                )}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-2rem] left-[25px] top-[52px] w-px bg-border md:hidden"
                  />
                )}

                <div className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-hairline bg-background">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <div className="md:mt-4">
                  <p className="font-mono text-[11px] text-muted-foreground/60">0{i + 1}</p>
                  <h3 className="mt-0.5 text-[14px] font-medium">{step.title[lang]}</h3>
                  <p className="mt-1.5 text-[13px] leading-[1.6] text-muted-foreground">
                    {step.description[lang]}
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

export default ProcessSection;
