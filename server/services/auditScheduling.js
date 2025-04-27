// controllers/auditController.js
const AuditSchedule = require('../models/auditScheduling');


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


module.exports = { auditScheduling, getOccupiedTimeSlots };