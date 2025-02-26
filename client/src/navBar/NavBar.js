// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Testimonials', path: '/testimonials' },
  ];

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  return (
    <NavContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      }}
    >
      <Brand whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
        <GoogleIcon />
        <h1>BuzzBandits</h1>
      </Brand>

      <NavItems>
        {navItems.map((item) => (
          <NavLink 
            key={item.path}
            to={item.path}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {item.name}
            <HoverLine
              transition={{ duration: 0.3 }}
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: location.pathname === item.path ? 1 : 0,
                backgroundColor: location.pathname === item.path ? '#4285F4' : '#EA4335'
              }}
            />
          </NavLink>
        ))}
      </NavItems>

      <MenuButton
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.95 }}
      >
        <MenuIcon isOpen={isMenuOpen} />
      </MenuButton>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item) => (
              <MobileNavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

// Styled Components
const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1.5rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

const Brand = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;

  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(45deg, #4285F4, #34A853);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const GoogleIcon = styled.div`
  width: 35px;
  height: 35px;
  background: conic-gradient(
    from -45deg,
    #ea4335 110deg,
    #4285f4 90deg 180deg,
    #34a853 180deg 270deg,
    #fbbc05 270deg
  );
  border-radius: 50%;
`;

const NavItems = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion(Link))`
  position: relative;
  color: #5f6368;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    color: #202124;
  }
`;

const HoverLine = styled(motion.div)`
  width: 100%;
  height: 2px;
  margin-top: 0.25rem;
`;

const MenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuIcon = styled.div`
  width: 30px;
  height: 2px;
  background: ${({ isOpen }) => isOpen ? 'transparent' : '#4285F4'};
  position: relative;
  transition: all 0.3s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: #4285F4;
    transition: all 0.3s ease;
  }

  &::before {
    transform: ${({ isOpen }) => isOpen ? 'rotate(45deg)' : 'translateY(-8px)'};
  }

  &::after {
    transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg)' : 'translateY(8px)'};
  }
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 5%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 200px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const MobileNavLink = styled(Link)`
  color: #5f6368;
  text-decoration: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(66, 133, 244, 0.1);
    color: #4285F4;
  }
`;

export default Navbar;