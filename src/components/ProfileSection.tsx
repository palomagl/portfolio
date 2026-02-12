import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, MessageCircle, FolderKanban, Lightbulb, Target, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProfileSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const traits = [
    { key: "profile.teamwork", icon: Users, color: "from-primary to-secondary" },
    { key: "profile.communication", icon: MessageCircle, color: "from-secondary to-primary" },
    { key: "profile.organization", icon: FolderKanban, color: "from-primary to-secondary" },
    { key: "profile.learning", icon: Lightbulb, color: "from-secondary to-primary" },
    { key: "profile.commitment", icon: Target, color: "from-primary to-secondary" },
    { key: "profile.detail", icon: Eye, color: "from-secondary to-primary" },
  ];

  return (
    <section id="profile" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">
            {t("profile.label")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("profile.title.1")}
            <span className="text-gradient">{t("profile.title.highlight")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {traits.map((trait, i) => (
            <motion.div
              key={trait.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 rounded-xl bg-card border border-border glow-card gradient-border cursor-default transition-transform duration-300 hover:scale-105"
              data-hover
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${trait.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <trait.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-sm">{t(trait.key)}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
