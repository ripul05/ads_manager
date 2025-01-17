const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Create reusable transporter object using Gmail as the email service
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  // Use environment variables for better security
        pass: process.env.EMAIL_PASS,  // Use environment variables for better security
    },
});

const sendEmail = async (subject, body) => {
    try {
        // Log the email user (be cautious in production)
        console.log(`user :: ${process.env.EMAIL_USER}`);

        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender's email address
            to: process.env.EMAIL_TO,     // Receiver's email address
            subject: subject,             // Subject of the email
            text: body,                   // Email body
        };

        // Send the email using a Promise
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info);
        return info;  // Return the email info for further processing if needed
    } catch (err) {
        console.error("Error sending email:", err);
        throw new Error("Error sending email");  // Throw an error to propagate failure
    }
};

module.exports = {
    sendEmail,
};
