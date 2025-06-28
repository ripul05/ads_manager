import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeColors = ["#EA4335", "#34A853", "#4285F4"];

  const navItems = [
    { label: "Home", href: "#HomeSection" },
    { label: "About", href: "#AboutSection" },
    { label: "Testimonials", href: "#TestimonySection" },
    { label: "Contact Us", href: "/contact" }, // ← updated
  ];

  useEffect(() => {
    const hash = window.location.hash;
    const storedIndex = localStorage.getItem("activeIndex");
    const initialIndex = hash
      ? navItems.findIndex((item) => item.href === hash)
      : parseInt(storedIndex, 10) || 0;

    setActiveIndex(initialIndex >= 0 ? initialIndex : 0);

    const handleScroll = () => {
      const sections = navItems.map((item) =>
        document.querySelector(item.href)
      );
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveIndex(index);
            localStorage.setItem("activeIndex", index);
            window.history.replaceState(null, "", navItems[index].href);
          }
        }
      });
    };

    if (hash) {
      const targetSection = document.querySelector(hash);
      targetSection?.scrollIntoView({ behavior: "auto" });
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateIndicator = () => {
    const indicator = document.querySelector(".nav-indicator");
    const activeItem = document.querySelector(
      `.nav-item:nth-child(${activeIndex + 1})`
    );

    if (indicator && activeItem) {
      indicator.style.width = `${activeItem.offsetWidth}px`;
      indicator.style.left = `${activeItem.offsetLeft}px`;
      indicator.style.backgroundColor = activeColors[activeIndex];
    }
  };

  useEffect(updateIndicator, [activeIndex]);
  useEffect(() => window.addEventListener("resize", updateIndicator), []);

  const handleNavClick = (index, e) => {
    const href = navItems[index].href;

    if (href.startsWith("#")) {
      e.preventDefault();
      const targetSection = document.querySelector(href);
      targetSection?.scrollIntoView({ behavior: "smooth" });
      setActiveIndex(index);
      setIsMenuOpen(false);
      localStorage.setItem("activeIndex", index);
      // Optional: Update URL without causing a reload
      window.history.replaceState(null, "", window.location.pathname + href);
    } else {
      // Let React Router handle navigation (e.g., /contact)
      e.preventDefault(); // Prevent full page reload
      navigate(href); // Programmatic navigation
      setActiveIndex(index);
      setIsMenuOpen(false);
      localStorage.setItem("activeIndex", index);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    // Same behavior as Home button (index 0)
    const targetSection = document.querySelector("#HomeSection");
    targetSection?.scrollIntoView({ behavior: "smooth" });
    setActiveIndex(0);
    localStorage.setItem("activeIndex", "0");
    window.history.replaceState(null, "", window.location.pathname + "#HomeSection");
  };

  return (
    <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a href="#HomeSection" onClick={handleLogoClick} className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-9 h-9 rounded-full bg-[conic-gradient(at_left_top,#EA4335_110deg,#4285F4_90deg_180deg,#34A853_180deg_270deg,#FBBC05_270deg)]" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
                BuzzBandits
              </h1>
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center relative">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleNavClick(index, e)}
                className={`px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors nav-item ${
                  activeIndex === index ? "font-semibold" : ""
                }`}
                style={{
                  color: activeIndex === index ? activeColors[index] : "",
                }}
              >
                {item.label}
              </a>
            ))}
            <span className="absolute bottom-0 h-1 transition-all duration-300 nav-indicator" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
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
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  if (!item.href.startsWith("#")) {
                    e.preventDefault(); // Prevent full page reload for routes
                    navigate(item.href); // Use React Router's navigation
                  }
                  setActiveIndex(index);
                  setIsMenuOpen(false);
                  localStorage.setItem("activeIndex", index);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeIndex === index ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
                style={{
                  color:
                    activeIndex === index ? activeColors[index] : "#4B5563",
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;