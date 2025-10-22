import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const QuickTest = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const createTestVolunteer = async () => {
    setLoading(true);
    setStatus("Creating test volunteer...");

    try {
      // Create volunteers collection reference
      const volunteersCollection = collection(db, 'volunteers');
      
      // Add a test volunteer
      const testVolunteer = {
        name: "Test Volunteer",
        email: "test@example.com",
        phone: "+91-9999999999",
        skills: ["Testing", "Debugging"],
        availability: "Anytime",
        experience: "Test volunteer created directly",
        registeredAt: new Date(),
        status: "pending"
      };

      const docRef = await addDoc(volunteersCollection, testVolunteer);
      
      setStatus(`✅ Success! Created volunteer with ID: ${docRef.id}`);
      console.log("Document written with ID: ", docRef.id);
      
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const checkCollections = async () => {
    setLoading(true);
    setStatus("Checking collections...");

    try {
      const volunteersCollection = collection(db, 'volunteers');
      const snapshot = await getDocs(volunteersCollection);
      
      setStatus(`📊 Found ${snapshot.size} volunteers in database`);
      
      snapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
      
    } catch (error) {
      console.error("Error getting documents: ", error);
      setStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const createMultipleTestData = async () => {
    setLoading(true);
    setStatus("Creating multiple test records...");

    try {
      // Test volunteers
      const volunteersCollection = collection(db, 'volunteers');
      await addDoc(volunteersCollection, {
        name: "John Doe",
        email: "john@example.com",
        phone: "+91-9876543210",
        skills: ["Teaching", "Community Outreach"],
        availability: "Weekends",
        experience: "5 years teaching experience",
        registeredAt: new Date(),
        status: "pending"
      });

      // Test contacts
      const contactsCollection = collection(db, 'contacts');
      await addDoc(contactsCollection, {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+91-8765432109",
        message: "I want to know more about your programs",
        createdAt: new Date(),
        status: "new"
      });

      // Test events
      const eventsCollection = collection(db, 'events');
      await addDoc(eventsCollection, {
        title: "Community Health Camp",
        description: "Free health checkup for villagers",
        date: new Date("2025-12-01"),
        location: "Village Center",
        maxParticipants: 100,
        category: "Healthcare",
        participants: [],
        createdAt: new Date(),
        status: "active"
      });

      setStatus("✅ Created test data in volunteers, contacts, and events collections!");
      
    } catch (error) {
      console.error("Error creating test data: ", error);
      setStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>🧪 Quick Database Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={createTestVolunteer} 
                disabled={loading}
                variant="default"
              >
                Create Single Test Volunteer
              </Button>
              
              <Button 
                onClick={createMultipleTestData} 
                disabled={loading}
                variant="secondary"
              >
                Create Multiple Test Records
              </Button>
              
              <Button 
                onClick={checkCollections} 
                disabled={loading}
                variant="outline"
              >
                Check Database
              </Button>
            </div>
            
            {status && (
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <p className="text-blue-800">{status}</p>
              </div>
            )}
            
            <div className="bg-gray-100 rounded p-4 space-y-2">
              <h3 className="font-semibold">📍 Where to Check Results:</h3>
              <ul className="space-y-1 text-sm">
                <li>• <a href="http://localhost:4000/firestore" target="_blank" className="text-blue-600 underline">Firebase Emulator UI</a></li>
                <li>• <a href="/database" className="text-blue-600 underline">Database Viewer</a></li>
                <li>• <a href="/admin" className="text-blue-600 underline">Admin Panel</a></li>
                <li>• Browser Console (F12) - Check for logs</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickTest;