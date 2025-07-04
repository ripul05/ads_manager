import React, { useState } from "react";
import LandingForm from "./LandingForm";
import Navbar from "../Home/Navbar"
import {
  FaGoogle,
  FaRocket,
  FaChartLine,
  FaPhoneAlt,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import AuditScheduling from "../AuditScheduler/AuditScheduling";

function ContactPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showScheduling, setShowScheduling] = useState(false);
  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleOpenScheduling = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/auditScheduling/occupiedTimeslots`
      );
      const data = await response.json();
      setOccupiedSlots(data.occupiedSlots);
      setShowScheduling(true);
    } catch (error) {
      console.error("Failed to fetch occupied slots:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };
  
    try {
      const response = await fetch("http://localhost:3001/requestCallback/getInTouch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setIsFormSubmitted(true);
        setShowModal(false);
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (err) {
      alert("Failed to send message. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Reset form state to show form again
  const handleBackToForm = () => {
    setIsFormSubmitted(false);
  };

  // Callback for when LandingForm is successfully submitted
  const handleLandingFormSuccess = () => {
    setIsFormSubmitted(true);
  };

  return (
    <div
      id="ContactSection"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50"
    > 
      <Navbar isContactPage={true} />
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-20 left-20 w-48 h-48 bg-[#34A853]/10 rounded-full blur-xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container relative z-10 mx-auto px-4 py-12 sm:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 grid items-start">
          {/* Left Content */}
          <motion.div
            className="w-full text-black lg:flex lg:items-center lg:min-h-[600px]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-lg w-full">
              <motion.div
                className="mb-6 flex items-center gap-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FaGoogle className="text-4xl text-[#4285F4] drop-shadow-lg" />
                <span className="text-2xl font-bold bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
                  Premier Partner
                </span>
              </motion.div>

              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-5xl md:leading-[1.3] font-bold mb-4 bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent"
              >
                One Step Away From Growth
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-2xl mb-6 text-gray-700 font-medium"
              >
                Let's craft your <span className="text-[#4285F4]">success story</span> together
              </motion.h2>

              <motion.div
                className="space-y-6 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="p-3 bg-[#34A853]/10 rounded-lg">
                    <FaRocket className="text-2xl text-[#34A853]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">24h Response Time</h3>
                    <p className="text-sm text-gray-600">Get expert feedback fast</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <div className="p-3 bg-[#4285F4]/10 rounded-lg">
                    <FaChartLine className="text-2xl text-[#4285F4]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Free Strategy Session</h3>
                    <p className="text-sm text-gray-600">$2000 value consultation</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.button
                  onClick={() => setShowModal(true)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white px-6 py-4 rounded-full hover:shadow-lg transition-all font-semibold text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <FaPhoneAlt className="text-lg" />
                  Get Expert Consultation
                </motion.button>

                <motion.button
                  onClick={handleOpenScheduling}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-white text-[#4285F4] border border-[#4285F4] px-6 py-4 rounded-full hover:shadow-lg transition-all font-semibold text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <FaChartLine className="text-lg" />
                  Schedule Free Audit
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Form or Thank You */}
          <motion.div
            className="w-full bg-white p-8 sm:p-10 rounded-2xl shadow-xl mt-8 lg:mt-0 min-h-[600px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {!isFormSubmitted ? (
              // Original Form
              <>
                <motion.div 
                  className="mb-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent mb-3">
                    Contact Us
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </motion.div>

                <LandingForm onSubmitSuccess={handleLandingFormSuccess} />

                <motion.div 
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="inline-flex items-center gap-2 text-gray-600 text-sm bg-gray-100 px-4 py-2 rounded-full">
                    <FaLock className="text-[#34A853]" />
                    <span>Your data is 100% secure and encrypted</span>
                  </div>
                </motion.div>
              </>
            ) : (
              // Thank You Message
              <motion.div
                className="text-center h-full flex flex-col justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <FaCheckCircle className="text-4xl text-green-500" />
                </motion.div>
                
                <motion.h2 
                  className="text-3xl font-bold bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Thank You!
                </motion.h2>
                
                <motion.p 
                  className="text-gray-700 mb-6 text-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Your message has been sent successfully. Our experts will reach out to you within 24 hours!
                </motion.p>
                
                <motion.div
                  className="space-y-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-center gap-2 text-gray-600 text-sm bg-green-50 px-4 py-3 rounded-full">
                    <FaRocket className="text-[#34A853]" />
                    <span>We'll get back to you soon!</span>
                  </div>
                  
                  <motion.button
                    onClick={handleBackToForm}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white rounded-xl hover:shadow-md transition-all font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modal for quick consultation */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl max-w-md w-full p-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-[#4285F4]"
              whileHover={{ rotate: 90, scale: 1.1 }}
            >
              &times;
            </motion.button>
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
                Quick Message
              </h2>
              <div className="space-y-4">
                <motion.div 
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-2 focus:ring-[#4285F4]/20"
                  />
                </motion.div>
                <motion.div 
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-2 focus:ring-[#4285F4]/20"
                  />
                </motion.div>
                <motion.div 
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <textarea
                    name="message"
                    placeholder="Your message *"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-2 focus:ring-[#4285F4]/20 resize-y"
                    required
                  />
                </motion.div>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white py-3 rounded-lg hover:shadow-md transition-all font-semibold flex items-center justify-center gap-2"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Thank You Modal (kept for modal submissions) */}
      {showThankYouModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl text-center max-w-sm"
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
          >
            <motion.div 
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Thank You!
            </h2>
            <p className="text-gray-700 mb-6">
              Your message has been sent successfully. Our experts will reach out to you within 24 hours!
            </p>
            <motion.button
              onClick={() => setShowThankYouModal(false)}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white rounded-xl hover:shadow-md transition-all font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Audit Scheduling Modal */}
      {showScheduling && (
        <AuditScheduling
          occupiedSlots={occupiedSlots}
          onClose={() => setShowScheduling(false)}
        />
      )}
    </div>
  );
}

export default ContactPage;