import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navigation from './navBar/Navigation';
import HomePage from './homePage/homePage';
import AboutUs from './aboutPage/AboutPage';
import Testimonial from './testimonyPage/Testimony';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app-container"> 
      <Navigation />
      <AboutUs/>
      <Testimonial/>
    </div>
  );
}

export default App;

