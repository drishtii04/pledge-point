import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const EmulatorDebug = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearLogs = () => setLogs([]);

  const testEmulatorConnection = async () => {
    setLoading(true);
    clearLogs();
    
    try {
      addLog("🔍 Testing Firebase connection...");
      
      // Check database settings
      addLog(`📍 Database app: ${db.app.name}`);
      addLog(`📍 Database type: ${db.type}`);
      
      // Test 1: Create a simple document
      addLog("📝 Creating test document...");
      const testCollection = collection(db, 'connection-test');
      const docData = {
        message: "Connection test",
        timestamp: new Date(),
        random: Math.random()
      };
      
      const docRef = await addDoc(testCollection, docData);
      addLog(`✅ Document created with ID: ${docRef.id}`);
      
      // Test 2: Read it back
      addLog("📖 Reading document back...");
      const docSnap = await getDoc(doc(db, 'connection-test', docRef.id));
      
      if (docSnap.exists()) {
        addLog(`✅ Document read successfully: ${JSON.stringify(docSnap.data())}`);
      } else {
        addLog("❌ Document not found when reading back");
      }
      
      // Test 3: List all documents in collection
      addLog("📋 Listing all documents in connection-test...");
      const querySnapshot = await getDocs(testCollection);
      addLog(`📊 Found ${querySnapshot.size} documents in connection-test`);
      
      querySnapshot.forEach((doc) => {
        addLog(`  📄 Doc ID: ${doc.id}, Data: ${JSON.stringify(doc.data())}`);
      });
      
      // Test 4: Create volunteer data
      addLog("👥 Creating test volunteer...");
      const volunteersCollection = collection(db, 'volunteers');
      const volunteerData = {
        name: "Debug Test Volunteer",
        email: "debug@test.com",
        phone: "+91-0000000000",
        skills: ["Debugging", "Testing"],
        availability: "Always",
        experience: "Created by emulator debug tool",
        registeredAt: new Date(),
        status: "pending"
      };
      
      const volunteerRef = await addDoc(volunteersCollection, volunteerData);
      addLog(`✅ Volunteer created with ID: ${volunteerRef.id}`);
      
      // Test 5: Count volunteers
      const volunteersSnapshot = await getDocs(volunteersCollection);
      addLog(`👥 Total volunteers in database: ${volunteersSnapshot.size}`);
      
      addLog("🎉 All tests completed successfully!");
      addLog("🔍 Check Firebase Emulator UI: http://localhost:4000/firestore");
      
    } catch (error) {
      addLog(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error("Full error:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkEmulatorUI = () => {
    addLog("🌐 Opening Firebase Emulator UI...");
    window.open('http://localhost:4000/firestore', '_blank');
  };

  const restartConnection = () => {
    addLog("🔄 Restarting page to reinitialize Firebase...");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>🔧 Firebase Emulator Debug Tool</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button onClick={testEmulatorConnection} disabled={loading}>
                {loading ? "Testing..." : "🧪 Test Connection"}
              </Button>
              <Button onClick={checkEmulatorUI} variant="secondary">
                🌐 Open Emulator UI
              </Button>
              <Button onClick={restartConnection} variant="outline">
                🔄 Restart Connection
              </Button>
              <Button onClick={clearLogs} variant="ghost" size="sm">
                🗑️ Clear Logs
              </Button>
            </div>
            
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-gray-500">No logs yet. Click "Test Connection" to start.</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index}>{log}</div>
                ))
              )}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <h3 className="font-semibold mb-2">📋 Troubleshooting Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Click "Test Connection" and check logs</li>
                <li>Open Emulator UI and refresh the page</li>
                <li>Check browser console (F12) for errors</li>
                <li>If data appears in logs but not in UI, restart emulator</li>
                <li>Check that emulator is running on port 8080</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmulatorDebug;