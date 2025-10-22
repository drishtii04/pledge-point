import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// Using environment variables from .env file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment and not in development)
export const analytics = typeof window !== 'undefined' && !import.meta.env.DEV ? getAnalytics(app) : null;

// Connect to emulators in development
let emulatorConnected = false;
if (import.meta.env.DEV && typeof window !== 'undefined' && !emulatorConnected) {
  try {
    connectFirestoreEmulator(db, 'localhost', 8081);
    emulatorConnected = true;
    console.log('🔥 Connected to Firebase Emulator at localhost:8081');
    console.log('📊 Emulator UI: http://localhost:4001/firestore');
  } catch (error) {
    console.log('⚠️ Emulator connection failed:', error);
    console.log('ℹ️ Make sure emulator is running: firebase emulators:start --only firestore');
  }
} else if (!import.meta.env.DEV) {
  console.log('🔥 Using Production Firebase Console');
}

export default app;