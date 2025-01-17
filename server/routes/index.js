const express = require("express");
const requestCallback = require("./requestCallback"); // Import specific route

const router = express.Router();

// Define all route endpoints
router.use("/requestCallback", requestCallback); // Use callback routes

module.exports = router;
