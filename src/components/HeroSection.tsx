import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Hope Foundation - Making a difference together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-accent/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Building Hope,
            <br />
            <span className="gradient-text">Changing Lives</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join us in creating positive change in communities worldwide. Together, we can make a lasting impact through education, healthcare, and sustainable development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button
              size="lg"
              className="cta-gradient text-lg px-8 py-4 transition-bounce hover:scale-105"
              onClick={() => scrollToSection("donate")}
            >
              Donate Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 backdrop-blur-sm transition-bounce hover:scale-105"
              onClick={() => scrollToSection("volunteer")}
            >
              Join as Volunteer
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-scale-in">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-white/80">Lives Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">25</div>
              <div className="text-white/80">Countries Reached</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1,200+</div>
              <div className="text-white/80">Active Volunteers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection("about")}
          className="text-white hover:text-accent transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;