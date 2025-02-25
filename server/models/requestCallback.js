const mongoose = require("mongoose");

const requestCallbackSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },  // Ensures unique emails
        phone: { type: String, required: true },  // Phone can have duplicates
        companyName: { type: String },
        websiteLink: { type: String },
        message: { type: String },
    },
    { timestamps: true }
);

// Remove the pre-save hook (not needed for uniqueness)

const RequestCallback = mongoose.model("RequestCallback", requestCallbackSchema, "togetback");

module.exports = RequestCallback;

