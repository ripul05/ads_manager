// controllers/auditController.js
const AuditSchedule = require("../models/auditScheduling");
const {
  sendEmail,
  generateGoogleMeetLink,
} = require("../services/emailService");

const auditScheduling = async (req, res) => {
  try {
    const { name, email, company, auditDateTime, timeZone } = req.body;

    // Validate required fields
    if (!name || !email || !company || !auditDateTime || !timeZone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
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
        $gt: [{ $add: ["$auditDateTime", 30 * 60000] }, utcDate],
      },
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: "This time slot overlaps with an existing booking",
      });
    }

    // Create and save new audit schedule
    const newAudit = new AuditSchedule({
      name,
      email,
      company,
      auditDateTime: utcDate,
      timeZone,
    });

    const savedAudit = await newAudit.save();
    res.status(201).json({
      success: true,
      message: "Audit scheduled successfully",
      data: {
        id: savedAudit._id,
        date: savedAudit.auditDateTime,
        timeZone: savedAudit.timeZone,
      },
    });
    await sendAuditEmails({ name, email, company, auditDateTime, timeZone });
  } catch (error) {
    console.error("Error scheduling audit:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const getOccupiedTimeSlots = async (req, res) => {
  try {
    const audits = await AuditSchedule.find(
      {},
      "auditDateTime timeZone meetingDuration"
    ); // Only fetch date and timeSlot fields

    const occupiedSlots = audits.map((audit) => ({
      audtiDateTime: audit.auditDateTime,
      timeZone: audit.timeZone,
      meetingDuration: audit.meetingDuration,
    }));

    res.status(200).json({ occupiedSlots });
  } catch (error) {
    console.error("Error fetching occupied time slots:", error);
    res.status(500).json({ message: "Failed to fetch occupied time slots" });
  }
};

// Modify the sendAuditEmails function to include the Google Meet link
const sendAuditEmails = async ({
  name,
  email,
  company,
  auditDateTime,
  timeZone,
}) => {
  try {
    // Generate Google Meet Link
    // let meetLink
    // meetLink= await generateGoogleMeetLink(auditDateTime, name);

    const formattedDate = new Date(auditDateTime).toLocaleDateString("en-US", {
      timeZone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = new Date(auditDateTime).toLocaleTimeString("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
    });

    // Convert auditDateTime into start and end in ISO string format
    const startDate = new Date(auditDateTime);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // default 30 min duration

    // Google Calendar Event Link
    const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=Google+Ads+Audit+Meeting&dates=${startDate
      .toISOString()
      .replace(/-|:|\.\d+/g, "")}/${endDate
      .toISOString()
      .replace(
        /-|:|\.\d+/g,
        ""
      )}&details=Audit+with+${name}+from+${company}&location=Google+Meet&sf=true&output=xml`;

    const start = new Date(auditDateTime);
    const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 minutes later
    const formatForCalendar = (date) =>
      date.toISOString().replace(/[-:]|\.\d{3}/g, "");
    const startTime = formatForCalendar(start);
    const endTime = formatForCalendar(end);
    const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Google Ads Audit with BuzzBandits"
    )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
      `Hi ${name},\n\nThanks for booking a Google Ads audit. We'll discuss how to grow your business.\n\nMeeting via Google Meet.\n`
    )}&location=${encodeURIComponent(
      "Google Meet Link will be provided"
    )}&add=${encodeURIComponent(email)}`;

    // Enhanced Email to Internal Team - Mobile Optimized
    const teamSubject =
      "🚨 HIGH PRIORITY: Google Ads Audit Alert - Client Meeting Coordination Required";

    const teamBody = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <title>Urgent: New Audit Coordination Required</title>
            <style>
                body, table, td, p, h1, h2, h3, h4 {
                    margin: 0;
                    padding: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                }
                
                .icon-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    vertical-align: middle;
                }
                
                .icon-cell {
                    text-align: center;
                    vertical-align: middle;
                    line-height: 1;
                }
                
                @media only screen and (max-width: 600px) {
                    .mobile-stack { 
                        display: block !important; 
                        width: 100% !important; 
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                        margin-bottom: 20px !important;
                    }
                    .mobile-padding { padding: 20px !important; }
                    .mobile-text { font-size: 14px !important; }
                    .mobile-title { font-size: 24px !important; }
                    .mobile-header { padding: 30px 20px !important; }
                }
            </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f5f7fa;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); min-height: 100vh;">
            <tr>
                <td align="center" style="padding: 30px 15px;">
                    
                    <!-- Main Container -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 700px; background: #ffffff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.15); overflow: hidden;">
                        
                        <!-- Header -->
                        <tr>
                            <td class="mobile-header" style="background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%); padding: 40px 30px; text-align: center;">
                                
                                <!-- Logo Section -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding-bottom: 25px;">
                                            <div style="width: 90px; height: 90px; margin: 0 auto; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
                                                <img src="./BuzzBandits.png" alt="BuzzBandits" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;">
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Alert Icon -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding-bottom: 20px;">
                                            <div style="width: 80px; height: 80px; margin: 0 auto; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 36px; animation: pulse 2s infinite;">
                                                🚨
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                
                                <h1 class="mobile-title" style="color: #ffffff; margin: 0 0 12px 0; font-size: 28px; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: -0.5px;">
                                    URGENT AUDIT COORDINATION
                                </h1>
                                <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 16px; font-weight: 400; line-height: 1.4;">
                                    New client meeting requires immediate team action
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Main Content -->
                        <tr>
                            <td class="mobile-padding" style="padding: 40px 30px;">
                                
                                <!-- Priority Alert Box -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #fef5e7 0%, #fdebc8 100%); border-radius: 12px; border-left: 5px solid #f6ad55; margin-bottom: 35px; box-shadow: 0 4px 20px rgba(246, 173, 85, 0.15);">
                                    <tr>
                                        <td style="padding: 30px;">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td style="vertical-align: top; width: 60px;">
                                                        <div style="width: 50px; height: 50px; background: #f6ad55; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 24px; font-weight: bold; box-shadow: 0 4px 15px rgba(246, 173, 85, 0.3);">
                                                            ⚡
                                                        </div>
                                                    </td>
                                                    <td style="padding-left: 20px; vertical-align: top;">
                                                        <h3 style="margin: 0 0 10px 0; color: #c05621; font-size: 20px; font-weight: 700;">
                                                            Immediate Action Required
                                                        </h3>
                                                        <p style="margin: 0; color: #9c4221; font-size: 15px; line-height: 1.6;">
                                                            Client audit must be coordinated within <strong>90 minutes</strong> of receiving this notification. All team members must respond ASAP.
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Task Checklist -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 16px; margin-bottom: 35px; border: 1px solid #e2e8f0;">
                                    <tr>
                                        <td style="padding: 30px;">
                                            <h3 style="margin: 0 0 25px 0; color: #2d3748; font-size: 18px; font-weight: 700; display: flex; align-items: center;">
                                                <span style="margin-right: 10px; font-size: 20px;">✅</span>
                                                Critical Tasks Checklist
                                            </h3>
                                            
                                            <!-- Task Items -->
                                            <div style="space-y: 12px;">
                                                <!-- Task 1 -->
                                                <div style="display: flex; align-items: flex-start; padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                                    <div style="width: 28px; height: 28px; background: #4299e1; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; margin-right: 15px; flex-shrink: 0;">
                                                        1
                                                    </div>
                                                    <div style="color: #4a5568; font-size: 15px; line-height: 1.6; font-weight: 500;">
                                                        Create and test Google Meet link - ensure audio/video quality
                                                    </div>
                                                </div>
                                                
                                                <!-- Task 2 -->
                                                <div style="display: flex; align-items: flex-start; padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                                    <div style="width: 28px; height: 28px; background: #4299e1; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; margin-right: 15px; flex-shrink: 0;">
                                                        2
                                                    </div>
                                                    <div style="color: #4a5568; font-size: 15px; line-height: 1.6; font-weight: 500;">
                                                        Send comprehensive calendar invite with agenda and prep materials
                                                    </div>
                                                </div>
                                                
                                                <!-- Task 3 -->
                                                <div style="display: flex; align-items: flex-start; padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                                    <div style="width: 28px; height: 28px; background: #4299e1; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; margin-right: 15px; flex-shrink: 0;">
                                                        3
                                                    </div>
                                                    <div style="color: #4a5568; font-size: 15px; line-height: 1.6; font-weight: 500;">
                                                        Brief assigned account manager and prepare client background
                                                    </div>
                                                </div>
                                                
                                                <!-- Task 4 -->
                                                <div style="display: flex; align-items: flex-start; padding: 15px 0;">
                                                    <div style="width: 28px; height: 28px; background: #4299e1; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; margin-right: 15px; flex-shrink: 0;">
                                                        4
                                                    </div>
                                                    <div style="color: #4a5568; font-size: 15px; line-height: 1.6; font-weight: 500;">
                                                        Update internal systems and notify all relevant stakeholders
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Client Information Cards -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 35px;">
                                    <tr>
                                        <td class="mobile-stack" style="width: 48%; padding-right: 2%; vertical-align: top;">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); border-radius: 16px; border: 1px solid #90cdf4; height: 100%;">
                                                <tr>
                                                    <td style="padding: 25px;">
                                                        <h4 style="margin: 0 0 20px 0; color: #2b6cb0; font-size: 16px; font-weight: 700; display: flex; align-items: center;">
                                                            <span style="margin-right: 8px; font-size: 18px;">👤</span>
                                                            Client Information
                                                        </h4>
                                                        
                                                        <div style="space-y: 12px;">
                                                            <div style="margin-bottom: 12px;">
                                                                <span style="color: #2c5282; font-weight: 600; font-size: 14px;">Name:</span>
                                                                <span style="color: #2a4365; font-weight: 500; font-size: 14px; margin-left: 8px;">\${name}</span>
                                                            </div>
                                                            <div style="margin-bottom: 12px;">
                                                                <span style="color: #2c5282; font-weight: 600; font-size: 14px;">Company:</span>
                                                                <span style="color: #2a4365; font-weight: 500; font-size: 14px; margin-left: 8px;">\${company}</span>
                                                            </div>
                                                            <div>
                                                                <span style="color: #2c5282; font-weight: 600; font-size: 14px;">Email:</span>
                                                                <a href="mailto:\${email}" style="color: #3182ce; text-decoration: none; font-weight: 500; margin-left: 8px; font-size: 14px;">\${email}</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        
                                        <td class="mobile-stack" style="width: 48%; padding-left: 2%; vertical-align: top;">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); border-radius: 16px; border: 1px solid #9ae6b4; height: 100%;">
                                                <tr>
                                                    <td style="padding: 25px;">
                                                        <h4 style="margin: 0 0 20px 0; color: #276749; font-size: 16px; font-weight: 700; display: flex; align-items: center;">
                                                            <span style="margin-right: 8px; font-size: 18px;">📅</span>
                                                            Meeting Details
                                                        </h4>
                                                        
                                                        <div style="space-y: 12px;">
                                                            <div style="margin-bottom: 12px;">
                                                                <span style="color: #22543d; font-weight: 600; font-size: 14px;">Date:</span>
                                                                <span style="color: #1a202c; font-weight: 500; font-size: 14px; margin-left: 8px;">\${formattedDate}</span>
                                                            </div>
                                                            <div style="margin-bottom: 12px;">
                                                                <span style="color: #22543d; font-weight: 600; font-size: 14px;">Time:</span>
                                                                <span style="color: #1a202c; font-weight: 500; font-size: 14px; margin-left: 8px;">\${formattedTime}</span>
                                                            </div>
                                                            <div>
                                                                <span style="color: #22543d; font-weight: 600; font-size: 14px;">Timezone:</span>
                                                                <span style="color: #1a202c; font-weight: 500; font-size: 14px; margin-left: 8px;">\${timeZone}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Action Button -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding: 20px 0;">
                                            <a href="\${googleCalendarLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 32px; border-radius: 50px; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                                                <span style="margin-right: 8px;">🗓️</span>
                                                Add to Calendar Now
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                                
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                                <p style="margin: 0 0 5px 0; color: #4a5568; font-size: 14px; font-weight: 600;">
                                    <span style="margin-right: 6px;">🤖</span>
                                    BuzzBandits Internal Management System
                                </p>
                                <p style="margin: 0; color: #718096; font-size: 12px;">
                                    Automated Priority Alert • Response Required Within 90 Minutes
                                </p>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>

        </body>
        </html>
        `;

    const userSubject =
      "🎯 Your Google Ads Success Journey Starts Now - Audit Confirmed!";

    const userBody = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Google Ads Audit Confirmation</title>
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); text-align: center; padding: 40px 20px; }
        .logo { width: 80px; height: 80px; margin: 0 auto 20px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .celebration { width: 60px; height: 60px; margin: 0 auto 20px; background: rgba(255,255,255,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .content { padding: 40px 30px; }
        .meeting-card { background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 30px; margin: 30px 0; border: 1px solid #90caf9; }
        .meeting-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
        .meeting-detail { background: rgba(255,255,255,0.8); padding: 20px; border-radius: 8px; }
        .steps-section { background: linear-gradient(135deg, #fff3e0 0%, #ffcc02 20%); border-radius: 12px; padding: 30px; margin: 30px 0; }
        .step { display: flex; margin-bottom: 20px; }
        .step-number { width: 30px; height: 30px; background: #ff9800; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0; }
        .prep-section { background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); border-radius: 12px; padding: 30px; margin: 30px 0; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-weight: bold; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; }
        
        @media (max-width: 600px) {
            .meeting-grid { grid-template-columns: 1fr; }
            .content { padding: 20px; }
            .step { flex-direction: column; align-items: flex-start; }
            .step-number { margin-bottom: 10px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">
                <img src="./BuzzBandits.png" alt="BuzzBandits" style="width: 60px; height: 60px; border-radius: 50%;">
            </div>
            <div class="celebration">🎉</div>
            <h1 style="color: white; margin: 0; font-size: 24px;">Audit Successfully Scheduled!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Get ready to unlock your Google Ads potential</p>
        </div>

        <!-- Main Content -->
        <div class="content">
            <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Welcome aboard, ${name}! 👋</h2>
            <p style="color: #666; line-height: 1.6; text-align: center; margin-bottom: 30px;">
                Thank you for trusting <strong style="color: #667eea;">BuzzBandits</strong> with your Google Ads success! 
                Our team is excited to help <strong>${company}</strong> achieve breakthrough results.
            </p>

            <!-- Meeting Details -->
            <div class="meeting-card">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="width: 50px; height: 50px; margin: 0 auto; background: #1976d2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">📅</div>
                </div>
                <h3 style="color: #1565c0; text-align: center; margin-bottom: 20px;">Your Audit Session Details</h3>
                
                <div class="meeting-grid">
                    <div class="meeting-detail">
                        <h4 style="color: #1565c0; margin: 0 0 10px 0;">📍 When & Where</h4>
                        <p style="margin: 5px 0; color: #333;"><strong>Date:</strong> ${formattedDate}</p>
                        <p style="margin: 5px 0; color: #333;"><strong>Time:</strong> ${formattedTime}</p>
                        <p style="margin: 5px 0; color: #333;"><strong>Timezone:</strong> ${timeZone}</p>
                    </div>
                    
                    <div class="meeting-detail">
                        <h4 style="color: #1565c0; margin: 0 0 10px 0;">🎯 What to Expect</h4>
                        <p style="margin: 5px 0; color: #333; font-size: 14px;">• Complete account analysis</p>
                        <p style="margin: 5px 0; color: #333; font-size: 14px;">• Performance optimization</p>
                        <p style="margin: 5px 0; color: #333; font-size: 14px;">• Custom growth strategy</p>
                        <p style="margin: 5px 0; color: #333; font-size: 14px;">• Expert Q&A session</p>
                    </div>
                </div>
            </div>

            <!-- What Happens Next -->
            <div class="steps-section">
                <h3 style="color: #e65100; text-align: center; margin-bottom: 25px;">
                    🚀 What Happens Next?
                </h3>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <div>
                        <h4 style="color: #e65100; margin: 0 0 8px 0;">Calendar Invite Incoming</h4>
                        <p style="color: #bf360c; margin: 0; font-size: 14px;">
                            You'll receive a detailed calendar invite with Google Meet link within 10 minutes.
                        </p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <div>
                        <h4 style="color: #e65100; margin: 0 0 8px 0;">Pre-Audit Preparation</h4>
                        <p style="color: #bf360c; margin: 0; font-size: 14px;">
                            Our team will analyze your current setup to maximize our session time.
                        </p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <div>
                        <h4 style="color: #e65100; margin: 0 0 8px 0;">Your Growth Strategy Session</h4>
                        <p style="color: #bf360c; margin: 0; font-size: 14px;">
                            We'll review findings and create your custom action plan for success.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Preparation Tips -->
            <div class="prep-section">
                <h3 style="color: #2e7d32; text-align: center; margin-bottom: 20px;">
                    💡 How to Prepare for Maximum Value
                </h3>
                
                <div style="color: #1b5e20; font-size: 14px; line-height: 1.6;">
                    <p style="margin: 10px 0;"><strong>• Have your Google Ads login ready</strong> - We'll need screen access for real-time review</p>
                    <p style="margin: 10px 0;"><strong>• Prepare your top 3 questions</strong> - What challenges are you facing with current campaigns?</p>
                    <p style="margin: 10px 0;"><strong>• Know your goals</strong> - What results would make this audit a huge success?</p>
                    <p style="margin: 10px 0;"><strong>• Bring your team</strong> - Include other decision-makers who should hear recommendations</p>
                </div>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="${calendarLink}" class="cta-button">
                    🗓️ Add to My Calendar
                </a>
            </div>

            <!-- Contact Info -->
            <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; text-align: center; margin-top: 30px;">
                <h4 style="color: #333; margin: 0 0 10px 0;">Questions? We're Here to Help! 🤝</h4>
                <p style="color: #666; margin: 0; font-size: 14px;">
                    Need to reschedule or have questions? Reply to this email or call us at 
                    <a href="tel:+1234567890" style="color: #667eea;">(123) 456-7890</a>
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div style="margin-bottom: 15px;">
                <img src="./BuzzBandits.png" alt="BuzzBandits" style="width: 40px; height: 40px; border-radius: 50%;">
            </div>
            <h4 style="color: #333; margin: 0 0 10px 0;">BuzzBandits - Google Ads Experts</h4>
            <p style="margin: 0 0 15px 0; font-size: 14px;">Helping businesses scale profitably with Google Ads</p>
            <p style="margin: 0; font-size: 12px; color: #999;">
                This email was sent because you scheduled a Google Ads audit with BuzzBandits.
            </p>
        </div>
    </div>
</body>
</html>
`;
    // Send emails
    await sendEmail(teamSubject, teamBody); // send to internal team
    await sendEmail(userSubject, userBody, email); // send to user
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};

module.exports = { auditScheduling, getOccupiedTimeSlots };
