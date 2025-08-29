import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const ContactSection = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for contact form submission
    alert("Thank you for your message! We'll get back to you within 24 hours. This would integrate with a backend system.");
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "contact@hopefoundation.org",
      link: "mailto:contact@hopefoundation.org"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Address",
      value: "123 Hope Street, Community Center, New York, NY 10001",
      link: "https://maps.google.com"
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", url: "#", color: "hover:text-blue-600" },
    { icon: <Twitter className="w-5 h-5" />, name: "Twitter", url: "#", color: "hover:text-blue-400" },
    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", url: "#", color: "hover:text-pink-600" },
    { icon: <Linkedin className="w-5 h-5" />, name: "LinkedIn", url: "#", color: "hover:text-blue-700" }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our work? Want to partner with us? Or simply want to learn more 
            about how you can make a difference? We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="card-elevated animate-slide-up">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Full Name *</Label>
                      <Input
                        id="contact-name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email Address *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="inquiry-type">Inquiry Type</Label>
                    <Select onValueChange={(value) => setContactForm({...contactForm, inquiryType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="volunteer">Volunteer Opportunities</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="donation">Donation Questions</SelectItem>
                        <SelectItem value="media">Media Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="contact-subject">Subject *</Label>
                    <Input
                      id="contact-subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact-message">Message *</Label>
                    <Textarea
                      id="contact-message"
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full cta-gradient">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8 animate-scale-in">
              {/* Contact Details */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{info.label}</h4>
                        <a 
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Follow Our Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Stay updated with our latest projects, success stories, and community impact 
                    through our social media channels.
                  </p>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className={`p-3 bg-muted rounded-lg transition-colors ${social.color}`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Office Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-muted-foreground">
                      Emergency situations: We respond to urgent humanitarian needs 24/7
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Stay Informed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Subscribe to our newsletter for monthly updates on our impact and opportunities to get involved.
                  </p>
                  <div className="flex space-x-2">
                    <Input placeholder="Enter your email" className="flex-1" />
                    <Button className="cta-gradient">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;