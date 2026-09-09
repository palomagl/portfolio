import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import JourneySection from "@/components/JourneySection";
import ProcessSection from "@/components/ProcessSection";
import StackSection from "@/components/StackSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
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
          {/* Fase 5–7: TechSection substitui StackSection; AboutSection encolhe; footer novo substitui ContactSection */}
          <StackSection />
          <AboutSection />
          <ContactSection />
        </main>
      </div>
    </LanguageProvider>
  );
};

export default Index;
