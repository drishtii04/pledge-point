import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const FirebaseTest = () => {
  const [status, setStatus] = useState("Testing Firebase connection...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testFirebase = async () => {
      try {
        console.log("Testing Firebase connection...");
        
        // Test basic connection
        const testCollection = collection(db, 'test');
        
        // Try to add a test document
        const testDoc = await addDoc(testCollection, {
          message: "Test connection",
          timestamp: new Date()
        });
        
        console.log("Test document created with ID:", testDoc.id);
        setStatus(`✅ Firebase connected successfully! Test doc ID: ${testDoc.id}`);
        
      } catch (err) {
        console.error("Firebase connection error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setStatus("❌ Firebase connection failed");
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Firebase Connection Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <p className="mb-4">{status}</p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
              <h3 className="font-semibold text-red-800">Error Details:</h3>
              <pre className="text-sm text-red-600 mt-2 whitespace-pre-wrap">{error}</pre>
            </div>
          )}
          
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Expected Emulator:</strong> localhost:8080</p>
            <p><strong>Emulator UI:</strong> <a href="http://localhost:4000" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">http://localhost:4000</a></p>
            <p><strong>App URL:</strong> <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">http://localhost:3001</a></p>
          </div>
        </div>
        
        <div className="mt-6">
          <a href="/admin" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Go to Admin Panel
          </a>
        </div>
      </div>
    </div>
  );
};

export default FirebaseTest;