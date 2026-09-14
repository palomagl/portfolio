import { lazy, Suspense } from "react";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Tudo abaixo da dobra carrega sob demanda — o Hero não precisa esperar o JS
// de Projetos/Trajetória/Processo/Tecnologias/Sobre pra ficar interativo.
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const JourneySection = lazy(() => import("@/components/JourneySection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const TechSection = lazy(() => import("@/components/TechSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SiteFooter = lazy(() => import("@/components/SiteFooter"));

const Index = () => {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Pular para o conteúdo
        </a>
        <CustomCursor />
        <ParticleBackground />
        <Navbar />
        <main id="main-content" className="relative z-10">
          <HeroSection />
          <Suspense fallback={null}>
            <ProjectsSection />
            <JourneySection />
            <ProcessSection />
            <TechSection />
            <AboutSection />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <SiteFooter />
        </Suspense>
      </div>
    </LanguageProvider>
  );
};

export default Index;
