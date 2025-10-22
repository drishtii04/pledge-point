// UPI Payment Service for Basava Yuva Brigade
// Supports multiple UPI apps and payment methods

export interface UpiPaymentData {
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  donationType: 'one-time' | 'monthly';
  isAnonymous: boolean;
}

export interface UpiPaymentResponse {
  success: boolean;
  transactionId?: string;
  upiTransactionId?: string;
  paymentMethod: string;
  amount: number;
  timestamp: string;
}

// UPI Configuration
const UPI_CONFIG = {
  // Your organization UPI details
  upiId: 'abhisek0baniya@oksbi', // Your actual UPI ID
  merchantName: 'Basava Yuva Brigade',
  merchantCode: 'BYB001', // Merchant code if you have one
  currency: 'INR',
  
  // Popular UPI apps for deep linking
  upiApps: {
    phonepe: 'phonepe://pay',
    paytm: 'paytmmp://pay',
    googlepay: 'tez://upi/pay',
    bhim: 'bhim://pay',
    amazonpay: 'amazonpay://pay',
    mobikwik: 'mobikwik://upi/pay',
    generic: 'upi://pay'
  }
};

// Generate UPI payment URL
export const generateUpiPaymentUrl = (
  paymentData: UpiPaymentData,
  upiApp: keyof typeof UPI_CONFIG.upiApps = 'generic'
): string => {
  const { amount, donorName, isAnonymous } = paymentData;
  
  // Generate transaction reference
  const transactionRef = `BYB${Date.now()}${Math.floor(Math.random() * 1000)}`;
  
  // UPI payment parameters
  const upiParams = {
    pa: UPI_CONFIG.upiId, // Payee Address (UPI ID)
    pn: UPI_CONFIG.merchantName, // Payee Name
    am: amount.toString(), // Amount
    cu: UPI_CONFIG.currency, // Currency
    tn: `Donation to ${UPI_CONFIG.merchantName} - ${isAnonymous ? 'Anonymous' : donorName}`, // Transaction Note
    tr: transactionRef, // Transaction Reference
    mc: UPI_CONFIG.merchantCode, // Merchant Code (optional)
  };

  // Build UPI URL
  const baseUrl = UPI_CONFIG.upiApps[upiApp];
  const queryParams = new URLSearchParams(upiParams).toString();
  
  return `${baseUrl}?${queryParams}`;
};

// Generate QR Code data for UPI payment
export const generateUpiQrData = (paymentData: UpiPaymentData): string => {
  return generateUpiPaymentUrl(paymentData, 'generic');
};

// Launch UPI app for payment
export const launchUpiPayment = (
  paymentData: UpiPaymentData,
  upiApp: keyof typeof UPI_CONFIG.upiApps = 'generic'
): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      const upiUrl = generateUpiPaymentUrl(paymentData, upiApp);
      
      // Try to open UPI app
      const link = document.createElement('a');
      link.href = upiUrl;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Return success (we can't actually verify if app opened)
      resolve(true);
    } catch (error) {
      console.error('Error launching UPI payment:', error);
      resolve(false);
    }
  });
};

// Check if device supports UPI payments
export const isUpiSupported = (): boolean => {
  // Check if running on mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // UPI is primarily supported on mobile devices in India
  return isMobile;
};

// Simulate payment verification (In real app, this should be done via payment gateway API)
export const verifyUpiPayment = async (
  transactionId: string,
  amount: number
): Promise<UpiPaymentResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real application, you would:
  // 1. Call your backend API
  // 2. Backend would verify with payment gateway/bank
  // 3. Return actual transaction status
  
  // For demo, we'll simulate a successful payment
  const isSuccess = Math.random() > 0.1; // 90% success rate for demo
  
  return {
    success: isSuccess,
    transactionId: transactionId,
    upiTransactionId: isSuccess ? `UPI${Date.now()}${Math.floor(Math.random() * 10000)}` : undefined,
    paymentMethod: 'UPI',
    amount: amount,
    timestamp: new Date().toISOString()
  };
};

// Copy UPI ID to clipboard
export const copyUpiId = async (): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(UPI_CONFIG.upiId);
    return true;
  } catch (error) {
    console.error('Failed to copy UPI ID:', error);
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = UPI_CONFIG.upiId;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

// Get available UPI payment methods
export const getAvailableUpiMethods = () => {
  const methods = [
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: '📱',
      color: '#5F259F'
    },
    {
      id: 'paytm',
      name: 'Paytm',
      icon: '💰',
      color: '#00BAF2'
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      icon: '💳',
      color: '#4285F4'
    },
    {
      id: 'bhim',
      name: 'BHIM',
      icon: '🏛️',
      color: '#FF6B35'
    },
    {
      id: 'amazonpay',
      name: 'Amazon Pay',
      icon: '🛒',
      color: '#FF9900'
    },
    {
      id: 'generic',
      name: 'Other UPI Apps',
      icon: '💸',
      color: '#6366F1'
    }
  ];

  return methods;
};

export default {
  generateUpiPaymentUrl,
  generateUpiQrData,
  launchUpiPayment,
  isUpiSupported,
  verifyUpiPayment,
  copyUpiId,
  getAvailableUpiMethods,
  UPI_CONFIG
};