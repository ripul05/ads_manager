import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navbar from './navBar/NavBar'
import HomePage from './homePage/homePage';
import AboutUs from './aboutPage/AboutPage';
import Testimonial from './testimonyPage/Testimony';
function App() {
  return (
    <>
      <Navbar /> 
      <HomePage/>
      <AboutUs/>
      <Testimonial/>


    </>
  );
}


export default App;