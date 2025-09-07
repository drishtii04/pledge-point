import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart } from "lucide-react";

interface NeedyPerson {
  name: string;
  age: number;
  location: string;
  problem: string;
  description: string;
  requiredAmount: number;
  raisedAmount: number;
  image: string;
  category: "Medical" | "Education" | "Housing" | "Emergency";
  urgency: "High" | "Medium" | "Low";
}

const needyPeople: NeedyPerson[] = [
  {
    name: "Ramesh Kumar",
    age: 45,
    location: "Gulbarga, Karnataka",
    problem: "Urgent Heart Surgery",
    description: "Ramesh, a small farmer and father of two, needs urgent bypass surgery. He has been the sole breadwinner for his family but is now unable to work due to his heart condition. The surgery is critical for his survival.",
    requiredAmount: 300000,
    raisedAmount: 125000,
    image: "/beneficiaries/ramesh.jpg",
    category: "Medical",
    urgency: "High"
  },
  {
    name: "Lakshmi Devi",
    age: 12,
    location: "Belgaum, Karnataka",
    problem: "Education Support",
    description: "Lakshmi is a bright student who scored 95% in her exams. After losing her father, her mother struggles to pay for her education. She needs support to continue her studies and pursue her dream of becoming a doctor.",
    requiredAmount: 50000,
    raisedAmount: 15000,
    image: "/beneficiaries/lakshmi.jpg",
    category: "Education",
    urgency: "Medium"
  },
  {
    name: "Abdul Rahman",
    age: 58,
    location: "Bidar, Karnataka",
    problem: "Kidney Transplant",
    description: "Abdul needs a kidney transplant urgently. A retired school teacher, he has exhausted all his savings on dialysis. His son is a matching donor, but the family cannot afford the transplant surgery costs.",
    requiredAmount: 500000,
    raisedAmount: 275000,
    image: "/beneficiaries/abdul.jpg",
    category: "Medical",
    urgency: "High"
  },
  {
    name: "Suma Patil",
    age: 35,
    location: "Dharwad, Karnataka",
    problem: "Cancer Treatment",
    description: "Suma, a single mother of three, was recently diagnosed with breast cancer. She needs immediate treatment including surgery and chemotherapy. The family has no means to afford the complete treatment.",
    requiredAmount: 400000,
    raisedAmount: 150000,
    image: "/beneficiaries/suma.jpg",
    category: "Medical",
    urgency: "High"
  }
];

const NeedyPeopleSection = () => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateProgress = (raised: number, required: number) => {
    return (raised / required) * 100;
  };

  const getUrgencyColor = (urgency: NeedyPerson["urgency"]) => {
    switch (urgency) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <section id="needy-people" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            People Who Need Your <span className="gradient-text">Help</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your contribution can make a real difference in someone's life. Help these individuals overcome their challenges and build a better future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {needyPeople.map((person, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{person.name}</CardTitle>
                    <p className="text-muted-foreground">
                      {person.age} years • {person.location}
                    </p>
                  </div>
                  <Badge variant="outline" className={`${getUrgencyColor(person.urgency)} text-white`}>
                    {person.urgency} Priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-2">{person.problem}</h4>
                  <p className="text-muted-foreground">{person.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Raised: {formatAmount(person.raisedAmount)}</span>
                    <span>Goal: {formatAmount(person.requiredAmount)}</span>
                  </div>
                  <Progress value={calculateProgress(person.raisedAmount, person.requiredAmount)} className="h-2" />
                  <p className="text-sm text-muted-foreground text-right">
                    Still needed: {formatAmount(person.requiredAmount - person.raisedAmount)}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full cta-gradient" onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Heart className="w-4 h-4 mr-2" />
                  Donate Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeedyPeopleSection;
