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

// Enhanced Team Internal Alert Email
const teamSubject = "🚀 NEURAL SYNC ALERT: Client Matrix Entry Detected - Immediate Protocol Activation";

const teamBody = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <title>Neural Network Alert: Client Acquisition Protocol</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body, table, td, p, h1, h2, h3, h4 {
            font-family: 'Rajdhani', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        }
        
        .cyber-title {
            font-family: 'Orbitron', monospace;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        
        .glow-text {
            text-shadow: 0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 30px #00f5ff;
        }
        
        .neon-border {
            border: 2px solid #00f5ff;
            box-shadow: 0 0 20px rgba(0, 245, 255, 0.3), inset 0 0 20px rgba(0, 245, 255, 0.1);
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .matrix-grid {
            background: 
                linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
        }
        
        .hologram-card {
            background: linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(255, 0, 150, 0.1));
            border: 1px solid rgba(0, 245, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 245, 255, 0.2);
            backdrop-filter: blur(10px);
        }
        
        @media only screen and (max-width: 600px) {
            .mobile-stack { display: block !important; width: 100% !important; margin-bottom: 20px !important; }
            .mobile-padding { padding: 20px !important; }
            .mobile-text { font-size: 14px !important; }
            .mobile-title { font-size: 20px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);">

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%); min-height: 100vh;">
    <tr>
        <td align="center" style="padding: 30px 15px;">
            
            <!-- Main Container -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 700px; background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); border-radius: 20px; box-shadow: 0 20px 80px rgba(0, 245, 255, 0.3); overflow: hidden;" class="neon-border">
                
                <!-- Header -->
                <tr>
                    <td style="background: linear-gradient(135deg, #ff0080 0%, #00f5ff 100%); padding: 40px 30px; text-align: center; position: relative;" class="matrix-grid">
                        
                        <!-- Company Logo -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td align="center" style="padding-bottom: 25px;">
                                    <div style="width: 100px; height: 100px; margin: 0 auto; border-radius: 50%; background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(0,245,255,0.3)); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 40px rgba(0, 245, 255, 0.5);" class="pulse">
                                        <img src="./BuzzBandits.png" alt="BuzzBandits" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
                                    </div>
                                </td>
                            </tr>
                        </table>
                        
                        <!-- Neural Alert Icon -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td align="center" style="padding-bottom: 20px;">
                                    <div style="width: 90px; height: 90px; margin: 0 auto; background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(0,245,255,0.3)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 42px;" class="pulse">
                                        🧠
                                    </div>
                                </td>
                            </tr>
                        </table>
                        
                        <h1 class="cyber-title glow-text mobile-title" style="color: #ffffff; margin: 0 0 15px 0; font-size: 30px; text-shadow: 0 0 20px #00f5ff;">
                            NEURAL SYNC INITIATED
                        </h1>
                        <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 18px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
                            Client Matrix Entry Detected • Protocol Activation Required
                        </p>
                    </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                    <td style="padding: 40px 30px; background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%);">
                        
                        <!-- Priority Alert Box -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 35px;">
                            <tr>
                                <td class="hologram-card" style="padding: 30px; border-radius: 15px;">
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                        <tr>
                                            <td style="vertical-align: top; width: 70px;">
                                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #ff0080, #00f5ff); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 28px; font-weight: bold; box-shadow: 0 0 30px rgba(255, 0, 128, 0.5);" class="pulse">
                                                    ⚡
                                                </div>
                                            </td>
                                            <td style="padding-left: 20px; vertical-align: top;">
                                                <h3 style="margin: 0 0 10px 0; color: #00f5ff; font-size: 22px; font-weight: 700; font-family: 'Orbitron', monospace;">
                                                    IMMEDIATE NEURAL RESPONSE
                                                </h3>
                                                <p style="margin: 0; color: #ffffff; font-size: 16px; line-height: 1.6;">
                                                    Client acquisition protocol must be executed within <strong style="color: #ff0080;">90 MINUTES</strong>. 
                                                    All neural network nodes must synchronize for optimal performance.
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        
                        <!-- Mission Critical Tasks -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 35px;">
                            <tr>
                                <td class="hologram-card" style="padding: 30px; border-radius: 15px;">
                                    <h3 style="margin: 0 0 25px 0; color: #00f5ff; font-size: 20px; font-weight: 700; font-family: 'Orbitron', monospace; display: flex; align-items: center;">
                                        <span style="margin-right: 12px; font-size: 24px;">🎯</span>
                                        MISSION CRITICAL PROTOCOLS
                                    </h3>
                                    
                                    <!-- Task Grid -->
                                    <div style="display: grid; gap: 20px;">
                                        <!-- Task 1 -->
                                        <div style="display: flex; align-items: flex-start; padding: 20px; background: linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(255, 0, 150, 0.1)); border-radius: 10px; border: 1px solid rgba(0, 245, 255, 0.3);">
                                            <div style="width: 35px; height: 35px; background: linear-gradient(135deg, #ff0080, #00f5ff); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; margin-right: 15px; flex-shrink: 0;">
                                                01
                                            </div>
                                            <div style="color: #ffffff; font-size: 16px; line-height: 1.6; font-weight: 500;">
                                                <strong style="color: #00f5ff;">QUANTUM LINK ESTABLISHMENT:</strong> Initialize secure Google Meet portal with neural audio/video calibration
                                            </div>
                                        </div>
                                        
                                        <!-- Task 2 -->
                                        <div style="display: flex; align-items: flex-start; padding: 20px; background: linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(255, 0, 150, 0.1)); border-radius: 10px; border: 1px solid rgba(0, 245, 255, 0.3);">
                                            <div style="width: 35px; height: 35px; background: linear-gradient(135deg, #ff0080, #00f5ff); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; margin-right: 15px; flex-shrink: 0;">
                                                02
                                            </div>
                                            <div style="color: #ffffff; font-size: 16px; line-height: 1.6; font-weight: 500;">
                                                <strong style="color: #00f5ff;">HOLOGRAPHIC CALENDAR SYNC:</strong> Deploy comprehensive meeting matrix with tactical briefing materials
                                            </div>
                                        </div>
                                        
                                        <!-- Task 3 -->
                                        <div style="display: flex; align-items: flex-start; padding: 20px; background: linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(255, 0, 150, 0.1)); border-radius: 10px; border: 1px solid rgba(0, 245, 255, 0.3);">
                                            <div style="width: 35px; height: 35px; background: linear-gradient(135deg, #ff0080, #00f5ff); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; margin-right: 15px; flex-shrink: 0;">
                                                03
                                            </div>
                                            <div style="color: #ffffff; font-size: 16px; line-height: 1.6; font-weight: 500;">
                                                <strong style="color: #00f5ff;">NEURAL AGENT BRIEFING:</strong> Activate assigned digital strategist with complete client intelligence profile
                                            </div>
                                        </div>
                                        
                                        <!-- Task 4 -->
                                        <div style="display: flex; align-items: flex-start; padding: 20px; background: linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(255, 0, 150, 0.1)); border-radius: 10px; border: 1px solid rgba(0, 245, 255, 0.3);">
                                            <div style="width: 35px; height: 35px; background: linear-gradient(135deg, #ff0080, #00f5ff); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; margin-right: 15px; flex-shrink: 0;">
                                                04
                                            </div>
                                            <div style="color: #ffffff; font-size: 16px; line-height: 1.6; font-weight: 500;">
                                                <strong style="color: #00f5ff;">SYSTEM SYNCHRONIZATION:</strong> Update all network nodes and notify digital warfare command center
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        
                        <!-- Client Data Matrix -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 35px;">
                            <tr>
                                <td class="mobile-stack" style="width: 48%; padding-right: 2%; vertical-align: top;">
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="hologram-card" style="border-radius: 15px; height: 100%;">
                                        <tr>
                                            <td style="padding: 25px;">
                                                <h4 style="margin: 0 0 20px 0; color: #00f5ff; font-size: 18px; font-weight: 700; font-family: 'Orbitron', monospace; display: flex; align-items: center;">
                                                    <span style="margin-right: 10px; font-size: 20px;">🏢</span>
                                                    CLIENT DATA MATRIX
                                                </h4>
                                                
                                                <div style="space-y: 12px;">
                                                    <div style="margin-bottom: 12px;">
                                                        <span style="color: #00f5ff; font-weight: 600; font-size: 14px;">ENTITY:</span>
                                                        <span style="color: #ffffff; font-weight: 500; font-size: 14px; margin-left: 8px;">\${name}</span>
                                                    </div>
                                                    <div style="margin-bottom: 12px;">
                                                        <span style="color: #00f5ff; font-weight: 600; font-size: 14px;">CORPORATION:</span>
                                                        <span style="color: #ffffff; font-weight: 500; font-size: 14px; margin-left: 8px;">\${company}</span>
                                                    </div>
                                                    <div>
                                                        <span style="color: #00f5ff; font-weight: 600; font-size: 14px;">NEURAL LINK:</span>
                                                        <a href="mailto:\${email}" style="color: #ff0080; text-decoration: none; font-weight: 500; margin-left: 8px; font-size: 14px;">\${email}</a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                
                                <td class="mobile-stack" style="width: 48%; padding-left: 2%; vertical-align: top;">
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="hologram-card" style="border-radius: 15px; height: 100%;">
                                        <tr>
                                            <td style="padding: 25px;">
                                                <h4 style="margin: 0 0 20px 0; color: #00f5ff; font-size: 18px; font-weight: 700; font-family: 'Orbitron', monospace; display: flex; align-items: center;">
                                                    <span style="margin-right: 10px; font-size: 20px;">⏰</span>
                                                    SYNC COORDINATES
                                                </h4>
                                                
                                                <div style="space-y: 12px;">
                                                    <div style="margin-bottom: 12px;">
                                                        <span style="color: #00f5ff; font-weight: 600; font-size: 14px;">DATE:</span>
                                                        <span style="color: #ffffff; font-weight: 500; font-size: 14px; margin-left: 8px;">\${formattedDate}</span>
                                                    </div>
                                                    <div style="margin-bottom: 12px;">
                                                        <span style="color: #00f5ff; font-weight: 600; font-size: 14px;">TIME:</span>
                                                        <span style="color: #ffffff; font-weight: 500; font-size: 14px; margin-left: 8px;">\${formattedTime}</span>
                                                    </div>
                                                    <div>
                                                        <span style="color: #00f5ff; font-weight: 600; font-size: 14px;">ZONE:</span>
                                                        <span style="color: #ffffff; font-weight: 500; font-size: 14px; margin-left: 8px;">\${timeZone}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        
                        <!-- Action Portal -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td align="center" style="padding: 20px 0;">
                                    <a href="\${googleCalendarLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #ff0080 0%, #00f5ff 100%); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 18px; padding: 18px 40px; border-radius: 50px; box-shadow: 0 0 40px rgba(255, 0, 128, 0.5); transition: all 0.3s ease; font-family: 'Orbitron', monospace; text-transform: uppercase; letter-spacing: 1px;" class="pulse">
                                        <span style="margin-right: 10px;">🚀</span>
                                        ACTIVATE NEURAL SYNC
                                    </a>
                                </td>
                            </tr>
                        </table>
                        
                    </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                    <td style="background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); padding: 25px 30px; text-align: center; border-top: 2px solid rgba(0, 245, 255, 0.3);">
                        <p style="margin: 0 0 8px 0; color: #00f5ff; font-size: 16px; font-weight: 700; font-family: 'Orbitron', monospace;">
                            <span style="margin-right: 8px;">🤖</span>
                            BUZZbandits DIGITAL WARFARE COMMAND
                        </p>
                        <p style="margin: 0; color: #ffffff; font-size: 14px; opacity: 0.8;">
                            Neural Network Alert • Response Required Within 90 Minutes
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

    const userBody = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BuzzBandits - Digital Marketing Consultation Confirmed</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body { 
            font-family: 'Rajdhani', Arial, sans-serif; 
            background: linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a2e 75%, #16213e 100%); 
            color: #ffffff; 
            line-height: 1.6;
        }
        
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a2e 100%); 
            border: 2px solid #00f5ff;
            box-shadow: 0 0 40px rgba(0, 245, 255, 0.3), 0 0 80px rgba(0, 245, 255, 0.1);
            position: relative;
            overflow: hidden;
        }
        
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px),
                linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px);
            background-size: 30px 30px;
            pointer-events: none;
            z-index: 1;
        }
        
        .header { 
            background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); 
            text-align: center; 
            padding: 40px 20px; 
            position: relative;
            overflow: hidden;
            border-bottom: 1px solid rgba(0, 245, 255, 0.3);
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(0, 245, 255, 0.1) 50%, transparent 70%);
            animation: scan 3s linear infinite;
        }
        
        @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .brand-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin-bottom: 20px;
            position: relative;
            z-index: 2;
        }
        
        .logo { 
            width: 60px; 
            height: 60px; 
            background: linear-gradient(135deg, rgba(0,245,255,0.2), rgba(255,255,255,0.1)); 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            box-shadow: 0 0 30px rgba(0, 245, 255, 0.5);
            animation: pulse 2s infinite;
            font-size: 24px;
            border: 1px solid rgba(0, 245, 255, 0.3);
        }
        
        .brand-title {
            font-family: 'Orbitron', monospace;
            font-weight: 900;
            font-size: 28px;
            letter-spacing: 3px;
            text-transform: uppercase;
            background: linear-gradient(135deg, #00f5ff 0%, #0099ff 50%, #6666ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px rgba(0, 245, 255, 0.3);
        }
        
        .status-line {
            font-family: 'Orbitron', monospace;
            font-size: 14px;
            color: #00ff7f;
            letter-spacing: 1px;
            margin-top: 10px;
            position: relative;
            z-index: 2;
        }
        
        .status-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #00ff7f;
            border-radius: 50%;
            margin-right: 8px;
            animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .content { 
            padding: 40px 30px; 
            position: relative;
            z-index: 2;
        }
        
        .cyber-card { 
            background: linear-gradient(135deg, rgba(0, 245, 255, 0.05), rgba(102, 102, 255, 0.05)); 
            border: 1px solid rgba(0, 245, 255, 0.2); 
            border-radius: 15px; 
            padding: 30px; 
            margin: 30px 0; 
            box-shadow: 0 8px 32px rgba(0, 245, 255, 0.1);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
        }
        
        .cyber-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #00f5ff, transparent);
            animation: line-scan 2s linear infinite;
        }
        
        @keyframes line-scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .cyber-title {
            font-family: 'Orbitron', monospace;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
            background: linear-gradient(135deg, #ffffff 0%, #00f5ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
            margin-bottom: 20px;
        }
        
        .highlight {
            color: #00f5ff;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
        }
        
        .meeting-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin: 25px 0; 
        }
        
        .meeting-detail { 
            background: linear-gradient(135deg, rgba(0, 245, 255, 0.08), rgba(102, 102, 255, 0.08)); 
            padding: 20px; 
            border-radius: 10px; 
            border: 1px solid rgba(0, 245, 255, 0.2);
            position: relative;
        }
        
        .meeting-detail h3 {
            color: #00f5ff;
            font-family: 'Orbitron', monospace;
            font-size: 14px;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .strategy-section { 
            background: linear-gradient(135deg, rgba(0, 255, 127, 0.05), rgba(0, 245, 255, 0.08)); 
            border: 1px solid rgba(0, 255, 127, 0.2);
            border-radius: 15px; 
            padding: 30px; 
            margin: 30px 0; 
            position: relative;
            overflow: hidden;
        }
        
        .strategy-section::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 127, 0.1));
            animation: side-scan 4s linear infinite;
        }
        
        @keyframes side-scan {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        
        .step { 
            display: flex; 
            margin-bottom: 25px; 
            align-items: flex-start;
        }
        
        .step-number { 
            width: 40px; 
            height: 40px; 
            background: linear-gradient(135deg, #00f5ff, #0099ff); 
            color: #000; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-weight: bold; 
            margin-right: 15px; 
            flex-shrink: 0;
            font-family: 'Orbitron', monospace;
            box-shadow: 0 0 20px rgba(0, 245, 255, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .step-content h3 {
            color: #00ff7f;
            font-family: 'Orbitron', monospace;
            font-size: 16px;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .prep-list {
            list-style: none;
            padding: 0;
            margin: 20px 0;
        }
        
        .prep-list li {
            margin-bottom: 12px;
            padding-left: 25px;
            position: relative;
            font-size: 16px;
        }
        
        .prep-list li::before {
            content: '▶';
            position: absolute;
            left: 0;
            color: #00ff7f;
            font-size: 12px;
        }
        
        .cta-button { 
            display: inline-block; 
            background: linear-gradient(135deg, #00f5ff 0%, #0099ff 100%); 
            color: #000; 
            text-decoration: none; 
            padding: 18px 40px; 
            border-radius: 50px; 
            font-weight: bold; 
            margin: 20px auto;
            font-family: 'Orbitron', monospace;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 14px;
            box-shadow: 0 0 40px rgba(0, 245, 255, 0.4);
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: block;
            text-align: center;
            max-width: 300px;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 60px rgba(0, 245, 255, 0.6);
        }
        
        .alert-section {
            background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 0, 128, 0.1));
            border: 1px solid rgba(255, 107, 107, 0.3);
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
            position: relative;
        }
        
        .alert-section::before {
            content: '⚠️';
            position: absolute;
            top: -10px;
            left: 20px;
            background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%);
            padding: 5px 10px;
            border-radius: 50%;
            font-size: 16px;
        }
        
        .footer { 
            background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%); 
            padding: 30px; 
            text-align: center; 
            border-top: 1px solid rgba(0, 245, 255, 0.3);
            position: relative;
            z-index: 2;
        }

        .status-badge {
            background: linear-gradient(135deg, #00ff7f 0%, #00f5ff 100%);
            color: #000;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
            margin-top: 15px;
            font-family: 'Orbitron', monospace;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 25px 0;
        }

        .stat-item {
            text-align: center;
            padding: 20px;
            background: linear-gradient(135deg, rgba(0, 245, 255, 0.05), rgba(102, 102, 255, 0.05));
            border-radius: 10px;
            border: 1px solid rgba(0, 245, 255, 0.2);
        }

        .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #00f5ff;
            font-family: 'Orbitron', monospace;
        }

        .stat-label {
            font-size: 12px;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 5px;
        }
        
        @media (max-width: 600px) {
            .meeting-grid { grid-template-columns: 1fr; }
            .stats-grid { grid-template-columns: 1fr; }
            .content { padding: 20px; }
            .step { flex-direction: column; align-items: flex-start; }
            .step-number { margin-bottom: 10px; }
            .brand-container { flex-direction: column; gap: 10px; }
            .brand-title { font-size: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="brand-container">
                <div class="logo">🚀</div>
                <h1 class="brand-title">BUZZBANDITS</h1>
            </div>
            <div class="status-line">
                <span class="status-dot"></span>
                DIGITAL MARKETING CONSULTATION CONFIRMED
            </div>
        </div>
        
        <div class="content">
            <div class="cyber-card">
                <h2 class="cyber-title" style="font-size: 24px;">Consultation Scheduled</h2>
                <p style="font-size: 18px; margin-bottom: 15px;">
                    Thank you for choosing <span class="highlight">BuzzBandits</span>! 🎯
                </p>
                <p style="font-size: 16px; margin-bottom: 20px;">
                    We're excited to discuss your digital marketing goals and explore how we can help 
                    <span class="highlight">grow your online presence</span> and drive meaningful results for your business.
                </p>
                
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-value">300%</div>
                        <div class="stat-label">Avg Growth</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">50+</div>
                        <div class="stat-label">Clients Served</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">5★</div>
                        <div class="stat-label">Client Rating</div>
                    </div>
                </div>
                
                <div class="status-badge">MEETING CONFIRMED</div>
            </div>

            <div class="meeting-grid">
                <div class="meeting-detail">
                    <h3>📅 Meeting Date</h3>
                    <p style="font-size: 16px; font-weight: 500;">[DATE_PLACEHOLDER]</p>
                </div>
                <div class="meeting-detail">
                    <h3>⏰ Meeting Time</h3>
                    <p style="font-size: 16px; font-weight: 500;">[TIME_PLACEHOLDER]</p>
                </div>
                <div class="meeting-detail">
                    <h3>🌐 Join Meeting</h3>
                    <p style="font-size: 16px; font-weight: 500;">[ZOOM_LINK_PLACEHOLDER]</p>
                </div>
                <div class="meeting-detail">
                    <h3>🔐 Meeting ID</h3>
                    <p style="font-size: 16px; font-weight: 500;">[MEETING_ID_PLACEHOLDER]</p>
                </div>
            </div>

            <div class="strategy-section">
                <h2 class="cyber-title" style="font-size: 20px;">📈 What We'll Cover</h2>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h3>Current State Analysis</h3>
                        <p>Review your existing digital presence, website performance, and current marketing efforts to identify opportunities.</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h3>Goal Setting & Strategy</h3>
                        <p>Define your business objectives and create a tailored digital marketing strategy to achieve your targets.</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h3>Channel Optimization</h3>
                        <p>Explore the best marketing channels for your audience including SEO, social media, PPC, and content marketing.</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h3>Next Steps & Timeline</h3>
                        <p>Outline actionable next steps and create a realistic timeline for implementing your digital marketing strategy.</p>
                    </div>
                </div>
            </div>

            <div class="cyber-card">
                <h2 class="cyber-title" style="font-size: 18px;">📋 Please Prepare</h2>
                <p style="font-size: 16px; margin-bottom: 15px;">
                    To make the most of our consultation, please have the following ready:
                </p>
                <ul class="prep-list">
                    <li>Website URL and access to analytics (Google Analytics, etc.)</li>
                    <li>Information about your target audience and ideal customers</li>
                    <li>Current marketing activities and budget considerations</li>
                    <li>Business goals and growth objectives</li>
                    <li>Any specific challenges or questions you'd like to discuss</li>
                    <li>Examples of competitors or marketing you admire</li>
                </ul>
            </div>

            <div style="text-align: center; margin: 40px 0;">
                <a href="[CALENDAR_LINK_PLACEHOLDER]" class="cta-button">Add to Calendar</a>
            </div>

            <div class="alert-section">
                <h3 style="color: #ff6b6b; margin-bottom: 15px; margin-top: 15px;">Important Notes</h3>
                <p style="margin-bottom: 10px;">
                    This consultation is <span class="highlight">complimentary</span> and designed to provide you with valuable insights into your digital marketing opportunities.
                </p>
                <p style="color: #ff6b6b; font-weight: 500;">
                    If you need to reschedule, please let us know at least 24 hours in advance so we can offer the time slot to other clients.
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p style="font-size: 16px; margin-bottom: 15px; font-weight: 500;">
                Looking forward to helping you grow your business online!
            </p>
            <p style="font-size: 14px; color: #888; margin-bottom: 10px;">
                <span class="highlight">BUZZBANDITS</span> | Digital Marketing Specialists
            </p>
            <p style="font-size: 12px; color: #666;">
                Questions? Contact us at hello@buzzbandits.com | (555) 123-4567
            </p>
        </div>
    </div>
</body>
</html>`;
    // Send emails
    await sendEmail(teamSubject, teamBody); // send to internal team
    await sendEmail(userSubject, userBody, email); // send to user
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};

module.exports = { auditScheduling, getOccupiedTimeSlots };
