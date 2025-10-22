import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Heart } from "lucide-react";

interface NeedyPerson {
  name: string;
  age: number;
  location: string;
  problem: string;
  description: string;
  requiredAmount: number;
  raisedAmount: number;
  image: string;
  category: "Medical" | "Education" | "Housing" | "Emergency";
  urgency: "High" | "Medium" | "Low";
}

const needyPeople: NeedyPerson[] = [
  {
    name: "Ramesh Kumar",
    age: 45,
    location: "Gulbarga, Karnataka",
    problem: "Urgent Heart Surgery",
    description: "Ramesh, a small farmer and father of two, needs urgent bypass surgery. He has been the sole breadwinner for his family but is now unable to work due to his heart condition. The surgery is critical for his survival.",
    requiredAmount: 300000,
    raisedAmount: 125000,
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Medical",
    urgency: "High"
  },
  {
    name: "Lakshmi Devi",
    age: 12,
    location: "Belgaum, Karnataka",
    problem: "Education Support",
    description: "Lakshmi is a bright student who scored 95% in her exams. After losing her father, her mother struggles to pay for her education. She needs support to continue her studies and pursue her dream of becoming a doctor.",
    requiredAmount: 50000,
    raisedAmount: 15000,
    image: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Education",
    urgency: "Medium"
  },
  {
    name: "Abdul Rahman",
    age: 58,
    location: "Bidar, Karnataka",
    problem: "Kidney Transplant",
    description: "Abdul needs a kidney transplant urgently. A retired school teacher, he has exhausted all his savings on dialysis. His son is a matching donor, but the family cannot afford the transplant surgery costs.",
    requiredAmount: 500000,
    raisedAmount: 275000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Medical",
    urgency: "High"
  },
  {
    name: "Suma Patil",
    age: 35,
    location: "Dharwad, Karnataka",
    problem: "Cancer Treatment",
    description: "Suma, a single mother of three, was recently diagnosed with breast cancer. She needs immediate treatment including surgery and chemotherapy. The family has no means to afford the complete treatment.",
    requiredAmount: 400000,
    raisedAmount: 150000,
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Medical",
    urgency: "High"
  }
];

const NeedyPeopleSection = () => {
  // Animation states for each person
  const [animatedAmounts, setAnimatedAmounts] = useState<{[key: number]: {raised: number, required: number}}>({});
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate each person's amounts
            needyPeople.forEach((person, index) => {
              const raisedStartTime = Date.now();
              const requiredStartTime = Date.now() + 200; // Slight delay for required amount
              const duration = 2500 + index * 200;
              
              const animateAmounts = () => {
                const now = Date.now();
                
                // Animate raised amount
                const raisedElapsed = now - raisedStartTime;
                const raisedProgress = Math.min(raisedElapsed / duration, 1);
                const raisedEaseOut = 1 - Math.pow(1 - raisedProgress, 4);
                const currentRaised = Math.floor(person.raisedAmount * raisedEaseOut);
                
                // Animate required amount
                const requiredElapsed = now - requiredStartTime;
                const requiredProgress = Math.min(requiredElapsed / (duration + 500), 1);
                const requiredEaseOut = 1 - Math.pow(1 - requiredProgress, 4);
                const currentRequired = Math.floor(person.requiredAmount * requiredEaseOut);
                
                setAnimatedAmounts(prev => ({
                  ...prev,
                  [index]: {
                    raised: currentRaised,
                    required: currentRequired
                  }
                }));
                
                if (raisedProgress < 1 || requiredProgress < 1) {
                  requestAnimationFrame(animateAmounts);
                }
              };
              
              animateAmounts();
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('needy-people-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateProgress = (raised: number, required: number) => {
    return (raised / required) * 100;
  };

  const getUrgencyColor = (urgency: NeedyPerson["urgency"]) => {
    switch (urgency) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <section id="needy-people" className="content-section py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            People Who Need Your <span className="gradient-text">Help</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your contribution can make a real difference in someone's life. Help these individuals overcome their challenges and build a better future.
          </p>
        </div>

        <div id="needy-people-section" className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 px-4">
          {needyPeople.map((person, index) => {
            const raisedCount = animatedAmounts[index]?.raised || 0;
            const requiredCount = animatedAmounts[index]?.required || 0;
            const progressValue = raisedCount > 0 ? calculateProgress(raisedCount, requiredCount) : 0;
            
            return (
              <Card 
                id={`needy-card-${index}`}
                key={index} 
                className="bg-white overflow-hidden animate-fade-in rounded-3xl shadow-2xl border-0 hover:shadow-3xl transition-all duration-500 hover:scale-105" 
                style={{animationDelay: `${index * 0.2}s`}}
              >
                {/* Beneficiary Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={person.image} 
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className={`${getUrgencyColor(person.urgency)} text-white border-white`}>
                      {person.urgency} Priority
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white text-xl font-bold">{person.name}</h3>
                    <p className="text-white/90 text-sm">
                      {person.age} years • {person.location}
                    </p>
                  </div>
                </div>
                
                <CardContent className="space-y-4 p-6">
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-2">{person.problem}</h4>
                    <p className="text-muted-foreground leading-relaxed">{person.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="counting-number">
                        Raised: {formatAmount(raisedCount)}
                      </span>
                      <span className="counting-number">
                        Goal: {formatAmount(requiredCount)}
                      </span>
                    </div>
                    <div className="relative">
                      <Progress value={progressValue} className="h-3 bg-gray-200" />
                      <div 
                        className="absolute inset-0 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-2000 ease-out"
                        style={{ 
                          width: `${progressValue}%`,
                          transition: raisedCount > 0 ? 'width 2s ease-out' : 'none'
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground text-right counting-number">
                      Still needed: {formatAmount(Math.max(0, requiredCount - raisedCount))}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full cta-gradient" onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}>
                    <Heart className="w-4 h-4 mr-2" />
                    Donate Now
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NeedyPeopleSection;