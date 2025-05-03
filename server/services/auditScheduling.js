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
    // await sendAuditEmails({ name, email, company, auditDateTime, timeZone });

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
        // Convert auditDateTime into start and end in ISO string format
    const startDate = new Date(auditDateTime);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // default 30 min duration

    // Google Calendar Event Link
    const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=Google+Ads+Audit+Meeting&dates=${startDate.toISOString().replace(/-|:|\.\d+/g, '')}/${endDate.toISOString().replace(/-|:|\.\d+/g, '')}&details=Audit+with+${name}+from+${company}&location=Google+Meet&sf=true&output=xml`;


    // Email to Internal Team
    const teamSubject = "🛠 New Google Ads Audit Scheduled";
    const teamBody = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 680px; margin: auto; background: #f8f9fa; padding: 20px;">
      <div style="background: linear-gradient(135deg, #2c3e50, #34495e); padding: 25px; border-radius: 8px 8px 0 0; text-align: center;">
        <h2 style="color: #fff; margin: 0; font-size: 22px; letter-spacing: 1px;">
          🚀 New Audit Scheduled - Action Required
        </h2>
      </div>
  
      <div style="background: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 25px;">
          <div style="border-right: 2px solid #f4f4f4; padding-right: 20px;">
            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 16px;">👤 Client Details</h3>
            <div style="font-size: 14px; color: #666;">
              <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Company:</strong> ${company}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a></p>
            </div>
          </div>
          
          <div>
            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 16px;">📅 Meeting Schedule</h3>
            <div style="font-size: 14px; color: #666;">
              <p style="margin: 8px 0;"><strong>Date:</strong> ${formattedDate}</p>
              <p style="margin: 8px 0;"><strong>Time:</strong> ${formattedTime}</p>
              <p style="margin: 8px 0;"><strong>Timezone:</strong> ${timeZone}</p>
            </div>
          </div>
        </div>
  
        <div style="background: #fef2f2; padding: 20px; border-radius: 6px; border-left: 4px solid #dc2626; margin: 25px 0;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <div style="background: #dc2626; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">!</div>
            <h3 style="margin: 0; color: #dc2626; font-size: 16px;">Immediate Action Required</h3>
          </div>
          <p style="margin: 0; color: #7f1d1d; font-size: 14px; line-height: 1.5;">
            1. Create calendar invite with Google Meet link<br>
            2. Send confirmation to client email<br>
            3. Add to team calendar<br>
            4. Confirm availability with account manager
          </p>
        </div>
  
        <div style="text-align: center; margin-top: 30px;">
          <a href="${googleCalendarLink}" target="_blank" style="background: #2563eb; color: #ffffff; padding: 10px 25px; border-radius: 5px; text-decoration: none; display: inline-block; font-size: 14px; font-weight: 500;">
            🗓 Create Calendar Event
          </a>
        </div>
      </div>
  
      <div style="text-align: center; padding: 25px; color: #7f8c8d; font-size: 12px; border-top: 1px solid #eee; margin-top: 20px;">
        <p style="margin: 5px 0;">This is an automated notification from BuzzBandits Audit System</p>
        <p style="margin: 5px 0;">⚠️ Please complete actions within 24 hours</p>
      </div>
    </div>
  `;
    const start = new Date(auditDateTime);
    const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 minutes later
    const formatForCalendar = (date) => date.toISOString().replace(/[-:]|\.\d{3}/g, "");
    const startTime = formatForCalendar(start);
    const endTime = formatForCalendar(end);
    const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Google Ads Audit with BuzzBandits")}&dates=${startTime}/${endTime}&details=${encodeURIComponent(`Hi ${name},\n\nThanks for booking a Google Ads audit. We’ll discuss how to grow your business.\n\nMeeting via Google Meet.\n`)}&location=${encodeURIComponent("Google Meet Link will be provided")}&add=${encodeURIComponent(email)}`;

    // Email to User
    const userSubject = "✅ Your Google Ads Audit is Scheduled!";
    const userBody = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 680px; margin: auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #4CAF50, #45a049); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
        <div style="background: #ffffff; width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          📅
        </div>
        <h1 style="color: #fff; margin: 0; font-size: 28px; letter-spacing: 1px;">
          Audit Scheduled Successfully!
        </h1>
      </div>
    
      <div style="padding: 40px; background: #ffffff; border-radius: 0 0 8px 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
        <p style="font-size: 16px; line-height: 1.6; color: #666; margin-bottom: 30px;">
          Hi ${name},<br>
          Thank you for choosing BuzzBandits! We're excited to help optimize your Google Ads performance. Here's everything you need to know:
        </p>
    
        <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <div style="text-align: center;">
              <div style="font-size: 24px; color: #4CAF50;">📅</div>
              <div style="font-weight: 600;">${formattedDate}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 24px; color: #4CAF50;">⏰</div>
              <div style="font-weight: 600;">${formattedTime}<br><small>${timeZone}</small></div>
            </div>
          </div>
        </div>
    
        <div style="background: #e3f2fd; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="margin: 0 0 15px 0; color: #2196F3;">📌 What's Next?</h3>
          <ol style="margin: 0; padding-left: 20px; color: #666;">
            <li>Our team will contact you within 24 hours to confirm details</li>
            <li>You'll receive a calendar invite with Google Meet link</li>
            <li>Test your meeting setup beforehand</li>
            <li>Prepare any questions or materials</li>
          </ol>
        </div>
    
        <div style="background: #fff3e0; padding: 25px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
          <h3 style="margin: 0 0 15px 0; color: #EF6C00;">🎯 From BuzzBandits Team</h3>
          <p style="color: #666; margin: 0;">
            We appreciate the opportunity to work with you!<br>
            Our experts are preparing personalized strategies to help grow your business.
          </p>
        </div>
    
        <div style="text-align: center; margin-top: 30px;">
          <a href="${calendarLink}" style="background: #4CAF50; color: #ffffff; padding: 12px 30px; border-radius: 25px; text-decoration: none; display: inline-block; font-weight: 500; letter-spacing: 0.5px;">
            Add to Calendar
          </a>
        </div>
      </div>
    
      <div style="text-align: center; padding: 25px; color: #7f8c8d; font-size: 14px; border-top: 1px solid #eee;">
        <p style="margin: 0 0 10px 0;">
          Need to reschedule? Reply to this email or contact us at<br>
          <a href="mailto:support@buzzbandits.com" style="color: #3498db; text-decoration: none;">support@buzzbandits.com</a>
        </p>
        <p style="margin: 0; font-style: italic; color: #95a5a6;">
          Thank you for trusting BuzzBandits with your digital success!<br>
          🚀 Your Growth, Our Passion
        </p>
      </div>
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