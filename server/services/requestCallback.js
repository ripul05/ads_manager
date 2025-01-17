const RequestCallback = require("../models/requestCallback"); // Import the Mongoose model

// Business logic for handling callback
const requestCallback = async (req, res) => {
    try {
        console.log("Request Data:", req.body); // Logs the parsed body

        // Create a new document using the Callback model
        const callbackData = new RequestCallback(req.body);

        // Save the document to the "togetback" collection
        await callbackData.save();

        // Respond with a success message
        res.status(201).json({
            message: "Callback data saved successfully!",
            data: callbackData,
        });
    } catch (error) {
        console.error("Error saving callback data:", error);

        // Respond with an error message
        res.status(500).json({
            message: "An error occurred while saving callback data.",
        });
    }
};

module.exports = {
    requestCallback,
};