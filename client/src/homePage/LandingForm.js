import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Swal from "sweetalert2";
import { parsePhoneNumberFromString } from "libphonenumber-js";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneNumber = parsePhoneNumberFromString(formData.phone);

    if (!phoneNumber || !phoneNumber.isValid()) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter a valid phone number.",
        toast: true,
        position: "bottom-end",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/requestCallback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Something went wrong");
      
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A853] focus:border-[#34A853]"
          id="fullName"
          placeholder="Full Name *"
          required
          value={formData.fullName}
          onChange={handleInputChange}
        />

        <input
          type="email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A853] focus:border-[#34A853]"
          id="email"
          placeholder="Email *"
          required
          value={formData.email}
          onChange={handleInputChange}
        />

        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A853] focus:border-[#34A853]"
          id="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleInputChange}
        />

        <PhoneInput
          international
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handlePhoneChange}
          defaultCountry="IN"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A853] focus:border-[#34A853]"
          required
        />

        <input
          type="url"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A853] focus:border-[#34A853]"
          id="websiteLink"
          placeholder="Your Website Link"
          value={formData.websiteLink}
          onChange={handleInputChange}
        />

        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34A853] focus:border-[#34A853]"
          id="message"
          rows="4"
          placeholder="Message"
          value={formData.message}
          onChange={handleInputChange}
        ></textarea>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white font-bold py-3 px-6 rounded-lg transition-all hover:from-[#3b78db] hover:to-[#2d9746] hover:shadow-lg"
        >
          Request Strategy Session
        </button>
      </form>
  );
}

export default LandingForm;