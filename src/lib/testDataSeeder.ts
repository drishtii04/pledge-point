import { 
  submitContactForm,
  registerVolunteer,
  recordDonation,
  createEvent,
  addStory
} from './firebaseServices';

// Test data seeder functions
export const seedTestData = async () => {
  console.log('Seeding test data...');

  try {
    // Seed test contacts
    await submitContactForm({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 9876543210',
      message: 'I would like to know more about your education initiatives.'
    });

    await submitContactForm({
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 8765432109',
      message: 'How can I contribute to your healthcare programs?'
    });

    // Seed test volunteers
    await registerVolunteer({
      name: 'Arjun Kumar',
      email: 'arjun.kumar@example.com',
      phone: '+91 7654321098',
      skills: ['Teaching', 'Community Outreach', 'Event Management'],
      availability: 'Weekends',
      experience: '2 years of volunteering with local NGOs'
    });

    await registerVolunteer({
      name: 'Sneha Patel',
      email: 'sneha.patel@example.com',
      phone: '+91 6543210987',
      skills: ['Healthcare', 'First Aid', 'Social Work'],
      availability: 'Evenings',
      experience: 'Medical student with passion for rural healthcare'
    });

    await registerVolunteer({
      name: 'Rajesh Sharma',
      email: 'rajesh.sharma@example.com',
      phone: '+91 9876543210',
      skills: ['Digital Marketing', 'Content Creation', 'Social Media'],
      availability: 'Flexible',
      experience: 'Marketing professional looking to contribute to social causes'
    });

    await registerVolunteer({
      name: 'Priya Nair',
      email: 'priya.nair@example.com',
      phone: '+91 8765432109',
      skills: ['Education & Tutoring', 'Translation Services', 'Administrative Support'],
      availability: 'Weekdays (Evening)',
      experience: 'Teacher with 5 years experience in rural education'
    });

    // Seed test donations
    await recordDonation({
      donorName: 'Rajesh Gupta',
      email: 'rajesh.gupta@example.com',
      amount: 5000,
      paymentMethod: 'UPI',
      purpose: 'Education Support',
      isAnonymous: false
    });

    await recordDonation({
      donorName: 'Anonymous Donor',
      email: 'anonymous@example.com',
      amount: 10000,
      paymentMethod: 'Bank Transfer',
      purpose: 'Healthcare Initiative',
      isAnonymous: true
    });

    // Seed test events
    await createEvent({
      title: 'Rural Education Workshop',
      description: 'A comprehensive workshop on improving education quality in rural areas.',
      date: new Date('2025-11-15'),
      location: 'Community Center, Bagalkot',
      maxParticipants: 50,
      category: 'Education'
    });

    await createEvent({
      title: 'Health Checkup Camp',
      description: 'Free health checkup and awareness program for villagers.',
      date: new Date('2025-12-05'),
      location: 'Primary Health Center, Hunagund',
      maxParticipants: 100,
      category: 'Healthcare'
    });

    await createEvent({
      title: 'Youth Leadership Summit',
      description: 'Empowering young leaders for community development.',
      date: new Date('2025-11-25'),
      location: 'Basava Kalyan Hall, Bidar',
      maxParticipants: 200,
      category: 'Youth Development'
    });

    // Seed test stories
    await addStory({
      title: 'Transforming Lives Through Education',
      content: 'In the remote village of Kushtagi, our education initiative has helped 150 children gain access to quality education. Through dedicated teachers and modern teaching methods, we have seen a 90% improvement in literacy rates.',
      author: 'Basava Yuva Brigade Team',
      category: 'Education',
      imageUrl: '/assets/impact-education.jpg'
    });

    await addStory({
      title: 'Healthcare Reaches Every Village',
      content: 'Our mobile healthcare units have covered 25 villages in the past year, providing free medical checkups to over 2,000 families. Early detection of diseases has saved numerous lives and improved community health.',
      author: 'Dr. Manjunath Patil',
      category: 'Healthcare',
      imageUrl: '/assets/impact-community.jpg'
    });

    await addStory({
      title: 'Youth Leading Change',
      content: 'Young volunteers from Basava Yuva Brigade have initiated a clean water project in 10 villages, providing access to safe drinking water for over 500 families. This grassroots movement shows the power of youth leadership.',
      author: 'Volunteer Coordinator',
      category: 'Community Development'
    });

    console.log('Test data seeded successfully!');
    return { success: true, message: 'All test collections have been populated with sample data.' };

  } catch (error) {
    console.error('Error seeding test data:', error);
    return { success: false, error };
  }
};

// Function to clear test data (for cleanup)
export const clearTestData = async () => {
  console.log('Note: To clear test data, you can use the Firebase Console or implement delete functions.');
  // Note: Implement delete functions if needed for cleanup
};