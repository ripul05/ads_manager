import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Swal from "sweetalert2";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiGlobe,
  FiMessageSquare,
  FiBriefcase,
} from "react-icons/fi";

// Enhanced input style configuration
const inputContainerStyle = "relative mb-6";
const inputStyle =
  "w-full !p-4 !pl-12 border border-gray-300 rounded-xl focus:outline-none focus:border-[#34A853] focus:ring-2 focus:ring-[#34A853]/30 transition-all text-gray-700";
const iconStyle =
  "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400";

function LandingForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    websiteLink: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return "Please enter your full name";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address";
    }

    const phoneNumber = parsePhoneNumberFromString(formData.phone);
    if (!phoneNumber?.isValid()) {
      return "Please enter a valid phone number";
    }

    if (!formData.companyName.trim()) {
      return "Please enter your company name";
    }

    if (!formData.websiteLink.trim()) {
      return "Please enter your website URL";
    }

    if (!/^(http|https):\/\/[^ "]+$/.test(formData.websiteLink)) {
      return "Please enter a valid website URL";
    }

    if (!formData.message.trim()) {
      return "Please enter your message";
    }

    return null;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationError = validateForm();
    if (validationError) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: validationError,
        toast: true,
        position: "bottom-end",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/requestCallback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong. Please try again."
        );
      }
      setFormData({ name: '', email: '', message: '' });
        
        // Call the success callback to trigger thank you message
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "We'll get back to you soon",
        toast: true,
        position: "bottom-end",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        phone: "",
        websiteLink: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "An error occurred. Please try again.",
        toast: true,
        position: "bottom-end",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Full Name Field */}
      <motion.div
        className={inputContainerStyle}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <FiUser className={iconStyle} />
        <input
          type="text"
          className={inputStyle}
          id="fullName"
          placeholder="Full Name *"
          value={formData.fullName}
          onChange={handleInputChange}
        />
      </motion.div>

      {/* Email Field */}
      <motion.div
        className={inputContainerStyle}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FiMail className={iconStyle} />
        <input
          type="email"
          className={inputStyle}
          id="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleInputChange}
        />
      </motion.div>

      {/* Company Name Field */}
      <motion.div
        className={inputContainerStyle}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <FiBriefcase className={iconStyle} />
        <input
          type="text"
          className={inputStyle}
          id="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleInputChange}
        />
      </motion.div>

      {/* Phone Field */}
      <motion.div
        className={`${inputContainerStyle} ${inputStyle.replace(
          "p-4 pl-12",
          "p-2 pl-10"
        )} border border-gray-300 rounded-lg shadow-sm`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
        <PhoneInput
          international
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={handlePhoneChange}
          defaultCountry="US"
          className="!border-none !bg-transparent pl-10 !w-full !p-2 !text-sm"
        />
      </motion.div>

      {/* Website Field */}
      <motion.div
        className={inputContainerStyle}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <FiGlobe className={iconStyle} />
        <input
          type="url"
          className={inputStyle}
          id="websiteLink"
          placeholder="Website URL *"
          pattern="https?://.*"
          value={formData.websiteLink}
          onChange={handleInputChange}
        />
      </motion.div>

      {/* Message Field */}
      <motion.div
        className={inputContainerStyle}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <FiMessageSquare className={`${iconStyle} mt-3`} />
        <textarea
          className={inputStyle}
          id="message"
          rows="5"
          placeholder="Your Message *"
          value={formData.message}
          onChange={handleInputChange}
        />
      </motion.div>

      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-all active:scale-[0.98] relative overflow-hidden"
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        disabled={isSubmitting}
      >
        {isSubmitting && (
          <motion.span
            className="absolute left-0 top-0 h-full bg-white/20"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
              Request Strategy Session
            </>
          )}
        </span>
      </motion.button>

      <motion.div
        className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-green-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        Your information is secure and will never be shared
      </motion.div>
    </motion.form>
  );
}

export default LandingForm;
