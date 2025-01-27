import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css'; // Your custom CSS
import LandingForm from './LandingForm'; // Assuming LandingForm is in the same folder
import { NavBar, About } from './NavBar'; // Import NavBar and About components
import Vcards from './BuildUpInfo';
import SecondPage from './SecondPage';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    return (
        <>
            {/* NavBar with navigation handler */}
            <NavBar onNavigate={setCurrentPage} />
            <div className="pt-5">
                {currentPage === 'home' && (
                    <div className="row align-items-center vh-100">
                        <div className="col-md-6">
                            <div className="me-3 text-black p-5 width80 left110 left-section">
                                <img src="logo.png" alt="Logo" className="mb-4" />
                                <h1>Extreme Specialists in Google Ads</h1>
                                <h2>We see what others can’t</h2>
                                <p>
                                    Our entire business primarily specialises in Google Ads and Google Analytics 4. 
                                    Google Ads is complex, mysterious even, but in the right capable hands...
                                </p>
                                <div className="d-flex gap-3 mt-3">
                                    <button className="btn btn-primary">Call Us Now</button>
                                    <button className="btn btn-success">Email us</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="bg-light p-5 width80 form-section">
                                <h3>Request a FREE 30 Min Account Review Call</h3>
                                <LandingForm />
                            </div>
                        </div>
                    </div>
                )}
                {currentPage === 'about' && <About onNavigate={setCurrentPage}/>}
            </div>

            <SecondPage />
        </>
    );
}

export default App;
