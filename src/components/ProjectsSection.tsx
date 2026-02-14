import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const projects = [
  { 
    title: "BarberShop FullStack", 
    descKey: "projects.barber.desc", 
    tags: ["Vue 3", "Node.js", "PostgreSQL", "JWT"], 
    gradient: "from-amber-500/20 to-zinc-800/20",
    github: "https://github.com/palomagl/barbearia-frontend", 
    link: "https://barbearia-frontend-woad.vercel.app/",
    image: "/print-barber.png"
  },
  { title: "E-commerce UI", descKey: "projects.ecommerce.desc", tags: ["Vue 3", "JavaScript", "CSS"], gradient: "from-secondary/20 to-primary/20" },
  { title: "Task Manager", descKey: "projects.taskmanager.desc", tags: ["Vue 3", "Tailwind", "LocalStorage"], gradient: "from-primary/15 to-secondary/25" },
  { title: "Portfolio Template", descKey: "projects.portfolio.desc", tags: ["HTML", "CSS", "JavaScript"], gradient: "from-secondary/25 to-primary/15" },
];

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">{t("projects.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("projects.title.1")}<span className="text-gradient">{t("projects.title.highlight")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-xl bg-card border border-border overflow-hidden glow-card gradient-border transition-transform duration-300 hover:scale-[1.02]"
      data-hover
    >
      <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
        {/* LOGICA DA IMAGEM AQUI */}
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-500"
          />
        ) : (
          <motion.div 
            animate={{ scale: isHovered ? 1.1 : 1 }} 
            transition={{ duration: 0.4 }} 
            className="text-4xl font-bold text-foreground/10 font-mono select-none"
          >
            {`<${project.title.split(" ")[0]} />`}
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors" 
            data-hover
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors" 
            data-hover
          >
            <Github className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t(project.descKey)}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary font-mono">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
