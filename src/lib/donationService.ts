import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

// Define the donation data interface
export interface DonationData {
  id?: string;
  donorName: string;
  email: string;
  phone?: string;
  amount: number;
  donationType: 'one-time' | 'monthly' | 'yearly';
  paymentMethod?: string;
  message?: string;
  isAnonymous: boolean;
  createdAt?: Timestamp;
  status?: 'pending' | 'completed' | 'failed';
}

// Define donation campaign interface
export interface DonationCampaign {
  id?: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  startDate: Timestamp;
  endDate: Timestamp;
  isActive: boolean;
  imageUrl?: string;
  createdAt?: Timestamp;
}

// Donation functions
export const addDonation = async (donationData: Omit<DonationData, 'id' | 'createdAt' | 'status'>) => {
  try {
    const docRef = await addDoc(collection(db, 'donations'), {
      ...donationData,
      createdAt: Timestamp.now(),
      status: 'pending'
    });
    console.log('Donation recorded with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding donation: ', error);
    throw error;
  }
};

export const getDonations = async (): Promise<DonationData[]> => {
  try {
    const q = query(collection(db, 'donations'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const donations: DonationData[] = [];
    querySnapshot.forEach((doc) => {
      donations.push({ id: doc.id, ...doc.data() } as DonationData);
    });
    return donations;
  } catch (error) {
    console.error('Error getting donations: ', error);
    throw error;
  }
};

// Campaign functions
export const addDonationCampaign = async (campaignData: Omit<DonationCampaign, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'donation-campaigns'), {
      ...campaignData,
      createdAt: Timestamp.now()
    });
    console.log('Campaign created with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding campaign: ', error);
    throw error;
  }
};

export const getDonationCampaigns = async (): Promise<DonationCampaign[]> => {
  try {
    const q = query(collection(db, 'donation-campaigns'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const campaigns: DonationCampaign[] = [];
    querySnapshot.forEach((doc) => {
      campaigns.push({ id: doc.id, ...doc.data() } as DonationCampaign);
    });
    return campaigns;
  } catch (error) {
    console.error('Error getting campaigns: ', error);
    throw error;
  }
};

// Get total donations amount
export const getTotalDonationsAmount = async (): Promise<number> => {
  try {
    const donations = await getDonations();
    const total = donations
      .filter(donation => donation.status === 'completed')
      .reduce((sum, donation) => sum + donation.amount, 0);
    return total;
  } catch (error) {
    console.error('Error calculating total donations: ', error);
    return 0;
  }
};