# Firebase Backend Setup

## Overview
This project now includes Firebase backend integration with the following features:
- Contact form submissions
- Volunteer registrations
- Donation tracking
- Event management
- Impact stories

## Setup Instructions

### 1. Firebase Project Configuration
1. Go to your Firebase Console: https://console.firebase.google.com/u/0/project/basava-yuva-brigade/overview
2. Navigate to Project Settings > General > Web Apps
3. Copy your Firebase configuration values

### 2. Environment Variables
1. Create a `.env` file in the root directory
2. Copy the contents from `.env.example`
3. Replace the placeholder values with your actual Firebase config:

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=basava-yuva-brigade.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=basava-yuva-brigade
VITE_FIREBASE_STORAGE_BUCKET=basava-yuva-brigade.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
VITE_FIREBASE_APP_ID=your-actual-app-id
```

### 3. Firestore Database Setup
1. In Firebase Console, go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" for now (we'll secure it later)
4. Select your preferred region

### 4. Test the Integration

#### Option 1: Using the Admin Panel
1. Navigate to `/admin` in your browser
2. Click "Seed Test Data" to populate the database with sample data
3. Check if the data appears in the admin panel and Firebase Console

#### Option 2: Using the Contact Form
1. Navigate to `/contact` in your browser
2. Fill out and submit the contact form
3. Check the admin panel or Firebase Console to see the submission

## Database Collections

The following collections will be created:

### `contacts`
- Contact form submissions
- Fields: name, email, phone, message, createdAt, status

### `volunteers`
- Volunteer registrations
- Fields: name, email, phone, skills, availability, experience, registeredAt, status

### `donations`
- Donation records
- Fields: donorName, email, amount, paymentMethod, purpose, isAnonymous, donatedAt, status

### `events`
- Event management
- Fields: title, description, date, location, maxParticipants, category, participants, createdAt, status

### `stories`
- Impact stories
- Fields: title, content, author, category, imageUrl, publishedAt, status, likes

## Security Rules (To be implemented)
Currently using test mode. In production, implement proper security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to stories for all users
    match /stories/{document} {
      allow read: if resource.data.status == 'published';
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    // Allow write access to contacts for all users (for contact form)
    match /contacts/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Other collections require authentication
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Next Steps

1. **Set up your Firebase config** by following the setup instructions above
2. **Test the connection** using the admin panel at `/admin`
3. **Implement authentication** for admin functions
4. **Add proper security rules** to protect your data
5. **Deploy Firebase Functions** for server-side operations if needed
6. **Set up Firebase Hosting** for deployment

## Files Added/Modified

- `src/lib/firebase.ts` - Firebase configuration
- `src/lib/firebaseServices.ts` - Database service functions
- `src/lib/testDataSeeder.ts` - Test data population
- `src/types/firebase.ts` - TypeScript type definitions
- `src/components/AdminPanel.tsx` - Admin interface for testing
- `src/components/ContactSection.tsx` - Updated with Firebase integration
- `.env.example` - Environment variables template

## Troubleshooting

1. **Import errors**: Make sure all Firebase dependencies are installed (`npm install firebase`)
2. **Connection issues**: Verify your Firebase config values in the `.env` file
3. **Permission errors**: Check Firestore security rules in Firebase Console
4. **Build errors**: Ensure all TypeScript types are properly defined

For any issues, check the browser console for error messages and verify your Firebase project settings.