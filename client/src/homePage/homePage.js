import React, { useState } from "react";
import "../index.css";
import LandingForm from "./LandingForm";
import CarouselBackground from "./Carousel";
import Navbar from "./Navbar";
import emailjs from "emailjs-com";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import AuditScheduling from "../AuditScheduler/AuditScheduling";

function HomePage() {
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
    <div id="HomeSection" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* <div className="absolute inset-0 -z-10 w-full h-full">
                <CarouselBackground />
                <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/20 to-[#34A853]/20" />
            </div> */}

      <Navbar />

<div className="container relative z-10 mx-auto px-4 h-full mt-[8em] sm:mt-[10.5em]">
  <div className="flex flex-col lg:flex-row items-center justify-between h-full pt-12 lg:pt-0 lg:gap-12 xl:gap-16">
    {/* Left Content */}
    <div className="w-full lg:w-[45%] xl:w-[40%] text-black mb-12 lg:mb-0">
      <div className="max-w-lg lg:pr-8 xl:pr-12">
        <div className="mb-6 flex items-center gap-4">
          <FaGoogle className="text-4xl text-[#4285F4]" />
          <span className="text-2xl font-bold bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
            Premier Partner
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl md:leading-[1.3] font-bold mb-4 bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
          Google Ads Excellence
        </h1>
        <h2 className="text-xl md:text-2xl mb-4 text-gray-700">
          Precision Campaigns for Maximum Conversions
        </h2>
        <p className="text-base md:text-lg mb-6 text-gray-600">
          As certified Google Premier Partners, we architect data-driven
          advertising solutions that convert browsers into buyers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all font-bold"
          >
            Get Expert Consultation
          </button>
          <motion.button
            onClick={handleOpenScheduling}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white px-8 py-3 rounded-full hover:shadow-xl transition-all font-bold"
          >
            Schedule Free Audit
          </motion.button>
        </div>
      </div>
    </div>

    {/* Right Form */}
    <div className="w-full lg:w-[50%] xl:w-[45%] bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg lg:ml-8">
      <LandingForm />
    </div>
  </div>
</div>

      {/* Modals */}
      {showScheduling && (
        <AuditScheduling
          occupiedSlots={occupiedSlots}
          onClose={() => setShowScheduling(false)}
        />
      )}

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-[#4285F4]"
            >
              &times;
            </button>
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
          </div>
        </div>
      )}

      {showThankYouModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Thank You!
            </h2>
            <p className="text-gray-700 mb-6">
              Your message has been sent successfully. <br />
              Our experts will reach out to you soon!
            </p>
            <button
              onClick={() => setShowThankYouModal(false)}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
