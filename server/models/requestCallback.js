const mongoose = require("mongoose");

const requestCallbackSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        companyName: { type: String },
        phone: { type: String, required: true },
        websiteLink: { type: String },
        message: { type: String },
    },
    { timestamps: true }
);

// Specify the collection name "togetback"
const RequestCallback = mongoose.model("RequestCallback", requestCallbackSchema, "togetback");

module.exports = RequestCallback;
