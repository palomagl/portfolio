import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import JourneySection from "@/components/JourneySection";
import ProcessSection from "@/components/ProcessSection";
import TechSection from "@/components/TechSection";
import AboutSection from "@/components/AboutSection";
import SiteFooter from "@/components/SiteFooter";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
          <ProjectsSection />
          <JourneySection />
          <ProcessSection />
          <TechSection />
          <AboutSection />
        </main>
        <SiteFooter />
      </div>
    </LanguageProvider>
  );
};

export default Index;
