import React, { useState, useEffect } from "react";
import LandingForm from "./LandingForm";
import Navbar from "../Home/Navbar"
import {
  FaGoogle,
  FaRocket,
  FaChartLine,
  FaPhoneAlt,
  FaLock,
  FaCheckCircle,
  FaAtom,
  FaBolt,
  FaNetworkWired,
  FaCube,
  FaSearch,
  FaChartBar,
  FaDatabase,
  FaChess,
  FaLayerGroup,
  FaCrosshairs,
} from "react-icons/fa";
import { motion } from "framer-motion";
import AuditScheduling from "../AuditScheduler/AuditScheduling";

// Enhanced Futuristic Background matching home page
const FuturisticBackground = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      for (let i = 0; i < 20; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5,
        });
      }
      setNodes(newNodes);
    };

    generateNodes();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated grid lines */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating nodes with connections */}
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node, i) => (
          <g key={node.id}>
            {/* Connection lines */}
            {nodes.slice(i + 1).map((otherNode, j) => {
              const distance = Math.sqrt(
                Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
              );
              return distance < 30 ? (
                <motion.line
                  key={j}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${otherNode.x}%`}
                  y2={`${otherNode.y}%`}
                  stroke="rgba(0, 255, 255, 0.2)"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ) : null;
            })}
            
            {/* Nodes */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="rgba(0, 255, 255, 0.6)"
              animate={{
                r: [node.size, node.size * 1.5, node.size],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: node.duration,
                repeat: Infinity,
                delay: node.delay,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Scanning lines */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        style={{ width: '2px' }}
        animate={{
          x: ['-100vw', '100vw'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
        style={{ height: '2px' }}
        animate={{
          y: ['-100vh', '100vh'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

function ContactPage({ setActiveIndex }) {
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
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    useEffect(() => {
    setActiveIndex(3); // Contact

    return () => {
      setActiveIndex(0); // Reset to Home when leaving
    };
  }, [setActiveIndex]);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}requestCallback/getInTouch`, {
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

  const handleBackToForm = () => {
    setIsFormSubmitted(false);
  };

  const handleLandingFormSuccess = () => {
    setIsFormSubmitted(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Navbar isContactPage={true} />
      
      {/* Futuristic Background */}
      <FuturisticBackground />
      
      {/* Main Content with proper top padding for navbar */}
      <div className="relative z-10 min-h-screen pt-20 md:pt-24 lg:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Left Column - Main Content */}
            <div className="lg:col-span-7">
              <motion.div variants={itemVariants}>
                {/* Header with time */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-400 font-mono text-sm">
                    CONTACT PROTOCOL ACTIVE - {currentTime.toLocaleTimeString()}
                  </span>
                </div>
                
                {/* Brand */}
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    className="relative"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center overflow-hidden">
                      <img
                        src="/BuzzBandits.png"
                        alt="BuzzBandits Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    BUZZBANDITS
                  </h1>
                </div>

                {/* Main heading */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  ACTIVATE
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    MARKETING
                  </span>
                  <br />
                  PROTOCOL
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                  Deploy enterprise-grade digital marketing solutions. Our AI-powered campaigns deliver 
                  measurable ROI through advanced targeting, automated optimization, and real-time performance tracking.
                </p>

                {/* Marketing Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-xl p-4 backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: "rgba(6, 182, 212, 0.4)",
                      boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)"
                    }}
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-lg">
                        <FaRocket className="text-cyan-400 text-lg" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Campaign Acceleration</h3>
                        <p className="text-sm text-gray-400">Launch in 24 hours with AI optimization</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-4 backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: "rgba(59, 130, 246, 0.4)",
                      boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                    }}
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg">
                        <FaChartLine className="text-blue-400 text-lg" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Performance Analytics</h3>
                        <p className="text-sm text-gray-400">Real-time ROI tracking & reporting</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
                  {[
                    { value: "847%", label: "Average ROAS", color: "text-cyan-400" },
                    { value: "24/7", label: "Campaign Monitoring", color: "text-blue-400" },
                    { value: "45M+", label: "Monthly Impressions", color: "text-purple-400" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="text-center"
                      variants={itemVariants}
                    >
                      <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={() => setShowModal(true)}
                    className="relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <FaPhoneAlt className="text-base md:text-lg" />
                      <span className="text-sm md:text-base">REQUEST CONSULTATION</span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleOpenScheduling}
                    className="px-6 md:px-8 py-3 md:py-4 border border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FaNetworkWired className="text-base md:text-lg" />
                      <span className="text-sm md:text-base">SCHEDULE AUDIT</span>
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Form or Performance Monitor */}
            <div className="lg:col-span-5">
              <motion.div variants={itemVariants}>
                {!isFormSubmitted ? (
                  <>
                    
                    {/* Form Container */}
                    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-cyan-400/20 p-4 md:p-6 rounded-xl">
                      <motion.div 
                        className="mb-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <motion.div
                          className="inline-flex items-center gap-3 mb-3"
                          whileHover={{ scale: 1.05 }}
                        >
                          <FaCube className="text-xl md:text-2xl text-cyan-400" />
                          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                            MARKETING INTERFACE
                          </h3>
                        </motion.div>
                        <p className="text-gray-300 text-sm">
                          Initiate your digital marketing transformation
                        </p>
                      </motion.div>

                      <LandingForm onSubmitSuccess={handleLandingFormSuccess} />

                      <motion.div 
                        className="mt-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        <motion.div 
                          className="inline-flex items-center gap-2 text-gray-400 text-xs bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 px-3 py-2 rounded-full backdrop-blur-sm"
                          whileHover={{ 
                            scale: 1.02,
                            borderColor: "rgba(6, 182, 212, 0.4)"
                          }}
                        >
                          <FaLock className="text-cyan-400" />
                          <span>Secure enterprise-grade encryption</span>
                        </motion.div>
                      </motion.div>
                    </div>
                  </>
                ) : (
                  // Thank You Message
                  <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-cyan-400/20 p-6 md:p-8 rounded-xl">
                    <motion.div
                      className="text-center h-full flex flex-col justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div 
                        className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        whileHover={{ scale: 1.1 }}
                        style={{
                          boxShadow: "0 0 40px rgba(6, 182, 212, 0.3)"
                        }}
                      >
                        <FaCheckCircle className="text-3xl md:text-4xl text-cyan-400" />
                      </motion.div>
                      
                      <motion.h3 
                        className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        PROTOCOL ACTIVATED!
                      </motion.h3>
                      
                      <motion.p 
                        className="text-gray-300 mb-6 text-base md:text-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Marketing automation sequence initiated. Our digital strategists will contact you within 24 hours to deploy your campaigns.
                      </motion.p>
                      
                      <motion.div
                        className="space-y-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.div 
                          className="flex items-center justify-center gap-2 text-gray-300 text-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 px-4 py-3 rounded-full backdrop-blur-sm"
                          whileHover={{ 
                            scale: 1.02,
                            borderColor: "rgba(6, 182, 212, 0.4)"
                          }}
                        >
                          <FaRocket className="text-cyan-400" />
                          <span>Campaign deployment sequence active</span>
                        </motion.div>
                        
                        <motion.button
                          onClick={handleBackToForm}
                          className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)"
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          INITIALIZE NEW PROTOCOL
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal for quick consultation */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-md border border-cyan-400/30 rounded-xl max-w-md w-full p-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 0 50px rgba(6, 182, 212, 0.2)"
            }}
          >
            <motion.button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            <div className="text-center mb-6">
              <motion.div
                className="inline-flex items-center gap-3 mb-3"
                whileHover={{ scale: 1.05 }}
              >
                <FaPhoneAlt className="text-2xl text-cyan-400" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  QUICK CONSULTATION
                </h3>
              </motion.div>
              <p className="text-gray-300 text-sm">
                Get instant marketing strategy recommendations
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-sm"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-sm resize-none"
                  placeholder="Tell us about your marketing goals..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Scheduling Modal */}
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