import { useState } from "react";
import { Calendar, Clock, MapPin, Users, User, Mail, Phone, MessageSquare, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  volunteers: number;
  volunteersNeeded?: number; // Optional as past events don't have this
  impact?: string; // Optional as upcoming events don't have this
}

const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  
  // Volunteer modal state
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [selectedEventForVolunteer, setSelectedEventForVolunteer] = useState<Event | null>(null);
  const [volunteerForm, setVolunteerForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    experience: '',
    availability: '',
    skills: '',
    motivation: '',
    emergencyContact: '',
    emergencyPhone: '',
    hasTransportation: false,
    canStayOvernight: false,
    dietaryRestrictions: ''
  });

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
    const event = [...upcomingEvents, ...pastEvents].find(e => e.id === eventId);
    setSelectedEventForVolunteer(event);
    setIsVolunteerModalOpen(true);
  };

  const handleFormChange = (field: string, value: string | boolean) => {
    setVolunteerForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVolunteerSubmit = () => {
    // Validate required fields
    if (!volunteerForm.fullName || !volunteerForm.email || !volunteerForm.phone) {
      alert('Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    // Create volunteer registration data
    const volunteerData = {
      ...volunteerForm,
      eventId: selectedEventForVolunteer?.id,
      eventTitle: selectedEventForVolunteer?.title,
      eventDate: selectedEventForVolunteer?.date,
      submittedAt: new Date().toISOString()
    };

    // Log the data (in real app, this would be sent to backend)
    console.log('Volunteer Registration:', volunteerData);

    // Show success message
    alert(`Thank you ${volunteerForm.fullName}! Your volunteer application for "${selectedEventForVolunteer?.title}" has been submitted successfully. We will contact you soon with more details.`);

    // Close modal and reset form
    setIsVolunteerModalOpen(false);
    setVolunteerForm({
      fullName: '',
      email: '',
      phone: '',
      age: '',
      address: '',
      experience: '',
      availability: '',
      skills: '',
      motivation: '',
      emergencyContact: '',
      emergencyPhone: '',
      hasTransportation: false,
      canStayOvernight: false,
      dietaryRestrictions: ''
    });
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

      {/* Volunteer Registration Modal */}
      <Dialog open={isVolunteerModalOpen} onOpenChange={setIsVolunteerModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Volunteer for {selectedEventForVolunteer?.title}
            </DialogTitle>
            <DialogDescription className="text-center">
              Join us on {selectedEventForVolunteer?.date} • {selectedEventForVolunteer?.location}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Event Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
              <h4 className="font-semibold text-lg mb-2">{selectedEventForVolunteer?.title}</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedEventForVolunteer?.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedEventForVolunteer?.time}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedEventForVolunteer?.location}</span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-700">{selectedEventForVolunteer?.description}</p>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-blue-600">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={volunteerForm.fullName}
                    onChange={(e) => handleFormChange('fullName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Your age"
                    value={volunteerForm.age}
                    onChange={(e) => handleFormChange('age', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={volunteerForm.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={volunteerForm.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Your complete address"
                  value={volunteerForm.address}
                  onChange={(e) => handleFormChange('address', e.target.value)}
                />
              </div>
            </div>

            {/* Volunteer Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-blue-600">Volunteer Information</h4>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Previous Volunteer Experience</Label>
                <Textarea
                  id="experience"
                  placeholder="Tell us about any previous volunteering experience..."
                  value={volunteerForm.experience}
                  onChange={(e) => handleFormChange('experience', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills & Abilities</Label>
                  <Textarea
                    id="skills"
                    placeholder="What skills can you contribute?"
                    value={volunteerForm.skills}
                    onChange={(e) => handleFormChange('skills', e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select value={volunteerForm.availability} onValueChange={(value) => handleFormChange('availability', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-day">Full Day</SelectItem>
                      <SelectItem value="morning">Morning Only</SelectItem>
                      <SelectItem value="afternoon">Afternoon Only</SelectItem>
                      <SelectItem value="evening">Evening Only</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to volunteer for this event?</Label>
                <Textarea
                  id="motivation"
                  placeholder="Share your motivation for volunteering..."
                  value={volunteerForm.motivation}
                  onChange={(e) => handleFormChange('motivation', e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-blue-600">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    placeholder="Emergency contact person"
                    value={volunteerForm.emergencyContact}
                    onChange={(e) => handleFormChange('emergencyContact', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    placeholder="Emergency contact number"
                    value={volunteerForm.emergencyPhone}
                    onChange={(e) => handleFormChange('emergencyPhone', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-blue-600">Additional Information</h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasTransportation"
                    checked={volunteerForm.hasTransportation}
                    onCheckedChange={(checked) => handleFormChange('hasTransportation', checked as boolean)}
                  />
                  <Label htmlFor="hasTransportation">I have my own transportation</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="canStayOvernight"
                    checked={volunteerForm.canStayOvernight}
                    onCheckedChange={(checked) => handleFormChange('canStayOvernight', checked as boolean)}
                  />
                  <Label htmlFor="canStayOvernight">I can stay overnight if needed</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietaryRestrictions">Dietary Restrictions/Allergies</Label>
                <Input
                  id="dietaryRestrictions"
                  placeholder="Any dietary restrictions or allergies"
                  value={volunteerForm.dietaryRestrictions}
                  onChange={(e) => handleFormChange('dietaryRestrictions', e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsVolunteerModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleVolunteerSubmit}
              disabled={!volunteerForm.fullName || !volunteerForm.email || !volunteerForm.phone}
              className="w-full sm:w-auto cta-gradient"
            >
              <Heart className="w-4 h-4 mr-2" />
              Submit Volunteer Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EventsSection;