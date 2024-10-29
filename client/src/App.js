import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css'; // Your custom CSS
import LandingForm from './LandingForm'; // Assuming LandingForm is in the same folder
import NavBar from './NavBar';
import Vcards from './BuildUpInfo';


function App() {
  return (
    <>
    <div className="container-fluid">
      <NavBar/>
      <div className="row align-items-center vh-100">
        {/* Left Div: Content with animated background */}
        <div className="col-md-6 ">
          <div className="me-3 text-white p-5 width80 left110 left-section" id='leftInside'>

            <img src="logo.png" alt="Logo" className="mb-4" /> {/* Replace with your logo */}
            <h1>Extreme Specialists in Google Ads</h1>
            <h2>We see what others can’t</h2>
            <p>Our entire business primarily specialises in Google Ads and Google Analytics 4. Google Ads is complex, mysterious even, but in the right capable hands...</p>
            <div className="d-flex gap-3 mt-3">
              <button className="btn btn-primary">Call Us Now</button>
              <button className="btn btn-success">Start Live Chat</button>
            </div>
          </div>
        </div>

        {/* Right Div: Form */}
        <div className="col-md-6 ">
          <div className='bg-light p-5 width80 form-section' id='rightInside'>
            <h3>Request a FREE 30 Min Account Review Call</h3>
            <LandingForm />

          </div>
        </div>
      </div>

    </div>
    
    <Vcards></Vcards>
    </>
  );
}

export default App;
