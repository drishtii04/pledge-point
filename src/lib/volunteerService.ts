import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

// Define the volunteer data interface
export interface VolunteerData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  skills: string;
  availability: string;
  message: string;
  createdAt?: Timestamp;
}

export interface VolunteerOpportunity {
  id?: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  dateTime: string;
  createdAt?: Timestamp;
}

// Volunteer registration functions
export const addVolunteerRegistration = async (volunteerData: Omit<VolunteerData, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'volunteers'), {
      ...volunteerData,
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding volunteer:', error);
    throw error;
  }
};

export const getVolunteers = async (): Promise<VolunteerData[]> => {
  try {
    const q = query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const volunteers: VolunteerData[] = [];
    querySnapshot.forEach((doc) => {
      volunteers.push({ id: doc.id, ...doc.data() } as VolunteerData);
    });
    return volunteers;
  } catch (error) {
    console.error('Error getting volunteers: ', error);
    throw error;
  }
};

// Volunteer opportunity functions
export const addVolunteerOpportunity = async (opportunityData: Omit<VolunteerOpportunity, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'volunteer-opportunities'), {
      ...opportunityData,
      createdAt: Timestamp.now()
    });
    console.log('Opportunity created with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding opportunity: ', error);
    throw error;
  }
};

export const getVolunteerOpportunities = async (): Promise<VolunteerOpportunity[]> => {
  try {
    const q = query(collection(db, 'volunteer-opportunities'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const opportunities: VolunteerOpportunity[] = [];
    querySnapshot.forEach((doc) => {
      opportunities.push({ id: doc.id, ...doc.data() } as VolunteerOpportunity);
    });
    return opportunities;
  } catch (error) {
    console.error('Error getting opportunities: ', error);
    throw error;
  }
};