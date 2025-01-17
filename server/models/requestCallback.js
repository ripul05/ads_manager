const mongoose = require("mongoose");

const requestCallbackSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },  // Email is unique, Mongoose will index it
        phone: { type: String, required: true },
        companyName: { type: String },
        websiteLink: { type: String },
        message: { type: String },
    },
    { timestamps: true }
);

// Pre-save hook to set email as _id (optional, if you want to avoid auto-generated ObjectId)
requestCallbackSchema.pre("save", function (next) {
    if (!this._id) {
        this._id = this.email;  // Set _id to email if it's not already set
    }
    next();
});

const RequestCallback = mongoose.model("RequestCallback", requestCallbackSchema, "togetback");

module.exports = RequestCallback;

