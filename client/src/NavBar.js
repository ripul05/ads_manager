import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ ...navbarStyle, backgroundColor: scrolling ? '#E1E1E1' : 'transparent' }}>
      <div style={imgLinksStyle}>
        <h1 style={h1Style}>Kshitij's Agency</h1>
      </div>
      <div style={navLinksStyle}>
        <NavLink href="#EducationPage">Home</NavLink>
        <NavLink href="#SkillsPage">About</NavLink>
        <NavLink href="#ExperiencePage">Contact</NavLink>
      </div>
    </div>
  );
};

const imgLinksStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const h1Style = {
  fontSize: '26px',
  paddingTop: '10px',
  paddingLeft: '10px',
  fontWeight: 'bold'
};

const imgStyle = {
  borderRadius: '5px',
  width: '31px',
  height: '31px',
  marginBottom: '2%',
};

const NavLink = styled.a`
  color: black;
  text-decoration: none;
  font-size: 19px;
  font-weight: bold;
  position: relative;
  padding: 4.5px 20px;
  border-radius: 25px;
  transition: 0.8s;

  &:hover {
    background-color: #0a5bbf;
    border-radius: 25px;
    color: #fff;
  }
`;

const navbarStyle = {
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '95%',
  padding: '10px 20px',
  color: 'black',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '35px',
  zIndex: 3,
  transition: 'background-color 0.5s ease',  // Added transition for background color
};

const navLinksStyle = {
  display: 'flex',
  gap: '20px',
};

export default Navbar;
