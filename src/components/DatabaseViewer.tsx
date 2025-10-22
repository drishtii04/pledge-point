import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const DatabaseViewer = () => {
  const [collections, setCollections] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const checkCollections = async () => {
    setLoading(true);
    try {
      const collectionNames = ['volunteers', 'contacts', 'events', 'donations', 'stories'];
      const results: any = {};

      for (const collectionName of collectionNames) {
        try {
          const collectionRef = collection(db, collectionName);
          const snapshot = await getDocs(collectionRef);
          results[collectionName] = {
            count: snapshot.size,
            documents: snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            }))
          };
        } catch (error) {
          results[collectionName] = {
            count: 0,
            error: error instanceof Error ? error.message : 'Unknown error',
            documents: []
          };
        }
      }

      setCollections(results);
      console.log("Database contents:", results);
    } catch (error) {
      console.error("Error checking database:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkCollections();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">📊 Database Viewer</h1>
          <Button onClick={checkCollections} disabled={loading}>
            {loading ? "Loading..." : "Refresh Database"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(collections).map(([collectionName, data]: [string, any]) => (
            <Card key={collectionName}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="capitalize">{collectionName}</span>
                  <span className="text-lg font-bold text-blue-600">
                    {data.count || 0}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {data.error ? (
                  <div className="text-red-600 text-sm">
                    Error: {data.error}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      {data.count} document{data.count !== 1 ? 's' : ''}
                    </p>
                    {data.documents && data.documents.length > 0 && (
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {data.documents.slice(0, 3).map((doc: any) => (
                          <div key={doc.id} className="bg-gray-50 p-2 rounded text-xs">
                            <div className="font-medium">ID: {doc.id}</div>
                            {doc.data.name && <div>Name: {doc.data.name}</div>}
                            {doc.data.email && <div>Email: {doc.data.email}</div>}
                            {doc.data.title && <div>Title: {doc.data.title}</div>}
                            {doc.data.amount && <div>Amount: ₹{doc.data.amount}</div>}
                          </div>
                        ))}
                        {data.documents.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{data.documents.length - 3} more documents
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🔗 Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Firebase Emulator UI:</strong> <a href="http://localhost:4000" target="_blank" className="text-blue-600 underline">http://localhost:4000</a></div>
            <div><strong>Firestore Direct:</strong> <a href="http://localhost:4000/firestore" target="_blank" className="text-blue-600 underline">http://localhost:4000/firestore</a></div>
            <div><strong>Admin Panel:</strong> <a href="/admin" className="text-blue-600 underline">/admin</a></div>
            <div><strong>Volunteer Form:</strong> <a href="/volunteer" className="text-blue-600 underline">/volunteer</a></div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>📝 Raw Database Data (JSON)</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs max-h-96">
              {JSON.stringify(collections, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseViewer;