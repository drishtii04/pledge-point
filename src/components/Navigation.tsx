import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Events", path: "/events" },
    { label: "Impact", path: "/impact" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20"
          : "bg-slate-900/80 backdrop-blur-lg border-b border-blue-400/20 shadow-xl"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mr-4 animate-pulse-glow shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl group-hover:shadow-blue-500/25">
              <span className="text-white font-black text-xl transition-transform duration-300 group-hover:scale-110">B</span>
            </div>
            <h1 className={`text-2xl md:text-3xl font-black tracking-tight transition-all duration-300 group-hover:scale-105 ${
              isScrolled ? "text-slate-800 group-hover:text-blue-600" : "text-white group-hover:text-blue-200"
            }`}>Basava Yuva Brigade</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${
                  isScrolled 
                    ? "text-slate-700 hover:text-blue-600 hover:drop-shadow-sm" 
                    : "text-white/90 hover:text-blue-300 hover:drop-shadow-lg hover:shadow-blue-300/50"
                } before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-gradient-to-r before:from-blue-500 before:to-indigo-500 before:transition-all before:duration-300 hover:before:w-full`}
              >
                {item.label}
              </Link>
            ))}  
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/volunteer">
              <Button variant="outline" className="transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25 hover:bg-blue-50 hover:border-blue-400 group">
                <span className="transition-all duration-300 group-hover:font-semibold">Volunteer</span>
              </Button>
            </Link>
            <Link to="/donate">
              <Button variant="default" className="hero-gradient transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/40 group overflow-hidden relative">
                <span className="relative z-10 transition-all duration-300 group-hover:font-semibold group-hover:text-white">Donate Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-all duration-300 hover:scale-110 hover:rotate-3 p-2 rounded-lg ${
              isScrolled 
                ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50" 
                : "text-white hover:text-blue-300 hover:bg-white/10"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 
              <X size={24} className="transition-transform duration-300 hover:rotate-90" /> : 
              <Menu size={24} className="transition-transform duration-300" />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden backdrop-blur-md border-t ${
            isScrolled 
              ? "bg-white/95 border-gray-200" 
              : "bg-slate-900/95 border-blue-400/20"
          }`}>
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left px-4 py-2 transition-colors ${
                    isScrolled 
                      ? "text-slate-700 hover:text-blue-600" 
                      : "text-white/90 hover:text-blue-300"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-4 space-y-2">
                <Link to="/volunteer" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Volunteer
                  </Button>
                </Link>
                <Link to="/donate" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full hero-gradient">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;