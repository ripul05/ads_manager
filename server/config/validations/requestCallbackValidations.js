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
const getInTouchSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  });

const websiteReport = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email format',
    }),

  phoneNumber: Joi.string()
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

  firstName: Joi.string()
    .min(2)
    .required()
    .messages({
      'string.empty': 'First name is required',
      'string.min': 'First name must be at least 2 characters',
    }),

  lastName: Joi.string()
    .min(2)
    .required()
    .messages({
      'string.empty': 'Last name is required',
      'string.min': 'Last name must be at least 2 characters',
    }),

  message: Joi.string()
    .min(5)
    .required()
    .messages({
      'string.empty': 'Message is required',
      'string.min': 'Message must be at least 5 characters long',
    }),

  websiteUrl: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .messages({
      'string.empty': 'Website URL is required',
      'string.uri': 'Website must be a valid URL starting with http:// or https://',
    }),
}).unknown(true); // ✅ allow additional fields like countryCode, monthlyBudget, etc.


const validatePhoneNumber = (phoneNumber) => {
    const phone = parsePhoneNumberFromString(phoneNumber); // Automatically infers the country
    return phone ? phone.isValid() : false; // Checks if the parsed phone number is valid
};

module.exports = { requestCallbackSchema, validatePhoneNumber, getInTouchSchema, websiteReport };
