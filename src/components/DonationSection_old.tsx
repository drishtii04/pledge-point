import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, CreditCard, Shield, Award, Smartphone, QrCode, Copy, CheckCircle } from "lucide-react";
import { addDonation } from "@/lib/donationService";
import { useToast } from "@/hooks/use-toast";
import { sendDonationNotificationEmail } from "@/lib/emailService";
import { 
  createPayUPayment,
  submitPayUPayment,
  type PayUPaymentData 
} from "@/lib/payuService";

// Keep UpiPaymentData interface for compatibility (can be renamed later)
interface PaymentData {
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  donationType: 'one-time' | 'monthly';
  isAnonymous: boolean;
}

const DonationSection = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle');
  const [transactionId, setTransactionId] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    anonymous: false
  });

  // Payment method selection - Only PayU available
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'payu'>('payu');

  // PayU requires donor info, so ensure anonymous is false
  useEffect(() => {
    if (donorInfo.anonymous) {
      setDonorInfo(prev => ({...prev, anonymous: false}));
    }
  }, [donorInfo.anonymous]);


  // Handle payment confirmation (for PayU callbacks)
  const handlePaymentConfirmation = async (isConfirmed: boolean) => {
    console.log('Payment confirmation clicked:', isConfirmed);
    
    if (!isConfirmed) {
      setPaymentStatus('failed');
      setIsSubmitting(false);
      setButtonClicked(false);
      return;
    }

    // Prevent double clicks
    if (buttonClicked) {
      console.log('Button already clicked, ignoring');
      return;
    }

    // Start processing payment confirmation
    setButtonClicked(true);
    setIsSubmitting(true);
    setPaymentStatus('success');
    
    // Safety timeout to prevent infinite loading state
    const safetyTimeout = setTimeout(() => {
      console.log('Safety timeout: Resetting isSubmitting state');
      setIsSubmitting(false);
    }, 5000);
    
    try {
      // Prepare donation data for Firebase
      const donationData = {
        donorName: donorInfo.anonymous ? "Anonymous Donor" : donorInfo.name,
        email: donorInfo.anonymous ? "" : donorInfo.email,
        phone: donorInfo.anonymous ? "" : donorInfo.phone,
        amount: parseFloat(amount) || 0,
        donationType: isMonthly ? 'monthly' as const : 'one-time' as const,
        paymentMethod: 'upi',
        message: `UPI Donation - ${isMonthly ? 'Monthly' : 'One-time'} contribution`,
        isAnonymous: donorInfo.anonymous,
        transactionId: transactionId || `BYB${Date.now()}`,
      };

      console.log('Submitting donation data:', donationData);

      // Submit to Firebase
      console.log('Calling addDonation...');
      await addDonation(donationData);
      console.log('Donation added successfully');

      // Send email notification (run in background)
      try {
        await sendDonationNotificationEmail({
          donor_name: donorInfo.anonymous ? 'Anonymous Donor' : donorInfo.name,
          donor_email: donorInfo.anonymous ? '' : donorInfo.email,
          donation_amount: parseFloat(amount),
          donation_type: isMonthly ? 'monthly' : 'one-time',
          is_anonymous: donorInfo.anonymous,
          from_name: donorInfo.anonymous ? 'Anonymous Donor' : donorInfo.name,
          from_email: donorInfo.anonymous ? 'no-reply@basava-yuva-brigade.org' : donorInfo.email,
          subject: 'New Donation Received',
          message: `Donation of ₹${amount} received via website`,
        });

        toast({
          title: "🎉 Donation Recorded!",
          description: `Thank you for your ${isMonthly ? 'monthly' : 'one-time'} donation of ₹${amount}! Your UPI payment has been confirmed and recorded.`,
        });
      } catch (emailError) {
        console.error('Email notification error (non-critical):', emailError);
        toast({
          title: "🎉 Donation Recorded!",
          description: `Thank you for your ${isMonthly ? 'monthly' : 'one-time'} donation of ₹${amount}! Your UPI payment has been confirmed. (Note: Email notifications may have failed)`,
        });
      }

      // Start countdown for auto-close
      console.log('Starting countdown for auto-close');
      setCountdown(3);

    } catch (error) {
      console.error("Error recording donation:", error);
      
      // Still show success to user but with error message
      toast({
        title: "Payment Confirmed",
        description: "Your payment is confirmed, but there was an issue recording it. Please contact us if needed.",
        variant: "destructive",
      });
      
      // Still start countdown even if there's an error
      setCountdown(3);
    }
    
    // Always reset submitting state
    clearTimeout(safetyTimeout);
    setIsSubmitting(false);
    setButtonClicked(false);
    console.log('Payment confirmation completed, all states reset');
  };

  // Countdown timer for auto-close
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (paymentStatus === 'success' && countdown > 0) {
      // Ensure isSubmitting is false during countdown
      if (isSubmitting) {
        console.log('Forcing isSubmitting to false during countdown');
        setIsSubmitting(false);
      }
      
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (paymentStatus === 'success' && countdown === 0) {
      // Auto-close modal and reset form
      console.log('Auto-closing modal after countdown');
      setShowUpiModal(false);
      setAmount("");
      setIsMonthly(false);
      setDonorInfo({
        name: "",
        email: "",
        phone: "",
        anonymous: false
      });
      setPaymentStatus('idle');
      setQrCodeUrl("");
      setCountdown(3);
      setIsSubmitting(false);
      setButtonClicked(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [paymentStatus, countdown, isSubmitting]);

  // Reset countdown when modal opens
  useEffect(() => {
    if (showUpiModal && paymentStatus === 'pending') {
      setCountdown(3);
      setButtonClicked(false);
      setIsSubmitting(false);
    }
  }, [showUpiModal, paymentStatus]);

  // Fallback: Force close modal if it's been in success state too long
  useEffect(() => {
    let fallbackTimer: NodeJS.Timeout;
    
    if (paymentStatus === 'success') {
      fallbackTimer = setTimeout(() => {
        console.log('Fallback: Force closing modal');
        setShowUpiModal(false);
        setPaymentStatus('idle');
        setIsSubmitting(false);
        setCountdown(3);
      }, 10000); // 10 second fallback
    }

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [paymentStatus]);

  // PayU payment handler
  const handlePayUPayment = async (paymentData: PaymentData) => {
    try {
      console.log('Starting PayU payment...', paymentData); // Debug log
      const txnId = `BYB${Date.now()}${Math.floor(Math.random() * 1000)}`;
      setTransactionId(txnId);

      // Convert UpiPaymentData to PayUPaymentData format
      const payuPaymentData = {
        donorName: paymentData.donorName,
        donorEmail: paymentData.donorEmail,
        donorPhone: paymentData.donorPhone,
        amount: paymentData.amount,
        donationType: paymentData.donationType,
        beneficiary: 'Basava Yuva Brigade',
        purpose: 'Community Development Donation'
      };

      console.log('PayU payment data prepared:', payuPaymentData); // Debug log
      const payuFormData = createPayUPayment(payuPaymentData);
      console.log('PayU form data created:', payuFormData); // Debug log

      // Show loading state
      toast({
        title: "Redirecting to PayU",
        description: "Please wait while we redirect you to the payment gateway...",
      });

      // Submit PayU form - this will redirect to PayU
      submitPayUPayment(payuFormData);
      
      // Note: After submitPayUPayment, user will be redirected to PayU gateway
      // So we don't reset isSubmitting here as the page will change
      
    } catch (error) {
      console.error('PayU payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate PayU payment. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  // Main donation handler - routes to UPI or PayU
  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!amount || parseFloat(amount) < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount (minimum ₹1).",
        variant: "destructive",
      });
      return;
    }

    // PayU requires name and email
    if (!donorInfo.name || !donorInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email for PayU payment.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Prepare payment data for PayU
    const paymentData: PaymentData = {
      donorName: donorInfo.name,
      donorEmail: donorInfo.email,
      donorPhone: donorInfo.phone,
      amount: parseFloat(amount),
      donationType: isMonthly ? 'monthly' : 'one-time',
      isAnonymous: false,
    };

    // Handle PayU payment
    await handlePayUPayment(paymentData);
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

                  {/* Payment Method Info */}
                  <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium text-primary">PayU Secure Payment Gateway</div>
                        <div className="text-sm text-muted-foreground">Supports Cards, NetBanking, UPI & Wallets</div>
                      </div>
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
                        checked={false}
                        disabled={true}
                        onCheckedChange={() => {}}
                      />
                      <Label htmlFor="anonymous" className="text-muted-foreground">
                        Make this donation anonymous (Not available - PayU requires donor information)
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full cta-gradient text-lg" disabled={isSubmitting}>
                    <CreditCard className="w-5 h-5 mr-2" />
                    {isSubmitting 
                      ? "Redirecting to PayU Gateway..." 
                      : `Pay ₹${amount || "0"} via PayU${isMonthly ? "/month" : ""}`
                    }
                  </Button>

                  {/* Security Note */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Secure UPI payments powered by India's digital payment infrastructure</span>
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

      {/* UPI Payment Modal */}
      <Dialog open={showUpiModal} onOpenChange={setShowUpiModal}>
        <DialogContent className="max-w-lg w-full mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>UPI Payment</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pb-4">
            {/* Payment Details */}
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">Amount to Pay</p>
              <p className="text-xl sm:text-2xl font-bold">₹{amount}</p>
              <p className="text-xs text-muted-foreground">
                {isMonthly ? 'Monthly' : 'One-time'} Donation
              </p>
            </div>

            {paymentStatus === 'pending' && (
              <>
                {/* QR Code */}
                {qrCodeUrl ? (
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 bg-white rounded-lg border shadow-sm">
                        <img 
                          src={qrCodeUrl} 
                          alt="UPI QR Code for Donation" 
                          className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Scan this QR code with any UPI app
                      </p>
                      <p className="text-xs font-medium text-primary">
                        Amount: ₹{amount} • {isMonthly ? 'Monthly' : 'One-time'} Donation
                      </p>
                      <p className="text-xs text-muted-foreground">
                        UPI ID: abhisek0baniya@oksbi
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-8 bg-muted rounded-lg border">
                        <QrCode className="w-16 h-16 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Generating QR code...
                    </p>
                  </div>
                )}

                {/* UPI Apps */}
                {upiSupported && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-center">Or pay with your UPI app:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {upiMethods.slice(0, 6).map((method) => (
                        <Button
                          key={method.id}
                          variant="outline"
                          className="flex items-center justify-center space-x-1 h-10 text-xs"
                          onClick={() => handleUpiPayment(method.id)}
                        >
                          <span className="text-base">{method.icon}</span>
                          <span className="hidden sm:inline">{method.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Manual UPI ID */}
                <div className="space-y-1">
                  <p className="text-sm font-medium">Manual Payment:</p>
                  <div className="flex items-center space-x-2 p-2 bg-muted rounded text-sm">
                    <code className="flex-1 text-xs sm:text-sm">abhisek0baniya@oksbi</code>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleCopyUpiId}
                      className="h-8 w-8 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Copy this UPI ID and use it in your UPI app
                  </p>
                </div>

                {/* Confirmation Buttons */}
                <div className="space-y-2 pt-2 border-t">
                  <p className="text-sm text-center">Have you completed the payment?</p>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => {
                        console.log('Yes Paid button clicked, isSubmitting:', isSubmitting, 'buttonClicked:', buttonClicked);
                        if (!isSubmitting && !buttonClicked) {
                          handlePaymentConfirmation(true);
                        }
                      }}
                      className="flex-1 h-10"
                      disabled={isSubmitting || buttonClicked || paymentStatus === 'success'}
                    >
                      {isSubmitting && paymentStatus !== 'success' ? (
                        <>
                          <div className="w-4 h-4 mr-1 animate-spin border-2 border-white border-t-transparent rounded-full"></div>
                          <span className="text-sm">Processing...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">Yes, Paid</span>
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        console.log('Cancel button clicked');
                        handlePaymentConfirmation(false);
                      }}
                      className="flex-1 h-10"
                      disabled={isSubmitting || paymentStatus === 'success'}
                    >
                      <span className="text-sm">Cancel</span>
                    </Button>
                  </div>
                </div>
              </>
            )}

            {paymentStatus === 'success' && (
              <div className="text-center space-y-4">
                <div className="relative">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-green-200 rounded-full animate-ping"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-600">Payment Successful!</h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you for your donation of ₹{amount}! You will receive an email confirmation shortly.
                  </p>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 font-medium">
                      Auto-closing in {countdown} second{countdown !== 1 ? 's' : ''}...
                    </p>
                    <div className="mt-2 w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(3 - countdown) / 3 * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setShowUpiModal(false);
                      setPaymentStatus('idle');
                      setCountdown(3);
                    }}
                    className="mt-2"
                  >
                    Close Now
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DonationSection;