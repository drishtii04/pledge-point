import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Receipt, ArrowRight } from 'lucide-react';
import { verifyPayUResponse } from '@/lib/payuService';
import { addDonation } from '@/lib/donationService';
import { sendDonationNotificationEmail } from '@/lib/emailService';
import { useToast } from '@/hooks/use-toast';

interface PayUResponseData {
  mihpayid: string;
  mode: string;
  status: string;
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  hash: string;
  udf1: string;
  udf2: string;
  udf3: string;
  udf4: string;
  udf5: string;
}

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PayUResponseData | null>(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Extract payment details from URL parameters
    const paymentData: PayUResponseData = {
      mihpayid: searchParams.get('mihpayid') || '',
      mode: searchParams.get('mode') || '',
      status: searchParams.get('status') || '',
      key: searchParams.get('key') || '',
      txnid: searchParams.get('txnid') || '',
      amount: searchParams.get('amount') || '',
      productinfo: searchParams.get('productinfo') || '',
      firstname: searchParams.get('firstname') || '',
      email: searchParams.get('email') || '',
      phone: searchParams.get('phone') || '',
      hash: searchParams.get('hash') || '',
      udf1: searchParams.get('udf1') || '',
      udf2: searchParams.get('udf2') || '',
      udf3: searchParams.get('udf3') || '',
      udf4: searchParams.get('udf4') || '',
      udf5: searchParams.get('udf5') || '',
    };

    setPaymentDetails(paymentData);

    // Verify payment response
    const isPaymentVerified = verifyPayUResponse(paymentData as Record<string, string>);
    setIsVerified(isPaymentVerified);

    if (isPaymentVerified && paymentData.status === 'success') {
      // Save donation to database
      const donationData = {
        donorName: paymentData.firstname,
        donorEmail: paymentData.email,
        donorPhone: paymentData.phone || '',
        amount: parseFloat(paymentData.amount),
        donationType: paymentData.udf3 as 'one-time' | 'monthly',
        paymentMethod: 'payu',
        transactionId: paymentData.txnid,
        paymentStatus: 'completed',
        timestamp: new Date().toISOString(),
        isAnonymous: false,
      };

      // Add donation to database
      addDonation(donationData);

      // Send notification email
      if (paymentData.email) {
        sendDonationNotificationEmail(donationData).catch(error => {
          console.error('Failed to send notification email:', error);
        });
      }

      toast({
        title: "Payment Successful!",
        description: `Thank you for your donation of ₹${paymentData.amount}. A confirmation email has been sent.`,
      });
    } else {
      toast({
        title: "Payment Verification Failed",
        description: "There was an issue verifying your payment. Please contact support.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  // Countdown timer for auto-redirect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleViewReceipt = () => {
    // You can implement a receipt view or download functionality here
    window.print();
  };

  if (isVerified === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            {isVerified && paymentDetails?.status === 'success' 
              ? 'Payment Successful!' 
              : 'Payment Issue'
            }
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {isVerified && paymentDetails?.status === 'success' ? (
            <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Thank you for your donation!</h3>
                <p className="text-green-700 text-sm">
                  Your contribution will help us make a positive impact in the community.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">₹{paymentDetails?.amount}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-sm">{paymentDetails?.txnid}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-mono text-sm">{paymentDetails?.mihpayid}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Payment Mode:</span>
                  <span className="capitalize">{paymentDetails?.mode}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Donor:</span>
                  <span>{paymentDetails?.firstname}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleViewReceipt} variant="outline" className="flex-1">
                  <Receipt className="w-4 h-4 mr-2" />
                  View Receipt
                </Button>
                <Button onClick={handleGoHome} className="flex-1">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Payment Verification Failed</h3>
                <p className="text-red-700 text-sm">
                  There was an issue with your payment. Please contact our support team.
                </p>
              </div>

              <Button onClick={handleGoHome} className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </>
          )}

          <div className="text-center text-sm text-gray-500">
            <p>Redirecting to home page in {countdown} seconds...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}