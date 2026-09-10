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
        <CustomCursor />
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10">
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
