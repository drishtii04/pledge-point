// PayU Payment Service for Basava Yuva Brigade
// Integrates PayU payment gateway with donation system

import CryptoJS from 'crypto-js';

export interface PayUPaymentData {
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  donationType: 'one-time' | 'monthly';
  beneficiary?: string;
  purpose?: string;
}

export interface PayUConfig {
  merchantKey: string;
  salt: string;
  merchantId: string;
  isTestMode: boolean;
}

export interface PayUFormData {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
  service_provider?: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

// PayU Configuration with your credentials
const PAYU_CONFIG: PayUConfig = {
  merchantKey: 'WiTIjg',
  salt: 'unK6WU6ur2jKDBDkPjTa91QcrX8U2Fmr',
  merchantId: '9005128',
  isTestMode: true // Set to false for production
};

// PayU URLs
const PAYU_URLS = {
  test: 'https://test.payu.in/_payment',
  live: 'https://secure.payu.in/_payment'
};

// Generate unique transaction ID
export const generateTransactionId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `BYB_${timestamp}_${random}`;
};

// Generate SHA512 hash for PayU
export const generatePayUHash = (
  key: string,
  txnid: string,
  amount: string,
  productinfo: string,
  firstname: string,
  email: string,
  salt: string,
  udf1?: string,
  udf2?: string,
  udf3?: string,
  udf4?: string,
  udf5?: string
): string => {
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1 || ''}|${udf2 || ''}|${udf3 || ''}|${udf4 || ''}|${udf5 || ''}||||||${salt}`;
  console.log('Hash calculation:');
  console.log('Hash string:', hashString);
  const hash = CryptoJS.SHA512(hashString).toString(CryptoJS.enc.Hex);
  console.log('Generated hash:', hash);
  return hash;
};

// Create PayU payment form data
export const createPayUPayment = (paymentData: PayUPaymentData): PayUFormData => {
  const txnid = generateTransactionId();
  const amount = paymentData.amount.toString();
  const productinfo = paymentData.beneficiary 
    ? `Donation for ${paymentData.beneficiary} - ${paymentData.purpose || 'Support'}`
    : `Donation to Basava Yuva Brigade - ${paymentData.purpose || 'General Fund'}`;

  // Callback URLs (you can customize these)
  const baseURL = window.location.origin;
  const surl = `${baseURL}/payment/success`;
  const furl = `${baseURL}/payment/failure`;

  // Define UDF fields
  const udf1 = paymentData.beneficiary || '';
  const udf2 = paymentData.purpose || '';
  const udf3 = paymentData.donationType;
  const udf4 = 'basava-yuva-brigade';
  const udf5 = '';

  // Generate hash with all UDF fields
  const hash = generatePayUHash(
    PAYU_CONFIG.merchantKey,
    txnid,
    amount,
    productinfo,
    paymentData.donorName,
    paymentData.donorEmail,
    PAYU_CONFIG.salt,
    udf1,
    udf2,
    udf3,
    udf4,
    udf5
  );

  return {
    key: PAYU_CONFIG.merchantKey,
    txnid,
    amount,
    productinfo,
    firstname: paymentData.donorName,
    email: paymentData.donorEmail,
    phone: paymentData.donorPhone,
    surl,
    furl,
    hash,
    service_provider: 'payu_paisa',
    udf1,
    udf2,
    udf3,
    udf4,
    udf5
  };
};

// Submit payment to PayU
export const submitPayUPayment = (formData: PayUFormData): void => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = PAYU_CONFIG.isTestMode ? PAYU_URLS.test : PAYU_URLS.live;

  // Add all form fields
  Object.entries(formData).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value || '';
    form.appendChild(input);
  });

  // Submit form
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

// Verify PayU response (for callback handling)
export const verifyPayUResponse = (
  responseData: Record<string, string>
): boolean => {
  try {
    const {
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      status,
      hash: receivedHash,
      udf1 = '',
      udf2 = '',
      udf3 = '',
      udf4 = '',
      udf5 = ''
    } = responseData;

    // Generate hash for verification
    const hashString = `${PAYU_CONFIG.salt}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    const calculatedHash = CryptoJS.SHA512(hashString).toString(CryptoJS.enc.Hex);

    return calculatedHash === receivedHash;
  } catch (error) {
    console.error('PayU verification error:', error);
    return false;
  }
};

// Get payment status from PayU response
export const getPaymentStatus = (responseData: Record<string, string>) => {
  const status = responseData.status?.toLowerCase();
  
  switch (status) {
    case 'success':
      return {
        success: true,
        status: 'success',
        message: 'Payment completed successfully!',
        transactionId: responseData.txnid,
        payuId: responseData.payuMoneyId || responseData.mihpayid
      };
    case 'failure':
      return {
        success: false,
        status: 'failed',
        message: responseData.error_Message || 'Payment failed. Please try again.',
        transactionId: responseData.txnid
      };
    case 'pending':
      return {
        success: false,
        status: 'pending',
        message: 'Payment is being processed. You will receive confirmation shortly.',
        transactionId: responseData.txnid
      };
    default:
      return {
        success: false,
        status: 'unknown',
        message: 'Payment status unknown. Please contact support.',
        transactionId: responseData.txnid
      };
  }
};

// Test PayU configuration
export const testPayUConfig = (): boolean => {
  try {
    // Test hash generation
    const testHash = generatePayUHash(
      'test_key',
      'test_txn',
      '100',
      'Test Product',
      'Test User',
      'test@example.com',
      'test_salt'
    );
    
    return testHash && testHash.length === 128; // SHA512 produces 128 character hex string
  } catch (error) {
    console.error('PayU config test failed:', error);
    return false;
  }
};

// Export configuration for debugging
export const getPayUConfig = () => ({
  ...PAYU_CONFIG,
  salt: PAYU_CONFIG.salt.substring(0, 5) + '...' // Don't expose full salt in logs
});

export default {
  createPayUPayment,
  submitPayUPayment,
  generateTransactionId,
  generatePayUHash,
  verifyPayUResponse,
  getPaymentStatus,
  testPayUConfig,
  getPayUConfig
};