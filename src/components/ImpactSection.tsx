import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, Heart, Zap, Users, GraduationCap } from "lucide-react";
// Real Indian NGO and rural development images

const ImpactSection = () => {
  const stories = [
    {
      id: 1,
      title: "Transforming Rural Education in India",
      description: "Our mobile education program has reached over 15,000 children across rural India, providing access to quality education, digital literacy training, and connecting them to modern opportunities.",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      stats: "15,000+ children reached",
      category: "Education"
    },
    {
      id: 2,
      title: "Rural Healthcare Initiative",
      description: "Through our healthcare outreach programs, we've provided medical care to over 25,000 individuals and established 12 primary healthcare centers across rural villages in India.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      stats: "25,000+ people served",
      category: "Healthcare"
    },
    {
      id: 3,
      title: "Village Development Projects",
      description: "Our clean water and sanitation projects have brought safe drinking water to 50+ villages across India, improving health outcomes and quality of life for over 30,000 people.",
      image: "https://images.unsplash.com/photo-1541344457960-6c2b638c4e07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      stats: "30,000+ lives improved",
      category: "Water & Sanitation"
    }
  ];

  const testimonials = [
    {
      name: "Meena Devi",
      role: "Village Sarpanch, Rajasthan",
      quote: "The education program has transformed our village. Our children now have access to computers and digital learning, opening doors to better opportunities.",
      avatar: "MD"
    },
    {
      name: "Dr. Anand Kumar",
      role: "Rural Health Director, Bihar",
      quote: "The mobile health clinics have revolutionized healthcare delivery in our region. We can now reach remote villages that never had access to proper medical care.",
      avatar: "AK"
    },
    {
      name: "Lakshmi Patel",
      role: "Community Leader, Gujarat",
      quote: "The clean water project in our village meant my daughters could go to school instead of walking hours to fetch water. Thank you for giving them hope.",
      avatar: "FA"
    }
  ];

  const impactNumbers = [
    { icon: <Users className="w-8 h-8" />, number: "50,000+", label: "Lives Directly Impacted", color: "text-primary" },
    { icon: <GraduationCap className="w-8 h-8" />, number: "15,000+", label: "Children Educated", color: "text-secondary" },
    { icon: <Heart className="w-8 h-8" />, number: "25,000+", label: "Healthcare Recipients", color: "text-accent" },
    { icon: <Zap className="w-8 h-8" />, number: "50+", label: "Communities Transformed", color: "text-success" }
  ];

  return (
    <section id="impact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Our <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every program we run, every community we serve, creates ripples of positive change. 
            Here are the stories and numbers that show the real impact of our collective efforts.
          </p>
        </div>

        {/* Impact Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 animate-slide-up px-4">
          {impactNumbers.map((item, index) => (
            <Card key={index} className="bg-white text-center p-8 animate-fade-in rounded-3xl shadow-2xl border-0 hover:shadow-3xl transition-all duration-500 hover:scale-105" style={{animationDelay: `${index * 0.2}s`}}>
              <CardContent className="flex flex-col items-center space-y-3">
                <div className={`${item.color} p-3 rounded-full bg-muted`}>
                  {item.icon}
                </div>
                <div className="text-3xl font-bold text-foreground">{item.number}</div>
                <div className="text-sm text-muted-foreground font-medium">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <div className="mb-16 animate-scale-in">
          <h3 className="text-3xl font-bold text-center mb-12">Success Stories</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <Card key={story.id} className="bg-white overflow-hidden group animate-fade-in rounded-3xl shadow-2xl border-0 hover:shadow-3xl transition-all duration-500 hover:scale-105" style={{animationDelay: `${index * 0.3}s`}}>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {story.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{story.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{story.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm font-semibold text-success">{story.stats}</span>
                    <Button variant="outline" size="sm">
                      Read Full Story
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="animate-fade-in">
          <h3 className="text-3xl font-bold text-center mb-12">Voices from the Field</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-6 h-6 text-primary mr-2" />
                    <span className="text-primary font-semibold">Testimonial</span>
                  </div>
                  <blockquote className="text-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="card-elevated max-w-2xl mx-auto p-8">
            <CardContent>
              <h3 className="text-2xl font-bold mb-4">Be Part of the Change</h3>
              <p className="text-muted-foreground mb-6">
                These stories are possible because of supporters like you. Join us in creating 
                more success stories and transforming communities worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="cta-gradient">
                  Donate Now
                </Button>
                <Button variant="outline" size="lg">
                  Become a Volunteer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;