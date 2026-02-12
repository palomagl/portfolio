import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">{t("about.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("about.title.1")}<span className="text-gradient">{t("about.title.highlight")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl" />
              <div className="relative w-full h-full rounded-2xl bg-card border border-border overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Code2 className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <p className="text-sm font-mono text-muted-foreground">&lt;{t("about.badge.frontend")} /&gt;</p>
                </div>
              </div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 -right-4 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-mono text-primary glow-card">
                Vue 3
              </motion.div>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-mono text-secondary glow-card">
                JavaScript
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }} className="space-y-5">
            <p className="text-muted-foreground leading-relaxed">{t("about.p1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("about.p2")}</p>
            <div className="flex items-center gap-2 text-sm text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="font-mono">{t("about.motto")}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
