import React from "react";
import './SecondPage.css';
import LandingForm from './LandingForm';

function SecondPage() {
    return (
        <section class="creative-cards style-one" style={{ paddingBottom: '0', height: '100vh' }}>
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


                </div>
            </div>
        </section >
    )
}

export default SecondPage