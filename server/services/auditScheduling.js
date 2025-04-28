// controllers/auditController.js
const AuditSchedule = require('../models/auditScheduling');
const { sendEmail, generateGoogleMeetLink } = require("../services/emailService"); 

const auditScheduling = async (req, res) => {
  try {
    const { name, email, company, auditDateTime, timeZone } = req.body;

    // Validate required fields
    if (!name || !email || !company || !auditDateTime || !timeZone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Convert incoming date to UTC and normalize
    const clientDate = new Date(auditDateTime);
    const utcDate = new Date(clientDate.toISOString());
    
    // Calculate meeting end time (30 minutes duration)
    const meetingEnd = new Date(utcDate.getTime() + 30 * 60000);

    // Check for overlapping bookings
    const existingBooking = await AuditSchedule.findOne({
      auditDateTime: { $lt: meetingEnd },
      $expr: {
        $gt: [
          { $add: ["$auditDateTime", 30 * 60000] },
          utcDate
        ]
      }
    });
    

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: 'This time slot overlaps with an existing booking'
      });
    }

    // Create and save new audit schedule
    const newAudit = new AuditSchedule({
      name,
      email,
      company,
      auditDateTime: utcDate,
      timeZone
    });

    const savedAudit = await newAudit.save();
    res.status(201).json({
      success: true,
      message: 'Audit scheduled successfully',
      data: {
        id: savedAudit._id,
        date: savedAudit.auditDateTime,
        timeZone: savedAudit.timeZone
      }
    });
    await sendAuditEmails({ name, email, company, auditDateTime, timeZone });

  } catch (error) {
    console.error('Error scheduling audit:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

const getOccupiedTimeSlots = async (req, res) => {
    try {
        const audits = await AuditSchedule.find({}, 'auditDateTime timeZone meetingDuration'); // Only fetch date and timeSlot fields

        const occupiedSlots = audits.map(audit => ({
            audtiDateTime: audit.auditDateTime,
            timeZone: audit.timeZone,
            meetingDuration: audit.meetingDuration
        }));

        res.status(200).json({ occupiedSlots });
    } catch (error) {
        console.error("Error fetching occupied time slots:", error);
        res.status(500).json({ message: "Failed to fetch occupied time slots" });
    }
};

// Modify the sendAuditEmails function to include the Google Meet link
const sendAuditEmails = async ({ name, email, company, auditDateTime, timeZone }) => {
  try {
    // Generate Google Meet Link
    // let meetLink 
    // meetLink= await generateGoogleMeetLink(auditDateTime, name);

    const formattedDate = new Date(auditDateTime).toLocaleDateString('en-US', {
      timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = new Date(auditDateTime).toLocaleTimeString('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit'
    });

    // Email to Internal Team
    const teamSubject = "🛠 New Google Ads Audit Scheduled";
    const teamBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0;">
  <h2 style="color: #333; text-align: center; font-size: 24px;">🛠 New Audit Booking Details</h2>

  <p style="font-size: 16px; color: #444;">
    <strong>Name:</strong> ${name}<br>
    <strong>Email:</strong> ${email}<br>
    <strong>Company:</strong> ${company}<br>
    <strong>Scheduled Date:</strong> ${formattedDate}<br>
    <strong>Scheduled Time:</strong> ${formattedTime}<br>
    <strong>Timezone:</strong> ${timeZone}<br><br>
  </p>

  <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; border: 1px solid #ffeeba; color: #856404; font-size: 16px; font-weight: bold; text-align: center;">
    <span style="color: red;">⚠️ Action Required:</span><br>
    Please create a <strong>calendar invite</strong> and send it to the client at the email address mentioned above.
  </div>

  <p style="font-size: 14px; color: #888; text-align: center; margin-top: 20px;">
    Please take action as soon as possible to ensure a smooth scheduling process. Thank you!
  </p>
</div>

    `;

    // Email to User
    const userSubject = "✅ Your Google Ads Audit is Scheduled!";
    const userBody = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Hi ${name},</h2>

    <p>Thank you for scheduling your <strong>Google Ads Audit</strong> with us!</p>

    <h3 style="color: #4CAF50;">Here are your meeting details:</h3>
    <ul style="list-style: none; padding-left: 0;">
      <li><strong>📅 Date:</strong> ${formattedDate}</li>
      <li><strong>⏰ Time:</strong> ${formattedTime} (${timeZone})</li>
      <li><strong>🕒 Duration:</strong> 30 minutes</li>
      <li><strong>📍 Meeting Type:</strong> Online (Google Meet)</li>
    </ul>

    <p style="background-color: #f0f8ff; padding: 10px; border-radius: 8px; color: #1a73e8;">
      🚀 <strong>A meeting invite will be shared with you shortly.</strong><br>
      Please join the Google Meet link at the scheduled time.
    </p>

    <p>We look forward to connecting with you!</p>

    <p style="margin-top: 30px;">Best regards,<br><strong>The Audit Team</strong></p>
  </div>
`;


    // Send emails
    await sendEmail(teamSubject, teamBody);        // send to internal team
    await sendEmail(userSubject, userBody, email); // send to user

  } catch (error) {
    console.error('Error sending emails:', error);
  }
};




module.exports = { auditScheduling, getOccupiedTimeSlots };