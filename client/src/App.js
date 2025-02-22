import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import LandingForm from './LandingForm';
import NavBar from './NavBar';
import Vcards from './BuildUpInfo';
import SecondPage from './SecondPage';
import CarouselBackground from './Carousel';
import styled from "styled-components";

function App() {
  return (
    <>
      <NavBar />

      <div className="position-relative" style={{ height: '120%' }}>
        <div className="row align-items-center position-absolute top-0 start-0 w-100" style={{ zIndex: 2 }}>
          <div className="col-md-8 d-flex justify-content-start align-items-center vh-100 ms-4 p-0">
            <div className="me-3 text-black width80 left110 left-section" id="leftInside" style={{ paddingLeft: '45px' }}>
              <img src="logo.png" alt="Logo" className="mb-4" />
              <h1 style={{ fontWeight: 'bold' }}>Extreme Specialists in Google Ads</h1>
              <h2>We see what others can’t</h2>
              <p>Our entire business primarily specialises in Google Ads and Google Analytics 4. Google Ads is complex, mysterious even, but in the right capable hands...</p>
              <div className="d-flex gap-3 mt-3">
                <EmailBtn href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">Email us</EmailBtn>
                <ContactBtn href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">Call Us Now</ContactBtn>

              </div>

            </div>
          </div>





          <div className="col-md-6">
            {/* <div className='bg-light p-5 width80 form-section' id='rightInside'>
              <h3>Request a FREE 30 Min Account Review Call</h3>
              <LandingForm />
            </div> */}
          </div>
        </div>

        <CarouselBackground />
      </div>

      <SecondPage />
    </>
  );
}
const EmailBtn = styled.a`
  color: white;
  text-decoration: none;
  background-color: #0a5bbf;
  padding: 5px 20px;
  border-radius: 20px;
  transition: 0.5s;

  &:hover {
    background-color: #0a3c66;
  }
`;


const ContactBtn = styled.a`
  color: white;
  text-decoration: none;
  background-color: rgb(17, 139, 80);
  padding: 5px 18px;
  border-radius: 20px;
  transition: 0.5s;

  &:hover {
    background-color: rgb(8, 75, 42);
  }
`;



export default App;
