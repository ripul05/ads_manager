const express = require("express");
const requestCallback = require("./requestCallback"); // Import specific route
const auditScheduling = require('./auditScheduling')

const router = express.Router();

// Define all route endpoints
router.use("/requestCallback", requestCallback); // Use callback routes\
router.use("/auditScheduling", auditScheduling)

module.exports = router;
