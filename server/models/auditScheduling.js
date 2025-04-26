// models/AuditSchedule.js
const mongoose = require('mongoose');

const auditScheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    lowercase: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  auditDateTime: {
    type: Date,
    required: [true, 'Audit date/time is required']
  },
  timeZone: {
    type: String,
    required: [true, 'Time zone is required']
  },
  meetingDuration: {
    type: String,
    default: '30 minutes'
  },
  meetingType: {
    type: String,
    default: 'Google Ads Audit'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

auditScheduleSchema.pre('save', function(next) {
    // Convert auditDateTime to UTC before saving
    if (this.auditDateTime) {
      this.auditDateTime = new Date(this.auditDateTime.toISOString());
    }
    next();
  });
  
  // Add index specifically for auditDateTime
auditScheduleSchema.index({ auditDateTime: 1 });

module.exports = mongoose.model('AuditSchedule', auditScheduleSchema);