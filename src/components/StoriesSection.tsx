import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Quote, Heart, Users, Award, Play, Star } from 'lucide-react';

const StoriesSection = () => {
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

      const element = document.getElementById('stories-stats');
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    }, [targetValue, duration, hasAnimated]);

    return count;
  };

  // Counter values for stats
  const livesCount = useCountAnimation(50000, 3000);
  const villagesCount = useCountAnimation(150, 2500);
  const programsCount = useCountAnimation(25, 2000);
  const volunteersCount = useCountAnimation(1200, 2800);


  // Gallery images for impact showcase
  const galleryImages = [
    {
      id: 'gallery-1',
      title: 'Digital Learning Centers',
      caption: 'Modern computer labs bringing technology to rural students',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 'gallery-2',
      title: 'Community Health Camps',
      caption: 'Free medical checkups and awareness programs',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 'gallery-3',
      title: 'Volunteer Training',
      caption: 'Empowering local volunteers with skills and knowledge',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 'gallery-4',
      title: 'Skills Training Workshop',
      caption: 'Teaching vocational skills for financial independence',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 'gallery-5',
      title: 'Water Conservation Project',
      caption: 'Building sustainable water systems for rural communities',
      image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 'gallery-6',
      title: 'Nutrition Program',
      caption: 'Ensuring healthy meals for underprivileged children',
      image: 'https://hallelujahcloud.h4b2.c13.e2-5.dev/2024/02/9r738vJw-nutrition-program-1-768x499.jpg'
    }
  ];

  const stories = [
    {
      name: "Ramesh Kumar",
      role: "Village Education Volunteer",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      story: "I've been volunteering with Basava Yuva Brigade for 3 years now. Coming from a rural background myself, I understand the challenges our children face. Through our digital literacy program, I've seen countless young minds bloom. One particular student, who had never touched a computer before, is now teaching others in her village.",
      location: "Gulbarga, Karnataka",
      impact: "Education",
      rating: 5,
      featured: true
    },
    {
      name: "Lakshmi Devi",
      role: "Community Health Worker",
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      story: "As a community health worker associated with Basava Yuva Brigade, I've witnessed remarkable transformations in rural healthcare access. We started with basic health camps, but now we run regular maternal health programs. Last year, we helped over 100 expecting mothers receive proper prenatal care.",
      location: "Bidar, Karnataka",
      impact: "Healthcare",
      rating: 5,
      featured: false
    },
    {
      name: "Suresh Patil",
      role: "Rural Development Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      story: "Working with Basava Yuva Brigade has been life-changing. Our sustainable farming initiative has helped 50 farmers switch to organic methods. The pride in their eyes when they harvest chemical-free crops is priceless. We're not just changing practices; we're preserving our soil for future generations.",
      location: "Belgaum, Karnataka",
      impact: "Agriculture",
      rating: 5,
      featured: false
    }
  ];

  const impactStats = [
    { icon: <Users className="w-8 h-8" />, number: '50,000+', label: 'Lives Transformed', color: 'from-blue-500 to-cyan-500' },
    { icon: <Award className="w-8 h-8" />, number: '150+', label: 'Villages Reached', color: 'from-indigo-500 to-purple-500' },
    { icon: <Heart className="w-8 h-8" />, number: '25', label: 'Programs Running', color: 'from-pink-500 to-rose-500' },
    { icon: <Quote className="w-8 h-8" />, number: '1,200+', label: 'Active Volunteers', color: 'from-emerald-500 to-teal-500' }
  ];

  return (
    <section id="stories" className="content-section relative overflow-hidden">
      {/* Hero Stories Section */}
      <div className="relative h-[600px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center mb-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-xl rounded-full text-white font-semibold border border-blue-400/30 shadow-xl mb-8">
              <Quote className="w-5 h-5" />
              Real Stories, Real Impact
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Lives We've <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">Transformed</span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
              Discover the incredible journeys of transformation happening across communities through our mission.
            </p>
          </div>
        </div>
      </div>

      {/* Impact Statistics with Counting Animation */}
      <div id="stories-stats" className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="group hover:scale-110 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:rotate-3">
                <Users className="w-8 h-8 transition-transform duration-300 group-hover:scale-125" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-slate-800 mb-3 counting-number">
                {livesCount.toLocaleString()}+
              </div>
              <div className="text-slate-600 font-semibold text-lg">
                Lives Transformed
              </div>
              <div className="w-full h-1 bg-blue-400/30 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-3000 ease-out"
                  style={{ width: livesCount > 0 ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="group hover:scale-110 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:shadow-2xl group-hover:shadow-indigo-500/50 transition-all duration-500 group-hover:rotate-3">
                <Award className="w-8 h-8 transition-transform duration-300 group-hover:scale-125" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-slate-800 mb-3 counting-number">
                {villagesCount.toLocaleString()}+
              </div>
              <div className="text-slate-600 font-semibold text-lg">
                Villages Reached
              </div>
              <div className="w-full h-1 bg-indigo-400/30 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transition-all duration-2500 ease-out"
                  style={{ width: villagesCount > 0 ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="group hover:scale-110 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:shadow-2xl group-hover:shadow-pink-500/50 transition-all duration-500 group-hover:rotate-3">
                <Heart className="w-8 h-8 transition-transform duration-300 group-hover:scale-125" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-slate-800 mb-3 counting-number">
                {programsCount.toLocaleString()}+
              </div>
              <div className="text-slate-600 font-semibold text-lg">
                Programs Running
              </div>
              <div className="w-full h-1 bg-pink-400/30 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full transition-all duration-2000 ease-out"
                  style={{ width: programsCount > 0 ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="group hover:scale-110 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:shadow-2xl group-hover:shadow-emerald-500/50 transition-all duration-500 group-hover:rotate-3">
                <Quote className="w-8 h-8 transition-transform duration-300 group-hover:scale-125" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-slate-800 mb-3 counting-number">
                {volunteersCount.toLocaleString()}+
              </div>
              <div className="text-slate-600 font-semibold text-lg">
                Active Volunteers
              </div>
              <div className="w-full h-1 bg-emerald-400/30 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-2800 ease-out"
                  style={{ width: volunteersCount > 0 ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Stories Section */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full translate-y-1/2 -translate-x-1/2 opacity-30"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-8 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full font-semibold border border-blue-200">
              Personal Testimonials
            </div>
            <h3 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
              Voices from Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Community</span>
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Meet the incredible individuals who are making a difference and experiencing transformation through our programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="h-full">
                <Card className={`group transition-all duration-500 hover:scale-105 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 h-full cursor-pointer ${story.featured ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-400' : 'bg-white border shadow-xl hover:border-blue-300'} rounded-3xl overflow-hidden hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-indigo-50/50`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`${story.featured ? 'bg-blue-600' : 'bg-slate-600'} text-white transition-transform hover:scale-105`}>
                        {story.impact}
                      </Badge>
                      <div className="flex gap-1">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Avatar className={`${story.featured ? 'w-16 h-16' : 'w-12 h-12'} border-2 border-white shadow-lg transition-all duration-500 group-hover:scale-125 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-blue-500/25`}>
                        <AvatarImage src={story.image} alt={story.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                          {story.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className={`${story.featured ? 'text-2xl' : 'text-xl'} text-slate-800 transition-colors duration-300 group-hover:text-blue-600`}>
                          {story.name}
                        </CardTitle>
                        <p className="text-blue-600 font-semibold">{story.role}</p>
                        <p className="text-slate-500 text-sm">{story.location}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
                      <p className={`text-slate-600 leading-relaxed italic pl-6 ${story.featured ? 'text-lg' : ''}`}>
                        "{story.story}"
                      </p>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-slate-200">
                      <Button 
                        variant="outline" 
                        className="w-full transition-all duration-300 rounded-xl font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group/btn"
                      >
                        <Play className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12" />
                        <span className="transition-all duration-300 group-hover/btn:font-bold">Read Full Story</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Gallery Placeholder */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              Visual Impact <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Gallery</span>
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              See the transformation happening across communities through our programs and initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.slice(0, 6).map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer">
                <div className="aspect-video relative bg-gradient-to-br from-blue-100 to-indigo-100">
                  <img 
                    src={image.image} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                          <div class="text-center p-6">
                            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                              </svg>
                            </div>
                            <h4 class="text-lg font-semibold text-slate-800 mb-2">${image.title}</h4>
                            <p class="text-sm text-slate-600">${image.caption}</p>
                          </div>
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div class="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h4 class="font-bold text-lg mb-2">${image.title}</h4>
                            <p class="text-sm text-gray-200">${image.caption}</p>
                            <div class="mt-3 flex items-center text-xs text-blue-300">
                              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                              </svg>
                              Impact Story
                            </div>
                          </div>
                        </div>
                      `;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h4 className="font-bold text-lg mb-2">{image.title}</h4>
                      <p className="text-sm text-gray-200">{image.caption}</p>
                      <div className="mt-3 flex items-center text-xs text-blue-300">
                        <Heart className="w-3 h-3 mr-1" />
                        Impact Story
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative h-[400px] bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="text-center relative z-10">
          <h3 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Be Part of the Next <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Success Story</span>
          </h3>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed px-6">
            Your support can transform lives and create lasting change in communities across Karnataka.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center px-6">
            <Button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl">
              Share Your Story
            </Button>
            <Button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl">
              View All Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
