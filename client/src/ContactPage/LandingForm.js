import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Swal from "sweetalert2";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { motion } from "framer-motion";

// Reusable input style configuration
const inputStyle = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#34A853] focus:ring-2 focus:ring-[#34A853]/30 transition-all";

function LandingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    websiteLink: "",
    message: "",
  });

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

    if (formData.websiteLink && !/^(http|https):\/\/[^ "]+$/.test(formData.websiteLink)) {
      return "Please enter a valid website URL";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}requestCallback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(await response.text());

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
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        className={inputStyle}
        id="fullName"
        placeholder="Full Name *"
        value={formData.fullName}
        onChange={handleInputChange}
      />

      <input
        type="email"
        className={inputStyle}
        id="email"
        placeholder="Email *"
        value={formData.email}
        onChange={handleInputChange}
      />

      <input
        type="text"
        className={inputStyle}
        id="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleInputChange}
      />

      <div className={inputStyle.replace('p-3', 'p-0')}>
        <PhoneInput
          international
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={handlePhoneChange}
          defaultCountry="US"
          className="!border-none !bg-transparent"
        />
      </div>

      <input
        type="url"
        className={inputStyle}
        id="websiteLink"
        placeholder="Website URL"
        pattern="https?://.*"
        value={formData.websiteLink}
        onChange={handleInputChange}
      />

      <textarea
        className={inputStyle}
        id="message"
        rows="4"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleInputChange}
      />

      <motion.button 
        type="submit" 
        className="w-full bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all active:scale-95"
        whileTap={{ scale: 0.95 }}
      >
        Request Strategy Session
      </motion.button>
    </motion.form>
  );
}

export default LandingForm;