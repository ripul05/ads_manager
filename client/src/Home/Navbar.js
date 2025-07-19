import React, { useState, useEffect, useCallback, useMemo, useRef  } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBolt, FaAtom, FaNetworkWired, FaRocket, FaChartLine, FaSearch, FaCrosshairs, FaChevronDown, FaChevronUp, FaGoogle, FaFacebook , FaCode, FaDesktop } from "react-icons/fa";

const Navbar = ({ isContactPage = false, activeIndex=0, setActiveIndex }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isServicesClicked, setIsServicesClicked] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  const dropdownRef = useRef(null);
  const servicesItemRef = useRef(null);

  const activeColors = useMemo(() => ["#00f0ff", "#7b2dff", "#00ff9d", "#ff0080", "#ff9900"], []);
  const glowColors = useMemo(() => [
    "rgba(0, 240, 255, 0.4)", 
    "rgba(123, 45, 255, 0.4)", 
    "rgba(0, 255, 157, 0.4)",
    "rgba(255, 0, 128, 0.4)",
    "rgba(255, 153, 0, 0.4)"
  ], []);

  // Dynamic navItems based on isContactPage
  const navItems = useMemo(() => {
    if (isContactPage) {
      // Services-only navigation for contact/service pages
      return [
        {
          label: "Google Ads",
          href: "/Google-ads",
          icon: <FaGoogle className="text-blue-400" />
        },
        {
          label: "SEO",
          href: "/Seo",
          icon: <FaSearch className="text-green-400" />
        },
        {
          label: "Web Development",
          href: "/Web-development",
          icon: <FaCode className="text-purple-400" />
        },
        {
          label: "Contact",
          href: "/contact",
          icon: <FaCrosshairs className="text-pink-400" />
        }
      ];
    }

    // Full navigation for home page
    return [
      { label: "Performance", href: "#HomeSection", icon: <FaRocket className="mr-2" /> },
      { label: "Campaigns", href: "#AboutSection", icon: <FaAtom className="mr-2" /> },
      { 
        label: "Services", 
        href: "#Services",
        icon: <FaNetworkWired className="mr-2" />,
        subItems: [
          {
            label: "Google Ads",
            href: "/Google-ads",
            icon: <FaGoogle className="text-blue-400" />,
            description: "Search & Display campaigns",
            color: "#4285f4",
          },
          {
            label: "SEO",
            href: "/Seo",
            icon: <FaSearch className="text-green-400" />,
            description: "Search engine optimization",
            color: "#00ff9d",
          },
          {
            label: "Web Development",
            href: "/Web-development",
            icon: <FaCode className="text-purple-400" />,
            description: "Modern web solutions",
            color: "#7b2dff",
          },
        ],
      },
      { label: "Clients", href: "#TestimonySection", icon: <FaChartLine className="mr-2" /> },
      { label: "Contact", href: "/contact", icon: <FaCrosshairs className="mr-2" /> },
    ];
  }, [isContactPage]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside (only for home page)
  useEffect(() => {
    if (isContactPage) return; // Skip dropdown logic on contact pages

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          servicesItemRef.current && !servicesItemRef.current.contains(event.target)) {
        setIsServicesHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isContactPage]);

  // Keep dropdown open if either the menu item or dropdown is hovered (only for home page)
  useEffect(() => {
    if (isContactPage) return;

    const timer = setTimeout(() => {
      if (!isServicesHovered && !isDropdownHovered) {
        setIsServicesHovered(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [isServicesHovered, isDropdownHovered, isContactPage]);

  const updateIndicator = useCallback(() => {
    if (isNaN(activeIndex)) return;

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
    
    // Handle subItems only for home page
    if (navItems[index].subItems && !isContactPage) {
      if (window.innerWidth >= 768) {
        const targetSection = document.querySelector(href);
        targetSection?.scrollIntoView({ behavior: "smooth" });
        setActiveIndex(index);
      }
      if (window.innerWidth < 768) {
        setIsServicesClicked(!isServicesClicked);
      }
      return;
    }
    
    // Handle navigation
    if (href.startsWith("#") && !isContactPage) {
      const targetSection = document.querySelector(href);
      targetSection?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
    setActiveIndex(index);
    setIsMenuOpen(false);
    setIsServicesClicked(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isContactPage) {
      navigate('/');
    } else {
      const targetSection = document.querySelector("#HomeSection");
      targetSection?.scrollIntoView({ behavior: "smooth" });
      setActiveIndex(0);
    }
  };
const getMappedActiveIndex = () => {
  if (!isContactPage) {
    return activeIndex; // Use as-is for home page
  }
  
  // For service/contact pages, if activeIndex is within valid range, use it
  if (activeIndex >= 0 && activeIndex <= 3) {
    return activeIndex;
  }
  
  // Handle navigation from home page to service pages
  const homeToServiceMapping = {
    0: 0, // Performance → Google Ads (fallback)
    1: 0, // Campaigns → Google Ads (fallback)  
    2: 0, // Services → Google Ads (fallback)
    3: 1, // Clients → SEO (fallback)
    4: 3, // Contact → Contact ✅
  };
  
  return homeToServiceMapping[activeIndex] || 0;
};

  const mappedActiveIndex = getMappedActiveIndex();

  const handleSubItemClick = (href, e) => {
    e.preventDefault();
    if (href.startsWith("#") && !isContactPage) {
      const targetSection = document.querySelector(href);
      targetSection?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
    setIsMenuOpen(false);
    setIsServicesClicked(false);
    setIsServicesHovered(false);
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
            href={isContactPage ? "/" : "#HomeSection"}
            onClick={handleLogoClick}
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

          {/* Desktop Navigation - Always show, but different content based on isContactPage */}
          <div className="hidden md:flex items-center relative">
            <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm rounded-full p-2 border border-cyan-400/20">
              {navItems.map((item, index) => (
                <div 
                  key={index}
                  className="relative"
                  ref={item.subItems && !isContactPage ? servicesItemRef : null}
                  onMouseEnter={() => item.subItems && !isContactPage && setIsServicesHovered(true)}
                  onMouseLeave={() => item.subItems && !isContactPage && setTimeout(() => {
                    if (!isDropdownHovered) setIsServicesHovered(false);
                  }, 100)}
                >
                  <motion.a
                    href={item.href}
                    onClick={(e) => handleNavClick(index, e)}
                    className={`px-6 py-3 flex items-center text-sm font-medium transition-all nav-item relative rounded-full ${
                      mappedActiveIndex  === index 
                        ? "text-white bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-lg" 
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                    whileHover={{ 
                      scale: 1.05,
                      textShadow: `0 0 8px ${glowColors[index % glowColors.length]}`
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={`text-lg ${mappedActiveIndex === index ? 'text-cyan-400' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>
                    <span className="ml-2">{item.label}</span>
                    {item.subItems && !isContactPage && (
                      <motion.span 
                        className="ml-2 text-xs"
                        animate={{ rotate: isServicesHovered ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronDown />
                      </motion.span>
                    )}
                    
                    {/* Active indicator */}
                    {mappedActiveIndex === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.a>

                  {/* Enhanced Services Dropdown for Desktop - Only show on home page */}
                  {item.subItems && !isContactPage && (isServicesHovered || isDropdownHovered) && (
                    <motion.div
                      ref={dropdownRef}
                      className="absolute left-0 mt-2 w-80 origin-top-left bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-400/30 overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      onMouseEnter={() => setIsDropdownHovered(true)}
                      onMouseLeave={() => {
                        setIsDropdownHovered(false);
                        setTimeout(() => {
                          if (!isServicesHovered) setIsServicesHovered(false);
                        }, 100);
                      }}
                    >
                      {/* Dropdown Header */}
                      <div className="px-6 py-4 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                        <div className="flex items-center">
                          <motion.div
                            className="w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-lg flex items-center justify-center mr-3"
                            animate={{ 
                              boxShadow: [
                                "0 0 0px rgba(0, 240, 255, 0.4)",
                                "0 0 20px rgba(0, 240, 255, 0.4)",
                                "0 0 0px rgba(0, 240, 255, 0.4)"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <FaNetworkWired className="text-cyan-400" />
                          </motion.div>
                          <div>
                            <h3 className="text-white font-semibold">Our Services</h3>
                            <p className="text-xs text-gray-400 mt-1">Digital marketing solutions</p>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Items */}
                      <div className="py-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <motion.div
                            key={subIndex}
                            className="relative"
                            onMouseEnter={() => setHoveredSubItem(subIndex)}
                            onMouseLeave={() => setHoveredSubItem(null)}
                          >
                            <motion.a
                              href={subItem.href}
                              onClick={(e) => handleSubItemClick(subItem.href, e)}
                              className="block px-6 py-4 text-gray-300 hover:text-white transition-all group relative overflow-hidden"
                              whileHover={{ 
                                backgroundColor: "rgba(0, 240, 255, 0.1)",
                                x: 5
                              }}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: subIndex * 0.05 }}
                            >
                              {/* Hover background effect */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100"
                                initial={{ x: '-100%' }}
                                animate={{ x: hoveredSubItem === subIndex ? '100%' : '-100%' }}
                                transition={{ duration: 0.6 }}
                              />

                              <div className="flex items-center relative z-10">
                                <motion.div
                                  className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center mr-4 border border-gray-600/30"
                                  style={{ 
                                    borderColor: hoveredSubItem === subIndex ? subItem.color : 'rgba(75, 85, 99, 0.3)',
                                    boxShadow: hoveredSubItem === subIndex ? `0 0 15px ${subItem.color}40` : 'none'
                                  }}
                                  whileHover={{ 
                                    scale: 1.1,
                                    rotate: 5
                                  }}
                                >
                                  <span className="text-lg">
                                    {subItem.icon}
                                  </span>
                                </motion.div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-white group-hover:text-cyan-300 transition-colors">
                                      {subItem.label}
                                    </span>
                                    <motion.div
                                      className="w-2 h-2 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: hoveredSubItem === subIndex ? 1 : 0 }}
                                      transition={{ duration: 0.2 }}
                                    />
                                  </div>
                                  <p className="text-xs text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">
                                    {subItem.description}
                                  </p>
                                </div>
                              </div>

                              {/* Connection lines */}
                              <motion.div
                                className="absolute left-10 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: hoveredSubItem === subIndex ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                              />
                            </motion.a>
                          </motion.div>
                        ))}
                      </div>

                      {/* Neural network pattern in dropdown */}
                      <div className="absolute inset-0 pointer-events-none opacity-5">
                        <svg width="100%" height="100%" viewBox="0 0 100 100">
                          <defs>
                            <pattern id="dropdown-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-cyan-400">
                                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite"/>
                              </circle>
                              <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400/10"/>
                              <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400/10"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#dropdown-grid)"/>
                        </svg>
                      </div>

                      {/* Scanning line effect */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button - Always show */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 bg-transparent text-gray-300 hover:text-cyan-400 focus:outline-none border-cyan-400/20"
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
        </div>

        {/* Enhanced Mobile Menu - Always show when opened */}
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
              <div key={index}>
                <motion.a
                  href={item.href}
                  onClick={(e) => handleNavClick(index, e)}
                  className={`block px-6 py-4 rounded-xl text-base font-medium flex items-center transition-all ${
                    mappedActiveIndex === index && (!item.subItems || isContactPage)
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-400/30 shadow-lg" 
                      : "hover:bg-white/5 text-gray-300 hover:text-white"
                  }`}
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                    boxShadow: `0 0 20px ${glowColors[index % glowColors.length]}`
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className={`text-xl ${mappedActiveIndex === index ? 'text-cyan-400' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  <span className="ml-3">{item.label}</span>
                  {item.subItems && !isContactPage && (
                    <motion.span 
                      className="ml-auto text-sm"
                      animate={{ rotate: isServicesClicked ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronDown />
                    </motion.span>
                  )}
                  
                  {/* Active dot */}
                  {mappedActiveIndex === index && (!item.subItems || isContactPage) && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  )}
                </motion.a>

                {/* Enhanced Services Dropdown for Mobile - Only show on home page */}
                {item.subItems && !isContactPage && isServicesClicked && (
                  <motion.div
                    className="ml-4 mt-2 space-y-1 bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-cyan-400/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <motion.a
                        key={subIndex}
                        href={subItem.href}
                        onClick={(e) => handleSubItemClick(subItem.href, e)}
                        className="block px-4 py-3 text-sm text-gray-300 hover:bg-cyan-500/10 hover:text-white rounded-lg transition-all"
                        whileHover={{ 
                          x: 5,
                          backgroundColor: "rgba(0, 240, 255, 0.1)"
                        }}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: subIndex * 0.05 + 0.1 }}
                      >
                        <div className="flex items-center">
                          <motion.div
                            className="w-8 h-8 bg-black/40 rounded-lg flex items-center justify-center mr-3 border border-gray-600/30"
                            whileHover={{ 
                              scale: 1.1,
                              borderColor: subItem.color
                            }}
                          >
                            <span className="text-sm">
                              {subItem.icon}
                            </span>
                          </motion.div>
                          <div>
                            <div className="font-medium">{subItem.label}</div>
                            <div className="text-xs text-gray-400">{subItem.description}</div>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
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
