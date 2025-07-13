import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGoogle, 
  FaFacebook, 
  FaSearch, 
  FaCode, 
  FaChartLine, 
  FaRocket, 
  FaNetworkWired,
  FaCube,
  FaAtom,
  FaArrowRight,
  FaCheck,
  FaStar
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

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    // Scroll to top before navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Use setTimeout to ensure scroll happens before navigation
    setTimeout(() => {
      switch(service.title) {
        case 'Google Ads':
          navigate('/Google-ads');
          break;
        // case 'Meta Ads':
        //   navigate('/Meta-ads');
        //   break;
        case 'SEO':
          navigate('/Seo');
          break;
        case 'Web Development':
          navigate('/Web-development');
          break;
        default:
          break;
      }
    }, 100);
  };

  return (
    <motion.div
      className="relative h-80 group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Glass morphism card */}
      <motion.div
        className="relative w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden cursor-pointer"
        whileHover={{ 
          scale: 1.05,
          y: -10,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(45deg, 
              transparent, 
              rgba(0, 255, 255, 0.1), 
              transparent, 
              rgba(0, 255, 255, 0.1), 
              transparent
            )`,
            backgroundSize: "300% 300%",
          }}
          animate={{
            backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />

        {/* Card content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-6">
          {/* Icon with floating animation */}
          <motion.div
            className="relative mb-6"
            animate={{
              y: isHovered ? [0, -5, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-16 h-16 flex items-center justify-center text-4xl text-white/90"
              whileHover={{
                rotate: 360,
                scale: 1.2,
              }}
              transition={{ duration: 0.8 }}
            >
              {service.icon}
            </motion.div>
            
            {/* Glowing ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
              animate={{
                scale: isHovered ? [1, 1.3, 1] : 1,
                opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Service title */}
          <motion.h3 
            className="text-xl font-semibold text-white mb-3"
            animate={{
              color: isHovered ? "#00ffff" : "#ffffff",
            }}
            transition={{ duration: 0.3 }}
          >
            {service.title}
          </motion.h3>

          {/* Expanded information on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.p 
                  className="text-cyan-200 text-sm font-medium mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {service.catchPhrase}
                </motion.p>

                <div className="space-y-2">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 text-white/80"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                      <span className="text-xs">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white text-xs font-medium"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  Learn More
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Subtle shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          style={{ transform: "translateX(-100%)" }}
          animate={{
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ServicesPage = ({ setActiveIndex }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      title: "Google Ads",
      icon: <FaGoogle />,
      catchPhrase: "Dominate Search Results",
      features: [
        "Advanced keyword research",
        "Smart bidding strategies",
        "Conversion tracking",
        "Performance optimization"
      ]
    },
    {
      title: "SEO",
      icon: <FaSearch />,
      catchPhrase: "Rank Higher, Convert More",
      features: [
        "Technical SEO audit",
        "Content optimization",
        "Link building",
        "Local SEO"
      ]
    },
    {
      title: "Web Development",
      icon: <FaCode />,
      catchPhrase: "Code the Future",
      features: [
        "Responsive design",
        "Fast loading speeds",
        "SEO-friendly structure",
        "Mobile-first approach"
      ]
    }
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

  return (
    <div id="Services" className="min-h-screen bg-black relative overflow-hidden">
      <FuturisticBackground />
      
      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              {/* Header with time */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-400 font-mono text-sm">
                  SERVICE PROTOCOLS ACTIVE - {currentTime.toLocaleTimeString()}
                </span>
              </div>

              {/* Brand Header */}
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
                  <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
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
              <motion.h2 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                OUR
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SERVICES
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p 
                className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
                variants={itemVariants}
              >
                Advanced digital marketing solutions powered by AI technology and data-driven strategies.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Services Grid - Centered for 3 cards */}
          <div className="flex justify-center">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </motion.div>
          </div>
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
    </div>
  );
};

export default ServicesPage;