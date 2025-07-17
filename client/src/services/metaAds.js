import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../Home/Navbar";
import Footer from "../Home/footer";
import { QuickConsultationModal } from "../ContactPage/ContactPage";
import {
  FaFacebook,
  FaInstagram,
  FaRocket,
  FaChartLine,
  FaUsers,
  FaBullseye,
  FaEye,
  FaArrowDown,
  FaPlay,
  FaCheckCircle,
  FaShieldAlt,
  FaLightbulb,
  FaGlobe,
  FaMobile,
  FaHeart,
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
              linear-gradient(rgba(66, 103, 178, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(66, 103, 178, 0.1) 1px, transparent 1px)
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
                    stroke="rgba(66, 103, 178, 0.3)"
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
              fill="rgba(66, 103, 178, 0.6)"
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

const MetaAdsPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const detailsRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      icon: <FaUsers />,
      title: "Advanced Audience Targeting",
      description:
        "Leverage Meta's rich user data to reach your ideal customers with laser precision.",
    },
    {
      icon: <FaChartLine />,
      title: "Performance Optimization",
      description:
        "AI-driven campaign optimization that maximizes conversions and minimizes costs.",
    },
    {
      icon: <FaEye />,
      title: "Creative Excellence",
      description:
        "Stunning visual ads that capture attention and drive engagement across all platforms.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Brand Safety",
      description:
        "Advanced content filtering and brand protection to maintain your reputation.",
    },
  ];

  const services = [
    {
      title: "Facebook Advertising",
      icon: <FaFacebook />,
      description:
        "Connect with billions of users through targeted Facebook ad campaigns.",
      features: [
        "News Feed Ads",
        "Story Ads",
        "Marketplace Ads",
        "Messenger Ads",
      ],
    },
    {
      title: "Instagram Marketing",
      icon: <FaInstagram />,
      description:
        "Engage younger audiences with visually stunning Instagram campaigns.",
      features: ["Feed Posts", "Stories", "Reels", "Shopping Ads"],
    },
    {
      title: "Video Campaigns",
      icon: <FaPlay />,
      description:
        "Create compelling video content that drives engagement and conversions.",
      features: [
        "Video Ads",
        "Live Streaming",
        "Story Videos",
        "Reels Content",
      ],
    },
    {
      title: "Retargeting",
      icon: <FaBullseye />,
      description:
        "Re-engage website visitors and previous customers with personalized ads.",
      features: [
        "Pixel Tracking",
        "Custom Audiences",
        "Lookalike Audiences",
        "Dynamic Ads",
      ],
    },
  ];

  const stats = [
    { number: "3.8B", label: "Monthly Active Users" },
    { number: "250%", label: "Average ROAS" },
    { number: "40%", label: "Cost Reduction" },
    { number: "24/7", label: "Campaign Monitoring" },
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
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        pageType="metaAds"
      />
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
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-400 font-mono text-sm">
                  META ADS PROTOCOL ACTIVE - {currentTime.toLocaleTimeString()}
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
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  BUZZBANDITS
                </h1>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-center gap-6 mb-8">
                <motion.div
                  className="flex gap-4"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="text-6xl text-blue-500"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FaFacebook />
                  </motion.div>
                  <motion.div
                    className="text-6xl text-pink-500"
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <FaInstagram />
                  </motion.div>
                </motion.div>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                  META
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
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
              Dominate social media with AI-powered Meta advertising that
              delivers
              <span className="text-blue-400 font-semibold">
                {" "}
                exceptional engagement
              </span>{" "}
              and
              <span className="text-pink-400 font-semibold">
                {" "}
                record-breaking conversions
              </span>
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={handleGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg font-semibold text-white overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-pink-400"
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
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
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
                <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  Meta Ads
                </span>
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Harness the power of the world's largest social media platforms
                to grow your business
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
                      className="text-4xl text-blue-400 flex-shrink-0"
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
                Our Meta Ads
                <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  Services
                </span>
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Comprehensive social media advertising across Facebook,
                Instagram, and Messenger
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
                      className="text-4xl text-blue-400 flex-shrink-0"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        color:
                          service.title === "Instagram Marketing"
                            ? "#E4405F"
                            : service.title === "Facebook Advertising"
                            ? "#4267B2"
                            : "#4267B2",
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
                        <FaCheckCircle className="text-blue-400 text-xs" />
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
                <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  Process
                </span>
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                A data-driven approach to social media advertising success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Audience Research",
                  description:
                    "Deep dive into your target audience demographics, behaviors, and preferences across social platforms.",
                  icon: <FaUsers />,
                },
                {
                  step: "02",
                  title: "Creative Development",
                  description:
                    "Design compelling visuals and copy that resonate with your audience and drive engagement.",
                  icon: <FaLightbulb />,
                },
                {
                  step: "03",
                  title: "Optimize & Scale",
                  description:
                    "Continuous testing, optimization, and scaling to maximize your social media advertising ROI.",
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
                    className="text-6xl text-blue-400 mb-6"
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
                  <div className="text-sm text-blue-400 font-mono mb-4">
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

          {/* Social Proof Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Platform
                <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  Advantages
                </span>
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Why Meta platforms are essential for your digital marketing
                strategy
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Massive Reach",
                  description:
                    "Access to 3.8 billion monthly active users across Facebook, Instagram, and Messenger",
                  icon: <FaGlobe />,
                  color: "text-blue-400",
                },
                {
                  title: "Advanced Targeting",
                  description:
                    "Precise audience targeting based on demographics, interests, behaviors, and custom data",
                  icon: <FaBullseye />,
                  color: "text-purple-400",
                },
                {
                  title: "Visual Storytelling",
                  description:
                    "Perfect platforms for showcasing products and services through compelling visual content",
                  icon: <FaEye />,
                  color: "text-pink-400",
                },
                {
                  title: "Mobile-First",
                  description:
                    "Optimized for mobile users where most social media consumption happens",
                  icon: <FaMobile />,
                  color: "text-blue-400",
                },
                {
                  title: "Engagement Focus",
                  description:
                    "Built for interaction, comments, shares, and building community around your brand",
                  icon: <FaHeart />,
                  color: "text-pink-400",
                },
                {
                  title: "Real-Time Analytics",
                  description:
                    "Comprehensive insights and analytics to measure and optimize campaign performance",
                  icon: <FaChartLine />,
                  color: "text-purple-400",
                },
              ].map((advantage, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className={`text-4xl ${advantage.color} mb-4`}
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
                    {advantage.icon}
                  </motion.div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    {advantage.title}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {advantage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
      {/* Scanning line effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default MetaAdsPage;
