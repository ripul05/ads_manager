const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { google } = require('googleapis');
const calendar = google.calendar('v3');


// Load environment variables
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Function to send email
const sendEmail = async (subject, body, receiverEmail = null) => {
  try {
    // Set credentials and get access token
    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const accessTokenResponse = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token;

    if (!accessToken) {
      throw new Error("Failed to retrieve access token.");
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const finalReceiver = receiverEmail || process.env.EMAIL_TO;

    console.log(`Sending email to: ${finalReceiver}`);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: finalReceiver,
      subject: subject,
      html: body,
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
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
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
