import React, { useState } from "react";
import "../index.css";
import LandingForm from "./LandingForm";
import emailjs from "emailjs-com";
import { FaGoogle, FaRocket, 
  FaChartLine, 
  FaPhoneAlt, 
  FaLock  } from "react-icons/fa";
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

  const handleOpenScheduling = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}auditScheduling/occupiedTimeslots`
      );
      const data = await response.json();
      setOccupiedSlots(data.occupiedSlots);
      setShowScheduling(true);
    } catch (error) {
      console.error("Failed to fetch occupied slots:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "default_service",
        "template_sjqh0pr",
        templateParams,
        "4DFcmHNC_yAE52JpN"
      )
      .then(
        (result) => {
          setFormData({ name: "", email: "", message: "" });
          setShowThankYouModal(true);
          setShowModal(false);
        },
        (error) => {
          alert("Failed to send message. Please try again.");
        }
      );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

return (
  <div
    id="ContactSection"
    className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50"
  >
    {/* Animated Background Elements */}
    <motion.div 
      className="absolute top-20 left-20 w-48 h-48 bg-[#34A853]/10 rounded-full blur-xl"
      animate={{ y: [0, 20, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
    />
    <motion.div 
      className="absolute bottom-40 right-32 w-32 h-32 bg-[#4285F4]/10 rounded-full blur-xl"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
    />

    <div className="container relative z-10 mx-auto px-4 py-12 sm:py-24">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 xl:gap-16">
        {/* Left Content */}
        <motion.div 
          className="w-full lg:w-[45%] text-black"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-lg lg:pr-8">
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

        {/* Right Form */}
        <motion.div 
          className="w-full lg:w-[50%] bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl lg:ml-8 mt-8 lg:mt-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent mb-2">
              Contact Us
            </h2>
            <p className="text-gray-600">Let's start your digital transformation</p>
          </div>
          
          <LandingForm />
          
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-gray-600 text-sm">
              <FaLock className="text-[#34A853]" />
              <span>Your data is 100% secure</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Modals - Keep existing modal code but add animations */}
    {showModal && (
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-white rounded-xl max-w-md w-full p-6 relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animated close button */}
          <motion.button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-[#4285F4]"
            whileHover={{ rotate: 90 }}
          >
            &times;
          </motion.button>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
              Get in touch
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-2 focus:ring-[#4285F4]/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-2 focus:ring-[#4285F4]/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-2 focus:ring-[#4285F4]/20 resize-y"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white py-3 rounded-lg hover:shadow-md transition-all font-semibold"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </motion.div>
    )}

    {/* Thank You Modal */}
    {showThankYouModal && (
      <motion.div 
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm"
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Thank You!
          </h2>
          <p className="text-gray-700 mb-6">
            Your message has been sent successfully. <br />
            Our experts will reach out to you soon!
          </p>
          <motion.button
            onClick={() => setShowThankYouModal(false)}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors font-medium"
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
