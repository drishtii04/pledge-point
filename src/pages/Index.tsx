import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import DonationSection from "@/components/DonationSection";
import VolunteerSection from "@/components/VolunteerSection";
import ImpactSection from "@/components/ImpactSection";
import StoriesSection from "@/components/StoriesSection";
import TimelineSection from "@/components/TimelineSection";
import NeedyPeopleSection from "@/components/NeedyPeopleSection";
import ContactSection from "@/components/ContactSection";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <EventsSection />
      <NeedyPeopleSection />
      <DonationSection />
      <VolunteerSection />
      <ImpactSection />
      <StoriesSection />
      <ContactSection />
      <ChatBot />
      <Footer />
    </div>
  );
};

export default Index;
