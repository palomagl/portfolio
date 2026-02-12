import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Skill {
  name: string;
  level: string;
  icon: string;
}

interface Category {
  key: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    key: "stack.category.frontend",
    skills: [
      { name: "JavaScript", level: "stack.advanced", icon: "⚡" },
      { name: "HTML5", level: "stack.advanced", icon: "🔶" },
      { name: "CSS3", level: "stack.advanced", icon: "🎨" },
      { name: "Vue.js 3", level: "stack.intermediate", icon: "🟢" },
      { name: "Bootstrap", level: "stack.advanced", icon: "🅱️" },
    ],
  },
  {
    key: "stack.category.backend",
    skills: [
      { name: "Node.js", level: "stack.intermediate", icon: "🟩" },
      { name: "Express", level: "stack.intermediate", icon: "⚡" },
    ],
  },
  {
    key: "stack.category.database",
    skills: [
      { name: "PostgreSQL", level: "stack.intermediate", icon: "🐘" },
      { name: "MySQL", level: "stack.basic", icon: "💾" },
    ],
  },
  {
    key: "stack.category.cloud",
    skills: [
      { name: "Git", level: "stack.advanced", icon: "🔧" },
      { name: "Azure", level: "stack.intermediate", icon: "☁️" },
      { name: "Linux", level: "stack.intermediate", icon: "🐧" },
      { name: "QA/Testes", level: "stack.basic", icon: "🧪" },
    ],
  },
];

const levelColors: Record<string, string> = {
  "stack.advanced": "from-primary to-secondary",
  "stack.intermediate_advanced": "from-primary/80 to-secondary/80",
  "stack.intermediate": "from-secondary/70 to-primary/70",
  "stack.basic_intermediate": "from-secondary/50 to-primary/50",
  "stack.basic": "from-secondary/40 to-primary/40",
};

const StackSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="stack" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">{t("stack.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("stack.title.1")}<span className="text-gradient">{t("stack.title.highlight")}</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {/* Front-end - linha inteira */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gradient">
              {t(categories[0].key)}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories[0].skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: skillIndex * 0.05 }}
                  className="group relative p-6 rounded-xl bg-card border border-border glow-card gradient-border cursor-default transition-transform duration-300 hover:scale-105"
                  data-hover
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h4 className="font-semibold text-sm mb-2">{skill.name}</h4>
                  <span className={`inline-block text-[10px] font-mono px-2.5 py-1 rounded-full bg-gradient-to-r ${levelColors[skill.level]} text-primary-foreground`}>
                    {t(skill.level)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Back-end e Bancos de Dados - lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[categories[1], categories[2]].map((category, categoryIndex) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + (categoryIndex * 0.1) }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-gradient">
                  {t(category.key)}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.1 + (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      className="group relative p-6 rounded-xl bg-card border border-border glow-card gradient-border cursor-default transition-transform duration-300 hover:scale-105"
                      data-hover
                    >
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {skill.icon}
                      </div>
                      <h4 className="font-semibold text-sm mb-2">{skill.name}</h4>
                      <span className={`inline-block text-[10px] font-mono px-2.5 py-1 rounded-full bg-gradient-to-r ${levelColors[skill.level]} text-primary-foreground`}>
                        {t(skill.level)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cloud & Tools - linha inteira */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gradient">
              {t(categories[3].key)}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories[3].skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + (skillIndex * 0.05) }}
                  className="group relative p-6 rounded-xl bg-card border border-border glow-card gradient-border cursor-default transition-transform duration-300 hover:scale-105"
                  data-hover
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h4 className="font-semibold text-sm mb-2">{skill.name}</h4>
                  <span className={`inline-block text-[10px] font-mono px-2.5 py-1 rounded-full bg-gradient-to-r ${levelColors[skill.level]} text-primary-foreground`}>
                    {t(skill.level)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;
