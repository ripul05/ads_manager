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
    let meetLink 
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
New Audit Booking Details:

- Name: ${name}
- Email: ${email}
- Company: ${company}
- Scheduled Date: ${formattedDate}
- Scheduled Time: ${formattedTime}
- Timezone: ${timeZone}

Google Meet Link: ${meetLink}
    `;

    // Email to User
    const userSubject = "✅ Your Google Ads Audit is Scheduled!";
    const userBody = `
Hi ${name},

Thank you for scheduling your Google Ads Audit with us!

Here are your meeting details:

- Date: ${formattedDate}
- Time: ${formattedTime} (${timeZone})
- Duration: 30 minutes
- Meeting Type: Online
- Google Meet Link: ${meetLink}

We look forward to connecting with you!

Best regards,  
The Audit Team
    `;

    // Send emails
    await sendEmail(teamSubject, teamBody);        // send to internal team
    await sendEmail(userSubject, userBody, email); // send to user

  } catch (error) {
    console.error('Error sending emails:', error);
  }
};




module.exports = { auditScheduling, getOccupiedTimeSlots };