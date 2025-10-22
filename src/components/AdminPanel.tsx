import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getContacts, getUpcomingEvents, getPublishedStories } from "@/lib/firebaseServices";
import { seedTestData } from "@/lib/testDataSeeder";
import { Contact, Event, Story } from "@/types/firebase";
import VolunteerManagement from "./VolunteerManagement";

const AdminPanel = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contactsData, eventsData, storiesData] = await Promise.all([
        getContacts(),
        getUpcomingEvents(),
        getPublishedStories()
      ]);
      setContacts(contactsData);
      setEvents(eventsData);
      setStories(storiesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedData = async () => {
    setLoading(true);
    try {
      const result = await seedTestData();
      if (result.success) {
        alert("Test data seeded successfully!");
        fetchData(); // Refresh data after seeding
      } else {
        alert("Error seeding test data. Check console for details.");
      }
    } catch (error) {
      console.error("Error seeding data:", error);
      alert("Error seeding test data. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Firebase Admin Panel</h1>
          <div className="flex gap-4">
            <Button onClick={fetchData} disabled={loading}>
              {loading ? "Loading..." : "Refresh Data"}
            </Button>
            <Button onClick={handleSeedData} disabled={loading} variant="secondary">
              Seed Test Data
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contacts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Contacts ({contacts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {contacts.length > 0 ? (
                  contacts.slice(0, 5).map((contact: Contact) => (
                    <div key={contact.id} className="border-b pb-2">
                      <h4 className="font-semibold">{contact.name}</h4>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                      <p className="text-xs text-gray-500">
                        {contact.createdAt?.toDate?.()?.toLocaleDateString() || 'Date not available'}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No contacts found</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events ({events.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {events.length > 0 ? (
                  events.slice(0, 5).map((event: Event) => (
                    <div key={event.id} className="border-b pb-2">
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.location}</p>
                      <p className="text-xs text-gray-500">
                        {event.date?.toDate?.()?.toLocaleDateString() || 'Date not available'}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No events found</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stories */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Stories ({stories.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {stories.length > 0 ? (
                  stories.slice(0, 5).map((story: Story) => (
                    <div key={story.id} className="border-b pb-2">
                      <h4 className="font-semibold">{story.title}</h4>
                      <p className="text-sm text-gray-600">{story.author}</p>
                      <p className="text-xs text-gray-500">
                        {story.publishedAt?.toDate?.()?.toLocaleDateString() || 'Date not available'}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No stories found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Volunteer Management */}
        <div className="mt-8">
          <VolunteerManagement />
        </div>

        {/* Firebase Connection Status */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Firebase Connection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Firebase Configuration: Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Database Connection: Testing (Use seed data to test)</span>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Note:</strong> Make sure to update the Firebase configuration in <code>src/lib/firebase.ts</code> with your actual Firebase project credentials.</p>
                <p>You can find these in your Firebase Console &gt; Project Settings &gt; Web Apps.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;