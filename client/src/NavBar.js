import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'

function NavBar({ onNavigate }) {
    const handleNavigate = (page) => {
        onNavigate(page);
        if (page === 'home') {
            // Scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // Smooth scrolling effect
            });
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-1">
                <a
                    className="navbar-brand"
                    href="#"
                    onClick={() => handleNavigate('home')}
                >
                    Kshitij's Agency
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button
                                className="btn nav-link"
                                onClick={() => handleNavigate('home')}
                            >
                                Home
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="btn nav-link"
                                onClick={() => handleNavigate('about')}
                            >
                                About
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

function About({ onNavigate }) {
    const handleNavigate = (page) => {
        onNavigate(page);
        if (page === 'home') {
            // Scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // Smooth scrolling effect
            });
        }
    };
    return (
        <div id="about" className="container mt-5 pt-5">
            <h1 className="text-center my-4">About Kshitij's Agency</h1>
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h2 className="mb-3">Your Growth is Our Mission</h2>
                    <p className="lead">
                        At <strong>Kshitij's Agency</strong>, we specialize in crafting innovative and
                        performance-driven advertising strategies that help your business stand out
                        in today's competitive market. Our team of experts works tirelessly to
                        deliver tailored solutions designed to attract, engage, and convert your audience.
                    </p>
                    <p>
                        Whether you're a startup looking to build your brand identity or an
                        established company aiming to expand your digital reach, we've got you covered.
                        Our creative campaigns, data-driven insights, and cutting-edge tools ensure
                        maximum ROI for your advertising investments.
                    </p>
                </div>
                <div className="col-md-6">
                    <img
                        src="https://via.placeholder.com/500x300"
                        alt="About Us"
                        className="img-fluid rounded shadow"
                    />
                </div>
            </div>
            <WhyChooseUs/>
            <div className="text-center mt-5">
                <h3>Ready to Elevate Your Brand?</h3>
                <p className="mb-4">Let us help you create campaigns that make a difference.</p>
                <button className="btn btn-primary btn-lg" onClick={() => handleNavigate('home')}>
                    Contact Us Today
                </button>
            </div>
        </div>
    );
}

function WhyChooseUs() {
    const [activeIndex, setActiveIndex] = useState(1); // The middle card is the initial focus

    const cards = [
        {
            title: 'Creative Excellence',
            text: 'Our campaigns are powered by creativity that resonates and drives action.',
        },
        {
            title: 'Data-Driven Results',
            text: 'We leverage analytics to make smarter decisions and achieve measurable outcomes.',
        },
        {
            title: 'Personalized Strategies',
            text: 'Every business is unique. Our solutions are tailored to fit your goals.',
        },
    ];

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="mt-5">
            <h2 className="text-center mb-4">Why Choose Us?</h2>
            <div className="position-relative text-center">
                {/* Left Arrow */}
                <button
                    className="btn btn-secondary position-absolute start-0 translate-middle-y top-50"
                    onClick={handlePrev}
                >
                    &#8592;
                </button>

                {/* Cards */}
                <div className="d-flex justify-content-center align-items-center">
                    {cards.map((card, index) => {
                        const position =
                            index === activeIndex
                                ? 'active'
                                : index === (activeIndex - 1 + cards.length) % cards.length
                                ? 'left'
                                : 'right';

                        return (
                            <div
                                key={index}
                                className={`card-container ${position}`}
                            >
                                <div className="p-4 shadow rounded text-center">
                                    <h3 className="mb-3">{card.title}</h3>
                                    <p>{card.text}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right Arrow */}
                <button
                    className="btn btn-secondary position-absolute end-0 translate-middle-y top-50"
                    onClick={handleNext}
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
}

export { NavBar, About };

