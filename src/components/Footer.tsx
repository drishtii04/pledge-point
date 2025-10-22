import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinks = {
    organization: [
      { label: "About Us", action: () => scrollToSection("about") },
      { label: "Our Team", action: () => scrollToSection("about") },
      { label: "Annual Reports", action: () => alert("Annual reports would be available for download") },
      { label: "Transparency", action: () => alert("Financial transparency page") }
    ],
    getInvolved: [
      { label: "Volunteer", action: () => scrollToSection("volunteer") },
      { label: "Donate", action: () => scrollToSection("donate") },
      { label: "Events", action: () => scrollToSection("events") },
      { label: "Partnerships", action: () => scrollToSection("contact") }
    ],
    resources: [
      { label: "Impact Stories", action: () => scrollToSection("impact") },
      { label: "News & Updates", action: () => alert("News page") },
      { label: "Research", action: () => alert("Research publications") },
      { label: "Media Kit", action: () => alert("Media resources") }
    ]
  };

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-accent text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center group cursor-pointer hover:scale-105 transition-all duration-300">
                <Heart className="w-6 h-6 mr-2 transition-all duration-300 group-hover:scale-125 group-hover:text-red-300 group-hover:animate-pulse" />
                <span className="group-hover:text-blue-200 transition-colors duration-300">Basava Yuva Brigade</span>
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Building hope and changing lives through sustainable community development, 
                education, and healthcare initiatives worldwide.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm group hover:bg-white/10 rounded-lg p-2 -m-2 transition-all duration-300 cursor-pointer hover:scale-105">
                <Mail className="w-4 h-4 transition-all duration-300 group-hover:scale-125 group-hover:text-blue-300" />
                <span className="group-hover:text-white group-hover:font-semibold transition-all duration-300">contact@basavayuvabrigade.org</span>
              </div>
              <div className="flex items-center space-x-3 text-sm group hover:bg-white/10 rounded-lg p-2 -m-2 transition-all duration-300 cursor-pointer hover:scale-105">
                <Phone className="w-4 h-4 transition-all duration-300 group-hover:scale-125 group-hover:text-green-300 group-hover:rotate-12" />
                <span className="group-hover:text-white group-hover:font-semibold transition-all duration-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm group hover:bg-white/10 rounded-lg p-2 -m-2 transition-all duration-300 cursor-pointer hover:scale-105">
                <MapPin className="w-4 h-4 transition-all duration-300 group-hover:scale-125 group-hover:text-red-300 group-hover:bounce" />
                <span className="group-hover:text-white group-hover:font-semibold transition-all duration-300">Davangere, Karnataka</span>
              </div>
            </div>
          </div>

          {/* Quick Links - Organization */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Organization</h4>
            <ul className="space-y-3">
              {footerLinks.organization.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 text-sm hover:scale-105 hover:translate-x-2 hover:font-semibold group relative"
                  >
                    <span className="group-hover:text-blue-200 transition-colors duration-300">{link.label}</span>
                    <span className="absolute -left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-blue-300">→</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Get Involved */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Get Involved</h4>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 text-sm hover:scale-105 hover:translate-x-2 hover:font-semibold group relative"
                  >
                    <span className="group-hover:text-green-200 transition-colors duration-300">{link.label}</span>
                    <span className="absolute -left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-green-300">→</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Resources</h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Quick Donate Button */}
            <Button 
              onClick={() => scrollToSection("donate")}
              className="bg-secondary hover:bg-secondary-hover text-secondary-foreground w-full"
            >
              Donate Now
            </Button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/80">
              © 2024 Basava Yuva Brigade. All rights reserved. | 
              <button className="ml-1 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </button> | 
              <button className="ml-1 hover:text-primary-foreground transition-colors">
                Terms of Service
              </button>
            </div>
            
            <div className="text-sm text-primary-foreground/80">
              Tax ID: 12-3456789 | 
              <span className="ml-1">Charity Navigator Rating: 4 Stars</span>
            </div>
          </div>
        </div>

        {/* Floating Contact Info */}
        <div className="text-center py-4 border-t border-primary-foreground/10">
          <p className="text-xs text-primary-foreground/60">
            🌍 Operating in 25+ countries • 🤝 50,000+ lives impacted • 💚 1,200+ active volunteers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;