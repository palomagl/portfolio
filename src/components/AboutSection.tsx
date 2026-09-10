import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReveal } from "@/hooks/useReveal";

const AboutSection = () => {
  const { t } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLDivElement>();

  return (
    <section id="sobre" className="section-divider bg-section-alt py-24">
      <div
        ref={ref}
        className={`container-page ${revealClass} grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16`}
      >
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-3">{t("about.label")}</p>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-[34px]">
            {t("about.title.1")}
            <span className="text-gradient">{t("about.title.highlight")}</span>
          </h2>
        </div>

        <div className="max-w-2xl space-y-5">
          <p className="text-[15px] leading-[1.7] text-muted-foreground">{t("about.p1")}</p>
          <p className="text-[15px] leading-[1.7] text-muted-foreground">{t("about.p2")}</p>
          <p className="inline-flex items-center gap-2 pt-2 font-mono text-[13px] text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {t("about.motto")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
