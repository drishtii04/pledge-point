import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getVolunteers, type VolunteerData } from "@/lib/volunteerService";
import { getContactMessages, type ContactData } from "@/lib/contactService";
import { getDonations, type DonationData } from "@/lib/donationService";
import { Users, Mail, DollarSign, Calendar } from "lucide-react";

const AdminPanel = () => {
  const [volunteers, setVolunteers] = useState<VolunteerData[]>([]);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [donations, setDonations] = useState<DonationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [volunteersData, contactsData, donationsData] = await Promise.all([
          getVolunteers(),
          getContactMessages(),
          getDonations()
        ]);

        setVolunteers(volunteersData);
        setContacts(contactsData);
        setDonations(donationsData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'No date';
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading admin data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">🔐 Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage volunteers, contacts, and donations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{volunteers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contacts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{donations.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="volunteers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
          </TabsList>

          <TabsContent value="volunteers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {volunteers.map((volunteer) => (
                    <Card key={volunteer.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{volunteer.name}</h3>
                          <p className="text-sm text-muted-foreground">{volunteer.email}</p>
                          {volunteer.phone && (
                            <p className="text-sm text-muted-foreground">{volunteer.phone}</p>
                          )}
                          <p className="text-sm"><strong>Skills:</strong> {volunteer.skills}</p>
                          <p className="text-sm"><strong>Availability:</strong> {volunteer.availability}</p>
                          <p className="text-sm"><strong>Message:</strong> {volunteer.message}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(volunteer.createdAt)}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {volunteers.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No volunteer applications yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <Card key={contact.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{contact.name}</h3>
                            <Badge variant={contact.status === 'new' ? 'default' : 'secondary'}>
                              {contact.status || 'new'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                          {contact.phone && (
                            <p className="text-sm text-muted-foreground">{contact.phone}</p>
                          )}
                          <p className="text-sm"><strong>Subject:</strong> {contact.subject}</p>
                          <p className="text-sm"><strong>Message:</strong> {contact.message}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(contact.createdAt)}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {contacts.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No contact messages yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Donation Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donations.map((donation) => (
                    <Card key={donation.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{donation.isAnonymous ? 'Anonymous Donor' : donation.donorName}</h3>
                          {!donation.isAnonymous && (
                            <p className="text-sm text-muted-foreground">{donation.email}</p>
                          )}
                          {donation.phone && !donation.isAnonymous && (
                            <p className="text-sm text-muted-foreground">{donation.phone}</p>
                          )}
                          <p className="text-sm"><strong>Amount:</strong> ${donation.amount}</p>
                          <p className="text-sm"><strong>Type:</strong> {donation.donationType}</p>
                          <Badge variant={donation.status === 'completed' ? 'default' : 'secondary'}>
                            {donation.status || 'pending'}
                          </Badge>
                          {donation.message && (
                            <p className="text-sm"><strong>Message:</strong> {donation.message}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(donation.createdAt)}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {donations.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No donations yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;