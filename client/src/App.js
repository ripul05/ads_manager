import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
<<<<<<< Updated upstream
import LandingForm from './LandingForm';
import NavBar from './NavBar';
import Vcards from './BuildUpInfo';
import SecondPage from './SecondPage';
import CarouselBackground from './Carousel';
import styled from "styled-components";
import introImage from "./images/intro_img.png"

function App() {
  return (
    <>
      <NavBar />

      <div id='HomeSection' className="position-relative" style={{ height: '120%' }}>
        <div className="row align-items-center position-absolute top-0 start-0 w-100" style={{ zIndex: 2 }}>
          <div className="col-md-8 d-flex justify-content-start align-items-center vh-100 ms-4 p-0">
            <div className="me-3 text-black width80 left110 left-section" id="leftInside" style={{ paddingLeft: '45px' }}>
              <img style={{ width: '25%' }} src="https://help.iubenda.com/wp-content/uploads/2020/06/google-ads.png" alt="Logo" className="mb-4" />
              <h1 style={{ fontWeight: 'bold' }}>Extreme Specialists in Google Ads</h1>
              <h2>We see what others can’t</h2>
              <p>Our entire business primarily specialises in Google Ads and Google Analytics 4. Google Ads is complex, mysterious even, but in the right capable hands...</p>
              <div className="d-flex gap-3 mt-3">
                <EmailBtn
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=yuktimainali2@gmail.com&su=Inquiry%20Email&body=Hi,%20I%20would%20like%20to%20inquire%20about%20Google%20Ads%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email us
                </EmailBtn>


                <ContactBtn href="tel:+918076016758" rel="noopener noreferrer">Call us now</ContactBtn>


              </div>

            </div>
            <div>
              <img style={imageStyle} src="https://digitaldynamollc.com/wp-content/uploads/2023/10/google-ads-management.png" alt="Image 2" />
            </div>
          </div>
        </div>

        <CarouselBackground />
      </div>

      <SecondPage />
      {/* <div id="ContactSection" style={{ height: '100vh', paddingTop: '8%' }}>
        <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Request a FREE 30 Min Account Review Call</h3>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '8%' }}>

            <h1 style={{ textAlign: 'left', fontWeight: 'bold' }}>Google Maps</h1>
          </div>
          <div className='bg-light p-5 width80 form-section col-md-4' id='rightInside' style={{ marginLeft: 'auto' }}>
            <LandingForm />
          </div>
        </div>
      </div> */}

    </>
=======
import HomePage from './homePage/homePage';
import AboutUs from './aboutPage/AboutPage';
import TestimonialPage from './testimonyPage/Testimony';
import ContactPage from './contactPage/ContactPage';

function App() {
  return (
    <div className="app-container"> 
      <HomePage/>
      <AboutUs/>
      <TestimonialPage/>
      <ContactPage/>
    </div>
>>>>>>> Stashed changes
  );
}
const EmailBtn = styled.a`
  color: white;
  text-decoration: none;
  background-color: rgba(10, 91, 191, 0.8);
  padding: 5px 20px;
  border-radius: 20px;
  transition: 0.5s;

  &:hover {
    background-color: rgba(10, 91, 191, 1);
  }
`;

const imageStyle = {
  position: 'absolute',
  top: '50%',
  right: '0.5%',
  transform: 'translateY(-50%)',
  width: '43%',
  height: '57%',
  zIndex: '4',
  opacity: '0.9',
};

const ContactBtn = styled.a`
  color: white;
  text-decoration: none;
  background-color: rgba(17, 139, 80, 0.8); 
  padding: 5px 18px;
  border-radius: 20px;
  transition: 0.5s;

  &:hover {
    background-color: rgb(17, 139, 80);
  }
`;



export default App;
