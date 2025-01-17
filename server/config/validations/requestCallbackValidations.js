const Joi = require("joi");
const { parsePhoneNumberFromString } = require("libphonenumber-js");



const requestCallbackSchema = Joi.object({
    fullName: Joi.string().required().messages({
        "string.empty": "Full Name is required.",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required.",
        "string.email": "Invalid email format.",
    }),
    companyName: Joi.string().allow("").default("").messages({
        "string.empty": "Company Name cannot be empty.",
    }),
    phone: Joi.string()
        .required()
        .custom((value, helpers) => {
            const isValid = validatePhoneNumber(value);
            if (!isValid) {
                return helpers.error("any.invalid");
            }
            return value; // Return the valid phone number
        })
        .messages({
            "string.empty": "Phone number is required.",
            "any.invalid": "Invalid phone number format.",
        }),
    websiteLink: Joi.string().uri().allow("").default("").messages({
        "string.uri": "Website Link must be a valid URL.",
    }),
    message: Joi.string().allow("").default("").messages({
        "string.empty": "Message cannot be empty.",
    }),
});

const validatePhoneNumber = (phoneNumber) => {
    const phone = parsePhoneNumberFromString(phoneNumber); // Automatically infers the country
    return phone ? phone.isValid() : false; // Checks if the parsed phone number is valid
};

module.exports = { requestCallbackSchema, validatePhoneNumber };
