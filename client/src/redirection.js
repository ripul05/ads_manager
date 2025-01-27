import React, { useState } from "react";

function GoogleAdsDetails() {
    const [activeIndex, setActiveIndex] = useState(1); // The middle card is the initial focus

    const cards = [
        {
            title: "Campaign Strategy",
            text: "Our team crafts tailored ad strategies to align with your business goals and audience preferences.",
        },
        {
            title: "Keyword Optimization",
            text: "We perform in-depth keyword research to target high-intent searches that convert.",
        },
        {
            title: "Performance Monitoring",
            text: "Using advanced analytics tools, we continuously monitor and optimize campaigns for maximum ROI.",
        },
    ];

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="google-ads-details container mt-5">
            <h1 className="text-center mb-4">Google Ads: A Powerful Tool for Your Business</h1>
            <div className="row align-items-center mb-5">
                {/* Left Section: Content */}
                <div className="col-md-6">
                    <h2>Why Choose Google Ads?</h2>
                    <p className="lead">
                        Google Ads is the world's most powerful advertising platform, reaching millions of potential customers daily.
                        With its advanced targeting options, you can reach your audience with precision, ensuring every ad dollar is
                        well-spent.
                    </p>
                    <ul>
                        <li><strong>High Intent Keywords:</strong> Target users actively searching for your product or service.</li>
                        <li><strong>Cost-Effective:</strong> Pay only when users click on your ad (PPC model).</li>
                        <li><strong>Measurable Results:</strong> Gain insights into your campaign's performance with detailed analytics.</li>
                        <li><strong>Global Reach:</strong> Expand your business to international markets.</li>
                        <li><strong>Customizable Budgets:</strong> Start small and scale your budget as you grow.</li>
                    </ul>
                </div>
                {/* Right Section: Image */}
                <div className="col-md-6">
                    <img
                        src="/images/google-ads-graphic.png"
                        alt="Google Ads Graphic"
                        className="img-fluid rounded shadow"
                    />
                </div>
            </div>

            <div className="why-our-agency text-center">
                <h2>How Can Our Agency Help You?</h2>
                <p className="lead">
                    At <strong>Kshitij's Agency</strong>, we specialize in creating and managing high-performing Google Ads campaigns.
                </p>

                {/* Cards Section with Navigation */}
                <div className="position-relative mt-4">
                    {/* Left Arrow */}
                    <button
                        className="btn btn-outline-primary position-absolute start-0 translate-middle-y top-50"
                        onClick={handlePrev}
                    >
                        &#8592;
                    </button>

                    {/* Cards */}
                    <div className="d-flex justify-content-center align-items-center">
                        {cards.map((card, index) => {
                            const position =
                                index === activeIndex
                                    ? "active"
                                    : index === (activeIndex - 1 + cards.length) % cards.length
                                    ? "left"
                                    : "right";

                            return (
                                <div
                                    key={index}
                                    className={`card-container ${position}`}
                                    style={{
                                        opacity: position === "active" ? 1 : 0.5,
                                        transform: position === "active" ? "scale(1.1)" : "scale(0.9)",
                                        transition: "all 0.3s",
                                    }}
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
                        className="btn btn-outline-primary position-absolute end-0 translate-middle-y top-50"
                        onClick={handleNext}
                    >
                        &#8594;
                    </button>
                </div>
            </div>

            <div className="text-center mt-5">
                <h3>Ready to Dominate Google Ads?</h3>
                <p>Contact us today for a free consultation!</p>
                <a href="#contact" className="btn btn-primary btn-lg">
                    Get Started
                </a>
            </div>
        </div>
    );
}

export default GoogleAdsDetails;
