import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBolt, FaAtom, FaNetworkWired, FaRocket, FaChartLine, FaSearch, FaCrosshairs } from "react-icons/fa";

const Navbar = ({ isContactPage = false, activeIndex=0, setActiveIndex }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const activeColors = useMemo(() => ["#00f0ff", "#7b2dff", "#00ff9d", "#ff0080"], []);
  const glowColors = useMemo(() => [
    "rgba(0, 240, 255, 0.4)", 
    "rgba(123, 45, 255, 0.4)", 
    "rgba(0, 255, 157, 0.4)",
    "rgba(255, 0, 128, 0.4)"
  ], []);

  const navItems = useMemo(() => [
    { label: "Performance", href: "#HomeSection", icon: <FaRocket className="mr-2" /> },
    { label: "Campaigns", href: "#AboutSection", icon: <FaAtom className="mr-2" /> },
    { label: "Clients", href: "#TestimonySection", icon: <FaChartLine className="mr-2" /> },
    { label: "Contact", href: "/contact", icon: <FaCrosshairs className="mr-2" /> },
  ], []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const updateIndicator = useCallback(() => {
  if (isNaN(activeIndex)) return; // 🛑 Prevents NaN selector error

  const indicator = document.querySelector(".nav-indicator");
  const activeItem = document.querySelector(`.nav-item:nth-child(${activeIndex + 1})`);

  if (indicator && activeItem) {
    indicator.style.width = `${activeItem.offsetWidth}px`;
    indicator.style.left = `${activeItem.offsetLeft}px`;
    indicator.style.backgroundColor = activeColors[activeIndex];
    indicator.style.boxShadow = `0 0 20px ${glowColors[activeIndex]}`;
  }
}, [activeIndex, activeColors, glowColors]);


  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const handleNavClick = (index, e) => {
    const href = navItems[index].href;
    e.preventDefault();
    if (href.startsWith("#")) {
      const targetSection = document.querySelector(href);
      targetSection?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
    setActiveIndex(index);
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    const targetSection = document.querySelector("#HomeSection");
    targetSection?.scrollIntoView({ behavior: "smooth" });
    setActiveIndex(0);
  };
  return (
    <motion.nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-xl shadow-2xl shadow-cyan-500/20' 
          : 'bg-black/60 backdrop-blur-lg'
      } border-b border-cyan-400/30`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 20">
            <defs>
              <pattern id="neural-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="currentColor" className="text-cyan-400">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/>
                </circle>
                <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400/20"/>
                <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400/20"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-grid)"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Futuristic Logo */}
          <motion.a 
            href="#HomeSection" 
            onClick={isContactPage ? (e) => {
              e.preventDefault();
              navigate('/');
            } : handleLogoClick}
            className="flex items-center space-x-3 relative z-10"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{
                rotate: isHovering ? [0, 360] : 0,
                scale: isHovering ? 1.1 : 1
              }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 p-1 shadow-lg ring-2 ring-cyan-400/50 backdrop-blur-sm">
  <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center relative overflow-hidden">
    <img
      src="/BuzzBandits.png"
      alt="BuzzBandits Logo"
      className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain z-10"
    />
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
      animate={{
        x: ['-100%', '100%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </div>
</div>

              {/* Orbital ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-400/30"
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
            
            <div className="flex flex-col">
              <motion.h1 
                className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                animate={{
                  textShadow: isHovering ? 
                    ["0 0 0px #00f0ff", "0 0 10px #00f0ff", "0 0 20px #00f0ff", "0 0 0px #00f0ff"] : 
                    "0 0 0px transparent"
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                BUZZBANDITS
              </motion.h1>
              <div className="text-xs text-gray-400 font-mono">DIGITAL MARKETING</div>
            </div>
          </motion.a>

          {/* Only show navigation if not on contact page */}
          {!isContactPage && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center relative">
                <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm rounded-full p-2 border border-cyan-400/20">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      onClick={(e) => handleNavClick(index, e)}
                      className={`px-6 py-3 flex items-center text-sm font-medium transition-all nav-item relative rounded-full ${
                        activeIndex === index 
                          ? "text-white bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-lg" 
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                      whileHover={{ 
                        scale: 1.05,
                        textShadow: `0 0 8px ${glowColors[index]}`
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className={`text-lg ${activeIndex === index ? 'text-cyan-400' : 'text-gray-500'}`}>
                        {item.icon}
                      </span>
                      <span className="ml-2">{item.label}</span>
                      
                      {/* Active indicator */}
                      {activeIndex === index && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Holographic Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-3 rounded-full bg-black/40 backdrop-blur-sm text-gray-300 hover:text-cyan-400 focus:outline-none border border-cyan-400/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ 
                    rotate: isMenuOpen ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </motion.div>
              </motion.button>
            </>
          )}
        </div>

        {/* Enhanced Mobile Menu */}
        {!isContactPage && (
          <motion.div
            className={`md:hidden overflow-hidden ${isMenuOpen ? "block" : "hidden"}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isMenuOpen ? "auto" : 0,
              opacity: isMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-6 space-y-3 bg-black/60 backdrop-blur-xl rounded-2xl mt-4 border border-cyan-400/20">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  onClick={(e) => handleNavClick(index, e)}
                  className={`block px-6 py-4 rounded-xl text-base font-medium flex items-center transition-all ${
                    activeIndex === index 
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-400/30 shadow-lg" 
                      : "hover:bg-white/5 text-gray-300 hover:text-white"
                  }`}
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                    boxShadow: `0 0 20px ${glowColors[index]}`
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className={`text-xl ${activeIndex === index ? 'text-cyan-400' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  <span className="ml-3">{item.label}</span>
                  
                  {/* Active dot */}
                  {activeIndex === index && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
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
    </motion.nav>
  );
};

export default Navbar;