const RequestCallback = require("../models/requestCallback");
const { sendEmail } = require("../services/emailService"); // Assuming sendEmail function is already implemented

// Helper function to save callback data and send an email
const saveCallbackAndSendEmail = async (callbackData) => {
    try {
        // Save the callback data in the database
        const savedCallback = await callbackData.save();

        // Prepare email details
        const { fullName, email, phone } = callbackData;
        const emailSubject = "New Callback Request Received";
        const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="color: #333; text-align: center;">📞 New Callback Request Received</h2>
          <p style="font-size: 16px; color: #555;">A new callback request has been made with the following details:</p>
        
          <ul style="list-style: none; padding: 0; font-size: 16px; color: #444;">
            <li><strong>Full Name:</strong> ${fullName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
          </ul>
        
          <p style="margin-top: 20px; font-size: 16px; color: #333;">
            ✅ The request has been <strong>saved successfully</strong> in the database.
          </p>
        </div>
        `;

        // Send the confirmation email
        await sendEmail(emailSubject, emailBody);

        // Return the saved callback data
        return savedCallback;
    } catch (error) {
        console.error("Error in saveCallbackAndSendEmail:", error);
        throw new Error("An error occurred while saving the callback request and sending the email.");
    }
};

// Main function to handle the request callback
const requestCallback = async (req, res) => {
    try {
        const { email, fullName, phone } = req.body;

        // Check if a document with the same email already exists
        const existingCallback = await RequestCallback.findOne({ email });

        if (existingCallback) {
            return res.status(500).json({
                message: "A callback request has already been made with this email.",
                data: existingCallback,
            });
        }

        // Create a new callback request
        const callbackData = new RequestCallback(req.body);

        // Save the callback request and send email
        const savedCallback = await saveCallbackAndSendEmail(callbackData);

        // Respond with success message
        res.status(200).json({
            message: "Callback request saved and email sent successfully!",
            data: savedCallback,
        });
    } catch (error) {
        console.error("Error handling callback request:", error);
        res.status(500).json({
            message: "An error occurred while processing the callback request.",
        });
    }
};

module.exports = {
    requestCallback,
};
