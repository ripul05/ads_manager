import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import LandingForm from './LandingForm';
import CarouselBackground from './Carousel';
import Navbar from './Navbar';
import styled from "styled-components";
import emailjs from 'emailjs-com';

const EmailBtn = styled.button`
    color: white;
    background-color: rgba(10, 91, 191, 0.8);
    padding: 12px 24px;
    border-radius: 30px;
    transition: 0.3s;
    text-align: center;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background-color: rgba(10, 91, 191, 1);
    }
`;

const ContactBtn = styled.a`
    color: white;
    background-color: rgba(17, 139, 80, 0.8);
    padding: 12px 24px;
    border-radius: 30px;
    transition: 0.3s;
    text-align: center;
    font-size: 1rem;
    text-decoration: none;

    &:hover {
        background-color: rgb(17, 139, 80);
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
        color: rgba(10, 91, 191, 1);;
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
    color: rgb(61, 61, 61);
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
    &:focus {
        border-color: #A31D1D;
    }
`;

const TextArea = styled.textarea`
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
    resize: vertical;
    &:focus {
        border-color: #A31D1D;
    }
`;

const SubmitButton = styled.button`
    background-color: rgba(10, 91, 191, 1);
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
`;

function HomePage() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message 
        };

        emailjs.send(
            'default_service',  //service id
            'template_sjqh0pr',   //template id
            templateParams,
            '4DFcmHNC_yAE52JpN'    //user id
        )
        .then((result) => {
            alert('Message sent successfully!');
            setFormData({ name: "", email: "", message: "" });
            setShowModal(false);
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
        <div id='HomeSection' className="relative min-h-screen overflow-hidden">
            <div className="absolute inset-0 -z-10 w-full h-full">
                <CarouselBackground />
            </div>
            <Navbar />
            <div className="container relative z-10 mx-auto px-4 h-full mt-[10.5em]">
                <div className="flex flex-col lg:flex-row items-center justify-between h-full pt-20 lg:pt-0">
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
                            <p className="text-base md:text-lg mb-6 text-justify">
                                Our entire business primarily specialises in Google Ads and Google Analytics 4.
                                Google Ads is complex, mysterious even, but in the right capable hands...
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <EmailBtn onClick={() => setShowModal(true)}>
                                    Email us
                                </EmailBtn>
                                <ContactBtn href="tel:+918076016758">
                                    Call us now
                                </ContactBtn>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 xl:w-2/5 bg-white p-6 rounded-lg shadow-lg">
                        <LandingForm />
                    </div>
                </div>
            </div>

            {showModal && (
                <ModalOverlay onClick={() => setShowModal(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
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
        </div>
    );
}

export default HomePage;
