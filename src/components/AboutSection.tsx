import { Users, Target, Heart, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Compassion",
      description: "We lead with empathy and understanding in every action we take."
    },
    {
      icon: <Target className="w-8 h-8 text-secondary" />,
      title: "Impact",
      description: "We focus on creating measurable, lasting change in communities."
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Unity",
      description: "We believe in the power of collaboration and community support."
    },
    {
      icon: <Award className="w-8 h-8 text-success" />,
      title: "Excellence",
      description: "We strive for the highest standards in all our programs and services."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Executive Director",
      bio: "15+ years in international development and humanitarian work."
    },
    {
      name: "Michael Chen",
      role: "Program Manager",
      bio: "Specialist in education and community development programs."
    },
    {
      name: "Aisha Patel",
      role: "Volunteer Coordinator",
      bio: "Expert in volunteer management and community engagement."
    },
    {
      name: "David Rodriguez",
      role: "Finance Director",
      bio: "Ensures transparency and accountability in all financial operations."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Mission & Vision */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            About <span className="gradient-text">Hope Foundation</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower communities worldwide through sustainable development programs, 
                education initiatives, and healthcare access, creating lasting positive change 
                for those who need it most.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-secondary">Our Vision</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A world where every person has the opportunity to thrive, where communities 
                are empowered to build their own sustainable future, and where hope 
                becomes reality for all.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16 animate-slide-up">
          <h3 className="text-3xl font-bold text-center mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="card-elevated text-center p-6 h-full">
                <CardContent className="flex flex-col items-center space-y-4">
                  <div className="p-3 rounded-full bg-muted">{value.icon}</div>
                  <h4 className="text-xl font-semibold">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="animate-scale-in">
          <h3 className="text-3xl font-bold text-center mb-12">Meet Our Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="card-elevated text-center p-6">
                <CardContent>
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;