import React, { useState } from 'react';
import './ContactPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



const ContactPage = () => {
    const [email, setEmail] = useState('');
    const [accepted, setAccepted] = useState(false); // Keep track of the checkbox state (optional)
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubscribed(true);
        // Simulate sending the email (in real apps, handle backend integration here)
        setEmail('');
        setAccepted(false);
    };

    return (
        <div id="ContactSection">
            <h2 className="subscribe-heading">Let's stay in touch!<br /></h2>
        <div className="subscribe-container">
            {!subscribed ? (
                <>
                    
                    <form onSubmit={handleSubmit} className="subscribe-form">
                        <div className="input-button-wrapper">
                            <div className="input-wrapper">
                                <span className="input-icon">📧</span>
                                <input
                                    type="email"
                                    placeholder="Ex. yourname@mycompany.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="subscribe-input"
                                />
                            </div>
                            <button type="submit" className="subscribe-button">Contact Us</button>
                        </div>
                        <p className="consent-text">
                            By clicking the button below, you consent for our company and partners
                            to contact you at the email address provided.
                        </p>
                        
                    </form>
                </>
            ) : (
                <div className="thank-you-message">
                <div className="checkmark"></div>
                <h2 className="subscribe-heading">Thank you!</h2>
                <p>
                  We've sent your free report to your inbox so it's easy to access.
                  You can find more information on our website and social pages.
                </p>
          
                {/* Social links */}
                
              </div>

            )}
            <div className="social-links">
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
        </div>
        </div>
    );
};

export default ContactPage;
