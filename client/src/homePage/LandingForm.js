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
  
    // Validate form
 // Extract country and validate phone number from form.phone
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
      const response = await fetch("/requestCallback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Read response body as text
        throw new Error(errorData.message || "Something went wrong");
      }
  
      const result = await response.json();
      console.log("Server response:", result);
  
      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "We'll get back to you soon",
        toast: true,
        position: "bottom-end",      // Bottom-right corner
        timer: 5000,                 // Display duration (5 seconds)
        timerProgressBar: true, 
        showConfirmButton: false,
      });
  
      // Reset the form
      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        phone: "",
        websiteLink: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
  
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "An error occurred. Please try again.",
        toast: true,                 // Enables toast-style notification
        position: "bottom-end",      // Bottom-right corner
        timer: 5000,                 // Display duration (5 seconds)
        timerProgressBar: true,      // ✅ Shows progress bar
        showConfirmButton: false,
      });
      
      
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="fullName"
          placeholder="Full Name *"
          required
          value={formData.fullName}
          onChange={handleInputChange}
        />

        <input
          type="email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="email"
          placeholder="Email *"
          required
          value={formData.email}
          onChange={handleInputChange}
        />

        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="url"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="websiteLink"
          placeholder="Your Website Link"
          value={formData.websiteLink}
          onChange={handleInputChange}
        />

        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="message"
          rows="4"
          placeholder="Message"
          value={formData.message}
          onChange={handleInputChange}
        ></textarea>

        <button 
          type="submit" 
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Request Callback
        </button>
      </form>
  );
}

export default LandingForm;
