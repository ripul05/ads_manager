import React, { useState, useEffect } from "react";
import LandingForm from "./LandingForm";
import Navbar from "../Home/Navbar";
import {AuditScheduling} from "../AuditScheduler/AuditScheduling";


import {
  FaPhoneAlt as Phone,
  FaSearch as Search,
  FaBullseye as Target,
  FaChartLine as TrendingUp,
  FaCode as Code,
  FaTimes as X,
  FaArrowRight as ArrowRight,
  FaCheckCircle as CheckCircle,
  FaClock as Clock,
  FaGlobe as Globe,
  FaRocket,
  FaNetworkWired,
  FaCube,
  FaLock,
  FaShieldAlt,
  FaStar,
  FaGoogle,
  FaLightbulb,
  FaFacebook,
  FaAd,
  FaFileAlt,
  FaChartBar,
  FaTools,
  FaMobile
} from "react-icons/fa";

import {
  Zap,
  Shield,
  Cpu
} from 'lucide-react';


import { motion, AnimatePresence } from 'framer-motion';


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


export const QuickConsultationModal = ({
  showModal,
  setShowModal,
  formData,
  setFormData,      
  handleChange,
  pageType = 'contact',
  onSuccess // Add this prop
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    console.log('Success modal state:', showSuccess);
  }, [showSuccess]);

  if (!showModal && !showSuccess) return null;
  
  const pageConfig = {
    contact: {
      icon: <Phone className="w-5 h-5" />,
      title: "Quick Consultation",
      subtitle: "Let's discuss your marketing strategy",
      messagePlaceholder: "Tell us about your marketing goals and challenges...",
      buttonText: "Send Message",
      accentColor: "cyan",
      successTitle: "Message Sent Successfully!",
      successSubtitle: "We'll get back to you within 24 hours"
    },
    googleAds: {
      icon: <Search className="w-5 h-5" />,
      title: "Google Ads Consultation",
      subtitle: "Optimize your search advertising",
      messagePlaceholder: "Describe your Google Ads goals and current challenges...",
      buttonText: "Get Strategy",
      accentColor: "emerald",
      successTitle: "Google Ads Consultation Requested!",
      successSubtitle: "Our ads specialist will contact you shortly"
    },
    metaAds: {
      icon: <Target className="w-5 h-5" />,
      title: "Meta Ads Consultation",
      subtitle: "Enhance your social media presence",
      messagePlaceholder: "Share your Meta advertising objectives...",
      buttonText: "Get Strategy",
      accentColor: "violet",
      successTitle: "Meta Ads Consultation Requested!",
      successSubtitle: "Our social media expert will be in touch"
    },
    seo: {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "SEO Consultation",
      subtitle: "Improve your search visibility",
      messagePlaceholder: "Tell us about your website and SEO goals...",
      buttonText: "Get Audit",
      accentColor: "green",
      successTitle: "SEO Consultation Requested!",
      successSubtitle: "Our SEO team will analyze your needs and contact you"
    },
    webDevelopment: {
      icon: <Code className="w-5 h-5" />,
      title: "Development Consultation",
      subtitle: "Build websites that convert",
      messagePlaceholder: "Describe your website requirements...",
      buttonText: "Get Quote",
      accentColor: "purple",
      successTitle: "Development Quote Requested!",
      successSubtitle: "We'll review your requirements and send a proposal"
    }
  };

  const config = pageConfig[pageType] || pageConfig.contact;

  // Define color mappings for the accent colors
  const accentColorClasses = {
    cyan: {
      border: "border-cyan-400/30",
      text: "text-cyan-400",
      bg: "bg-cyan-500",
      gradient: "from-cyan-500 to-blue-600"
    },
    emerald: {
      border: "border-emerald-400/30",
      text: "text-emerald-400",
      bg: "bg-emerald-500",
      gradient: "from-emerald-500 to-green-600"
    },
    violet: {
      border: "border-violet-400/30",
      text: "text-violet-400",
      bg: "bg-violet-500",
      gradient: "from-violet-500 to-purple-600"
    },
    green: {
      border: "border-green-400/30",
      text: "text-green-400",
      bg: "bg-green-500",
      gradient: "from-green-500 to-emerald-600"
    },
    purple: {
      border: "border-purple-400/30",
      text: "text-purple-400",
      bg: "bg-purple-500",
      gradient: "from-purple-500 to-violet-600"
    }
  };

  const colors = accentColorClasses[config.accentColor] || accentColorClasses.cyan;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}requestCallback/getInTouch`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        setFormData({ name: '', email: '', message: '' });
        onSuccess(); //
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Box */}
            <motion.div
              className={`bg-gray-900/95 backdrop-blur-md border ${colors.border} rounded-2xl max-w-md w-full p-8 relative overflow-hidden shadow-2xl`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated background */}
              <div className="absolute inset-0 opacity-5">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, ${config.accentColor === 'cyan' ? 'rgba(0,255,255,0.5)' : 'rgba(34,197,94,0.5)'} 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                  }}
                  animate={{
                    backgroundPosition: ['0px 0px', '50px 50px'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Close Button */}
              <motion.button
                onClick={() => setShowModal(false)}
                className={`absolute top-6 right-6 text-gray-400 hover:${colors.text} transition-colors z-10 p-2 rounded-full hover:bg-${config.accentColor}-400/10`}
                type="button"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: `rgba(34, 211, 238, 0.15)`
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Header */}
              <div className="text-center mb-8 relative z-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <motion.div
                    className={`p-3 rounded-full bg-gradient-to-r ${colors.gradient} text-white shadow-lg`}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${config.accentColor === 'cyan' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                        `0 0 30px ${config.accentColor === 'cyan' ? 'rgba(0, 255, 255, 0.5)' : 'rgba(34, 197, 94, 0.5)'}`,
                        `0 0 20px ${config.accentColor === 'cyan' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {config.icon}
                  </motion.div>
                </div>

                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {config.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {config.subtitle}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${colors.text} mb-2`}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-800/50 border ${colors.border} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-${config.accentColor}-400 focus:ring-2 focus:ring-${config.accentColor}-400/20 transition-all duration-200`}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${colors.text} mb-2`}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-800/50 border ${colors.border} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-${config.accentColor}-400 focus:ring-2 focus:ring-${config.accentColor}-400/20 transition-all duration-200`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${colors.text} mb-2`}>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 bg-gray-800/50 border ${colors.border} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-${config.accentColor}-400 focus:ring-2 focus:ring-${config.accentColor}-400/20 transition-all duration-200 resize-none`}
                      placeholder={config.messagePlaceholder}
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-4 bg-gradient-to-r ${colors.gradient} text-white rounded-lg font-semibold relative overflow-hidden group transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        {config.buttonText}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </span>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  />
                </motion.button>
              </form>

              {/* Features */}
              <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
                {[
                  { icon: <CheckCircle className="w-4 h-4" />, text: "Free Consultation" },
                  { icon: <Clock className="w-4 h-4" />, text: "Quick Response" },
                  { icon: <Shield className="w-4 h-4" />, text: "Secure & Private" },
                  { icon: <Globe className="w-4 h-4" />, text: "Expert Team" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <span className={colors.text}>{feature.icon}</span>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const ConsultationSuccessModal = ({ 
  onClose, 
  pageType = 'contact',
  accentColor = 'cyan' 
}) => {
  // Define all page configurations internally
  const pageConfig = {
    contact: {
      title: "Message Sent Successfully!",
      subtitle: "We'll get back to you within 24 hours",
      icon: <CheckCircle className="text-green-400" />,
      features: [
        { icon: <Clock className="text-yellow-400" />, text: "24-hour response time" },
        { icon: <FaShieldAlt className="text-green-400" />, text: "Secure communication" }
      ],
      rocketColor: "text-cyan-400"
    },
    googleAds: {
      title: "Google Ads Consultation Booked!",
      subtitle: "Our PPC specialist will contact you shortly",
      icon: <FaGoogle className="text-blue-400" />,
      features: [
        { icon: <TrendingUp className="text-blue-400" />, text: "Free audit report" },
        { icon: <FaLightbulb className="text-yellow-400" />, text: "Custom strategy session" }
      ],
      rocketColor: "text-blue-400"
    },
    metaAds: {
      title: "Meta Ads Consultation Confirmed!",
      subtitle: "Our social media expert will reach out soon",
      icon: <FaFacebook className="text-blue-600" />,
      features: [
        { icon: <Target className="text-red-400" />, text: "Audience targeting analysis" },
        { icon: <FaAd className="text-purple-400" />, text: "Creative strategy review" }
      ],
      rocketColor: "text-purple-400"
    },
    seo: {
      title: "SEO Audit Requested!",
      subtitle: "Our experts will analyze your site within 48 hours",
      icon: <Search className="text-green-400" />,
      features: [
        { icon: <FaFileAlt className="text-blue-400" />, text: "Comprehensive SEO report" },
        { icon: <FaChartBar className="text-green-400" />, text: "Traffic analysis" },
        { icon: <FaTools className="text-yellow-400" />, text: "Custom optimization plan" }
      ],
      rocketColor: "text-green-400"
    },
    webDevelopment: {
      title: "Development Quote Requested!",
      subtitle: "We'll review your requirements and send a proposal",
      icon: <Code className="text-purple-400" />,
      features: [
        { icon: <FaMobile className="text-blue-400" />, text: "Responsive design review" },
        { icon: <FaRocket className="text-red-400" />, text: "Performance optimization" }
      ],
      rocketColor: "text-purple-400"
    },
    websiteReview: {
      title: "Website Review Report Requested!",
      subtitle: "A detailed website analysis will be mailed to you shortly",
      icon: <TrendingUp className="text-cyan-400" />,
      features: [
        { icon: <FaShieldAlt className="text-green-400" />, text: "Security & performance audit" },
        { icon: <FaFileAlt className="text-blue-400" />, text: "UX & conversion report" },
        { icon: <FaLightbulb className="text-yellow-400" />, text: "Improvement suggestions" }
      ],
      rocketColor: "text-cyan-400"
    }
  };

  // Get the config for the current page type
  const config = pageConfig[pageType] || pageConfig.contact;

  // Define color mappings for the accent colors
  const accentColorClasses = {
    cyan: {
      border: "border-cyan-400/30",
      text: "text-cyan-400",
      bg: "bg-cyan-500/10"
    },
    emerald: {
      border: "border-emerald-400/30",
      text: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    violet: {
      border: "border-violet-400/30",
      text: "text-violet-400",
      bg: "bg-violet-500/10"
    },
    green: {
      border: "border-green-400/30",
      text: "text-green-400",
      bg: "bg-green-500/10"
    },
    purple: {
      border: "border-purple-400/30",
      text: "text-purple-400",
      bg: "bg-purple-500/10"
    }
  };

  const colors = accentColorClasses[accentColor] || accentColorClasses.cyan;

  // State to control when to start closing
  const [startClosing, setStartClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartClosing(true);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle the actual closing after exit animation completes
  useEffect(() => {
    if (startClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 500); // Matches exit animation duration
      return () => clearTimeout(timer);
    }
  }, [startClosing, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        className="relative z-10 text-center px-8 w-full max-w-md"
      >
        <motion.div
          className={`bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border ${colors.border} rounded-2xl p-8 shadow-2xl`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className={`absolute top-4 right-4 text-gray-400 hover:${colors.text} transition-colors p-2 rounded-full hover:${colors.bg}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-6xl mb-4"
          >
            {config.icon}
          </motion.div>

          {/* Title & Subtitle */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-2xl font-bold ${colors.text} mb-2`}
          >
            {config.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 mb-6"
          >
            {config.subtitle}
          </motion.p>

          {/* Rocket Animation */}
          <motion.div
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{
              x: [0, 100, 300, 800],
              y: [0, -50, -150, -400],
              scale: [1, 1.2, 0.8, 0.3],
              rotate: [0, 15, 30, 45],
            }}
            transition={{
              duration: 4,
              delay: 1,
              ease: "easeInOut",
            }}
            className="text-4xl inline-block"
          >
            <FaRocket className={config.rocketColor} />
          </motion.div>

          {/* Rocket Trail */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1.5, 2],
              x: [0, 50, 150, 400],
            }}
            transition={{
              duration: 3.5,
              delay: 1.5,
              ease: "easeOut",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className={`w-20 h-1 bg-gradient-to-r ${colors.text.replace('text', 'from')} to-transparent rounded-full opacity-60`}></div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3 mt-8"
          >
            {config.features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center gap-2 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + (index * 0.1) }}
              >
                {feature.icon}
                <span className="text-gray-300">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
            }}
            transition={{
              duration: 2,
              delay: 0.5 + i * 0.1,
              ease: "easeOut",
            }}
            className={`absolute w-2 h-2 ${colors.text} rounded-full pointer-events-none`}
          />
        ))}
        <motion.div 
          className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 5, ease: "linear" }}
        >
          <div className={`h-full ${colors.text.replace('text', 'bg')}`} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
export const ContactPage=({ setActiveIndex })=> {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showScheduling, setShowScheduling] = useState(false);
  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
                        <TrendingUp className="text-blue-400 text-lg" />
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
                      <Phone className="text-base md:text-lg" />
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
                        <CheckCircle className="text-3xl md:text-4xl text-cyan-400" />
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
  <QuickConsultationModal
    showModal={showModal}
    setShowModal={setShowModal}
    formData={formData}
    setFormData={setFormData}
    handleChange={handleChange}
    pageType="contact"
    onSuccess={() => {
      setShowModal(false);
      setShowSuccessModal(true);
    }}
  />
)}

{showSuccessModal && (
  <ConsultationSuccessModal 
    onClose={() => setShowSuccessModal(false)}
    pageType="contact"
    accentColor="green"
  />
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
