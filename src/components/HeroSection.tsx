import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToPage = (path: string) => {
    navigate(path);
  };

  // Counter Animation Hook
  const useCountAnimation = (targetValue: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              setHasAnimated(true);
              const startTime = Date.now();
              const startValue = 0;
              
              const animate = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
                
                setCount(currentValue);
                
                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };
              
              animate();
            }
          });
        },
        { threshold: 0.5 }
      );

      const element = document.getElementById('impact-stats');
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    }, [targetValue, duration, hasAnimated]);

    return count;
  };

  // Counter values
  const livesTransformed = useCountAnimation(50000, 3000);
  const villagesReached = useCountAnimation(150, 2500);
  const activeVolunteers = useCountAnimation(1200, 2000);

  return (
    <section id="home" className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Professional Charity Background */}
      <div className="absolute inset-0">
        <img
          src="/src/assets/hero-image.jpg"
          alt="Basava Yuva Brigade - Making a difference together"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-800/85 to-blue-800/80"></div>
        
        {/* Professional Geometric Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-blue-500/20 rounded-lg rotate-45 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-indigo-400/40 rounded-full animate-spin" style={{animationDelay: '2s'}}></div>
        
        {/* Professional Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
      </div>

      {/* Professional Content Layout */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 text-center">
        <div className="animate-fade-in max-w-6xl mx-auto">
          {/* Professional Badge */}
          <div className="inline-flex items-center mb-8 px-8 py-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-xl rounded-full text-white font-semibold text-sm border border-blue-400/30 shadow-2xl">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></span>
            Empowering Communities Since 2020
          </div>
          
          {/* Professional Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            <span className="block mb-2">Together We Can</span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent font-black">Change Lives</span>
          </h1>
          
          {/* Professional Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Join our mission to transform communities across India through sustainable development, education, and healthcare initiatives that create lasting impact.
          </p>
          
          {/* Professional CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 text-white rounded-full text-lg font-semibold transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 min-w-[220px] border border-blue-400/30 overflow-hidden"
              onClick={() => navigateToPage('/donate')}
            >
              <span className="relative z-10 flex items-center justify-center gap-3 transition-all duration-300 group-hover:font-bold">
                Make a Donation
                <span className="group-hover:translate-x-2 group-hover:scale-125 transition-all duration-500">→</span>
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-30 blur transition-opacity duration-500"></div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group relative px-10 py-4 bg-transparent border-2 border-blue-300/50 hover:border-blue-200 text-white hover:bg-blue-500/30 rounded-full text-lg font-semibold transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-400/30 backdrop-blur-md min-w-[220px] overflow-hidden"
              onClick={() => navigateToPage('/volunteer')}
            >
              <span className="flex items-center justify-center gap-3 transition-all duration-300 group-hover:font-bold">
                Volunteer Today
                <span className="text-blue-300 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Button>
          </div>

          {/* Professional Impact Stats with Counting Animation */}
          <div id="impact-stats" className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group text-center p-6 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-xl rounded-2xl border border-blue-400/30 shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105">
              <div className="relative">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300 counting-number">
                  {livesTransformed.toLocaleString()}+
                </div>
                {livesTransformed > 0 && (
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </div>
              <div className="text-blue-100 font-semibold text-base group-hover:text-white group-hover:font-bold transition-all duration-300">Lives Transformed</div>
              <div className="w-full h-1 bg-blue-400/30 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full progress-fill"
                  style={{ 
                    width: livesTransformed > 0 ? '100%' : '0%',
                    transition: 'width 3s ease-out'
                  }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-blue-200 opacity-75">
                {livesTransformed > 0 ? 'Goal Achieved!' : 'Counting...'}
              </div>
            </div>
            <div className="group text-center p-6 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-xl rounded-2xl border border-blue-400/30 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer hover:bg-gradient-to-br hover:from-indigo-500/30 hover:to-purple-500/30 hover:border-indigo-300/50">
              <div className="relative">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-125 group-hover:text-indigo-200 transition-all duration-500 counting-number">
                  {villagesReached.toLocaleString()}+
                </div>
                {villagesReached > 0 && (
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                )}
              </div>
              <div className="text-blue-100 font-semibold text-base group-hover:text-white group-hover:font-bold transition-all duration-300">Villages Reached</div>
              <div className="w-full h-1 bg-blue-400/30 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full progress-fill"
                  style={{ 
                    width: villagesReached > 0 ? '100%' : '0%',
                    transition: 'width 2.5s ease-out'
                  }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-blue-200 opacity-75">
                {villagesReached > 0 ? 'Communities Connected!' : 'Mapping...'}
              </div>
            </div>
            <div className="group text-center p-6 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-xl rounded-2xl border border-blue-400/30 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer hover:bg-gradient-to-br hover:from-emerald-500/30 hover:to-teal-500/30 hover:border-emerald-300/50">
              <div className="relative">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-125 group-hover:text-emerald-200 transition-all duration-500 counting-number">
                  {activeVolunteers.toLocaleString()}+
                </div>
                {activeVolunteers > 0 && (
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                )}
              </div>
              <div className="text-blue-100 font-semibold text-base group-hover:text-white group-hover:font-bold transition-all duration-300">Active Volunteers</div>
              <div className="w-full h-1 bg-blue-400/30 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full progress-fill"
                  style={{ 
                    width: activeVolunteers > 0 ? '100%' : '0%',
                    transition: 'width 2s ease-out'
                  }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-blue-200 opacity-75">
                {activeVolunteers > 0 ? 'Team Ready!' : 'Recruiting...'}
              </div>
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