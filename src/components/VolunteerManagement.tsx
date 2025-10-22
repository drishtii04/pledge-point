import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { collection, getDocs, query, orderBy, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Volunteer } from "@/types/firebase";
import { UserCheck, UserX, Clock, Mail, Phone, MapPin } from "lucide-react";

const VolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      const volunteersCollection = collection(db, 'volunteers');
      const q = query(volunteersCollection, orderBy('registeredAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const volunteersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Volunteer[];
      
      setVolunteers(volunteersData);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateVolunteerStatus = async (volunteerId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const volunteerRef = doc(db, 'volunteers', volunteerId);
      await updateDoc(volunteerRef, { status: newStatus });
      
      // Update local state
      setVolunteers(prev => prev.map(volunteer => 
        volunteer.id === volunteerId 
          ? { ...volunteer, status: newStatus }
          : volunteer
      ));
      
      alert(`Volunteer ${newStatus} successfully!`);
    } catch (error) {
      console.error("Error updating volunteer status:", error);
      alert("Error updating volunteer status. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Volunteer Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading volunteers...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Volunteer Applications ({volunteers.length})</CardTitle>
        <Button onClick={fetchVolunteers} size="sm">
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {volunteers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No volunteer applications yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Applications will appear here when people submit the volunteer form.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {volunteers.map((volunteer) => (
              <div key={volunteer.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{volunteer.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{volunteer.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{volunteer.phone}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(volunteer.status)}>
                    {volunteer.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-sm">Skills & Interests:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {volunteer.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm">Availability:</h4>
                    <p className="text-sm text-muted-foreground">{volunteer.availability}</p>
                  </div>

                  {volunteer.experience && (
                    <div>
                      <h4 className="font-medium text-sm">Experience:</h4>
                      <p className="text-sm text-muted-foreground">{volunteer.experience}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>
                    Applied: {volunteer.registeredAt?.toDate?.()?.toLocaleDateString() || 'Date not available'}
                  </span>
                </div>

                {volunteer.status === 'pending' && (
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      onClick={() => updateVolunteerStatus(volunteer.id, 'approved')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <UserCheck className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => updateVolunteerStatus(volunteer.id, 'rejected')}
                    >
                      <UserX className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VolunteerManagement;