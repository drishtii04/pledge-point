import HeroSection from "@/components/HeroSection";
import StoriesSection from "@/components/StoriesSection";
import TimelineSection from "@/components/TimelineSection";
import NeedyPeopleSection from "@/components/NeedyPeopleSection";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="space-y-0">
        <TimelineSection />
        <StoriesSection />
        <NeedyPeopleSection />
      </div>
      <ChatBot />
    </div>
  );
};

export default Index;
