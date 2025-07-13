import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../Home/footer';
import { QuickConsultationModal,ConsultationSuccessModal } from '../ContactPage/ContactPage';

import { 
  FaCode, 
  FaRocket,
  FaKeyboard, 
  FaBullseye,
  FaArrowDown,
  FaCheckCircle,
  FaShieldAlt,
  FaLightbulb,
  FaGlobe,
  FaFileAlt,
  FaTachometerAlt,
  FaDatabase,
  FaServer,
  FaCloud,
  FaPalette,
  FaLayerGroup,
  FaShoppingCart,
  FaCompass,
  FaClock,
  FaClipboardList,
  FaVial,
  FaEdit,
  FaDollarSign,
  FaMobile,
  FaDesktop,
  FaTablet,
  FaUsers,
  FaChartLine,
  FaEye,
  FaMousePointer,
  FaPlay,
  FaStar,
  FaCog,
  FaHeart,
  FaComments,
  FaShare,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import Navbar from '../Home/Navbar';

const FuturisticBackground = () => {
  const [nodes, setNodes] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const generateNodes = () => {
      const newNodes = [];
      const nodeCount = window.innerWidth < 768 ? 6 : window.innerWidth < 1024 ? 10 : 15;
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5,
        });
      }
      setNodes(newNodes);
    };

    checkMobile();
    generateNodes();
    
    const handleResize = () => {
      checkMobile();
      generateNodes();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-5 sm:opacity-10 md:opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? "30px 30px" : "60px 60px",
          }}
          animate={{
            backgroundPosition: isMobile ? ["0px 0px", "30px 30px"] : ["0px 0px", "60px 60px"],
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
            {!isMobile &&
              nodes.slice(i + 1).map((otherNode, j) => {
                const distance = Math.sqrt(
                  Math.pow(node.x - otherNode.x, 2) +
                    Math.pow(node.y - otherNode.y, 2)
                );
                return distance < 25 ? (
                  <motion.line
                    key={j}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${otherNode.x}%`}
                    y2={`${otherNode.y}%`}
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="0.5"
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
              fill="rgba(59, 130, 246, 0.6)"
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

const WebDevPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    scrollToTop();
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
      icon: <FaCode />,
      title: "Modern Development",
      description: "Cutting-edge technologies and frameworks for future-proof web solutions."
    },
    {
      icon: <FaTachometerAlt />,
      title: "High Performance",
      description: "Lightning-fast loading speeds and optimized user experiences."
    },
    {
      icon: <FaShieldAlt />,
      title: "Security First",
      description: "Enterprise-grade security measures to protect your digital assets."
    },
    {
      icon: <FaMobile />,
      title: "Mobile Responsive",
      description: "Perfect performance across all devices and screen sizes."
    }
  ];

  const services = [
    {
      title: "Frontend Development",
      icon: <FaPalette />,
      description: "Create stunning, interactive user interfaces with modern frameworks.",
      features: ["React & Vue.js", "TypeScript", "Responsive Design", "UI/UX Optimization"]
    },
    {
      title: "Backend Development",
      icon: <FaServer />,
      description: "Build robust server-side applications with scalable architecture.",
      features: ["Node.js & Python", "API Development", "Database Design", "Cloud Integration"]
    },
    {
      title: "Full-Stack Solutions",
      icon: <FaLayerGroup />,
      description: "Complete web applications from concept to deployment.",
      features: ["End-to-End Development", "DevOps & Deployment", "Performance Optimization", "Maintenance"]
    },
    {
      title: "E-commerce Development",
      icon: <FaShoppingCart />,
      description: "Custom e-commerce platforms with secure payment systems.",
      features: ["Payment Integration", "Inventory Management", "Analytics Dashboard", "SEO Optimization"]
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "< 2s", label: "Average Load Time" },
    { number: "24/7", label: "Support Available" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isMobile ? 0.1 : 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
      pageType="webDevelopment"
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
          pageType="webDevelopment"
        />
      )}
    </AnimatePresence>   
      
      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6 sm:space-y-8"
          >
            {/* Status Header */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-400 font-mono text-xs sm:text-sm">
                  {isMobile ? "WEB DEV ACTIVE" : `WEB DEVELOPMENT PROTOCOL ACTIVE - ${currentTime.toLocaleTimeString()}`}
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
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <motion.div
                  className="relative order-2 sm:order-1"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotateY: isMobile ? [0, 0, 0] : [0, 180, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-4xl sm:text-5xl md:text-6xl text-white relative">
                    <FaCode />
                  </div>
                </motion.div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight order-1 sm:order-2">
                  WEB
                  <br className="sm:hidden" />
                  <span className="sm:hidden"> </span>
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    DEVELOPMENT
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    SOLUTIONS
                  </span>
                </h2>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto px-4"
              variants={itemVariants}
            >
              Transform your digital presence with cutting-edge web solutions that deliver
              <span className="text-blue-400 font-semibold"> exceptional performance</span> and 
              <span className="text-cyan-400 font-semibold"> stunning user experiences</span>
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={handleGetStarted}
                className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-white overflow-hidden"
                whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FaRocket />
                  START PROJECT
                </span>
              </motion.button>

              <motion.button
                onClick={handleLearnMore}
                className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  VIEW SERVICES
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
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-16 px-4"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Detailed Information Section */}
      <div ref={detailsRef} className="relative z-10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Features Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-24 sm:mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Why Choose Our 
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}Web Development
                </span>
              </h3>
              <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto px-4">
                Professional web development services that bring your vision to life
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group p-6 sm:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500"
                  whileHover={{ scale: isMobile ? 1.01 : 1.02, y: isMobile ? -2 : -5 }}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <motion.div
                      className="text-3xl sm:text-4xl text-blue-400 flex-shrink-0"
                      animate={isMobile ? {} : { 
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
                      <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                        {feature.title}
                      </h4>
                      <p className="text-gray-300 text-sm sm:text-base">
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
            className="mb-24 sm:mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Our Web Development
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}Services
                </span>
              </h3>
              <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto px-4">
                Comprehensive web development solutions for modern businesses
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group p-6 sm:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500"
                  whileHover={{ scale: isMobile ? 1.01 : 1.02, y: isMobile ? -2 : -5 }}
                >
                  <div className="flex items-start gap-4 sm:gap-6 mb-6">
                    <motion.div
                      className="text-3xl sm:text-4xl text-blue-400 flex-shrink-0"
                      animate={isMobile ? {} : { 
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
                      <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                        {service.title}
                      </h4>
                      <p className="text-gray-300 text-sm sm:text-base mb-4">
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
                        <FaCheckCircle className="text-blue-400 text-xs flex-shrink-0" />
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
            className="mb-24 sm:mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Our Development
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}Process
                </span>
              </h3>
              <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto px-4">
                A systematic approach to delivering exceptional web solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Planning",
                  description: "Understanding your requirements, goals, and target audience to create a comprehensive project roadmap.",
                  icon: <FaCompass />
                },
                {
                  step: "02",
                  title: "Design & Development",
                  description: "Creating stunning designs and converting them into functional, responsive web applications.",
                  icon: <FaCode />
                },
                {
                  step: "03",
                  title: "Testing & Launch",
                  description: "Rigorous testing across all devices and browsers before deploying your website to production.",
                  icon: <FaRocket />
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-6 sm:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500"
                  whileHover={{ scale: isMobile ? 1.02 : 1.05, y: isMobile ? -5 : -10 }}
                >
                  <motion.div
                    className="text-4xl sm:text-5xl md:text-6xl text-blue-400 mb-4 sm:mb-6"
                    animate={isMobile ? {} : { 
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
                  <div className="text-sm text-blue-400 font-mono mb-3 sm:mb-4">
                    STEP {process.step}
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                    {process.title}
                  </h4>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {process.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technologies Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-24 sm:mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Technologies We
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}Master
                </span>
              </h3>
              <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto px-4">
                Cutting-edge technologies and frameworks for modern web development
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: "Frontend Excellence",
                  description: "Modern frameworks and libraries for stunning user interfaces",
                  icon: <FaPalette />,
                  technologies: ["React", "Vue.js", "Angular", "TypeScript", "Tailwind CSS", "SASS"]
                },
                {
                  title: "Backend Power",
                  description: "Robust server-side solutions and database management",
                  icon: <FaServer />,
                  technologies: ["Node.js", "Python", "PHP", "MongoDB", "PostgreSQL", "Redis"]
                },
                {
                  title: "Cloud & DevOps",
                  description: "Scalable cloud infrastructure and deployment solutions",
                  icon: <FaCloud />,
                  technologies: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "Nginx"]
                },
                {
                  title: "Mobile Development",
                  description: "Cross-platform mobile applications and responsive design",
                  icon: <FaMobile />,
                  technologies: ["React Native", "Flutter", "PWA", "Ionic", "Responsive Design"]
                },
                {
                  title: "Database Solutions",
                  description: "Efficient data storage and management systems",
                  icon: <FaDatabase />,
                  technologies: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "GraphQL", "Redis"]
                },
                {
                  title: "Performance & Analytics",
                  description: "Optimization tools and analytics for better user experience",
                  icon: <FaChartLine />,
                  technologies: ["Google Analytics", "Webpack", "Lighthouse", "GTM", "Performance Monitoring"]
                }
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-6 sm:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500"
                  whileHover={{ scale: isMobile ? 1.01 : 1.02, y: isMobile ? -2 : -5 }}
                >
                  <div className="flex items-center justify-center text-3xl sm:text-4xl text-blue-400 mb-4 sm:mb-6">
                    {tech.icon}
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 text-center">
                    {tech.title}
                  </h4>
                  <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 text-center">
                    {tech.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {tech.technologies.map((technology, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {technology}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Ready to Start Your
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}Web Project?
                </span>
              </h3>
              <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto px-4 mb-8 sm:mb-12">
                Let's transform your vision into a powerful web presence that drives results
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
            >
              <motion.button
                onClick={handleGetStarted}
                className="w-full sm:w-auto group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-white overflow-hidden"
                whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FaRocket />
                  GET FREE CONSULTATION
                </span>
              </motion.button>

              <motion.button
                className="w-full sm:w-auto group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('tel:+1234567890', '_self')}
              >
                <span className="flex items-center justify-center gap-2">
                  <FaComments />
                  CALL NOW: +1 (234) 567-890
                </span>
              </motion.button>
            </motion.div>

            {/* Additional Contact Info */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl text-blue-400 mb-3 sm:mb-4">
                  <FaGlobe />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Global Reach</h4>
                <p className="text-gray-300 text-sm">Serving clients worldwide</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl sm:text-3xl text-blue-400 mb-3 sm:mb-4">
                  <FaTachometerAlt />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">24/7 Support</h4>
                <p className="text-gray-300 text-sm">Round-the-clock assistance</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl sm:text-3xl text-blue-400 mb-3 sm:mb-4">
                  <FaHeart />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Client Satisfaction</h4>
                <p className="text-gray-300 text-sm">98% satisfaction rate</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
            <Footer/>
    </div>
  );
};

export default WebDevPage;