import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StoriesSection = () => {
  const stories = [
    {
      name: "Ramesh Kumar",
      role: "Village Education Volunteer",
      image: "/volunteers/ramesh.jpg",
      story: "I've been volunteering with Basava Yuva Brigade for 3 years now. Coming from a rural background myself, I understand the challenges our children face. Through our digital literacy program, I've seen countless young minds bloom. One particular student, who had never touched a computer before, is now teaching others in her village.",
      location: "Gulbarga, Karnataka"
    },
    {
      name: "Lakshmi Devi",
      role: "Community Health Worker",
      image: "/volunteers/lakshmi.jpg",
      story: "As a community health worker associated with Basava Yuva Brigade, I've witnessed remarkable transformations in rural healthcare access. We started with basic health camps, but now we run regular maternal health programs. Last year, we helped over 100 expecting mothers receive proper prenatal care.",
      location: "Bidar, Karnataka"
    },
    {
      name: "Suresh Patil",
      role: "Rural Development Officer",
      image: "/volunteers/suresh.jpg",
      story: "Working with Basava Yuva Brigade has been life-changing. Our sustainable farming initiative has helped 50 farmers switch to organic methods. The pride in their eyes when they harvest chemical-free crops is priceless. We're not just changing practices; we're preserving our soil for future generations.",
      location: "Belgaum, Karnataka"
    }
  ];

  return (
    <section id="stories" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories from our volunteers and community members who are making a difference in rural India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={story.image} alt={story.name} />
                    <AvatarFallback>{story.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{story.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{story.role}</p>
                    <p className="text-sm text-muted-foreground">{story.location}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  "{story.story}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
