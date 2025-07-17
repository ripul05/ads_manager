// export default HomePage;
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  FaGoogle,
  FaChartLine,
  FaLayerGroup,
  FaDatabase,
  FaCrosshairs,
  FaCheckCircle,
  FaSearch,
  FaChess,
  FaRocket,
  FaChartBar,
  FaBolt,
  FaAtom,
  FaNetworkWired,
  FaCube,
  FaBars,
  FaTimes,
  FaEnvelope,
} from "react-icons/fa";
import { BarChart3,ChevronLeft, ChevronRight } from 'lucide-react';

// Mobile-optimized Futuristic Background
const FuturisticBackground = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      // Reduced nodes for mobile performance
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
      {/* Simplified grid for mobile */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-10 md:opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
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

      {/* Optimized nodes */}
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node, i) => (
          <g key={node.id}>
            {/* Reduced connection lines for mobile */}
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

      {/* Scanning lines - hidden on mobile for performance */}
      <div className="hidden md:block">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
          style={{ width: "2px" }}
          animate={{
            x: ["-100vw", "100vw"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
};

// Mobile-optimized Marketing Dashboard
const HomePage = ({ activeIndex, setActiveIndex }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const handleContactClick = () => {
    setActiveIndex(3); // index of Contact
    navigate("/contact");
  };

  const handleAboutClick = () => {
    const targetSection = document.querySelector("#AboutSection");
    if (targetSection) {
      setActiveIndex(1); // index of About
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="HomeSection"
      className="min-h-screen bg-black relative overflow-hidden"
    >
      {/* Futuristic Background */}
      <Navbar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <FuturisticBackground />

      {/* Main Content - Added proper spacing for navbar */}
      <div className="relative z-10 min-h-screen flex items-center pt-20 md:pt-24 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Left Column - Main Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div variants={itemVariants}>
                {/* Header with time */}
                <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-400 font-mono text-xs sm:text-sm">
                    <span className="hidden sm:inline">SYSTEM ONLINE - </span>
                    {currentTime.toLocaleTimeString()}
                  </span>
                </div>

                {/* Brand */}
                <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8">
                  <motion.div
                    className="relative"
                    animate={{ rotate: [0, 360] }}
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

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    BUZZBANDITS
                  </h1>
                </div>

                {/* Main heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  NEXT-GEN
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    DIGITAL
                  </span>
                  <br />
                  DOMINANCE
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                  AI-powered marketing automation that maximizes ROI through
                  intelligent targeting, real-time optimization, and predictive
                  audience behavior analysis.
                </p>

                {/* Stats - Added proper spacing */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16 max-w-md mx-auto lg:max-w-2xl lg:mx-0">
                  {[
                    { value: "512%", label: "Average ROAS" },
                    { value: "24/7", label: "Campaign Monitoring" },
                    { value: "45M+", label: "Monthly Reach" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="text-center"
                      variants={itemVariants}
                    >
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-cyan-400">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center lg:items-start">
                  <motion.button
                    onClick={handleContactClick}
                    className="relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 text-sm sm:text-base">
                      INITIALIZE PROTOCOL
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                  </motion.button>

                  <motion.button
                    onClick={handleAboutClick}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    VIEW DASHBOARD
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Interactive Elements */}
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <motion.div variants={itemVariants}>
                {/* Marketing Dashboard */}
                <div className="mb-8 sm:mb-12 lg:mb-16">
                
                </div>

                {/* Marketing Feature Cards - Added proper spacing */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {[
                    {
                      icon: <FaSearch />,
                      title: "SEO Rank",
                      value: "#1",
                      desc: "Avg Position",
                    },
                    {
                      icon: <FaChartLine />,
                      title: "Ad Spend",
                      value: "$45K",
                      desc: "Monthly Budget",
                    },
                    {
                      icon: <FaNetworkWired />,
                      title: "Reach",
                      value: "2.8M",
                      desc: "Impressions",
                    },
                    {
                      icon: <FaCube />,
                      title: "Leads",
                      value: "1.2K",
                      desc: "This Month",
                    },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all group"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 10px 30px rgba(0, 255, 255, 0.2)",
                      }}
                      variants={itemVariants}
                    >
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <div className="text-cyan-400 text-lg sm:text-xl lg:text-2xl">
                          {feature.icon}
                        </div>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                          {feature.value}
                        </div>
                      </div>
                      <div className="text-sm sm:text-base text-gray-400 mb-1">
                        {feature.title}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        {feature.desc}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Process Bar - Added proper spacing */}
      <motion.div
        className="relative z-10 bg-black/80 backdrop-blur-sm border-t border-cyan-400/20 p-6 sm:p-8 lg:p-10 mt-20 sm:mt-24 lg:mt-32"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {[
              {
                title: "ANALYZE",
                desc: "AI audience segmentation",
                icon: <FaSearch />,
              },
              {
                title: "OPTIMIZE",
                desc: "Real-time bid management",
                icon: <FaChess />,
              },
              {
                title: "SCALE",
                desc: "Multi-platform deployment",
                icon: <FaRocket />,
              },
              {
                title: "REPORT",
                desc: "Automated insights delivery",
                icon: <FaChartBar />,
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 sm:gap-6 group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-400/30 group-hover:border-cyan-400/60 transition-all flex-shrink-0">
                  <div className="text-cyan-400 text-xl sm:text-2xl lg:text-3xl">
                    {step.icon}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-white font-semibold text-base sm:text-lg lg:text-xl">
                    {step.title}
                  </div>
                  <div className="text-gray-400 text-sm sm:text-base">
                    {step.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
