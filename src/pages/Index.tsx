import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import DonationSection from "@/components/DonationSection";
import VolunteerSection from "@/components/VolunteerSection";
import ImpactSection from "@/components/ImpactSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <DonationSection />
      <VolunteerSection />
      <ImpactSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
