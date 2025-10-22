import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Contact, Event, Story, ContactFormData, VolunteerFormData, DonationFormData, EventFormData, StoryFormData } from '@/types/firebase';

// Test Collections and Services

// 1. Contact Form Collection
export const contactCollection = collection(db, 'contacts');

export const submitContactForm = async (contactData: ContactFormData) => {
  try {
    const docRef = await addDoc(contactCollection, {
      ...contactData,
      createdAt: Timestamp.now(),
      status: 'new'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding contact:', error);
    return { success: false, error };
  }
};

export const getContacts = async (): Promise<Contact[]> => {
  try {
    const q = query(contactCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Contact[];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};

// 2. Volunteers Collection
export const volunteersCollection = collection(db, 'volunteers');

export const registerVolunteer = async (volunteerData: VolunteerFormData) => {
  try {
    const docRef = await addDoc(volunteersCollection, {
      ...volunteerData,
      registeredAt: Timestamp.now(),
      status: 'pending'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error registering volunteer:', error);
    return { success: false, error };
  }
};

// 3. Donations Collection
export const donationsCollection = collection(db, 'donations');

export const recordDonation = async (donationData: DonationFormData) => {
  try {
    const docRef = await addDoc(donationsCollection, {
      ...donationData,
      donatedAt: Timestamp.now(),
      status: 'completed'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error recording donation:', error);
    return { success: false, error };
  }
};

// 4. Events Collection
export const eventsCollection = collection(db, 'events');

export const createEvent = async (eventData: EventFormData) => {
  try {
    const docRef = await addDoc(eventsCollection, {
      ...eventData,
      date: Timestamp.fromDate(eventData.date),
      createdAt: Timestamp.now(),
      participants: [],
      status: 'active'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating event:', error);
    return { success: false, error };
  }
};

export const getUpcomingEvents = async (): Promise<Event[]> => {
  try {
    const q = query(
      eventsCollection, 
      orderBy('date', 'asc'),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Event[];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

// 5. Stories Collection (for impact stories)
export const storiesCollection = collection(db, 'stories');

export const addStory = async (storyData: StoryFormData) => {
  try {
    const docRef = await addDoc(storiesCollection, {
      ...storyData,
      publishedAt: Timestamp.now(),
      status: 'published',
      likes: 0
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding story:', error);
    return { success: false, error };
  }
};

export const getPublishedStories = async (): Promise<Story[]> => {
  try {
    const q = query(
      storiesCollection, 
      orderBy('publishedAt', 'desc'),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Story[];
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
};