import { useEffect, useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import {
  FaGoogle,
  FaChartLine,
  FaDollarSign,
  FaBullseye,
  FaChevronDown,
  FaAtom,
  FaNetworkWired,
  FaCube,
  FaBolt,
  FaRocket,
  FaEye,
  FaBrain,
  FaSearch,
  FaDatabase,
  FaChess,
  FaChartBar,
  FaLayerGroup,
  FaCrosshairs,
  FaCheckCircle,
} from "react-icons/fa";

// Futuristic background with moving lines and nodes (matching home page)
const FuturisticBackground = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      for (let i = 0; i < 15; i++) {
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
    </div>
  );
};

// Digital Marketing Metrics Dashboard


const MarketingMetrics = () => {
  const stats = [
    { number: 185, label: "Active Campaigns", suffix: "+", color: "#00ffff" },
    { number: 512, label: "Average ROI", suffix: "%", color: "#0080ff" },
    { number: 368, label: "Happy Clients", suffix: "+", color: "#8000ff" },
    { number: 54, label: "Million Reach", suffix: "M+", color: "#ff0080" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="relative p-4 md:p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all group overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{ backgroundColor: stat.color }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
          
          <div className="relative z-10">
            <motion.div 
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              {stat.number}
              {stat.suffix}
            </motion.div>
            <div className="text-gray-400 mt-2 group-hover:text-gray-300 transition-colors text-sm">
              {stat.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};


const AboutUs = ({ setActiveIndex }) => {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      title: "AI-Powered PPC",
      icon: <FaBrain />,
      description: "Advanced machine learning algorithms optimize your Google Ads campaigns in real-time, maximizing ROI through intelligent bid management and audience targeting",
      color: "#00ffff",
      metrics: { ctr: "12.5%", conv: "847", roas: "6.2x" }
    },
    {
      title: "Social Media Intelligence",
      icon: <FaNetworkWired />,
      description: "Multi-platform social media campaigns powered by AI sentiment analysis and automated content optimization across Facebook, Instagram, LinkedIn, and TikTok",
      color: "#0080ff",
      metrics: { reach: "2.8M", eng: "18.2%", leads: "1.2K" }
    },
    {
      title: "SEO Domination",
      icon: <FaSearch />,
      description: "Technical SEO audits, keyword research, and content optimization strategies that consistently rank clients #1 for high-value commercial keywords",
      color: "#8000ff",
      metrics: { ranks: "#1-3", traffic: "+340%", kw: "2.5K" }
    },
    {
      title: "Data Analytics Hub",
      icon: <FaChartLine />,
      description: "Custom dashboards and automated reporting systems that provide real-time insights into campaign performance and customer behavior patterns",
      color: "#ff0080",
      metrics: { data: "24/7", insights: "Real-time", reports: "Auto" }
    },
  ];

  const certifications = [
    { name: "Google Ads Certified", icon: <FaGoogle />, level: "Expert" },
    { name: "Google Analytics", icon: <FaDatabase />, level: "Certified" },
    { name: "HubSpot Certified", icon: <FaRocket />, level: "Partner" },
  ];

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

  const handleStartCampaignClick = () => {
    setActiveIndex(3); // Contact index
    navigate('/contact');
  };

  const handleViewCaseStudiesClick = () => {
    const target = document.querySelector('#Clients');
    if (target) {
      setActiveIndex(2); // Testimonials index
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="AboutSection" className="min-h-screen bg-black relative overflow-hidden">
      {/* Futuristic Background */}
      <FuturisticBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* System Status */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-8">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 font-mono text-sm">
                ABOUT SYSTEM ONLINE - {currentTime.toLocaleTimeString()}
              </span>
            </motion.div>

            {/* Brand Logo */}
            <motion.div variants={itemVariants} className="flex justify-center mb-8">
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
                <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-cyan-400 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <FaAtom className="text-cyan-400 text-2xl md:text-3xl" />
                </div>
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              DIGITAL MARKETING
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                EVOLUTION
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              We are <span className="text-cyan-400 font-semibold">certified digital marketing experts</span> who architect 
              <span className="text-blue-400 font-semibold"> AI-driven advertising solutions</span> that transform 
              business objectives into measurable growth through advanced automation and data intelligence.
            </motion.p>

            {/* Live Metrics */}
            <motion.div variants={itemVariants}>
              <MarketingMetrics />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              Our <span className="text-cyan-400">Core Systems</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Advanced digital marketing technologies engineered for maximum performance
            </motion.p>

            {/* Mobile Accordion */}
            <div className="md:hidden space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-black/40 backdrop-blur-sm rounded-xl border border-cyan-400/20 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full p-4 flex items-center justify-between hover:bg-cyan-400/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="text-2xl p-2 rounded-lg border border-cyan-400/30 bg-black/50"
                        style={{ 
                          color: service.color,
                          boxShadow: `0 0 15px ${service.color}20`
                        }}
                      >
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                    </div>
                    <motion.div
                      className="text-gray-400"
                      animate={{
                        rotate: expandedIndex === index ? 180 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedIndex === index ? "auto" : 0,
                      opacity: expandedIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 border-t border-cyan-400/20">
                      <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(service.metrics).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-cyan-400 font-bold text-sm">{value}</div>
                            <div className="text-gray-500 text-xs uppercase">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative bg-black/40 backdrop-blur-sm rounded-xl border border-cyan-400/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 20px 40px ${service.color}30`
                  }}
                >
                  <div className="p-6 h-full flex flex-col">
                    {/* Icon */}
                    <motion.div 
                      className="mb-4 text-4xl p-3 rounded-xl border border-cyan-400/30 w-fit bg-black/50"
                      style={{ 
                        color: service.color,
                        boxShadow: `0 0 20px ${service.color}20`
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 20px ${service.color}20`,
                          `0 0 30px ${service.color}40`,
                          `0 0 20px ${service.color}20`
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      {service.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors flex-grow">
                      {service.description}
                    </p>

                    {/* Metrics */}
                    <div className="mt-4 pt-4 border-t border-cyan-400/20">
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(service.metrics).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div 
                              className="text-sm font-bold"
                              style={{ color: service.color }}
                            >
                              {value}
                            </div>
                            <div className="text-gray-500 text-xs uppercase">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-white">
              <span className="text-cyan-400">Certified</span> Excellence
            </motion.h3>

            {/* Centered container for 3 certificates */}
            <div className="flex justify-center mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-black/40 backdrop-blur-sm rounded-xl border border-cyan-400/20 p-4 hover:border-cyan-400/50 transition-all group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl text-cyan-400 mb-2">{cert.icon}</div>
                    <div className="text-white font-semibold text-sm mb-1">{cert.name}</div>
                    <div className="text-gray-400 text-xs">{cert.level}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
              Our team maintains 100% certification across all major digital marketing platforms, 
              ensuring cutting-edge expertise in campaign optimization and performance maximization.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-16 border border-cyan-400/20 overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />

            <div className="relative z-10 text-center">
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to <span className="text-cyan-400">Dominate</span> Digital?
              </motion.h2>
              
              <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Partner with our certified experts to transform your digital presence into a high-performance 
                revenue generation system through AI-powered marketing automation.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
      <motion.button
        onClick={handleStartCampaignClick}
        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold relative overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10">START YOUR CAMPAIGN</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
        />
      </motion.button>

      <motion.button
        onClick={handleViewCaseStudiesClick}
        className="px-8 py-4 border border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        VIEW CASE STUDIES
      </motion.button>
    </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;