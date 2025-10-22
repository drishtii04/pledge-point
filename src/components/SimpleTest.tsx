import { useState } from "react";
import { Button } from "@/components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SimpleTest = () => {
  const [result, setResult] = useState("");

  const testDatabase = async () => {
    setResult("Testing...");
    
    try {
      console.log("🔥 Starting database test...");
      console.log("Database object:", db);
      
      // Create a simple test document
      const testCollection = collection(db, 'test');
      console.log("Collection reference:", testCollection);
      
      const docData = {
        message: "Hello Firebase!",
        timestamp: new Date().toISOString(),
        number: Math.random()
      };
      
      console.log("Adding document:", docData);
      const docRef = await addDoc(testCollection, docData);
      
      console.log("✅ Document added with ID:", docRef.id);
      setResult(`✅ Success! Document created with ID: ${docRef.id}`);
      
    } catch (error) {
      console.error("❌ Error:", error);
      setResult(`❌ Error: ${error}`);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🧪 Simple Firebase Test</h1>
      <Button onClick={testDatabase}>Test Database Connection</Button>
      <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f5f5f5" }}>
        <strong>Result:</strong> {result}
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Check these links after testing:</h3>
        <ul>
          <li><a href="http://localhost:4000/firestore/default/data" target="_blank">Firebase Emulator Data</a></li>
          <li><a href="http://localhost:4000" target="_blank">Firebase Emulator UI</a></li>
        </ul>
        <p><strong>Open browser console (F12) to see detailed logs!</strong></p>
      </div>
    </div>
  );
};

export default SimpleTest;