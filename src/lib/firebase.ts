// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5vrFLqo5_YXQxMLsMjW7LufK6LnFVgK0",
  authDomain: "basava-6e637.firebaseapp.com",
  projectId: "basava-6e637",
  storageBucket: "basava-6e637.firebasestorage.app",
  messagingSenderId: "881977565695",
  appId: "1:881977565695:web:2c1f89282bc0b5405cc7ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment and not in development)
export const analytics = typeof window !== 'undefined' && !import.meta.env.DEV ? getAnalytics(app) : null;

// Connect to emulators in development (optional)
if (import.meta.env.DEV && typeof window !== 'undefined') {
  try {
    // Uncomment the line below if you want to use Firestore emulator in development
    // connectFirestoreEmulator(db, 'localhost', 8080);
    console.log(' Firebase initialized for development');
  } catch (error) {
    console.log('Firebase emulator connection skipped');
  }
} else {
  console.log(' Firebase initialized for production');
}

export default app;
