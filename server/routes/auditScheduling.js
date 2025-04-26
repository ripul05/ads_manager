const express = require("express");
const router = express.Router();
const {auditScheduling, getOccupiedTimeSlots} = require('../services/auditScheduling')

// Middleware for validating request data

// Define the callback POST route with validation middleware
router.post("/", auditScheduling);
router.get("/occupiedTimeslots", getOccupiedTimeSlots)

module.exports = router;