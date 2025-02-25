import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [activeLink, setActiveLink] = useState("#HomeSection");

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Set active link based on the current page (hash in the URL)
    setActiveLink(window.location.hash || "#HomeSection");

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Listen for hash change to update active link
    const handleHashChange = () => {
      setActiveLink(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div
      style={{
        ...navbarStyle,
        backgroundColor: scrolling ? "#E1E1E1" : "transparent",
      }}
    >
      <div style={imgLinksStyle}>
        <h1 style={h1Style}>Kshitij's Agency</h1>
      </div>
      <div style={navLinksStyle}>
        <NavLink
          href="#HomeSection"
          isActive={activeLink === "#HomeSection"}
        >
          Home
        </NavLink>
        <NavLink
          href="#AboutSection"
          isActive={activeLink === "#AboutSection"}
        >
          Let's Connect
        </NavLink>
        {/* <NavLink href="#ContactSection" isActive={activeLink === "#ContactSection"}>
          Contact
        </NavLink> */}
      </div>
    </div>
  );
};

const imgLinksStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const h1Style = {
  fontSize: "26px",
  paddingTop: "10px",
  paddingLeft: "10px",
  fontWeight: "bold",
};

const imgStyle = {
  borderRadius: "5px",
  width: "31px",
  height: "31px",
  marginBottom: "2%",
};

const NavLink = styled.a`
  color: black;
  text-decoration: none;
  font-size: 17px;
  font-weight: bold;
  position: relative;
  padding: 3px 15px;
  border-radius: 25px;
  transition: 0.5s;
  background-color: ${({ isActive }) => (isActive ? "rgba(10, 91, 191, 0.6)" : "transparent")};
  color: ${({ isActive }) => (isActive ? "#fff" : "black")};

  &:hover {
    background-color: rgba(10, 91, 191, 0.9);
    border-radius: 25px;
    color: #fff;
  }
`;

const navbarStyle = {
  position: "fixed",
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "95%",
  padding: "5px 20px",
  color: "black",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "35px",
  zIndex: 3,
  transition: "background-color 0.5s ease", // Added transition for background color
};

const navLinksStyle = {
  display: "flex",
  gap: "20px",
};

export default Navbar;