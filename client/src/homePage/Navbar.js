import React, { useState, useEffect } from 'react';
import './homePage.css';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeColors = ['red', 'green', 'blue'];
  
  const navItems = [
    { label: `Let's Connect`, href: '#HomeSection' },
    { label: 'About', href: '#AboutSection' },
    { label: 'Testimonials', href: '#TestimonySection' },
  ];

  useEffect(() => {
    const hash = window.location.hash;
    const storedIndex = localStorage.getItem('activeIndex');
    const initialIndex = hash 
      ? navItems.findIndex(item => item.href === hash)
      : parseInt(storedIndex, 10) || 0;

    setActiveIndex(initialIndex >= 0 ? initialIndex : 0);

    const handleScroll = () => {
      let closestIndex = 0;
      let minDistance = Infinity;

      navItems.forEach((item, index) => {
        const section = document.querySelector(item.href);
        if (section) {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveIndex(closestIndex);
      localStorage.setItem('activeIndex', closestIndex);
      window.history.replaceState(null, '', navItems[closestIndex].href);
    };

    if (hash) {
      const targetSection = document.querySelector(hash);
      if (targetSection) {
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'auto' });
        }, 100);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const indicator = document.querySelector('.nav-indicator');
    const items = document.querySelectorAll('.nav-item');
    const activeItem = items[activeIndex];

    if (indicator && activeItem) {
      indicator.style.width = `${activeItem.offsetWidth}px`;
      indicator.style.left = `${activeItem.offsetLeft}px`;
      indicator.style.backgroundColor = activeColors[activeIndex];
    }
  }, [activeIndex]);

  const handleClick = (index, e) => {
    e.preventDefault();
    const targetSection = document.querySelector(navItems[index].href);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      setActiveIndex(index);
      localStorage.setItem('activeIndex', index);
      window.history.replaceState(null, '', navItems[index].href);
    }
  };

  return (
    <nav className="nav">
      <BrandLink to="/">
        <Brand whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <GoogleIcon />
          <h1>BuzzBandits</h1>
        </Brand>
      </BrandLink>

      <NavItems>
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`nav-item ${activeIndex === index ? 'is-active' : ''}`}
            style={{ color: activeIndex === index ? activeColors[index] : '#3D3D3D' }}
            onClick={(e) => handleClick(index, e)}
          >
            {item.label}
          </a>
        ))}
      </NavItems>
      <span className="nav-indicator"></span>
    </nav>
  );
};


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

const Brand = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  padding: 7px 0;

  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(45deg, #4285F4, #34A853);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const BrandLink = styled(Link)`
  text-decoration: none;
  display: flex; /* Added to align it to the left */
`;

const NavItems = styled.div`
  display: flex;
  margin-left: auto; /* This pushes the nav items to the right */
  gap: 20px; /* Adds some space between nav items */
  align-items: center;
`;

export default Navbar;
