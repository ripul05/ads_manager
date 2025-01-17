const express = require("express");
const { requestCallback } = require("../services/requestCallback");

const router = express.Router();

// Define the callback POST route
router.post("/", requestCallback);

module.exports = router;
