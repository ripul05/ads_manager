import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Navbar from './NavBar';
import HomePage from '../homePage/homePage';
import AboutUs from '../aboutPage/AboutPage';
import Testimonial from '../testimonyPage/Testimony';
import { Routes, Route } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="content"> 
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/testimonials" element={<Testimonial />} />
        </Routes>
      </div>
    );
  };

  export default Navigation;