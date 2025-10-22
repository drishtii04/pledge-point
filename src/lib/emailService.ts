import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_hfu2tcd';
const EMAILJS_PUBLIC_KEY = 'galYavT57tbN9gGsh';

// Template IDs for different email types
const TEMPLATES = {
  VOLUNTEER_NOTIFICATION: 'template_volunteer_notification',
  VOLUNTEER_THANK_YOU: 'template_volunteer_thank_you', 
  VOLUNTEER_REPLY: 'template_g7rqzev', // Your Volunteer Reply template
  CONTACT_NOTIFICATION: 'template_contact_notification',
  CONTACT_AUTO_REPLY: 'template_i9xug9o', // Your Auto-Reply template
  DONATION_NOTIFICATION: 'template_donation_notification'
};

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface EmailData {
  to_name?: string;
  to_email?: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  reply_to?: string;
}

export interface VolunteerEmailData extends EmailData {
  volunteer_name: string;
  volunteer_email: string;
  volunteer_phone?: string;
  volunteer_skills: string;
  volunteer_availability: string;
  volunteer_message: string;
}

export interface ContactEmailData extends EmailData {
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  contact_subject: string;
  contact_message: string;
}

export interface DonationEmailData extends EmailData {
  donor_name: string;
  donor_email: string;
  donation_amount: number;
  donation_type: string;
  is_anonymous: boolean;
}

// Send volunteer notification email
export const sendVolunteerNotificationEmail = async (volunteerData: VolunteerEmailData) => {
  try {
    const templateParams = {
      to_name: 'Admin',
      to_email: 'admin@basava-yuva-brigade.org', // Replace with your admin email
      from_name: volunteerData.volunteer_name,
      from_email: volunteerData.volunteer_email,
      subject: 'New Volunteer Registration',
      volunteer_name: volunteerData.volunteer_name,
      volunteer_email: volunteerData.volunteer_email,
      volunteer_phone: volunteerData.volunteer_phone || 'Not provided',
      volunteer_skills: volunteerData.volunteer_skills,
      volunteer_availability: volunteerData.volunteer_availability,
      volunteer_message: volunteerData.volunteer_message,
      submission_date: new Date().toLocaleString(),
      reply_to: volunteerData.volunteer_email,
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATES.VOLUNTEER_NOTIFICATION,
      templateParams
    );

    console.log('Volunteer notification email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send volunteer notification email:', error);
    throw error;
  }
};

// Send contact form notification email
export const sendContactNotificationEmail = async (contactData: ContactEmailData) => {
  try {
    console.log('📧 Attempting to send contact notification email...', {
      service: EMAILJS_SERVICE_ID,
      template: TEMPLATES.CONTACT_NOTIFICATION,
      recipient: contactData.contact_email
    });

    const templateParams = {
      to_name: 'Admin',
      to_email: 'admin@basava-yuva-brigade.org', // Replace with your admin email
      from_name: contactData.contact_name,
      from_email: contactData.contact_email,
      subject: `Contact Form: ${contactData.contact_subject}`,
      contact_name: contactData.contact_name,
      contact_email: contactData.contact_email,
      contact_phone: contactData.contact_phone || 'Not provided',
      contact_subject: contactData.contact_subject,
      contact_message: contactData.contact_message,
      submission_date: new Date().toLocaleString(),
      reply_to: contactData.contact_email,
    };

    console.log('📧 Template params:', templateParams);

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATES.CONTACT_NOTIFICATION,
      templateParams
    );

    console.log('✅ Contact notification email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Failed to send contact notification email:', error);
    throw error;
  }
};

// Send donation notification email
export const sendDonationNotificationEmail = async (donationData: DonationEmailData) => {
  try {
    const templateParams = {
      to_name: 'Admin',
      to_email: 'admin@basava-yuva-brigade.org', // Replace with your admin email
      from_name: donationData.is_anonymous ? 'Anonymous Donor' : donationData.donor_name,
      from_email: donationData.is_anonymous ? 'no-reply@basava-yuva-brigade.org' : donationData.donor_email,
      subject: 'New Donation Received',
      donor_name: donationData.is_anonymous ? 'Anonymous Donor' : donationData.donor_name,
      donor_email: donationData.is_anonymous ? 'Anonymous' : donationData.donor_email,
      donation_amount: donationData.donation_amount,
      donation_type: donationData.donation_type,
      is_anonymous: donationData.is_anonymous ? 'Yes' : 'No',
      submission_date: new Date().toLocaleString(),
      reply_to: donationData.is_anonymous ? 'no-reply@basava-yuva-brigade.org' : donationData.donor_email,
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATES.DONATION_NOTIFICATION,
      templateParams
    );

    console.log('Donation notification email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send donation notification email:', error);
    throw error;
  }
};

