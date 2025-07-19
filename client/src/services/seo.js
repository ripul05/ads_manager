import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Home/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  QuickConsultationModal,
  ConsultationSuccessModal,
} from "../ContactPage/ContactPage";
import Footer from "../Home/footer";

import {
  FaSearch,
  FaChartLine,
  FaRocket,
  FaCrown,
  FaEye,
  FaLink,
  FaArrowDown,
  FaCheckCircle,
  FaCog,
  FaLightbulb,
  FaUsers,
  FaGlobe,
  FaCode,
  FaFileAlt,
  FaSearchPlus,
  FaTrophy,
  FaAnchor,
} from "react-icons/fa";

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
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize:
              window.innerWidth < 768 ? "50px 50px" : "100px 100px",
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
                    stroke="rgba(34, 197, 94, 0.3)"
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
              fill="rgba(34, 197, 94, 0.6)"
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

const SEOPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentRank, setCurrentRank] = useState(1);
  const detailsRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const rankTimer = setInterval(() => {
      setCurrentRank((prev) => (prev >= 10 ? 1 : prev + 1));
    }, 2000);
    return () => clearInterval(rankTimer);
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
        behavior: "instant",
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
      behavior: "smooth",
      block: "start",
    });
  };

  const features = [
    {
      icon: <FaSearchPlus />,
      title: "Advanced Keyword Research",
      description:
        "AI-powered keyword analysis to discover high-value search terms your competitors miss.",
    },
    {
      icon: <FaChartLine />,
      title: "Technical SEO Excellence",
      description:
        "Comprehensive site optimization for speed, mobile-friendliness, and search engine crawling.",
    },
    {
      icon: <FaLink />,
      title: "Authority Link Building",
      description:
        "Strategic backlink campaigns from high-authority domains to boost your search rankings.",
    },
    {
      icon: <FaFileAlt />,
      title: "Content Optimization",
      description:
        "Data-driven content strategies that rank higher and convert better.",
    },
  ];

  const services = [
    {
      title: "On-Page SEO",
      icon: <FaCode />,
      description:
        "Optimize your website's structure, content, and technical elements for search engines.",
      features: [
        "Title Tag Optimization",
        "Meta Descriptions",
        "Header Structure",
        "Internal Linking",
      ],
    },
    {
      title: "Technical SEO",
      icon: <FaCog />,
      description:
        "Fix technical issues that prevent search engines from properly indexing your site.",
      features: [
        "Site Speed Optimization",
        "Mobile Responsiveness",
        "XML Sitemaps",
        "Schema Markup",
      ],
    },
    {
      title: "Link Building",
      icon: <FaLink />,
      description:
        "Build high-quality backlinks from authoritative websites to increase your domain authority.",
      features: [
        "Guest Posting",
        "Resource Page Links",
        "Broken Link Building",
        "Digital PR",
      ],
    },
    {
      title: "Local SEO",
      icon: <FaGlobe />,
      description:
        "Dominate local search results and attract customers in your geographic area.",
      features: [
        "Google My Business",
        "Local Citations",
        "Review Management",
        "Local Keywords",
      ],
    },
  ];

  const stats = [
    { number: "300%", label: "Average Traffic Increase" },
    { number: "85%", label: "Keywords in Top 10" },
    { number: "150%", label: "Conversion Rate Boost" },
    { number: "24/7", label: "Ranking Monitoring" },
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
<Navbar 
        isContactPage={true} 
        activeIndex={activeIndex} 
        setActiveIndex={setActiveIndex} 
      />
      <QuickConsultationModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        pageType="seo"
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
            pageType="seo"
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
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-mono text-sm">
                  SEO OPTIMIZATION ACTIVE -{" "}
                  {currentTime.toLocaleTimeString()}
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
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  BUZZBANDITS
                </h1>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-center gap-6 mb-8">
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-6xl text-white relative">
                    <FaSearch />
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-xs font-bold text-black"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      #{currentRank}
                    </motion.div>
                  </div>
                </motion.div>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                  SEARCH
                  <br />
                  <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    ENGINE
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    OPTIMIZATION
                  </span>
                </h2>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              Dominate search results with data-driven SEO strategies that
              deliver
              <span className="text-green-400 font-semibold">
                {" "}
                #1 rankings
              </span>{" "}
              and
              <span className="text-emerald-400 font-semibold">
                {" "}
                organic traffic growth
              </span>
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={handleGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold text-white overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400"
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
                  <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
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
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {" "}
                  SEO Services
                </span>
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Advanced SEO strategies that deliver sustainable organic growth
                and long-term success
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
                      className="text-4xl text-green-400 flex-shrink-0"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-3">
                        {feature.title}
                      </h4>
                      <p className="text-gray-300">{feature.description}</p>
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
                Our SEO
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {" "}
                  Services
                </span>
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Comprehensive SEO solutions covering all aspects of search
                engine optimization
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
                      className="text-4xl text-green-400 flex-shrink-0"
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
                        <FaCheckCircle className="text-green-400 text-xs" />
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
                Our SEO
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {" "}
                  Process
                </span>
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                A systematic approach to achieving and maintaining top search
                rankings
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "SEO Audit & Analysis",
                  description:
                    "Comprehensive analysis of your website's current SEO performance, technical issues, and opportunities.",
                  icon: <FaSearchPlus />,
                },
                {
                  step: "02",
                  title: "Strategy Development",
                  description:
                    "Custom SEO strategy based on your industry, competitors, and target keywords for maximum impact.",
                  icon: <FaLightbulb />,
                },
                {
                  step: "03",
                  title: "Implementation & Optimization",
                  description:
                    "Execute SEO improvements, monitor rankings, and continuously optimize for better performance.",
                  icon: <FaChartLine />,
                },
              ].map((process, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <motion.div
                    className="text-6xl text-green-400 mb-6"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  >
                    {process.icon}
                  </motion.div>
                  <div className="text-sm text-green-400 font-mono mb-4">
                    STEP {process.step}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4">
                    {process.title}
                  </h4>
                  <p className="text-gray-300">{process.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SEO Benefits Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                SEO
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {" "}
                  Benefits
                </span>
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Why SEO is essential for your business's long-term digital
                success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Increased Visibility",
                  description:
                    "Higher search rankings mean more visibility for your brand and business",
                  icon: <FaEye />,
                  color: "text-green-400",
                },
                {
                  title: "Organic Traffic Growth",
                  description:
                    "Sustainable traffic growth without ongoing advertising costs",
                  icon: <FaChartLine />,
                  color: "text-emerald-400",
                },
                {
                  title: "Better User Experience",
                  description:
                    "SEO improvements enhance overall website usability and performance",
                  icon: <FaUsers />,
                  color: "text-teal-400",
                },
                {
                  title: "Higher Conversion Rates",
                  description:
                    "Targeted organic traffic typically converts better than paid traffic",
                  icon: <FaTrophy />,
                  color: "text-green-400",
                },
                {
                  title: "Long-term Results",
                  description:
                    "SEO provides lasting benefits that compound over time",
                  icon: <FaAnchor />,
                  color: "text-emerald-400",
                },
                {
                  title: "Cost-Effective",
                  description:
                    "Better ROI compared to paid advertising in the long run",
                  icon: <FaCrown />,
                  color: "text-teal-400",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className={`text-4xl ${benefit.color} mb-4`}
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scanning line effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <Footer />
    </div>
  );
};

export default SEOPage;
