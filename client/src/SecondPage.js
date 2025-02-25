import React from "react";
import './SecondPage.css';
import LandingForm from './LandingForm';

function SecondPage() {
    return (
        <section id="AboutSection" class="creative-cards style-one" style={{ paddingBottom: '0', height: '100vh' }}>
            <div class="container">
                <div class="row">
                    <a href="https://www.fiverr.com/aliali44" className="card-column">
                        <div className="card-details">
                            <div className="card-icons">
                                <img className="light-icon" src="/images/pngwing.com.png" alt="icon" />
                            </div>
                            <h3>Google Ads</h3>
                            <p>We optimize campaigns on Google Ads to target high-intent keywords, ensuring maximum visibility and conversion rates.</p>
                            <span className="read-more-btn">
                                <i className="fa-solid fa-angles-right"></i>
                            </span>
                        </div>
                    </a>

                    {/* <a href="https://www.fiverr.com/aliali44" className="card-column">
                        <div className="card-details">
                            <div className="card-icons">
                                <img className="light-icon" src="/images/meta.png" alt="icon" />
                            </div>
                            <h3>Meta Ads</h3>
                            <p>On Meta Ads, we leverage detailed audience targeting and engaging ad formats to boost brand awareness and drive sales.</p>
                            <span className="read-more-btn">
                                <i className="fa-solid fa-angles-right"></i>
                            </span>
                        </div>
                    </a>

                    <a href="https://www.fiverr.com/aliali44" className="card-column">
                        <div className="card-details">
                            <div className="card-icons">
                                <img className="light-icon" src="/images/bing.png" alt="icon" />
                            </div>
                            <h3>Bing Ads</h3>
                            <p>With Bing Ads, we focus on competitive bidding strategies and optimizing ad placements to capture the attention of a unique audience.</p>
                            <span className="read-more-btn">
                                <i className="fa-solid fa-angles-right"></i>
                            </span>
                        </div>
                    </a> */}
                    <div className='bg-light p-5 width80 form-section col-md-4' id='rightInside' style={{ marginLeft: 'auto' }}>
                        <LandingForm />
                    </div>

                </div>
            </div>
        </section >
    )
}

export default SecondPage