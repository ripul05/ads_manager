const express = require("express");
const { requestCallback,getInTouch  } = require("../services/requestCallback");
const { requestCallbackSchema, getInTouchSchema } = require("../config/validations/requestCallbackValidations");


const router = express.Router();

// Middleware for validating request data
const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // Validate against the schema
    if (error) {
        // Send validation errors as response
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
            message: "Validation error",
            errors,
        });
    }
    next(); // Proceed to the next middleware or route handler
};

// Define the callback POST route with validation middleware
router.post("/", validateRequest(requestCallbackSchema), requestCallback);
router.post("/getInTouch", validateRequest(getInTouchSchema), getInTouch )

module.exports = router;
