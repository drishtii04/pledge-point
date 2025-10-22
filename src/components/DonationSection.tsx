import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, CreditCard, Shield, Award } from "lucide-react";
import { addDonation } from "@/lib/donationService";
import { useToast } from "@/hooks/use-toast";

const DonationSection = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    anonymous: false
  });

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare donation data for Firebase
      const donationData = {
        donorName: donorInfo.anonymous ? "Anonymous Donor" : donorInfo.name,
        email: donorInfo.anonymous ? "" : donorInfo.email,
        phone: donorInfo.anonymous ? "" : donorInfo.phone,
        amount: parseFloat(amount),
        donationType: isMonthly ? 'monthly' as const : 'one-time' as const,
        paymentMethod: 'pending', // Will be updated after payment gateway integration
        message: `Donation via website - ${isMonthly ? 'Monthly' : 'One-time'} contribution`,
        isAnonymous: donorInfo.anonymous,
      };

      // Submit to Firebase
      await addDonation(donationData);

      toast({
        title: "🎉 Donation Recorded!",
        description: `Thank you for your ${isMonthly ? 'monthly' : 'one-time'} donation of ₹${amount}! This would integrate with RazorPay for actual payment processing.`,
      });

      // Reset form
      setAmount("");
      setIsMonthly(false);
      setDonorInfo({
        name: "",
        email: "",
        phone: "",
        anonymous: false
      });

    } catch (error) {
      console.error("Error recording donation:", error);
      toast({
        title: "Donation Error",
        description: "There was an issue recording your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="donate" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Make a <span className="gradient-text">Donation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your generous contribution helps us continue our mission of creating positive change 
            in communities worldwide. Every donation, no matter the size, makes a real difference.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Donation Form */}
            <Card className="card-elevated animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Heart className="w-6 h-6 text-primary" />
                  <span>Donation Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonation} className="space-y-6">
                  {/* Donation Type */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="monthly" 
                        checked={isMonthly}
                        onCheckedChange={(checked) => setIsMonthly(!!checked)}
                      />
                      <Label htmlFor="monthly">Make this a monthly donation</Label>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <Label className="text-base font-semibold mb-4 block">
                      Enter Donation Amount (₹)
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter amount in INR"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full"
                      min="1"
                    />
                  </div>

                  {/* Message */}
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-sm text-success font-medium">
                      Every contribution makes a difference in someone's life. Thank you for your support.
                    </p>
                  </div>

                  {/* Donor Information */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Donor Information</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={donorInfo.name}
                          onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={donorInfo.email}
                          onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        value={donorInfo.phone}
                        onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="anonymous" 
                        checked={donorInfo.anonymous}
                        onCheckedChange={(checked) => setDonorInfo({...donorInfo, anonymous: !!checked})}
                      />
                      <Label htmlFor="anonymous">Make this donation anonymous</Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full cta-gradient text-lg" disabled={isSubmitting}>
                    <CreditCard className="w-5 h-5 mr-2" />
                    {isSubmitting ? "Recording Donation..." : `Donate ₹${amount || "0"}${isMonthly ? "/month" : ""}`}
                  </Button>

                  {/* Security Note */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Secure payment processing with 256-bit SSL encryption</span>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Why Donate Section */}
            <div className="space-y-6 animate-scale-in">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Why Your Donation Matters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p className="text-sm">
                      <strong>Transparent Use:</strong> 90% of donations go directly to programs, 
                      with only 10% for administrative costs.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <p className="text-sm">
                      <strong>Proven Impact:</strong> Over 50,000 lives improved through our 
                      evidence-based programs.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <p className="text-sm">
                      <strong>Regular Updates:</strong> Receive quarterly reports showing 
                      exactly how your donation created change.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Other Ways to Give</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Corporate Sponsorship
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    In-Kind Donations
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Planned Giving
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Fundraise for Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;