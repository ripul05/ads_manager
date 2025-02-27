import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import LandingForm from './LandingForm';
import CarouselBackground from './Carousel';
import Navbar from './Navbar';
import styled from "styled-components";
function HomePage(){
    return(
<div id='HomeSection' className="relative min-h-screen overflow-hidden">
    {/* Background Carousel */}
    <div className="absolute inset-0 -z-10 w-full h-full">
        <CarouselBackground />
    </div>
    <Navbar/>
    {/* Main Content */}
    <div className="container relative z-10 mx-auto px-4 h-full mt-[10.5em]">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full pt-20 lg:pt-0">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 xl:w-2/5 text-black mb-12 lg:mb-0 lg:pr-8">
                <div className="max-w-lg">
                    <img 
                        src="https://help.iubenda.com/wp-content/uploads/2020/06/google-ads.png" 
                        alt="Logo" 
                        className="mb-6 w-32 md:w-40 lg:w-48"
                    />
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Extreme Specialists in Google Ads
                    </h1>
                    <h2 className="text-xl md:text-2xl lg:text-3xl mb-4">
                        We see what others can’t
                    </h2>
                    <p className="text-base md:text-lg mb-6">
                        Our entire business primarily specialises in Google Ads and Google Analytics 4. 
                        Google Ads is complex, mysterious even, but in the right capable hands...
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <EmailBtn
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=yuktimainali2@gmail.com&su=Inquiry%20Email&body=Hi,%20I%20would%20like%20to%20inquire%20about%20Google%20Ads%20services."
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Email us
                        </EmailBtn>
                        <ContactBtn href="tel:+918076016758" rel="noopener noreferrer">
                            Call us now
                        </ContactBtn>
                    </div>
                </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-1/2 xl:w-2/5 bg-white p-6 rounded-lg shadow-lg">
                <LandingForm />
            </div>
        </div>
    </div>
</div>


    )
}

// Update styled components with responsive styles
const EmailBtn = styled.a`
    color: white;
    text-decoration: none;
    background-color: rgba(10, 91, 191, 0.8);
    padding: 12px 24px;
    border-radius: 30px;
    transition: 0.3s;
    text-align: center;
    font-size: 1rem;

    &:hover {
        background-color: rgba(10, 91, 191, 1);
    }

    @media (max-width: 640px) {
        width: 100%;
        margin-bottom: 8px;
    }
`;

const ContactBtn = styled.a`
    color: white;
    text-decoration: none;
    background-color: rgba(17, 139, 80, 0.8);
    padding: 12px 24px;
    border-radius: 30px;
    transition: 0.3s;
    text-align: center;
    font-size: 1rem;

    &:hover {
        background-color: rgb(17, 139, 80);
    }

    @media (max-width: 640px) {
        width: 100%;
    }
`;

export default HomePage