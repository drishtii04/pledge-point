import React, { useState } from 'react';
import { ChevronDown, Heart, Users, Calendar, Award, MapPin, Phone, Mail } from 'lucide-react';

interface MegaMenuSection {
  title: string;
  icon: React.ReactNode;
  links: {
    label: string;
    href: string;
    description?: string;
  }[];
}

const megaMenuData: MegaMenuSection[] = [
  {
    title: "Our Work",
    icon: <Heart className="w-5 h-5" />,
    links: [
      { label: "Education Programs", href: "/education", description: "Empowering minds through quality education" },
      { label: "Healthcare Initiatives", href: "/healthcare", description: "Providing essential medical services" },
      { label: "Rural Development", href: "/rural", description: "Building sustainable communities" },
      { label: "Women Empowerment", href: "/women", description: "Supporting women's rights and opportunities" }
    ]
  },
  {
    title: "Get Involved",
    icon: <Users className="w-5 h-5" />,
    links: [
      { label: "Volunteer with Us", href: "/volunteer", description: "Join our mission to change lives" },
      { label: "Corporate Partnerships", href: "/corporate", description: "Partner with us for greater impact" },
      { label: "Fundraising Events", href: "/fundraising", description: "Support our cause through events" },
      { label: "Monthly Giving", href: "/monthly", description: "Make a sustained difference" }
    ]
  },
  {
    title: "Resources",
    icon: <Calendar className="w-5 h-5" />,
    links: [
      { label: "Annual Reports", href: "/reports", description: "Transparency in our operations" },
      { label: "Success Stories", href: "/stories", description: "Lives we've touched" },
      { label: "News & Updates", href: "/news", description: "Latest from our organization" },
      { label: "Photo Gallery", href: "/gallery", description: "Visual journey of our work" }
    ]
  },
  {
    title: "Contact & Support",
    icon: <Award className="w-5 h-5" />,
    links: [
      { label: "Contact Us", href: "/contact", description: "Get in touch with our team" },
      { label: "Support Center", href: "/support", description: "Find help and resources" },
      { label: "Donate Now", href: "/donate", description: "Make an immediate impact" },
      { label: "Career Opportunities", href: "/careers", description: "Join our dedicated team" }
    ]
  }
];

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, className = '' }) => {
  return (
    <div className={`mega-menu ${isOpen ? 'active' : ''} ${className}`}>
      <div className="mega-menu-content">
        {megaMenuData.map((section, index) => (
          <div key={section.title} className="mega-menu-section animate-slide-left" style={{animationDelay: `${index * 0.1}s`}}>
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400">
                {section.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{section.title}</h3>
            </div>

            {/* Section Links */}
            <div className="space-y-3">
              {section.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="group block p-3 rounded-lg hover:bg-blue-600/20 transition-all duration-300 hover:translate-x-2"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300" />
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                        {link.label}
                      </h4>
                      {link.description && (
                        <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                          {link.description}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Contact Section */}
        <div className="mega-menu-section bg-gradient-to-br from-blue-600/20 to-indigo-600/30 border-blue-400/40 animate-zoom-in">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Phone className="w-5 h-5 text-blue-400" />
            Quick Contact
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-blue-100">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Basavakalyan, Karnataka, India</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100">
              <Phone className="w-4 h-4 text-blue-400" />
              <span className="text-sm">+91 (xxx) xxx-xxxx</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100">
              <Mail className="w-4 h-4 text-blue-400" />
              <span className="text-sm">contact@basavayuvabrigade.org</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-400/30">
            <button 
              onClick={onClose}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30"
            >
              Emergency Support 24/7
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Navigation Component with Mega Menu
interface NavigationWithMegaMenuProps {
  className?: string;
}

export const NavigationWithMegaMenu: React.FC<NavigationWithMegaMenuProps> = ({ className = '' }) => {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const toggleMegaMenu = () => {
    setMegaMenuOpen(!megaMenuOpen);
  };

  const closeMegaMenu = () => {
    setMegaMenuOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-xl border-b border-blue-400/20 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Basava Yuva Brigade</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-white hover:text-blue-300 transition-colors duration-300 font-medium">
                Home
              </a>
              
              {/* Mega Menu Trigger */}
              <button
                onClick={toggleMegaMenu}
                className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors duration-300 font-medium"
              >
                Explore
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <a href="/about" className="text-white hover:text-blue-300 transition-colors duration-300 font-medium">
                About
              </a>
              <a href="/impact" className="text-white hover:text-blue-300 transition-colors duration-300 font-medium">
                Impact
              </a>
              <a href="/contact" className="text-white hover:text-blue-300 transition-colors duration-300 font-medium">
                Contact
              </a>
              
              {/* CTA Button */}
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega Menu */}
      <MegaMenu isOpen={megaMenuOpen} onClose={closeMegaMenu} />

      {/* Background Overlay */}
      {megaMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          onClick={closeMegaMenu}
        />
      )}
    </div>
  );
};

export default MegaMenu;