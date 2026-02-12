import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const contacts = [
    { label: "GitHub", href: "https://github.com", icon: Github, descKey: "contact.github" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin, descKey: "contact.linkedin" },
    { label: "Email", 
      href: "https://mail.google.com/mail/?view=cm&to=palomaalorenzon@gmail.com", 
      icon: Mail, 
      descKey: "contact.email" },
  ];

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">{t("contact.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("contact.title.1")}<span className="text-gradient">{t("contact.title.highlight")}</span>{t("contact.title.2")}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group flex items-center gap-4 px-6 py-4 rounded-xl bg-card border border-border glow-card gradient-border transition-all duration-300 hover:scale-105"
              data-hover
            >
              <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <contact.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">{contact.label}</p>
                <p className="text-xs text-muted-foreground">{t(contact.descKey)}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.6 }} className="mt-24 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            {t("contact.footer")} — {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
