import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../Home/footer";
import {
  QuickConsultationModal,
  ConsultationSuccessModal,
} from "../ContactPage/ContactPage";
import WebsiteReviewPage from "../WebsiteReview/websiteReview";

import {
  FaCode,
  FaRocket,
  FaArrowDown,
  FaCheckCircle,
  FaBuilding,
  FaSearch,
  FaHeadset,
  FaShieldAlt,
  FaChartBar,
  FaGlobe,
  FaDatabase,
  FaServer,
  FaPalette,
  FaShoppingCart,
  FaCompass,
  FaChartLine,
  FaDesktop,
  FaAward,
  FaStar,
  FaInfinity,
} from "react-icons/fa";
import Navbar from "../Home/Navbar";

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
      {/* Grid background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10 md:opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize:
              window.innerWidth < 768 ? "50px 50px" : "100px 100px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* Animated nodes */}
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node, i) => (
          <g key={node.id}>
            {/* Connection lines */}
            {window.innerWidth >= 768 &&
              nodes.slice(i + 1).map((otherNode, j) => {
                const distance = Math.sqrt(
                  Math.pow(node.x - otherNode.x, 2) +
                    Math.pow(node.y - otherNode.y, 2)
                );
                return distance < 30 ? (
                  <line
                    key={j}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${otherNode.x}%`}
                    y2={`${otherNode.y}%`}
                    stroke="rgba(0, 255, 255, 0.2)"
                    strokeWidth="1"
                    style={{
                      animation: `pulse-line 3s infinite ${i * 0.2}s`,
                    }}
                  />
                ) : null;
              })}

            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="rgba(0, 255, 255, 0.6)"
              style={{
                animation: `pulse-node ${node.duration}s infinite ${node.delay}s`,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Scanning lines */}
      <div className="hidden md:block">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
          style={{
            width: "2px",
            animation: "scan-line 8s linear infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 50px 50px;
          }
        }
        @keyframes pulse-line {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes pulse-node {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
        }
        @keyframes scan-line {
          0% {
            transform: translateX(-100vw);
          }
          100% {
            transform: translateX(100vw);
          }
        }
      `}</style>
    </div>
  );
};

const TechnologiesSection = ({ isMobile = false }) => {
  const technologies = [
    {
      title: "Frontend Frameworks",
      icon: <FaDesktop />,
      gradient: "from-cyan-400/20 to-blue-400/20",
      borderGradient: "from-cyan-400/40 to-blue-400/40",
      accentColor: "cyan",
    },
    {
      title: "Backend Technologies",
      icon: <FaServer />,
      gradient: "from-violet-400/20 to-purple-400/20",
      borderGradient: "from-violet-400/40 to-purple-400/40",
      accentColor: "violet",
    },
    {
      title: "Database Systems",
      icon: <FaDatabase />,
      gradient: "from-emerald-400/20 to-teal-400/20",
      borderGradient: "from-emerald-400/40 to-teal-400/40",
      accentColor: "emerald",
    },
    {
      title: "Analytics & Optimization",
      icon: <FaChartLine />,
      gradient: "from-amber-400/20 to-orange-400/20",
      borderGradient: "from-amber-400/40 to-orange-400/40",
      accentColor: "amber",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isMobile ? 0.1 : 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const subtleFloat = {
    y: [0, -4, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="mb-24 sm:mb-32"
    >
      <motion.div
        variants={itemVariants}
        className="text-center mb-16 sm:mb-20"
      >
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 sm:mb-6">
          Technologies We
          <span className="font-normal bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {" "}
            Master
          </span>
        </h3>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 font-light">
          Cutting-edge technologies for modern, scalable digital solutions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-xl border border-white/5 p-8 sm:p-10 hover:bg-black/30 transition-all duration-500"
            whileHover={{
              scale: isMobile ? 1.01 : 1.03,
              y: isMobile ? -2 : -8,
            }}
          >
            {/* Subtle gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Animated border */}
            <div
              className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${tech.borderGradient} p-[1px]`}
            >
              <div className="w-full h-full rounded-2xl bg-black/40 backdrop-blur-xl" />
            </div>

            {/* Icon */}
            <div className="relative z-10 mb-8">
              <motion.div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center text-white text-xl border border-white/10 group-hover:border-${tech.accentColor}-400/30 transition-all duration-300`}
                animate={isMobile ? {} : subtleFloat}
                transition={{ delay: index * 0.3 }}
              >
                {tech.icon}
              </motion.div>
            </div>

            {/* Title */}
            <div className="relative z-10">
              <h4 className="text-lg sm:text-xl font-light text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300 text-center">
                {tech.title}
              </h4>
            </div>

            {/* Subtle scan line effect */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent w-0 group-hover:w-full transition-all duration-700" />
          </motion.div>
        ))}
      </div>

      {/* Bottom accent */}
      <motion.div
        variants={itemVariants}
        className="mt-16 sm:mt-20 text-center"
      >
        <div className="inline-flex items-center gap-4 px-8 sm:px-12 py-4 sm:py-6 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/5">
          <div className="w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse" />
          <span className="text-gray-400 font-light text-sm sm:text-base">
            Always evolving with the latest technologies
          </span>
          <div className="w-2 h-2 bg-emerald-400/60 rounded-full animate-pulse" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = ({ isMobile = false }) => {
  const services = [
    {
      title: "Custom Web Applications",
      icon: <FaCode />,
      description:
        "Sophisticated web applications built with precision, featuring seamless user experiences and robust architecture.",
      features: [
        "React/Next.js Development",
        "Node.js Backend",
        "Real-time Features",
        "Progressive Web Apps",
      ],
      price: "Starting at $5,000",
      gradient: "from-cyan-400/20 to-blue-400/20",
      borderGradient: "from-cyan-400/40 to-blue-400/40",
      accentColor: "cyan",
    },
    {
      title: "E-commerce Solutions",
      icon: <FaShoppingCart />,
      description:
        "Refined e-commerce platforms with intelligent inventory systems and comprehensive analytics insights.",
      features: [
        "Shopify/WooCommerce",
        "Payment Gateway Integration",
        "Inventory Management",
        "Analytics Dashboard",
      ],
      price: "Starting at $3,500",
      gradient: "from-emerald-400/20 to-teal-400/20",
      borderGradient: "from-emerald-400/40 to-teal-400/40",
      accentColor: "emerald",
    },
    {
      title: "Enterprise Web Platforms",
      icon: <FaBuilding />,
      description:
        "Enterprise-grade platforms with advanced integrations, scalable architecture, and enterprise security.",
      features: [
        "Microservices Architecture",
        "API Development",
        "Third-party Integrations",
        "Cloud Infrastructure",
      ],
      price: "Starting at $15,000",
      gradient: "from-violet-400/20 to-purple-400/20",
      borderGradient: "from-violet-400/40 to-purple-400/40",
      accentColor: "violet",
    },
    {
      title: "Website Redesign & Optimization",
      icon: <FaPalette />,
      description:
        "Transform your digital presence with modern design principles and enhanced performance metrics.",
      features: [
        "UI/UX Redesign",
        "Performance Optimization",
        "SEO Enhancement",
        "Mobile Optimization",
      ],
      price: "Starting at $2,500",
      gradient: "from-orange-400/20 to-amber-400/20",
      borderGradient: "from-orange-400/40 to-amber-400/40",
      accentColor: "orange",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isMobile ? 0.1 : 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const subtleFloat = {
    y: [0, -4, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="mb-24 sm:mb-32"
    >
      <motion.div
        variants={itemVariants}
        className="text-center mb-16 sm:mb-20"
      >
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 sm:mb-6">
          Our Digital
          <span className="font-normal bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {" "}
            Services
          </span>
        </h3>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 font-light">
          Crafting exceptional digital experiences with precision and elegance
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-xl border border-white/5 p-8 sm:p-10 hover:bg-black/30 transition-all duration-500"
            whileHover={{
              scale: isMobile ? 1.01 : 1.02,
              y: isMobile ? -2 : -8,
            }}
          >
            {/* Subtle gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Animated border */}
            <div
              className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${service.borderGradient} p-[1px]`}
            >
              <div className="w-full h-full rounded-2xl bg-black/40 backdrop-blur-xl" />
            </div>

            {/* Icon */}
            <div className="relative z-10 mb-8">
              <motion.div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white text-xl border border-white/10 group-hover:border-${service.accentColor}-400/30 transition-all duration-300`}
                animate={isMobile ? {} : subtleFloat}
                transition={{ delay: index * 0.5 }}
              >
                {service.icon}
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h4 className="text-xl sm:text-2xl font-light text-white mb-4 group-hover:text-cyan-100 transition-colors duration-300">
                {service.title}
              </h4>

              <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-300">
                {service.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center gap-3 text-gray-400 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 flex-shrink-0 group-hover:bg-cyan-400 transition-colors duration-300" />
                      <span className="group-hover:text-gray-200 transition-colors duration-300 font-light">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Subtle scan line effect */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent w-0 group-hover:w-full transition-all duration-700" />
          </motion.div>
        ))}
      </div>

      {/* Bottom status indicators */}
      <motion.div
        variants={itemVariants}
        className="mt-16 sm:mt-20 text-center"
      >
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-8 sm:px-12 py-4 sm:py-6 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse" />
            <span className="text-gray-400 font-light text-sm sm:text-base">
              Free consultation available
            </span>
          </div>
          <div className="w-px h-6 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-400/60 rounded-full animate-pulse" />
            <span className="text-gray-400 font-light text-sm sm:text-base">
              Tailored solutions for every vision
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
const ProjectsSection = ({ isMobile = false }) => {
  const projects = [
    {
      title: "E-commerce Platform",
      category: "Full-Stack Development",
      description:
        "Modern e-commerce platform with advanced analytics and seamless user experience",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      metrics: [
        "300% increase in sales",
        "50% faster load times",
        "99.9% uptime",
      ],
      gradient: "from-cyan-400/20 to-blue-400/20",
      borderGradient: "from-cyan-400/40 to-blue-400/40",
      accentColor: "cyan",
      icon: <FaShoppingCart />,
      codeSnippet:
        "const checkout = async () => {\n  await stripe.redirectToCheckout({\n    lineItems: cart.items\n  });\n};",
    },
    {
      title: "SaaS Dashboard",
      category: "Web Application",
      description:
        "Comprehensive dashboard for business analytics with real-time data visualization",
      tech: ["Next.js", "PostgreSQL", "Chart.js", "AWS"],
      metrics: [
        "40% improved efficiency",
        "Real-time analytics",
        "Enterprise security",
      ],
      gradient: "from-violet-400/20 to-purple-400/20",
      borderGradient: "from-violet-400/40 to-purple-400/40",
      accentColor: "violet",
      icon: <FaChartBar />,
      codeSnippet:
        "const analytics = useQuery({\n  queryKey: ['analytics'],\n  queryFn: fetchRealTimeData\n});",
    },
    {
      title: "Corporate Website",
      category: "Website Development",
      description:
        "Professional corporate website with modern design and optimal performance",
      tech: ["React", "Tailwind", "Firebase", "Vercel"],
      metrics: ["95+ Lighthouse score", "Mobile-first design", "SEO optimized"],
      gradient: "from-emerald-400/20 to-teal-400/20",
      borderGradient: "from-emerald-400/40 to-teal-400/40",
      accentColor: "emerald",
      icon: <FaGlobe />,
      codeSnippet:
        'const SEO = () => (\n  <Head>\n    <title>Corporate Site</title>\n    <meta name="description" />\n  </Head>\n);',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isMobile ? 0.1 : 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const floatingParticles = {
    y: [0, -20, 0],
    x: [0, 10, 0],
    rotate: [0, 360],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  };

  const iconFloat = {
    y: [0, -8, 0],
    rotate: [0, 5, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const pulseGlow = {
    opacity: [0.3, 0.8, 0.3],
    scale: [1, 1.1, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const codeAnimation = {
    opacity: [0, 1, 0],
    y: [20, 0, -20],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="mb-24 sm:mb-32 relative"
    >
      <motion.div
        variants={itemVariants}
        className="text-center mb-16 sm:mb-20"
      >
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 sm:mb-6">
          Our Recent
          <span className="font-normal bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {" "}
            Projects
          </span>
        </h3>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 font-light">
          Explore our portfolio of successful web development projects across
          various industries
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative overflow-hidden bg-black/20 backdrop-blur-xl border border-white/5 rounded-2xl hover:bg-black/30 transition-all duration-500"
            whileHover={{
              scale: isMobile ? 1.01 : 1.03,
              y: isMobile ? -2 : -8,
            }}
          >
            {/* Animated border effect */}
            <div
              className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${project.borderGradient} p-[1px]`}
            >
              <div className="w-full h-full rounded-2xl bg-black/40 backdrop-blur-xl" />
            </div>

            {/* Project preview area */}
            <div className="aspect-video bg-gradient-to-r from-black/40 to-black/60 relative overflow-hidden">
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Animated grid background */}
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "30px 30px",
                    animation: "grid-move 15s linear infinite",
                  }}
                />
              </div>

              {/* Circuit board pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" className="absolute inset-0">
                  <defs>
                    <pattern
                      id={`circuit-${index}`}
                      x="0"
                      y="0"
                      width="60"
                      height="60"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M10 10 L20 10 L20 20 L40 20 L40 30 L50 30"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                        className="text-cyan-400/30"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="2"
                        fill="currentColor"
                        className="text-cyan-400/40"
                      />
                      <circle
                        cx="40"
                        cy="30"
                        r="2"
                        fill="currentColor"
                        className="text-emerald-400/40"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill={`url(#circuit-${index})`}
                  />
                </svg>
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
                    style={{
                      left: `${15 + i * 10}%`,
                      top: `${25 + (i % 4) * 15}%`,
                    }}
                    animate={floatingParticles}
                    transition={{
                      ...floatingParticles.transition,
                      delay: i * 0.6,
                    }}
                  />
                ))}
              </div>

              {/* Data visualization lines */}
              <div className="absolute inset-0 opacity-30">
                <svg width="100%" height="100%">
                  <motion.path
                    d="M20,80 Q50,20 80,60 T120,40"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-cyan-400/50"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  />
                  <motion.path
                    d="M40,90 Q70,30 100,70 T140,50"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-emerald-400/50"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5 + 1,
                    }}
                  />
                </svg>
              </div>

              {/* Animated code snippet */}
              <motion.div
                className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm rounded-md p-2 font-mono text-xs text-green-400/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={codeAnimation}
                transition={{
                  ...codeAnimation.transition,
                  delay: index * 0.3,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-red-400/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-400/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-400/60 rounded-full"></div>
                </div>
                <pre className="text-xs leading-tight overflow-hidden">
                  {project.codeSnippet}
                </pre>
              </motion.div>

              {/* Progress bars */}
              <div className="absolute top-4 left-4 space-y-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-1 bg-white/10 rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${60 + i * 15}%` }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: index * 0.2 + i * 0.3,
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Glowing orbs */}
              <motion.div
                className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r ${project.gradient} blur-sm`}
                animate={pulseGlow}
                transition={{
                  ...pulseGlow.transition,
                  delay: index * 0.5,
                }}
              />

              <motion.div
                className={`absolute bottom-4 right-4 w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400/40 to-teal-400/40 blur-sm`}
                animate={pulseGlow}
                transition={{
                  ...pulseGlow.transition,
                  delay: index * 0.5 + 1.5,
                }}
              />

              {/* Enhanced floating icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Icon glow background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                    animate={pulseGlow}
                  />

                  {/* Main icon */}
                  <motion.div
                    className="relative z-10 w-16 h-16 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl text-white/60 group-hover:text-white/90 transition-all duration-300 border border-white/10 group-hover:border-cyan-400/30"
                    animate={isMobile ? {} : iconFloat}
                    transition={{
                      ...iconFloat.transition,
                      delay: index * 0.3,
                    }}
                  >
                    {project.icon}
                  </motion.div>
                </div>
              </div>

              {/* Multiple scan line effects */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Vertical scan lines */}
              <motion.div
                className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100"
                animate={{
                  x: [0, 200, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5,
                }}
              />
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-cyan-400/80 font-light tracking-wider uppercase">
                  {project.category}
                </div>
              </div>

              <h4 className="text-lg sm:text-xl font-light text-white mb-3 group-hover:text-cyan-100 transition-colors duration-300">
                {project.title}
              </h4>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-300">
                {project.description}
              </p>

              {/* Tech stack with hover effects */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className="px-3 py-1 bg-white/5 text-cyan-400/80 text-xs rounded-full border border-white/10 font-light hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Metrics with staggered animation */}
              <div className="space-y-2">
                {project.metrics.map((metric, metricIndex) => (
                  <motion.div
                    key={metricIndex}
                    className="flex items-center gap-3 text-xs text-gray-400"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: metricIndex * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: metricIndex * 0.2,
                      }}
                    >
                      <FaCheckCircle className="text-emerald-400/80 text-xs" />
                    </motion.div>
                    <span className="font-light">{metric}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enhanced bottom border effect */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent w-0 group-hover:w-full transition-all duration-700" />

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Enhanced bottom accent */}
      <motion.div
        variants={itemVariants}
        className="mt-16 sm:mt-20 text-center"
      >
        <div className="relative inline-flex items-center gap-4 px-8 sm:px-12 py-4 sm:py-6 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/5 hover:bg-black/30 transition-all duration-300">
          <motion.div
            className="w-2 h-2 bg-cyan-400/60 rounded-full"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="text-gray-400 font-light text-sm sm:text-base">
            View our complete portfolio
          </span>
          <motion.div
            className="w-2 h-2 bg-emerald-400/60 rounded-full"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes grid-move {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 30px 30px;
          }
        }
      `}</style>
    </motion.div>
  );
};
const DevelopmentProcess = ({ isMobile = false }) => {
  const processSteps = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description:
        "In-depth analysis of your business goals, target audience, and technical requirements to create a comprehensive project roadmap and technical architecture.",
      icon: <FaCompass />,
      duration: "1-2 weeks",
      gradient: "from-cyan-400/20 to-blue-400/20",
      borderGradient: "from-cyan-400/40 to-blue-400/40",
      accentColor: "cyan",
    },
    {
      step: "02",
      title: "Design & Development",
      description:
        "Iterative design and development process with regular client feedback, modern frameworks, and best practices to ensure optimal results.",
      icon: <FaCode />,
      duration: "4-12 weeks",
      gradient: "from-violet-400/20 to-purple-400/20",
      borderGradient: "from-violet-400/40 to-purple-400/40",
      accentColor: "violet",
    },
    {
      step: "03",
      title: "Testing & Launch",
      description:
        "Comprehensive testing across all devices, browsers, and performance metrics before deploying to production with ongoing support.",
      icon: <FaRocket />,
      duration: "1-2 weeks",
      gradient: "from-emerald-400/20 to-teal-400/20",
      borderGradient: "from-emerald-400/40 to-teal-400/40",
      accentColor: "emerald",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isMobile ? 0.1 : 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const subtleFloat = {
    y: [0, -4, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="mb-24 sm:mb-32"
    >
      <motion.div
        variants={itemVariants}
        className="text-center mb-16 sm:mb-20"
      >
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 sm:mb-6">
          Our Development
          <span className="font-normal bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            Process
          </span>
        </h3>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 font-light">
          A proven methodology for delivering exceptional web solutions on time
          and within budget
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {processSteps.map((process, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-xl border border-white/5 p-8 sm:p-10 hover:bg-black/30 transition-all duration-500 text-center"
            whileHover={{
              scale: isMobile ? 1.01 : 1.03,
              y: isMobile ? -2 : -8,
            }}
          >
            {/* Subtle gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${process.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Animated border */}
            <div
              className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${process.borderGradient} p-[1px]`}
            >
              <div className="w-full h-full rounded-2xl bg-black/40 backdrop-blur-xl" />
            </div>

            {/* Icon */}
            <div className="relative z-10 mb-8">
              <motion.div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br ${process.gradient} flex items-center justify-center text-white text-2xl sm:text-3xl border border-white/10 group-hover:border-${process.accentColor}-400/30 transition-all duration-300 mx-auto`}
                animate={isMobile ? {} : subtleFloat}
                transition={{ delay: index * 0.3 }}
              >
                {process.icon}
              </motion.div>
            </div>

            {/* Step number and duration */}
            <div className="relative z-10 mb-6">
              <div className="text-sm text-blue-400 font-mono mb-2">
                STEP {process.step}
              </div>
              <div className="text-xs text-gray-500 mb-4">
                {process.duration}
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h4 className="text-lg sm:text-xl font-light text-white mb-4 group-hover:text-cyan-100 transition-colors duration-300">
                {process.title}
              </h4>
              <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
                {process.description}
              </p>
            </div>

            {/* Subtle scan line effect */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent w-0 group-hover:w-full transition-all duration-700" />
          </motion.div>
        ))}
      </div>

      {/* Bottom accent */}
      <motion.div
        variants={itemVariants}
        className="mt-16 sm:mt-20 text-center"
      >
        <div className="inline-flex items-center gap-4 px-8 sm:px-12 py-4 sm:py-6 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/5">
          <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-pulse" />
          <span className="text-gray-400 font-light text-sm sm:text-base">
            Proven process, exceptional results
          </span>
          <div className="w-2 h-2 bg-emerald-400/60 rounded-full animate-pulse" />
        </div>
      </motion.div>
    </motion.div>
  );
};
const WebDevelopmentFeatures = ({ isMobile = false }) => {
  const features = [
    {
      title: "Responsive Design",
      description:
        "Beautiful, mobile-first designs that work flawlessly across all devices and screen sizes",
      icon: <FaDesktop />,
    },
    {
      title: "Performance Optimization",
      description:
        "Lightning-fast loading times and smooth user experiences through advanced optimization techniques",
      icon: <FaRocket />,
    },
    {
      title: "SEO Friendly",
      description:
        "Search engine optimized code and structure to boost your visibility and organic traffic",
      icon: <FaSearch />,
    },
    {
      title: "Modern Architecture",
      description:
        "Scalable, maintainable code built with the latest frameworks and best practices",
      icon: <FaCode />,
    },
    {
      title: "Security First",
      description:
        "Robust security measures and protocols to protect your data and users",
      icon: <FaShieldAlt />,
    },
    {
      title: "24/7 Support",
      description:
        "Ongoing maintenance and support to keep your website running smoothly",
      icon: <FaHeadset />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isMobile ? 0.1 : 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const subtleFloat = {
    y: [0, -4, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="mb-24 sm:mb-32"
    >
      <motion.div
        variants={itemVariants}
        className="text-center mb-16 sm:mb-20"
      >
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 sm:mb-6">
          Why Choose Our
          <span className="font-normal bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            Web Development
          </span>
        </h3>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 font-light">
          Professional web development services that bring your vision to life
          with cutting-edge technology
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-xl border border-white/5 p-8 sm:p-10 hover:bg-black/30 transition-all duration-500"
            whileHover={{
              scale: isMobile ? 1.01 : 1.03,
              y: isMobile ? -2 : -8,
            }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 p-[1px]">
              <div className="w-full h-full rounded-2xl bg-black/40 backdrop-blur-xl" />
            </div>

            {/* Icon */}
            <div className="relative z-10 mb-8">
              <motion.div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-400/20 to-cyan-400/20 flex items-center justify-center text-blue-400 text-xl border border-white/10 group-hover:border-blue-400/30 transition-all duration-300"
                animate={isMobile ? {} : subtleFloat}
                transition={{ delay: index * 0.3 }}
              >
                {feature.icon}
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h4 className="text-lg sm:text-xl font-light text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
                {feature.title}
              </h4>
              <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Subtle scan line effect */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent w-0 group-hover:w-full transition-all duration-700" />
          </motion.div>
        ))}
      </div>

      {/* Bottom accent */}
      <motion.div
        variants={itemVariants}
        className="mt-16 sm:mt-20 text-center"
      >
        <div className="inline-flex items-center gap-4 px-8 sm:px-12 py-4 sm:py-6 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/5">
          <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-pulse" />
          <span className="text-gray-400 font-light text-sm sm:text-base">
            Delivering excellence in every project
          </span>
          <div className="w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse" />
        </div>
      </motion.div>
    </motion.div>
  );
};
const WebDevPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const detailsRef = useRef(null);
  const reviewRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(2);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        behavior: "instant",
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
    reviewRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const stats = [
    { number: "850+", label: "Projects Delivered", icon: <FaAward /> },
    { number: "99.2%", label: "Client Satisfaction", icon: <FaStar /> },
    { number: "< 1.5s", label: "Average Load Time", icon: <FaRocket /> },
    { number: "24/7", label: "Support & Monitoring", icon: <FaInfinity /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isMobile ? 0.1 : 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
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
                <motion.div
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={pulseAnimation}
                />
                <span className="text-blue-400 font-mono text-xs sm:text-sm">
                  {isMobile
                    ? "WEB DEV ACTIVE"
                    : `WEB DEVELOPMENT ACTIVE - ${currentTime.toLocaleTimeString()}`}
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
                <motion.h1
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
                  animate={floatingAnimation}
                >
                  BUZZBANDITS
                </motion.h1>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <motion.div
                  className="relative order-2 sm:order-1"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotateY: isMobile ? [0, 0, 0] : [0, 180, 360],
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
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight order-1 sm:order-2"
                  animate={floatingAnimation}
                >
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
                </motion.h2>
              </div>
            </motion.div>

            {/* Enhanced Subtitle */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto px-4"
              variants={itemVariants}
            >
              Transform your digital presence with cutting-edge web solutions
              that deliver
              <motion.span
                className="text-blue-400 font-semibold"
                animate={{ color: ["#60a5fa", "#06b6d4", "#60a5fa"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {" "}
                exceptional performance
              </motion.span>{" "}
              and
              <motion.span
                className="text-cyan-400 font-semibold"
                animate={{ color: ["#06b6d4", "#60a5fa", "#06b6d4"] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                {" "}
                stunning user experiences
              </motion.span>
            </motion.p>

            {/* Enhanced Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={handleGetStarted}
                className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-white overflow-hidden shadow-lg shadow-blue-500/25"
                whileHover={{
                  scale: isMobile ? 1.02 : 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                }}
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
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <FaRocket />
                  </motion.div>
                  START PROJECT
                </span>
              </motion.button>

              <motion.button
                onClick={handleLearnMore}
                className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{
                  scale: isMobile ? 1.02 : 1.05,
                  borderColor: "rgba(255, 255, 255, 0.4)",
                }}
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

            {/* Enhanced Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-16 px-4"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                  whileHover={{
                    scale: isMobile ? 1.02 : 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <motion.div
                    className="text-lg sm:text-xl text-blue-400 mb-2"
                    animate={floatingAnimation}
                    transition={{ delay: index * 0.2 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-1 sm:mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Website Review Component Reference */}
      <div ref={reviewRef}>
        <WebsiteReviewPage />
      </div>

      {/* Detailed Information Section */}
      <div ref={detailsRef} className="relative z-10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Features Section */}
          <WebDevelopmentFeatures />

          {/* Enhanced Services Section */}
          <ServicesSection />
          {/* Enhanced Process Section */}
          <DevelopmentProcess />

          {/* Enhanced Technologies Section */}
          <TechnologiesSection />

          {/* Enhanced Portfolio Section */}
          <ProjectsSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WebDevPage;
