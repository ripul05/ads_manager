import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomePage from './homePage/homePage';
import AboutUs from './aboutPage/AboutPage';
import TestimonialPage from './testimonyPage/Testimony';

function App() {
  return (
    <div className="app-container"> 
      <HomePage/>
      <AboutUs/>
      <TestimonialPage/>
    </div>
  );
}

export default App;