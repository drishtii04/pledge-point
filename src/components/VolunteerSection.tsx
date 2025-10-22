import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, Clock, MapPin, Users, Award } from "lucide-react";
import { addVolunteerRegistration } from "@/lib/volunteerService";
import { useToast } from "@/hooks/use-toast";

const VolunteerSection = () => {
  const { toast } = useToast();
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    interests: [] as string[],
    availability: "",
    experience: "",
    motivation: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const opportunities = [
    {
      title: "Education Program Assistant",
      location: "Learning Centers",
      timeCommitment: "4 hours/week",
      description: "Help children with homework, reading, and basic computer skills. Training provided.",
      skills: ["Patience", "Communication", "Basic Computer Skills"],
      volunteers: 15,
      needed: 8
    },
    {
      title: "Community Outreach Coordinator", 
      location: "Various Communities",
      timeCommitment: "6 hours/week",
      description: "Connect with community members, organize events, and build relationships.",
      skills: ["Communication", "Event Planning", "Cultural Sensitivity"],
      volunteers: 8,
      needed: 5
    },
    {
      title: "Healthcare Support Volunteer",
      location: "Mobile Clinics",
      timeCommitment: "8 hours/month",
      description: "Assist medical professionals during community health screenings and clinics.",
      skills: ["Healthcare Background", "Bilingual (Preferred)", "Compassion"],
      volunteers: 12,
      needed: 10
    },
    {
      title: "Digital Marketing Assistant",
      location: "Remote/Office",
      timeCommitment: "3 hours/week",
      description: "Help create content for social media, newsletters, and website updates.",
      skills: ["Social Media", "Content Creation", "Basic Design"],
      volunteers: 5,
      needed: 3
    }
  ];

  const interestAreas = [
    "Education & Tutoring",
    "Healthcare & Wellness",
    "Community Outreach",
    "Event Planning",
    "Digital Marketing",
    "Fundraising",
    "Administrative Support",
    "Translation Services"
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    setVolunteerForm(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare volunteer data for Firebase
      const volunteerData = {
        name: volunteerForm.name,
        email: volunteerForm.email,
        phone: volunteerForm.phone,
        skills: `${volunteerForm.skills} | Experience: ${volunteerForm.experience} | Interests: ${volunteerForm.interests.join(', ')}`,
        availability: volunteerForm.availability,
        message: volunteerForm.motivation || "No additional message provided"
      };

      // Submit to Firebase
      await addVolunteerRegistration(volunteerData);

      toast({
        title: "🎉 Registration Successful!",
        description: "Thank you for volunteering! We'll contact you soon with next steps.",
      });
      
      // Reset form
      setVolunteerForm({
        name: "",
        email: "",
        phone: "",
        skills: "",
        interests: [],
        availability: "",
        experience: "",
        motivation: ""
      });

    } catch (error) {
      console.error("Error submitting volunteer application:", error);
      toast({
        title: "Registration Error",
        description: "There was an issue submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpportunityApply = (opportunity: string) => {
    alert(`Thank you for applying to the ${opportunity} position! We'll be in touch soon.`);
  };

  return (
    <section id="volunteer" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Become a <span className="gradient-text">Volunteer</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our community of passionate volunteers making a real difference. Whether you have 
            a few hours a week or a day a month, there's a meaningful way for you to contribute.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Volunteer Registration Form */}
          <div className="animate-slide-up">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <UserPlus className="w-6 h-6 text-primary" />
                  <span>Volunteer Registration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Personal Information</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="vol-name">Full Name *</Label>
                        <Input
                          id="vol-name"
                          value={volunteerForm.name}
                          onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="vol-email">Email Address *</Label>
                        <Input
                          id="vol-email"
                          type="email"
                          value={volunteerForm.email}
                          onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="vol-phone">Phone Number *</Label>
                      <Input
                        id="vol-phone"
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  {/* Skills & Availability */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Skills & Availability</Label>
                    <div>
                      <Label htmlFor="vol-skills">Skills & Qualifications</Label>
                      <Textarea
                        id="vol-skills"
                        placeholder="List your relevant skills, qualifications, or experience..."
                        value={volunteerForm.skills}
                        onChange={(e) => setVolunteerForm({...volunteerForm, skills: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="vol-availability">Availability</Label>
                      <Select onValueChange={(value) => setVolunteerForm({...volunteerForm, availability: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekdays">Weekdays</SelectItem>
                          <SelectItem value="weekends">Weekends</SelectItem>
                          <SelectItem value="evenings">Evenings</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Interest Areas */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Areas of Interest</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {interestAreas.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={volunteerForm.interests.includes(interest)}
                            onCheckedChange={(checked) => handleInterestChange(interest, !!checked)}
                          />
                          <Label htmlFor={interest} className="text-sm">
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Motivation */}
                  <div>
                    <Label htmlFor="vol-motivation">Why do you want to volunteer with us?</Label>
                    <Textarea
                      id="vol-motivation"
                      placeholder="Tell us what motivates you to volunteer..."
                      value={volunteerForm.motivation}
                      onChange={(e) => setVolunteerForm({...volunteerForm, motivation: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full cta-gradient" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Current Opportunities */}
          <div className="space-y-6 animate-scale-in">
            <h3 className="text-2xl font-bold mb-6">Current Volunteer Opportunities</h3>
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-primary">
                    {opportunity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{opportunity.timeCommitment}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{opportunity.volunteers} volunteers • {opportunity.needed} more needed</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground">{opportunity.description}</p>
                  
                  <div>
                    <h5 className="text-sm font-semibold mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-1 text-secondary" />
                      Required Skills:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleOpportunityApply(opportunity.title)}
                    className="w-full mt-4"
                    variant="outline"
                  >
                    Apply for This Position
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;