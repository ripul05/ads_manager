import React, { useState } from 'react';
import '../index.css';
import LandingForm from './LandingForm';
import CarouselBackground from './Carousel';
import Navbar from './Navbar';
import styled from "styled-components";
import emailjs from 'emailjs-com';
import { FaGoogle } from 'react-icons/fa';

const EmailBtn = styled.button`
    color: white;
    background: linear-gradient(135deg, #4285F4 0%, #34A853 100%);
    padding: 12px 24px;
    border-radius: 30px;
    transition: all 0.3s ease;
    text-align: center;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
        background: linear-gradient(135deg, #3b78db 0%, #2d9746 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }
`;

const ContactBtn = styled.a`
    color: white;
    background: linear-gradient(135deg, #34A853 0%, #4285F4 100%);
    padding: 12px 24px;
    border-radius: 30px;
    transition: all 0.3s ease;
    text-align: center;
    font-size: 1rem;
    text-decoration: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
        background: linear-gradient(135deg, #2d9746 0%, #3b78db 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 30px;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;

    &:hover {
        color: #4285F4;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormTitle = styled.h2`
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    background: linear-gradient(135deg, #4285F4 0%, #34A853 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
    transition: all 0.3s ease;

    &:focus {
        border-color: #34A853;
        box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
        outline: none;
    }
`;

const TextArea = styled.textarea`
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
    resize: vertical;
    transition: all 0.3s ease;

    &:focus {
        border-color: #34A853;
        box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
        outline: none;
    }
`;

const SubmitButton = styled.button`
    background: linear-gradient(135deg, #4285F4 0%, #34A853 100%);
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(135deg, #3b78db 0%, #2d9746 100%);
        transform: translateY(-2px);
    }
`;

function HomePage() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [showThankYouModal, setShowThankYouModal] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message 
        };
    
        emailjs.send(
            'default_service',
            'template_sjqh0pr',
            templateParams,
            '4DFcmHNC_yAE52JpN'
        )
        .then((result) => {
            setFormData({ name: "", email: "", message: "" });
            setShowThankYouModal(true);  // 👈 Show thank you modal
            setShowModal(false);         // 👈 Hide the form modal if you had one
        }, (error) => {
            alert('Failed to send message. Please try again.');
        });
    };
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
      <div id="HomeSection" className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10 w-full h-full">
          <CarouselBackground />
          <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/20 to-[#34A853]/20" />
        </div>
        <Navbar />
        <div className="container relative z-10 mx-auto px-4 h-full mt-[10.5em]">
          <div className="flex flex-col lg:flex-row items-center justify-between h-full pt-20 lg:pt-0">
            <div className="w-full lg:w-1/2 xl:w-2/5 text-black mb-12 lg:mb-0 lg:pr-8">
              <div className="max-w-lg">
                <div className="mb-6 flex items-center gap-4">
                  <FaGoogle className="text-4xl text-[#4285F4]" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
                    Premier Partner
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
                  Google Ads Excellence
                </h1>
                <h2 className="text-xl md:text-2xl mb-4 text-gray-700">
                  Precision Campaigns for Maximum Conversions
                </h2>
                <p className="text-base md:text-lg mb-6 text-gray-600">
                  As certified Google Premier Partners, we architect data-driven
                  advertising solutions that convert browsers into buyers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <EmailBtn onClick={() => setShowModal(true)}>
                    Get Expert Consultation
                  </EmailBtn>
                  <ContactBtn href="tel:+918076016758">
                    Instant Connect
                  </ContactBtn>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 xl:w-2/5 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <LandingForm />
            </div>
          </div>
        </div>

        {showModal && (
          <ModalOverlay onClick={() => setShowModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={() => setShowModal(false)}>
                &times;
              </CloseButton>
              <Form onSubmit={handleSubmit}>
                <FormTitle>Get in touch</FormTitle>
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    required
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <TextArea
                    name="message"
                    placeholder="Your message "
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                  />
                </FormGroup>
                <SubmitButton type="submit">Send Message</SubmitButton>
              </Form>
            </ModalContent>
          </ModalOverlay>
        )}
        {showThankYouModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Thank You!
              </h2>
              <p className="text-gray-700 mb-6">
                Your message has been sent successfully. <br />
                Our experts will reach out to you soon!
              </p>
              <button
                onClick={() => setShowThankYouModal(false)}
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
}

export default HomePage;
