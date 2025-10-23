import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, Home, RefreshCw, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PaymentFailure() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [paymentDetails, setPaymentDetails] = useState<Record<string, string> | null>(null);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    // Extract payment details from URL parameters
    const paymentData = Object.fromEntries(searchParams.entries());
    setPaymentDetails(paymentData);

    toast({
      title: "Payment Failed",
      description: "Your payment could not be processed. Please try again or contact support.",
      variant: "destructive",
    });
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

  const handleTryAgain = () => {
    navigate('/#donate');
  };

  const getFailureReason = () => {
    if (!paymentDetails) return 'Unknown error occurred';
    
    const error = paymentDetails.error || paymentDetails.error_Message || paymentDetails.field9;
    const status = paymentDetails.status;
    
    if (error) return error;
    if (status) return `Payment status: ${status}`;
    return 'Payment could not be completed';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-800">
            Payment Failed
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 mb-2">What happened?</h3>
            <p className="text-red-700 text-sm">
              {getFailureReason()}
            </p>
          </div>

          {paymentDetails && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Payment Details:</h4>
              {paymentDetails.txnid && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-sm">{paymentDetails.txnid}</span>
                </div>
              )}
              {paymentDetails.amount && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">₹{paymentDetails.amount}</span>
                </div>
              )}
              {paymentDetails.firstname && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Name:</span>
                  <span>{paymentDetails.firstname}</span>
                </div>
              )}
              {paymentDetails.email && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Email:</span>
                  <span>{paymentDetails.email}</span>
                </div>
              )}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">What can you do?</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Check your payment details and try again</li>
              <li>• Ensure you have sufficient balance</li>
              <li>• Try a different payment method</li>
              <li>• Contact your bank if the issue persists</li>
              <li>• Reach out to our support team for assistance</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleTryAgain} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button onClick={handleGoHome} variant="outline" className="flex-1">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Redirecting to home page in {countdown} seconds...</p>
            <p className="mt-1">Need help? Contact us at support@basavayuvabrigade.org</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}