import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Home/Navbar';
import Footer from '../Home/footer';
import { QuickConsultationModal, ConsultationSuccessModal } from '../ContactPage/ContactPage';
import { 
  FaGoogle, 
  FaRocket, 
  FaChartLine, 
  FaSearch, 
  FaBullseye,
  FaEye,
  FaMousePointer,
  FaArrowDown,
  FaPlay,
  FaCheckCircle,
  FaStar,
  FaShieldAlt,
  FaCog,
  FaLightbulb,
  FaUsers,
  FaGlobe,
  FaMobile,
  FaDesktop,
  FaTablet
} from 'react-icons/fa';

const FuturisticBackground = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      const nodeCount = window.innerWidth < 768 ? 8 : 15;
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1.5,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5,
        });
      }
      setNodes(newNodes);
    };

    generateNodes();
    window.addEventListener("resize", generateNodes);
    return () => window.removeEventListener("resize", generateNodes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-10 md:opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: window.innerWidth < 768 ? "50px 50px" : "100px 100px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node, i) => (
          <g key={node.id}>
            {window.innerWidth >= 768 &&
              nodes.slice(i + 1).map((otherNode, j) => {
                const distance = Math.sqrt(
                  Math.pow(node.x - otherNode.x, 2) +
                    Math.pow(node.y - otherNode.y, 2)
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
    </div>
  );
};

const GoogleAdsPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const detailsRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setShowModal(false);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Multiple scroll-to-top methods to ensure it works
    const scrollToTop = () => {
      // Method 1: Direct scroll
      window.scrollTo(0, 0);
      
      // Method 2: Smooth scroll
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      
      // Method 3: Document body scroll
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    // Execute immediately
    scrollToTop();
    
    // Also execute after a short delay to handle any async rendering
    const timeoutId = setTimeout(scrollToTop, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const handleGetStarted = () => {
    setShowModal(true);
  };

  const handleLearnMore = () => {
    detailsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const features = [
    {
      icon: <FaBullseye />,
      title: "Precision Targeting",
      description: "AI-powered audience targeting that reaches your ideal customers at the perfect moment."
    },
    {
      icon: <FaChartLine />,
      title: "Smart Bidding",
      description: "Automated bidding strategies that maximize your ROI using machine learning algorithms."
    },
    {
      icon: <FaEye />,
      title: "Ad Visibility",
      description: "Dominate search results with strategic ad placement and compelling copy."
    },
    {
      icon: <FaShieldAlt />,
      title: "Click Protection",
      description: "Advanced fraud detection to protect your budget from invalid clicks."
    }
  ];

  const services = [
    {
      title: "Search Campaigns",
      icon: <FaSearch />,
      description: "Capture high-intent customers actively searching for your products or services.",
      features: ["Keyword Research", "Ad Copy Optimization", "Landing Page Alignment", "Bid Management"]
    },
    {
      title: "Display Campaigns",
      icon: <FaGlobe />,
      description: "Build brand awareness across Google's vast network of partner websites.",
      features: ["Visual Ad Creation", "Audience Targeting", "Remarketing", "Placement Optimization"]
    },
    {
      title: "Shopping Campaigns",
      icon: <FaCog />,
      description: "Showcase your products directly in Google search results with rich visuals.",
      features: ["Product Feed Setup", "Merchant Center Optimization", "Price Comparison", "Inventory Management"]
    },
    {
      title: "Video Campaigns",
      icon: <FaPlay />,
      description: "Engage audiences with compelling video content on YouTube and partner sites.",
      features: ["Video Ad Creation", "Audience Insights", "View Optimization", "Brand Awareness"]
    }
  ];

  const stats = [
    { number: "300%", label: "Average ROI Increase" },
    { number: "85%", label: "Click-Through Rate Improvement" },
    { number: "50%", label: "Cost Per Click Reduction" },
    { number: "24/7", label: "Campaign Monitoring" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FuturisticBackground />
      <Navbar isContactPage={true} />
    <QuickConsultationModal
      showModal={showModal}
      setShowModal={setShowModal}
      formData={formData}
      setFormData={setFormData}
      handleChange={handleChange}
      pageType="googleAds"
      onSuccess={() => {
        setShowModal(false);
        setShowSuccessModal(true);
      }}
    />

    {/* Success Modal */}
    <AnimatePresence>
      {showSuccessModal && (
        <ConsultationSuccessModal 
          onClose={() => setShowSuccessModal(false)}
          pageType="googleAds"
        />
      )}
    </AnimatePresence>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Status Header */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-400 font-mono text-sm">
                  GOOGLE ADS PROTOCOL ACTIVE - {currentTime.toLocaleTimeString()}
                </span>
              </div>
            </motion.div>

            {/* Brand Header */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-center gap-4 mb-8">
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src="/BuzzBandits.png"
                      alt="BuzzBandits Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  BUZZBANDITS
                </h1>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-center gap-6 mb-8">
                <motion.div
                  className="text-6xl text-white"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaGoogle />
                </motion.div>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                  GOOGLE
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    ADS
                  </span>
                </h2>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              Dominate search results with AI-powered Google Ads campaigns that deliver
              <span className="text-cyan-400 font-semibold"> maximum ROI</span> and 
              <span className="text-cyan-400 font-semibold"> precision targeting</span>
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={handleGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <FaRocket />
                  GET STARTED
                </span>
              </motion.button>

              <motion.button
                onClick={handleLearnMore}
                className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  LEARN MORE
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaArrowDown />
                  </motion.div>
                </span>
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Detailed Information Section */}
      <div ref={detailsRef} className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Features Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Choose Our 
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}Google Ads
                </span>
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Advanced strategies and cutting-edge technology to maximize your advertising investment
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start gap-6">
                    <motion.div
                      className="text-4xl text-cyan-400 flex-shrink-0"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-3">
                        {feature.title}
                      </h4>
                      <p className="text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Google Ads
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}Services
                </span>
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Comprehensive campaign management across all Google Ads platforms
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start gap-6 mb-6">
                    <motion.div
                      className="text-4xl text-cyan-400 flex-shrink-0"
                      animate={{ 
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {service.icon}
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-3">
                        {service.title}
                      </h4>
                      <p className="text-gray-300 mb-4">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-3 text-sm text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <FaCheckCircle className="text-cyan-400 text-xs" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Process Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}Process
                </span>
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                A systematic approach to Google Ads success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Strategy & Research",
                  description: "In-depth analysis of your business, competitors, and target audience to create a winning strategy.",
                  icon: <FaLightbulb />
                },
                {
                  step: "02",
                  title: "Campaign Setup",
                  description: "Expert campaign configuration, keyword research, ad creation, and landing page optimization.",
                  icon: <FaCog />
                },
                {
                  step: "03",
                  title: "Optimize & Scale",
                  description: "Continuous monitoring, A/B testing, and optimization to maximize performance and ROI.",
                  icon: <FaChartLine />
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <motion.div
                    className="text-6xl text-cyan-400 mb-6"
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    {process.icon}
                  </motion.div>
                  <div className="text-sm text-cyan-400 font-mono mb-4">
                    STEP {process.step}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4">
                    {process.title}
                  </h4>
                  <p className="text-gray-300">
                    {process.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>


        </div>
      </div>

      {/* Scanning line effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <Footer/>
    </div>
  );
};

export default GoogleAdsPage;