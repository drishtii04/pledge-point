import { useState } from "react";
import { Heart, MessageCircle, X, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";

const FloatingActionButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: <Heart className="w-5 h-5" />,
      label: "Quick Donate",
      action: () => document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" }),
      className: "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Contact Us",
      action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
      className: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Call Now",
      action: () => window.open("tel:+919876543210"),
      className: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email Us",
      action: () => window.open("mailto:info@basavayuvabrigade.org"),
      className: "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
    }
  ];

  return (
    <div className="floating-elements fixed bottom-6 right-6">
      {/* Action buttons */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {actions.map((action, index) => (
          <div
            key={index}
            className={`transform transition-all duration-300 ${
              isOpen 
                ? 'translate-x-0 scale-100' 
                : 'translate-x-full scale-75'
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <Button
              onClick={action.action}
              className={`${action.className} text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl p-4 group relative border border-white/20`}
              size="sm"
            >
              {action.icon}
              <span className="absolute right-full mr-4 px-4 py-2 bg-gray-900/90 backdrop-blur-md text-white text-sm rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl border border-white/20">
                {action.label}
              </span>
            </Button>
          </div>
        ))}
      </div>

      {/* Main toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gradient-to-br from-primary to-accent rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 ${
          isOpen ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
        }`}
        size="lg"
      >
        {isOpen ? <X className="w-7 h-7 text-white" /> : <Heart className="w-7 h-7 text-white animate-pulse" />}
      </Button>
    </div>
  );
};

export default FloatingActionButtons;