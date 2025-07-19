import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaShare, 
  FaComments, 
  FaGlobe, 
  FaHeart, 
  FaRocket,
  FaAtom,
  FaNetworkWired,
  FaChartLine,
  FaCrosshairs,
  FaGoogle,
  FaFacebook,
  FaSearch,
  FaCode,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaDatabase,
  FaChess,
  FaChartBar,
  FaBolt
} from 'react-icons/fa';

// Futuristic Background Component for Footer
const FuturisticFooterBackground = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      const nodeCount = window.innerWidth < 768 ? 6 : 12;
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 25 + 20,
          delay: Math.random() * 10,
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
      {/* Grid pattern */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: window.innerWidth < 768 ? "40px 40px" : "80px 80px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
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
                return distance < 25 ? (
                  <motion.line
                    key={j}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${otherNode.x}%`}
                    y2={`${otherNode.y}%`}
                    stroke="rgba(0, 255, 255, 0.15)"
                    strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ) : null;
              })}

            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="rgba(0, 255, 255, 0.4)"
              animate={{
                r: [node.size, node.size * 1.3, node.size],
                opacity: [0.2, 0.6, 0.2],
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
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
        style={{ width: "3px" }}
        animate={{
          x: ["-100vw", "100vw"],
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

const Footer = ({ 
  companyName = "BUZZBANDITS",
  companySubtitle = "DIGITAL DOMINANCE",
  companyDescription = "AI-powered marketing automation that maximizes ROI through intelligent targeting, real-time optimization, and predictive audience behavior analysis.",
  logoSrc = "/BuzzBandits.png",
  
  email = "admin@buzzbandits.net",
  // phone = "+1 (234) 567-890",
  location = "Available Worldwide",
  
  onNavClick = null,
  onLogoClick = null,
  
  // Pass navigate function from React Router if available
  navigate = null,
  
  navItems = [
    { label: "Performance", href: "#HomeSection", icon: <FaRocket /> },
    { label: "Campaigns", href: "#AboutSection", icon: <FaAtom /> },
    { 
      label: "Services", 
      href: "#Services",
      icon: <FaNetworkWired />,
      subItems: [
        { label: "Google Ads", href: "/Google-ads", icon: <FaGoogle /> },
        // { label: "Meta Ads", href: "/Meta-ads", icon: <FaFacebook /> },
        { label: "SEO", href: "/Seo", icon: <FaSearch /> },
        { label: "Web Development", href: "/Web-development", icon: <FaCode /> },
      ]
    },
    { label: "Clients", href: "#TestimonySection", icon: <FaChartLine /> },
    { label: "Contact", href: "/contact", icon: <FaCrosshairs /> },
  ],
  
  copyrightYear = new Date().getFullYear(),
  footerTagline = "NEXT-GEN DIGITAL EXCELLENCE"
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (href, e) => {
    e.preventDefault();
    
    if (onNavClick) {
      onNavClick(href);
    } else {
      if (href.startsWith("#")) {
        // Check if we're on the home page
        const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
        
        if (isHomePage) {
          // On home page - scroll to section
          const targetSection = document.querySelector(href);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          // On different page - navigate to home page with hash
          window.location.href = `/${href}`;
        }
      } else {
        // Regular navigation
        window.location.href = href;
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSocialClick = (url, e) => {
    e.preventDefault();
    if (url !== "#") {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
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
    <footer className="relative z-10 bg-black border-t border-cyan-400/20 overflow-hidden">
      {/* Futuristic Background */}
      <FuturisticFooterBackground />

      {/* Main Footer Content */}
      <div className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            
            {/* Company Info */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <motion.div 
                className="flex items-center gap-3 mb-4 sm:mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <motion.a
                  href="#"
                  onClick={handleLogoClick}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <motion.div
                    className="relative"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-1 shadow-lg ring-2 ring-cyan-400/30 backdrop-blur-sm">
                      <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center overflow-hidden relative">
                        <img
                          src={logoSrc}
                          alt={`${companyName} Logo`}
                          className="w-full h-full object-contain z-10"
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Orbital rings */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-cyan-400/30"
                      animate={{ rotate: [0, -360] }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-blue-400/20"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                  
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {companyName}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 font-mono">
                      {companySubtitle}
                    </span>
                  </div>
                </motion.a>
              </motion.div>
              
              <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 max-w-md leading-relaxed">
                {companyDescription}
              </p>
              
              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 sm:mb-8">
                {[
                  { label: "UPTIME", value: "99.9%", icon: <FaBolt /> },
                  { label: "CLIENTS", value: "50+", icon: <FaDatabase /> },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-all group"
                    whileHover={{ scale: 1.02 }}
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-cyan-400 text-sm">{stat.icon}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-white">
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </div>
              
            </motion.div>

            {/* Navigation Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4 sm:mb-6 text-lg flex items-center gap-2">
                <FaNetworkWired className="text-cyan-400" />
                QUICK ACCESS
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {navItems.map((item, index) => (
                  <div key={index}>
                    <motion.a
                      href={item.href}
                      onClick={(e) => handleNavClick(item.href, e)}
                      className="flex items-center text-gray-300 hover:text-cyan-400 transition-all duration-300 text-sm group cursor-pointer py-1"
                      whileHover={{ x: 5 }}
                    >
                      <span className="mr-3 text-cyan-400/60 group-hover:text-cyan-400 transition-colors">
                        {item.icon}
                      </span>
                      <span className="group-hover:text-white">{item.label}</span>
                    </motion.a>
                    
                    {/* Sub-items */}
                    {item.subItems && (
                      <div className="ml-6 mt-2 space-y-1 pl-3 border-l border-cyan-400/20">
                        {item.subItems.map((subItem, subIndex) => (
                          <motion.a
                            key={subIndex}
                            href={subItem.href}
                            onClick={(e) => handleNavClick(subItem.href, e)}
                            className="flex items-center text-gray-400 hover:text-cyan-300 transition-colors duration-300 text-xs group cursor-pointer py-1"
                            whileHover={{ x: 3 }}
                          >
                            <span className="mr-2 text-gray-500 group-hover:text-cyan-400 transition-colors">
                              {subItem.icon}
                            </span>
                            <span className="group-hover:text-white">{subItem.label}</span>
                          </motion.a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Information */}
<motion.div variants={itemVariants}>
  <h4 className="text-white font-semibold mb-4 sm:mb-6 text-lg flex items-center gap-2">
    <FaCrosshairs className="text-cyan-400" />
    CONTACT 
  </h4>
  <div className="space-y-3 sm:space-y-4">
    <motion.div 
      className="flex items-center gap-3 text-gray-300 text-sm group cursor-pointer p-2 rounded-lg hover:bg-gray-900/30 transition-all"
      whileHover={{ x: 2 }}
      onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=admin@buzzbandits.net', '_blank')}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-cyan-400/30">
        <FaEnvelope className="text-cyan-400 text-xs" />
      </div>
      <div>
        <div className="text-xs text-gray-400">EMAIL</div>
        <div className="hover:text-cyan-400 transition-colors">{email}</div>
      </div>
    </motion.div>
    
    {/* <motion.div 
      className="flex items-center gap-3 text-gray-300 text-sm group cursor-pointer p-2 rounded-lg hover:bg-gray-900/30 transition-all"
      whileHover={{ x: 2 }}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-cyan-400/30">
        <FaPhone className="text-cyan-400 text-xs" />
      </div>
      <div>
        <div className="text-xs text-gray-400">PHONE</div>
        <div className="hover:text-cyan-400 transition-colors">{phone}</div>
      </div>
    </motion.div> */}
    
    <motion.div 
      className="flex items-center gap-3 text-gray-300 text-sm group cursor-pointer p-2 rounded-lg hover:bg-gray-900/30 transition-all"
      whileHover={{ x: 2 }}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-cyan-400/30">
        <FaMapMarkerAlt className="text-cyan-400 text-xs" />
      </div>
      <div>
        <div className="text-xs text-gray-400">LOCATION</div>
        <div className="hover:text-cyan-400 transition-colors">{location}</div>
      </div>
    </motion.div>
  </div>
</motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 bg-black/95 backdrop-blur-sm border-t border-cyan-400/20 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.div
              className="text-center sm:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-400 text-sm">
                © {copyrightYear} {companyName}. All rights reserved.
              </p>
              <p className="text-cyan-400 text-xs font-mono mt-1">
                {footerTagline}
              </p>
            </motion.div>
            
            <motion.div
              className="flex items-center gap-2 text-xs text-gray-500 font-mono"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>SECURE CONNECTION</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scanning line effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </footer>
  );
};

export default Footer;