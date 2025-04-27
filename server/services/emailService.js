const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { google } = require('googleapis');
const calendar = google.calendar('v3');


// Load environment variables
dotenv.config();

// Create reusable transporter object using Gmail as the email service
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  // Use environment variables for better security
        pass: process.env.EMAIL_PASS,  // Use environment variables for better security
    },
});

const sendEmail = async (subject, body, receiverEmail = null) => {
    try {
      const finalReceiver = receiverEmail || process.env.EMAIL_TO;  // fallback to default if null
  
      console.log(`Sending email to: ${finalReceiver}`);
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: finalReceiver,
        subject: subject,
        text: body,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info);
      return info;
    } catch (err) {
      console.error("Error sending email:", err);
      throw new Error("Error sending email");
    }
  };

const generateGoogleMeetLink = async (auditDateTime, name) => {
const oauth2Client = new google.auth.OAuth2(
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS,
    process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const event = {
    summary: `Google Ads Audit with ${name}`,
    start: {
    dateTime: new Date(auditDateTime).toISOString(),
    timeZone: 'UTC',
    },
    end: {
    dateTime: new Date(new Date(auditDateTime).getTime() + 30 * 60000).toISOString(), // 30 minutes duration
    timeZone: 'UTC',
    },
    conferenceData: {
    createRequest: {
        requestId: `${Math.random().toString(36).substring(7)}`, // Unique ID for the meeting
        conferenceSolutionKey: {
        type: 'hangoutsMeet',
        },
    },
    },
};

try {
    const response = await calendar.events.insert({
    auth: oauth2Client,
    calendarId: 'primary', // The calendar to create the event in
    resource: event,
    conferenceDataVersion: 1,
    });

    const googleMeetLink = response.data.conferenceData.entryPoints[0].uri;
    return googleMeetLink;
} catch (error) {
    console.error('Error creating Google Meet link:', error);
    throw new Error('Error generating Google Meet link');
}
};

  

module.exports = {
    sendEmail,
    generateGoogleMeetLink
};
