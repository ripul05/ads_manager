import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Swal from "sweetalert2";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaGlobe,
  FaComments,
  FaBuilding,
  FaPhone,
  FaShieldAlt,
  FaRocket,
  FaSpinner,
  FaChartLine,
  FaNetworkWired,
  FaBolt,
  FaBullseye,
  FaCheckCircle,
  FaStar
} from "react-icons/fa";

// Custom styles for PhoneInput to match dark theme
const phoneInputStyles = `
  .PhoneInputCountrySelect {
    background-color: rgb(31 41 55 / 0.8) !important;
    border: 1px solid rgb(34 197 94 / 0.4) !important;
    color: rgb(229 231 235) !important;
    border-radius: 0.5rem !important;
    padding: 0.5rem 0.75rem !important;
    margin-right: 0.75rem !important;
    backdrop-filter: blur(8px) !important;
    font-size: 0.875rem !important;
    min-width: 4rem !important;
    transition: all 0.2s ease !important;
  }
  
  .PhoneInputCountrySelect:hover {
    background-color: rgb(31 41 55 / 0.9) !important;
    border-color: rgb(34 197 94 / 0.6) !important;
    transform: translateY(-1px) !important;
  }
  
  .PhoneInputCountrySelect:focus {
    outline: none !important;
    border-color: rgb(34 197 94) !important;
    box-shadow: 0 0 0 2px rgb(34 197 94 / 0.3) !important;
    background-color: rgb(31 41 55 / 0.9) !important;
  }
  
  .PhoneInputCountrySelectArrow {
    color: rgb(34 197 94) !important;
    border-top-color: rgb(34 197 94) !important;
    margin-left: 0.5rem !important;
  }
  
  .PhoneInputInput {
    background-color: rgb(31 41 55 / 0.6) !important;
    border: 1px solid rgb(34 197 94 / 0.3) !important;
    border-radius: 0.5rem !important;
    color: rgb(229 231 235) !important;
    outline: none !important;
    font-size: 1rem !important;
    padding: 0.75rem 1rem !important;
    margin: 0 !important;
    flex: 1 !important;
    backdrop-filter: blur(4px) !important;
    transition: all 0.2s ease !important;
  }
  
  .PhoneInputInput:focus {
    border-color: rgb(34 197 94) !important;
    box-shadow: 0 0 0 2px rgb(34 197 94 / 0.2) !important;
    background-color: rgb(31 41 55 / 0.8) !important;
  }
  
  .PhoneInputInput:hover {
    background-color: rgb(31 41 55 / 0.8) !important;
    border-color: rgb(34 197 94 / 0.5) !important;
  }
  
  .PhoneInputInput::placeholder {
    color: rgb(156 163 175) !important;
    opacity: 1 !important;
  }
  
  .PhoneInputCountryIcon {
    width: 1.5rem !important;
    height: 1.125rem !important;
    border-radius: 0.125rem !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
  }
  
  .PhoneInputCountryIcon--square {
    border-radius: 0.25rem !important;
  }
  
  /* Enhanced dropdown menu styling */
  .PhoneInputCountrySelect option {
    background-color: rgb(31 41 55) !important;
    color: rgb(229 231 235) !important;
    padding: 0.75rem 1rem !important;
    border-bottom: 1px solid rgb(55 65 81) !important;
  }
  
  .PhoneInputCountrySelect option:hover {
    background-color: rgb(55 65 81) !important;
    color: rgb(34 197 94) !important;
  }
  
  .PhoneInputCountrySelect option:selected {
    background-color: rgb(34 197 94) !important;
    color: rgb(15 23 42) !important;
    font-weight: 600 !important;
  }
  
  /* Container styling */
  .PhoneInput {
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    width: 100% !important;
  }
  
  /* Error state styling */
  .PhoneInput--error .PhoneInputCountrySelect {
    border-color: rgb(239 68 68) !important;
  }
  
  .PhoneInput--error .PhoneInputInput {
    border-color: rgb(239 68 68) !important;
  }
  
  /* Focus state improvements */
  .PhoneInput:focus-within .PhoneInputCountrySelect {
    border-color: rgb(34 197 94) !important;
    box-shadow: 0 0 0 1px rgb(34 197 94 / 0.3) !important;
  }
  
  .PhoneInput:focus-within .PhoneInputInput {
    border-color: rgb(34 197 94) !important;
    box-shadow: 0 0 0 1px rgb(34 197 94 / 0.3) !important;
  }
`;

const LandingForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    websiteLink: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    
    // Clear error when user starts typing
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName);
  };

  const validateField = (fieldName) => {
    const newErrors = { ...errors };
    
    switch (fieldName) {
      case 'fullName':
        if (!formData.fullName.trim()) {
          newErrors.fullName = "Full name is required";
        } else {
          newErrors.fullName = "";
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          newErrors.email = "";
        }
        break;
      case 'companyName':
        if (!formData.companyName.trim()) {
          newErrors.companyName = "Company name is required";
        } else {
          newErrors.companyName = "";
        }
        break;
      case 'phone':
        const phoneNumber = parsePhoneNumberFromString(formData.phone);
        if (!phoneNumber?.isValid()) {
          newErrors.phone = "Please enter a valid phone number";
        } else {
          newErrors.phone = "";
        }
        break;
      case 'websiteLink':
        if (!formData.websiteLink.trim()) {
          newErrors.websiteLink = "Website URL is required";
        } else if (!/^(http|https):\/\/[^ "]+$/.test(formData.websiteLink)) {
          newErrors.websiteLink = "Please enter a valid website URL";
        } else {
          newErrors.websiteLink = "";
        }
        break;
      case 'message':
        if (!formData.message.trim()) {
          newErrors.message = "Please describe your marketing goals";
        } else {
          newErrors.message = "";
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneNumber = parsePhoneNumberFromString(formData.phone);
    if (!phoneNumber?.isValid()) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.websiteLink.trim()) {
      newErrors.websiteLink = "Website URL is required";
    } else if (!/^(http|https):\/\/[^ "]+$/.test(formData.websiteLink)) {
      newErrors.websiteLink = "Please enter a valid website URL";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please describe your marketing goals";
    }

    return newErrors;
  };

  const isFormValid = () => {
    const validationErrors = validateForm();
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields and show errors
    const validationErrors = validateForm();
    setErrors(validationErrors);
    
    // Mark all fields as touched to show validation errors
    setTouched({
      fullName: true,
      email: true,
      companyName: true,
      phone: true,
      websiteLink: true,
      message: true
    });
    
    // Don't submit if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Only set loading state after validation passes
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}requestCallback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to submit request. Please try again."
        );
      }

      // Reset form only after successful submission
      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        phone: "",
        websiteLink: "",
        message: "",
      });
      
      // Reset validation states
      setErrors({});
      setTouched({});
      
      // Show success animation
      setShowSuccessAnimation(true);
      
      // Hide animation after 5 seconds
      setTimeout(() => {
        setShowSuccessAnimation(false);
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      }, 5000);

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "There was an error submitting your request. Please try again.",
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#0ea5e9",
        customClass: {
          popup: 'border border-cyan-400/30 backdrop-blur-lg'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Inject custom styles for PhoneInput */}
      <style dangerouslySetInnerHTML={{ __html: phoneInputStyles }} />
      
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            {/* Background with subtle overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            
            {/* Success Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative z-10 text-center px-8"
            >
              {/* Main Success Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 shadow-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="text-6xl mb-4"
                >
                  <FaCheckCircle className="text-green-400 mx-auto" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  Campaign Request Submitted!
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-300 mb-6"
                >
                  Your marketing consultation request is launching to our team
                </motion.p>
                
                {/* Animated Rocket */}
                <motion.div
                  initial={{ x: 0, y: 0, scale: 1 }}
                  animate={{ 
                    x: [0, 100, 300, 800],
                    y: [0, -50, -150, -400],
                    scale: [1, 1.2, 0.8, 0.3],
                    rotate: [0, 15, 30, 45]
                  }}
                  transition={{ 
                    duration: 4,
                    delay: 1,
                    ease: "easeInOut"
                  }}
                  className="text-4xl inline-block"
                >
                  <FaRocket className="text-cyan-400" />
                </motion.div>
                
                {/* Rocket Trail */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1.5, 2],
                    x: [0, 50, 150, 400]
                  }}
                  transition={{ 
                    duration: 3.5,
                    delay: 1.5,
                    ease: "easeOut"
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full opacity-60"></div>
                </motion.div>
                
                {/* Success Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2 text-sm text-gray-400"
                >
                  <div className="flex items-center justify-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <span>Our team will contact you within 24 hours</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <FaShieldAlt className="text-green-400" />
                    <span>Your information is secure and confidential</span>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: Math.random() * 400 - 200,
                    y: Math.random() * 400 - 200
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 0.5 + i * 0.1,
                    ease: "easeOut"
                  }}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Full Name Field */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 group-focus-within:text-blue-400 transition-colors">
            <FaUser />
          </div>
          <input
            type="text"
            className={`w-full !p-4 !pl-12 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 text-gray-200 placeholder-gray-400 transition-all backdrop-blur-sm hover:bg-gray-800/70 group-focus-within:bg-gray-800/70 ${
              errors.fullName && touched.fullName 
                ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-cyan-400/30 focus:border-cyan-400 focus:ring-cyan-400/20'
            }`}
            id="fullName"
            placeholder="Your Full Name *"
            value={formData.fullName}
            onChange={handleInputChange}
            onBlur={() => handleBlur('fullName')}
          />
          {errors.fullName && touched.fullName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1 ml-1"
            >
              {errors.fullName}
            </motion.p>
          )}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            whileHover={{ opacity: 1 }}
          />
        </motion.div>

        {/* Email Field */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 group-focus-within:text-blue-400 transition-colors">
            <FaEnvelope />
          </div>
          <input
            type="email"
            className={`w-full !p-4 !pl-12 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 text-gray-200 placeholder-gray-400 transition-all backdrop-blur-sm hover:bg-gray-800/70 ${
              errors.email && touched.email 
                ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-cyan-400/30 focus:border-cyan-400 focus:ring-cyan-400/20'
            }`}
            id="email"
            placeholder="Business Email Address *"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => handleBlur('email')}
          />
          {errors.email && touched.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1 ml-1"
            >
              {errors.email}
            </motion.p>
          )}
        </motion.div>

        {/* Company Name Field */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 group-focus-within:text-blue-400 transition-colors">
            <FaBuilding />
          </div>
          <input
            type="text"
            className={`w-full !p-4 !pl-12 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 text-gray-200 placeholder-gray-400 transition-all backdrop-blur-sm hover:bg-gray-800/70 ${
              errors.companyName && touched.companyName 
                ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-cyan-400/30 focus:border-cyan-400 focus:ring-cyan-400/20'
            }`}
            id="companyName"
            placeholder="Company Name *"
            value={formData.companyName}
            onChange={handleInputChange}
            onBlur={() => handleBlur('companyName')}
          />
          {errors.companyName && touched.companyName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1 ml-1"
            >
              {errors.companyName}
            </motion.p>
          )}
        </motion.div>

        {/* Phone Field */}
        <motion.div
          className={`relative group rounded-xl backdrop-blur-sm hover:bg-gray-800/70 transition-all ${
            errors.phone && touched.phone 
              ? 'bg-gray-800/50 border border-red-500/70' 
              : 'bg-gray-800/50 border border-cyan-400/30'
          }`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 group-focus-within:text-blue-400 transition-colors z-10">
            <FaPhone />
          </div>
          <div className="pl-12 pr-4 py-4">
            <PhoneInput
              international
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handlePhoneChange}
              onBlur={() => handleBlur('phone')}
              defaultCountry="US"
              className="phone-input-themed"
            />
          </div>
          {errors.phone && touched.phone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1 ml-1"
            >
              {errors.phone}
            </motion.p>
          )}
        </motion.div>

        {/* Website Field */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 group-focus-within:text-blue-400 transition-colors">
            <FaGlobe />
          </div>
          <input
            type="url"
            className={`w-full !p-4 !pl-12 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 text-gray-200 placeholder-gray-400 transition-all backdrop-blur-sm hover:bg-gray-800/70 ${
              errors.websiteLink && touched.websiteLink 
                ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-cyan-400/30 focus:border-cyan-400 focus:ring-cyan-400/20'
            }`}
            id="websiteLink"
            placeholder="Website URL *"
            pattern="https?://.*"
            value={formData.websiteLink}
            onChange={handleInputChange}
            onBlur={() => handleBlur('websiteLink')}
          />
          {errors.websiteLink && touched.websiteLink && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1 ml-1"
            >
              {errors.websiteLink}
            </motion.p>
          )}
        </motion.div>

        {/* Message Field */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="absolute left-4 top-5 text-cyan-400 group-focus-within:text-blue-400 transition-colors">
            <FaComments />
          </div>
          <textarea
            className={`w-full !p-4 !pl-12 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 text-gray-200 placeholder-gray-400 transition-all backdrop-blur-sm hover:bg-gray-800/70 resize-none ${
              errors.message && touched.message 
                ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-cyan-400/30 focus:border-cyan-400 focus:ring-cyan-400/20'
            }`}
            id="message"
            rows="5"
            placeholder="Tell us about your marketing goals, current challenges, and what you'd like to achieve... *"
            value={formData.message}
            onChange={handleInputChange}
            onBlur={() => handleBlur('message')}
          />
          {errors.message && touched.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1 ml-1"
            >
              {errors.message}
            </motion.p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className={`w-full font-semibold py-4 px-6 rounded-xl transition-all active:scale-[0.98] relative overflow-hidden group ${
            isFormValid() && !isSubmitting
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
          whileTap={{ scale: isFormValid() ? 0.98 : 1 }}
          whileHover={isFormValid() ? { 
            boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)",
            scale: 1.02
          } : {}}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          disabled={!isFormValid() || isSubmitting}
        >
          {/* Animated background for loading */}
          {isSubmitting && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
          
          {/* Button content */}
          <span className="relative z-10 flex items-center justify-center gap-3">
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin text-lg" />
                <span>Processing Campaign Request...</span>
              </>
            ) : (
              <>
                <FaRocket className="text-lg" />
                <span>Launch My Marketing Campaign</span>
              </>
            )}
          </span>
          
          {/* Hover effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </motion.button>

        {/* Security & Trust indicators */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-cyan-400" />
            <span>Secure & Confidential</span>
          </div>
          <div className="w-px h-4 bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <FaChartLine className="text-blue-400" />
            <span>24hr Response Time</span>
          </div>
        </motion.div>

        {/* Results Promise */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="inline-flex items-center gap-2 text-xs text-gray-400 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-400/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Free consultation • No commitment required • Results guaranteed</span>
          </div>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default LandingForm;