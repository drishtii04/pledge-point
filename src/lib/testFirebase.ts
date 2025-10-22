// Quick Firebase Connection Test
// Run this in the browser console or create a test component

import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

// Test function to verify Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log('🔥 Testing Firebase connection...');
    
    // Test adding a document to a test collection
    const testDoc = await addDoc(collection(db, 'test'), {
      message: 'Firebase connection test',
      timestamp: new Date().toISOString(),
      status: 'working'
    });
    
    console.log('✅ Firebase connection successful! Document ID:', testDoc.id);
    return { success: true, docId: testDoc.id };
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return { success: false, error };
  }
};

// You can call this function in the browser console:
// testFirebaseConnection();