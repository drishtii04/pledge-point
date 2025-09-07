import { useState } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const upcomingEvents = [
    {
      id: 1,
      title: "Community Health Fair",
      date: "March 15, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Davangere Community Center",
      description: "Free health screenings, vaccinations, and wellness workshops for the entire community.",
      volunteers: 25,
      volunteersNeeded: 15
    },
    {
      id: 2,
      title: "Educational Workshop Series",
      date: "March 22, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Basava Yuva Brigade Learning Center",
      description: "Skills development workshops covering digital literacy, financial planning, and entrepreneurship.",
      volunteers: 12,
      volunteersNeeded: 8
    },
    {
      id: 3,
      title: "Environmental Clean-Up Drive",
      date: "April 5, 2024",
      time: "7:00 AM - 12:00 PM",
      location: "Davangere City Park",
      description: "Join us in cleaning our local environment and planting trees for a greener future.",
      volunteers: 45,
      volunteersNeeded: 30
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Winter Food Distribution",
      date: "February 10, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "Various Distribution Points",
      description: "Successfully distributed food packages to 500+ families in need during winter.",
      volunteers: 60,
      impact: "500+ families supported"
    },
    {
      id: 5,
      title: "Children's Education Fair",
      date: "January 20, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "Davangere Education Center",
      description: "Educational resources and scholarship opportunities for underserved children.",
      volunteers: 35,
      impact: "200+ children enrolled in programs"
    }
  ];

  const handleVolunteerSignup = (eventId: number) => {
    // Placeholder for volunteer signup functionality
    alert(`Thank you for your interest in volunteering for event ${eventId}! This would integrate with a backend system.`);
  };

  return (
    <section id="events" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Our <span className="gradient-text">Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join us in our mission to create positive change. From community outreach to educational workshops, 
            there's always an opportunity to make a difference.
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <Card key={event.id} className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-foreground">{event.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-secondary" />
                        <span className="text-sm">
                          {event.volunteers} signed up • {event.volunteersNeeded} more needed
                        </span>
                      </div>
                      <Button 
                        onClick={() => handleVolunteerSignup(event.id)}
                        className="cta-gradient"
                      >
                        Sign Up to Volunteer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid lg:grid-cols-2 gap-8">
              {pastEvents.map((event, index) => (
                <Card key={event.id} className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-foreground">{event.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm">
                        <span className="font-medium text-secondary">Impact: </span>
                        <span className="text-foreground">{event.impact}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{event.volunteers} volunteers</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default EventsSection;