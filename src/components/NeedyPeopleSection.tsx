import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Heart, User, Mail, Phone, MapPin, CreditCard, X, QrCode } from "lucide-react";
import kidneyTransplantImage from "@/assets/kidneytransplant.jpg";
import lakshmiImage from "@/assets/lakshmi.jpg";
import rameshKumarImage from "@/assets/rameshkumar.jpg";
import sumaPatelImage from "@/assets/sumapatel.jpg";
import { generateUpiPaymentUrl, type UpiPaymentData } from "@/lib/upiService";
import QRCode from 'qrcode';

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
    image: rameshKumarImage,
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
    image: lakshmiImage,
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
    image: kidneyTransplantImage,
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
    image: sumaPatelImage,
    category: "Medical",
    urgency: "High"
  }
];

const NeedyPeopleSection = () => {
  // Animation states for each person
  const [animatedAmounts, setAnimatedAmounts] = useState<{[key: number]: {raised: number, required: number}}>({});
  const [hasAnimated, setHasAnimated] = useState(false);

  // Donation modal state
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<NeedyPerson | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [donationForm, setDonationForm] = useState({
    amount: '',
    donorName: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    donationType: 'one-time'
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate each person's amounts
            needyPeople.forEach((person, index) => {
              const raisedStartTime = Date.now();
              const requiredStartTime = Date.now() + 200; // Slight delay for required amount
              const duration = 2500 + index * 200;
              
              const animateAmounts = () => {
                const now = Date.now();
                
                // Animate raised amount
                const raisedElapsed = now - raisedStartTime;
                const raisedProgress = Math.min(raisedElapsed / duration, 1);
                const raisedEaseOut = 1 - Math.pow(1 - raisedProgress, 4);
                const currentRaised = Math.floor(person.raisedAmount * raisedEaseOut);
                
                // Animate required amount
                const requiredElapsed = now - requiredStartTime;
                const requiredProgress = Math.min(requiredElapsed / (duration + 500), 1);
                const requiredEaseOut = 1 - Math.pow(1 - requiredProgress, 4);
                const currentRequired = Math.floor(person.requiredAmount * requiredEaseOut);
                
                setAnimatedAmounts(prev => ({
                  ...prev,
                  [index]: {
                    raised: currentRaised,
                    required: currentRequired
                  }
                }));
                
                if (raisedProgress < 1 || requiredProgress < 1) {
                  requestAnimationFrame(animateAmounts);
                }
              };
              
              animateAmounts();
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('needy-people-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

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

  const handleDonateClick = (person: NeedyPerson) => {
    setSelectedPerson(person);
    setIsDonationModalOpen(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setDonationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDonationSubmit = async () => {
    try {
      // Create payment data
      const paymentData: UpiPaymentData = {
        donorName: donationForm.donorName,
        donorEmail: donationForm.email,
        donorPhone: donationForm.phone,
        amount: parseFloat(donationForm.amount),
        donationType: donationForm.donationType as 'one-time' | 'monthly',
        isAnonymous: false
      };

      // Create payment note with beneficiary details
      const paymentNote = `Donation for ${selectedPerson?.name} - ${selectedPerson?.problem}`;
      
      // Generate UPI payment URL
      const upiUrl = generateUpiPaymentUrl(paymentData);

      // Generate QR Code using the same method as DonationSection
      const qrDataUrl = await QRCode.toDataURL(upiUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      setQrCodeUrl(qrDataUrl);
      
      // Show payment modal
      setShowPaymentModal(true);
      
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment. Please try again.');
    }
  };

  const handlePaymentSuccess = () => {
    alert(`Thank you ${donationForm.donorName}! Your donation of ₹${donationForm.amount} for ${selectedPerson?.name} has been received successfully.`);
    
    // Close all modals
    setShowPaymentModal(false);
    setIsDonationModalOpen(false);
    
    // Reset form
    setDonationForm({
      amount: '',
      donorName: '',
      email: '',
      phone: '',
      address: '',
      message: '',
      donationType: 'one-time'
    });
    setQrCodeUrl('');
  };

  const suggestedAmounts = [500, 1000, 2500, 5000, 10000];

  return (
    <section id="needy-people" className="content-section py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            People Who Need Your <span className="gradient-text">Help</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your contribution can make a real difference in someone's life. Help these individuals overcome their challenges and build a better future.
          </p>
        </div>

        <div id="needy-people-section" className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 px-4">
          {needyPeople.map((person, index) => {
            const raisedCount = animatedAmounts[index]?.raised || 0;
            const requiredCount = animatedAmounts[index]?.required || 0;
            const progressValue = raisedCount > 0 ? calculateProgress(raisedCount, requiredCount) : 0;
            
            return (
              <Card 
                id={`needy-card-${index}`}
                key={index} 
                className="bg-white overflow-hidden animate-fade-in rounded-3xl shadow-2xl border-0 hover:shadow-3xl transition-all duration-500 hover:scale-105" 
                style={{animationDelay: `${index * 0.2}s`}}
              >
                {/* Beneficiary Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={person.image} 
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className={`${getUrgencyColor(person.urgency)} text-white border-white`}>
                      {person.urgency} Priority
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white text-xl font-bold">{person.name}</h3>
                    <p className="text-white/90 text-sm">
                      {person.age} years • {person.location}
                    </p>
                  </div>
                </div>
                
                <CardContent className="space-y-4 p-6">
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-2">{person.problem}</h4>
                    <p className="text-muted-foreground leading-relaxed">{person.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="counting-number">
                        Raised: {formatAmount(raisedCount)}
                      </span>
                      <span className="counting-number">
                        Goal: {formatAmount(requiredCount)}
                      </span>
                    </div>
                    <div className="relative">
                      <Progress value={progressValue} className="h-3 bg-gray-200" />
                      <div 
                        className="absolute inset-0 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-2000 ease-out"
                        style={{ 
                          width: `${progressValue}%`,
                          transition: raisedCount > 0 ? 'width 2s ease-out' : 'none'
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground text-right counting-number">
                      Still needed: {formatAmount(Math.max(0, requiredCount - raisedCount))}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full cta-gradient" 
                    onClick={() => handleDonateClick(person)}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Donate Now
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Donation Modal */}
      <Dialog open={isDonationModalOpen} onOpenChange={setIsDonationModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Support {selectedPerson?.name}
            </DialogTitle>
            <DialogDescription className="text-center">
              Help {selectedPerson?.name} with {selectedPerson?.problem?.toLowerCase()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Beneficiary Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedPerson?.image} 
                  alt={selectedPerson?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
                />
                <div>
                  <h4 className="font-semibold text-lg">{selectedPerson?.name}</h4>
                  <p className="text-sm text-gray-600">{selectedPerson?.age} years • {selectedPerson?.location}</p>
                  <p className="text-sm font-medium text-blue-600">{selectedPerson?.problem}</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-700">
                  Still needed: {selectedPerson && formatAmount(Math.max(0, selectedPerson.requiredAmount - selectedPerson.raisedAmount))}
                </p>
              </div>
            </div>

            {/* Donation Amount */}
            <div className="space-y-3">
              <Label htmlFor="amount" className="text-base font-semibold flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Donation Amount (₹)
              </Label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {suggestedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={donationForm.amount === amount.toString() ? "default" : "outline"}
                    className="h-12 text-sm"
                    onClick={() => handleFormChange('amount', amount.toString())}
                  >
                    ₹{amount.toLocaleString()}
                  </Button>
                ))}
              </div>
              <Input
                id="amount"
                type="number"
                placeholder="Enter custom amount"
                value={donationForm.amount}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                className="text-lg h-12"
              />
            </div>

            {/* Donation Type */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Donation Type</Label>
              <Select value={donationForm.donationType} onValueChange={(value) => handleFormChange('donationType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select donation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time Donation</SelectItem>
                  <SelectItem value="monthly">Monthly Donation</SelectItem>
                  <SelectItem value="quarterly">Quarterly Donation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Donor Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="donorName" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Full Name *
                </Label>
                <Input
                  id="donorName"
                  placeholder="Enter your full name"
                  value={donationForm.donorName}
                  onChange={(e) => handleFormChange('donorName', e.target.value)}
                  required
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
                  value={donationForm.email}
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
                  value={donationForm.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Address
                </Label>
                <Input
                  id="address"
                  placeholder="Enter your address"
                  value={donationForm.address}
                  onChange={(e) => handleFormChange('address', e.target.value)}
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Leave a message of support..."
                value={donationForm.message}
                onChange={(e) => handleFormChange('message', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDonationModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDonationSubmit}
              disabled={!donationForm.amount || !donationForm.donorName || !donationForm.email || !donationForm.phone}
              className="w-full sm:w-auto cta-gradient"
            >
              Donate ₹{donationForm.amount || '0'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* UPI Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-[500px] max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Complete Your Donation
            </DialogTitle>
            <DialogDescription className="text-center">
              Scan QR code or use UPI apps to donate ₹{donationForm.amount} for {selectedPerson?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* QR Code */}
            {qrCodeUrl && (
              <div className="text-center">
                <div className="bg-white p-3 rounded-lg border-2 border-gray-200 inline-block">
                  <img 
                    src={qrCodeUrl} 
                    alt="UPI QR Code"
                    className="w-40 h-40 mx-auto"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Scan with any UPI app to pay
                </p>
              </div>
            )}

            {/* UPI Apps */}
            <div className="text-center">
              <p className="text-sm font-medium mb-2">Or pay using UPI apps:</p>
              <div className="grid grid-cols-3 gap-2">
                {['PhonePe', 'Google Pay', 'Paytm'].map((app) => (
                  <Button
                    key={app}
                    variant="outline"
                    className="h-10 text-xs px-2"
                    onClick={() => {
                      const paymentData: UpiPaymentData = {
                        donorName: donationForm.donorName,
                        donorEmail: donationForm.email,
                        donorPhone: donationForm.phone,
                        amount: parseFloat(donationForm.amount),
                        donationType: donationForm.donationType as 'one-time' | 'monthly',
                        isAnonymous: false
                      };
                      const upiUrl = generateUpiPaymentUrl(paymentData);
                      window.open(upiUrl, '_blank');
                    }}
                  >
                    {app}
                  </Button>
                ))}
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-1 text-sm">Payment Instructions:</h4>
              <ul className="text-xs text-blue-700 space-y-0.5">
                <li>• Scan the QR code using any UPI app</li>
                <li>• Or click on your preferred UPI app above</li>
                <li>• Complete the payment of ₹{donationForm.amount}</li>
                <li>• Come back and confirm payment</li>
              </ul>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowPaymentModal(false)}
              className="w-full sm:w-auto h-10"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePaymentSuccess}
              className="w-full sm:w-auto h-10 bg-green-600 hover:bg-green-700 text-white"
            >
              I've Completed Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default NeedyPeopleSection;