// Send thank you email to volunteer
export const sendVolunteerThankYouEmail = async (volunteerData: VolunteerEmailData) => {
  try {
    const templateParams = {
      to_name: volunteerData.volunteer_name,
      to_email: volunteerData.volunteer_email,
      from_name: 'Basava Yuva Brigade',
      from_email: 'no-reply@basava-yuva-brigade.org',
      subject: 'Thank you for volunteering with us!',
      volunteer_name: volunteerData.volunteer_name,
      organization_name: 'Basava Yuva Brigade',
      next_steps: 'Our team will review your application and contact you within 48 hours with next steps.',
      contact_email: 'volunteer@basava-yuva-brigade.org',
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATES.VOLUNTEER_THANK_YOU,
      templateParams
    );

    console.log('Volunteer thank you email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send volunteer thank you email:', error);
    throw error;
  }
};

// Send auto-reply email for contact form
export const sendContactAutoReplyEmail = async (contactData: ContactEmailData) => {
  try {
    console.log('📧 Attempting to send contact auto-reply email...', {
      service: EMAILJS_SERVICE_ID,
      template: TEMPLATES.CONTACT_AUTO_REPLY,
      recipient: contactData.contact_email
    });

    const templateParams = {
      // EmailJS standard recipient fields
      to_name: contactData.contact_name,
      to_email: contactData.contact_email,
      reply_to: contactData.contact_email,
      
      // Template variables for your auto-reply template
      contact_name: contactData.contact_name,
      organization_name: 'Basava Yuva Brigade',
      response_time: '24-48 hours',
      contact_email: 'contact@basava-yuva-brigade.org',
      original_subject: contactData.contact_subject,
      
      // Additional standard fields
      from_name: 'Basava Yuva Brigade',
      from_email: 'no-reply@basava-yuva-brigade.org',
      subject: 'Thank you for contacting us',
    };

    console.log('📧 Auto-reply template params:', templateParams);
    console.log('📧 Recipient email check:', contactData.contact_email);

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATES.CONTACT_AUTO_REPLY, // Your configured template
      templateParams
    );

    console.log('✅ Contact auto-reply email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Failed to send contact auto-reply email:', error);
    throw error;
  }
};

// Send volunteer confirmation email using dedicated volunteer template
export const sendVolunteerConfirmationEmail = async (volunteerData: {
  volunteer_name: string;
  volunteer_email: string;
  volunteer_skills: string;
  volunteer_availability: string;
  volunteer_message?: string;
}) => {
  try {
    console.log('📧 Attempting to send volunteer confirmation email...', {
      service: EMAILJS_SERVICE_ID,
      template: TEMPLATES.VOLUNTEER_REPLY,
      recipient: volunteerData.volunteer_email
    });

    const templateParams = {
      // EmailJS standard recipient fields
      to_name: volunteerData.volunteer_name,
      to_email: volunteerData.volunteer_email,
      reply_to: 'volunteer@basava-yuva-brigade.org',
      
      // Volunteer-specific template variables
      volunteer_name: volunteerData.volunteer_name,
      volunteer_email: volunteerData.volunteer_email,
      volunteer_skills: volunteerData.volunteer_skills,
      volunteer_availability: volunteerData.volunteer_availability,
      volunteer_message: volunteerData.volunteer_message || 'No additional message provided',
      
      // Organization details
      organization_name: 'Basava Yuva Brigade',
      response_time: '48-72 hours',
      volunteer_contact_email: 'volunteer@basava-yuva-brigade.org',
      volunteer_phone: '+91 98765 43210',
      
      // Standard fields
      from_name: 'Basava Yuva Brigade Volunteer Team',
      from_email: 'no-reply@basava-yuva-brigade.org',
      subject: 'Welcome to Basava Yuva Brigade - Thank you for volunteering!',
      submission_date: new Date().toLocaleString(),
    };

    console.log('📧 Volunteer template params:', templateParams);

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATES.VOLUNTEER_REPLY, // Use dedicated volunteer template
      templateParams
    );

    console.log('✅ Volunteer confirmation email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Failed to send volunteer confirmation email:', error);
    throw error;
  }
};