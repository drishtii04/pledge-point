import React, { useState } from "react";
import { Heart, CreditCard, Shield, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  createPayUPayment,
  submitPayUPayment,
  type PayUPaymentData 
} from "@/lib/payuService";

const DonationSection = () => {
  const [amount, setAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [anonymous, setAnonymous] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const predefinedAmounts = ["500", "1000", "2500", "5000"];

  const handleAmountSelect = (selectedAmount: string) => {
    setAmount(selectedAmount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount("");
  };

  const handleDonorInfoChange = (field: string, value: string) => {
    setDonorInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const finalAmount = amount || customAmount;
    
    if (!finalAmount || isNaN(Number(finalAmount)) || Number(finalAmount) < 1) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid donation amount (minimum ₹1)",
      });
      return false;
    }

    if (!anonymous) {
      if (!donorInfo.firstName || !donorInfo.email) {
        toast({
          variant: "destructive",
          title: "Required Information",
          description: "Please fill in your name and email address",
        });
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(donorInfo.email)) {
        toast({
          variant: "destructive",
          title: "Invalid Email",
          description: "Please enter a valid email address",
        });
        return false;
      }
    }

    return true;
  };

  const handlePayUPayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      const finalAmount = amount || customAmount;
      const paymentData: PayUPaymentData = {
        amount: Number(finalAmount),
        donorName: anonymous ? "Anonymous" : donorInfo.firstName,
        donorEmail: anonymous ? "anonymous@donation.com" : donorInfo.email,
        donorPhone: anonymous ? "9999999999" : (donorInfo.phone || "9999999999"),
        donationType: 'one-time' as const,
        purpose: `Donation to Basava Yuva Brigade - ₹${finalAmount}`,
      };

      const formData = createPayUPayment(paymentData);
      
      toast({
        title: "Redirecting to PayU",
        description: `Transaction ID: ${formData.txnid}. You will be redirected to complete your donation.`,
      });

      setTimeout(() => {
        submitPayUPayment(formData);
      }, 2000);

    } catch (error) {
      console.error("Payment error:", error);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "Unable to process payment. Please try again.",
      });
      setIsProcessing(false);
    }
  };

  return (
    <section id="donate" className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Make a Donation
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your contribution helps us create lasting change in communities. 
            Every donation, no matter the size, makes a meaningful difference in someone's life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Donation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Donation Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Choose Amount (₹)</Label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {predefinedAmounts.map((preAmount) => (
                    <Button
                      key={preAmount}
                      variant={amount === preAmount ? "default" : "outline"}
                      onClick={() => handleAmountSelect(preAmount)}
                      className="h-12"
                    >
                      ₹{preAmount}
                    </Button>
                  ))}
                </div>
                
                <div>
                  <Label htmlFor="custom-amount" className="text-sm text-gray-600">
                    Or enter custom amount
                  </Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="mt-1"
                    min="1"
                  />
                </div>
              </div>

              {/* Anonymous Donation Toggle */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={anonymous}
                  onCheckedChange={(checked) => setAnonymous(checked === true)}
                />
                <Label 
                  htmlFor="anonymous" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Make this an anonymous donation
                </Label>
              </div>

              {/* Donor Information */}
              {!anonymous && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Donor Information</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={donorInfo.firstName}
                        onChange={(e) => handleDonorInfoChange("firstName", e.target.value)}
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={donorInfo.lastName}
                        onChange={(e) => handleDonorInfoChange("lastName", e.target.value)}
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) => handleDonorInfoChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) => handleDonorInfoChange("phone", e.target.value)}
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
              )}

              {/* Payment Button */}
              <Button
                onClick={handlePayUPayment}
                disabled={isProcessing}
                className="w-full h-12 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {isProcessing ? "Processing..." : `Donate ₹${amount || customAmount || "0"}`}
              </Button>

              <div className="flex items-center justify-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-1" />
                Secured by PayU - Test Mode
              </div>
            </CardContent>
          </Card>

          {/* Impact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Your Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">₹500</h4>
                    <p className="text-sm text-gray-600">Provides educational materials for 5 children</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">₹1,000</h4>
                    <p className="text-sm text-gray-600">Funds a health checkup camp for 20 people</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">₹2,500</h4>
                    <p className="text-sm text-gray-600">Supports skill development training for 10 youth</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">₹5,000</h4>
                    <p className="text-sm text-gray-600">Sponsors a complete community development project</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Why Donate?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 100% of donations go directly to programs</li>
                  <li>• Regular updates on project progress</li>
                  <li>• Tax exemption certificate provided</li>
                  <li>• Transparent fund utilization</li>
                </ul>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Total donations received this year</p>
                <div className="text-3xl font-bold text-green-600">₹2,45,000</div>
                <p className="text-sm text-gray-500">Helping 500+ families</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
