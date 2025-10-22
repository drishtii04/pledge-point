import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, RefreshCw, Eye, Database } from "lucide-react";

interface DocumentData {
  id: string;
  data: Record<string, unknown>;
  collection: string;
}

const FirestoreViewer = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [collections, setCollections] = useState<string[]>([]);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const allDocs: DocumentData[] = [];
      const existingCollections: string[] = [];
      const collectionNames = ['volunteers', 'contacts', 'events', 'donations', 'stories', 'connection-test'];

      for (const collectionName of collectionNames) {
        try {
          const collectionRef = collection(db, collectionName);
          const snapshot = await getDocs(collectionRef);
          
          if (snapshot.size > 0) {
            existingCollections.push(collectionName);
            snapshot.forEach((doc) => {
              allDocs.push({
                id: doc.id,
                data: doc.data(),
                collection: collectionName
              });
            });
          }
        } catch (error) {
          console.error(`Error fetching ${collectionName}:`, error);
        }
      }

      setDocuments(allDocs);
      setCollections(existingCollections);
      console.log(`📊 Found ${allDocs.length} documents across ${existingCollections.length} collections`);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDocument = async (collectionName: string, docId: string) => {
    if (confirm(`Are you sure you want to delete document ${docId}?`)) {
      try {
        await deleteDoc(doc(db, collectionName, docId));
        alert("Document deleted successfully!");
        fetchAllData(); // Refresh data
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Error deleting document");
      }
    }
  };

  const filteredDocuments = selectedCollection 
    ? documents.filter(doc => doc.collection === selectedCollection)
    : documents;

  const getCollectionStats = () => {
    const stats: { [key: string]: number } = {};
    documents.forEach(doc => {
      stats[doc.collection] = (stats[doc.collection] || 0) + 1;
    });
    return stats;
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const stats = getCollectionStats();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Database className="w-8 h-8 mr-2" />
                Firestore Database Viewer
              </h1>
              <p className="text-gray-600">Real-time view of your Firebase collections and documents</p>
            </div>
            <Button onClick={fetchAllData} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </div>

        {/* Collection Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card 
            className={`cursor-pointer transition-colors ${selectedCollection === null ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedCollection(null)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{documents.length}</div>
              <div className="text-sm text-gray-600">Total Docs</div>
            </CardContent>
          </Card>
          
          {collections.map((collectionName) => (
            <Card 
              key={collectionName}
              className={`cursor-pointer transition-colors ${selectedCollection === collectionName ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedCollection(collectionName)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats[collectionName] || 0}</div>
                <div className="text-sm text-gray-600 capitalize">{collectionName}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {selectedCollection ? `${selectedCollection} Collection` : 'All Documents'} 
                ({filteredDocuments.length})
              </span>
              {selectedCollection && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedCollection(null)}
                >
                  Show All
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8">
                <Database className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No documents found</p>
                <p className="text-sm text-gray-400">Try creating some data in your forms</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredDocuments.map((document) => (
                  <div key={`${document.collection}-${document.id}`} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{document.collection}</Badge>
                        <span className="font-mono text-sm text-gray-600">{document.id}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => console.log('Document data:', document.data)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteDocument(document.collection, document.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded p-3">
                      <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(document.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🔗 Alternative Links (if emulator UI not working)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Current Firestore Viewer:</strong> <span className="text-green-600">✅ Working (You're here!)</span></div>
            <div><strong>Admin Panel:</strong> <a href="/admin" className="text-blue-600 underline">/admin</a></div>
            <div><strong>Emulator UI:</strong> <a href="http://localhost:4001" target="_blank" className="text-blue-600 underline">http://localhost:4001</a> (may not show collections)</div>
            <div><strong>Debug Tool:</strong> <a href="/debug" className="text-blue-600 underline">/debug</a></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FirestoreViewer;