import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { site } from "@/data/site";

const navKeys = [
  { key: "nav.home", href: "#inicio" },
  { key: "nav.projects", href: "#projetos" },
  { key: "nav.journey", href: "#trajetoria" },
  { key: "nav.tech", href: "#tecnologias" },
  { key: "nav.about", href: "#sobre" },
  { key: "nav.contact", href: "#contato" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-hairline"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page flex items-center justify-between py-4" aria-label="Principal">
        <a href="#inicio" className="flex items-center gap-2.5" data-hover>
          <img
            src={site.logo}
            alt=""
            aria-hidden="true"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{site.name}</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navKeys.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              data-hover
            >
              {t(item.key)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-hairline px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
            data-hover
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="text-foreground md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            data-hover
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-hairline bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-page flex flex-col gap-4 py-4">
              {navKeys.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(item.key)}
                </a>
              ))}
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
