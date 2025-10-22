import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

// Define the contact data interface
export interface ContactData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt?: Timestamp;
  status?: 'new' | 'read' | 'replied';
}

// Contact form functions
export const addContactMessage = async (contactData: Omit<ContactData, 'id' | 'createdAt' | 'status'>) => {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...contactData,
      createdAt: Timestamp.now(),
      status: 'new'
    });
    console.log('Contact message sent with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding contact message: ', error);
    throw error;
  }
};

export const getContactMessages = async (): Promise<ContactData[]> => {
  try {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const contacts: ContactData[] = [];
    querySnapshot.forEach((doc) => {
      contacts.push({ id: doc.id, ...doc.data() } as ContactData);
    });
    return contacts;
  } catch (error) {
    console.error('Error getting contact messages: ', error);
    throw error;
  }
};

// Newsletter subscription
export interface NewsletterSubscription {
  id?: string;
  email: string;
  name?: string;
  createdAt?: Timestamp;
  isActive?: boolean;
}

export const addNewsletterSubscription = async (subscriptionData: Omit<NewsletterSubscription, 'id' | 'createdAt' | 'isActive'>) => {
  try {
    const docRef = await addDoc(collection(db, 'newsletter-subscriptions'), {
      ...subscriptionData,
      createdAt: Timestamp.now(),
      isActive: true
    });
    console.log('Newsletter subscription added with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding newsletter subscription: ', error);
    throw error;
  }
};

export const getNewsletterSubscriptions = async (): Promise<NewsletterSubscription[]> => {
  try {
    const q = query(collection(db, 'newsletter-subscriptions'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const subscriptions: NewsletterSubscription[] = [];
    querySnapshot.forEach((doc) => {
      subscriptions.push({ id: doc.id, ...doc.data() } as NewsletterSubscription);
    });
    return subscriptions;
  } catch (error) {
    console.error('Error getting newsletter subscriptions: ', error);
    throw error;
  }
};