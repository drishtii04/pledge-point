import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle,
  Heart,
  Users,
  Info,
  X,
  Send,
  HandHeart
} from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm Basava, your friendly assistant. How can I help you today?",
      type: "bot"
    }
  ]);

  const options = [
    { 
      label: "Donate",
      icon: <Heart className="w-4 h-4" />,
      response: "Thank you for your interest in donating! Every contribution helps us make a difference in rural communities.",
      action: () => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      label: "Volunteer",
      icon: <HandHeart className="w-4 h-4" />,
      response: "We're always looking for passionate volunteers to join our cause!",
      action: () => document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      label: "About Us",
      icon: <Info className="w-4 h-4" />,
      response: "Basava Yuva Brigade is dedicated to transforming rural communities through education, healthcare, and sustainable development.",
      action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  interface ChatOption {
    label: string;
    icon: JSX.Element;
    response: string;
    action?: () => void;
  }

  const handleOptionClick = (option: ChatOption) => {
    setMessages([
      ...messages,
      { text: option.label, type: "user" },
      { text: option.response, type: "bot" }
    ]);
    if (option.action) {
      option.action();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-50"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 shadow-xl z-50 animate-in slide-in-from-bottom-10">
          <CardContent className="p-0">
            {/* Chat Header */}
            <div className="p-4 bg-primary text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <HandHeart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Basava Assistant</h3>
                  <p className="text-xs opacity-90">Here to help you</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-white"
                        : "bg-muted"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Options */}
            <div className="p-4 border-t border-border">
              <div className="grid grid-cols-3 gap-2">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center p-2 h-auto"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.icon}
                    <span className="text-xs mt-1">{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
