import { Timestamp } from 'firebase/firestore';

// Firebase Data Types
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Timestamp;
  status: 'new' | 'replied' | 'closed';
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string;
  experience: string;
  registeredAt: Timestamp;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Donation {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  paymentMethod: string;
  purpose: string;
  isAnonymous: boolean;
  donatedAt: Timestamp;
  status: 'pending' | 'completed' | 'failed';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Timestamp;
  location: string;
  maxParticipants: number;
  category: string;
  participants: string[];
  createdAt: Timestamp;
  status: 'active' | 'cancelled' | 'completed';
}

export interface Story {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  imageUrl?: string;
  publishedAt: Timestamp;
  status: 'draft' | 'published' | 'archived';
  likes: number;
}

// Form input types (without Firebase-specific fields)
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string;
  experience: string;
}

export interface DonationFormData {
  donorName: string;
  email: string;
  amount: number;
  paymentMethod: string;
  purpose: string;
  isAnonymous: boolean;
}

export interface EventFormData {
  title: string;
  description: string;
  date: Date;
  location: string;
  maxParticipants: number;
  category: string;
}

export interface StoryFormData {
  title: string;
  content: string;
  author: string;
  category: string;
  imageUrl?: string;
}