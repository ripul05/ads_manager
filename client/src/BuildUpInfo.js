import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BuildUpInfo.css';

const YourComponent = () => {
    const vcardsJson = {
      GoogleAds: {
        title: "Google Ads",
        desc: "We optimize campaigns on Google Ads to target high-intent keywords, ensuring maximum visibility and conversion rates.",
        img: "/images/googleads.png",
      },
      MetaAds: {
        title: "Meta Ads",
        desc: "On Meta Ads, we leverage detailed audience targeting and engaging ad formats to boost brand awareness and drive sales.",
        img: "/images/metaAds.png",
      },
      BingAds: {
        title: "Bing Ads",
        desc: "With Bing Ads, we focus on competitive bidding strategies and optimizing ad placements to capture the attention of a unique audience.",
        img: "/images/bingAds.png",
      },
    };
  
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollerRef = useRef(null);
    const totalItems = Object.keys(vcardsJson).length;
  
    const handleScroll = (direction) => {
      const scroller = scrollerRef.current;
      if (direction === 'next') {
        setCurrentIndex((prev) => Math.min(prev + 1, totalItems - 1));
        scroller.scrollBy(380, 0);
      } else if (direction === 'prev') {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
        scroller.scrollBy(-380, 0);
      }
    };
  
    return (
      <section className="section">
        <div className="wrapper">
          <div className="large-screen-layout-wrapper">
            <div className="section-content">
              <header className="header">
                <h2 className="section-title">We are Experts in dealing with:</h2>
              </header>
  
              <div className="section-visual-group">
                <div 
                  id="scroller" 
                  className="horizontal-scroller" 
                  role="group" 
                  aria-label="Items Scroller" 
                  aria-live="polite"
                  ref={scrollerRef}
                >
                  {Object.entries(vcardsJson).map(([key, { title, desc, img }], index) => (
                      <div 
                        key={key} 
                        className={`visual ${currentIndex === index ? 'snapped' : ''}`} 
                        aria-label={`${index + 1} of ${totalItems}`} 
                        aria-roledescription="item"
                      >
                        {/* Card Structure */}
                        <div className="card">
                          <img className="scroller-img" src={img} alt={title} />
                          <div className="visual-info">
                            <h3>{title}</h3>
                            <p>{desc}</p>
                          </div>
                        </div>
                        {/* End of Card Structure */}              
                      </div>
                    ))}
        
                </div>
                <a href="#" className=" cta-btn">
                  <span className="btn-group">
                    <span className="btn btn-danger">Buy Now</span>
                    <svg aria-hidden="true" className="btn-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                      <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
  
          <div className="small-screen-layout-wrapper">
            <ul className="cards">
              {Object.entries(vcardsJson).map(([key, { title, desc, img }]) => (
                <li key={key} className="card">
                  <figure className="figure">
                    <picture className="picture">
                      <img className="card-img" src={img} alt={title} />
                    </picture>
                    <figcaption className="figcaption">
                      <h3 className="card-title">{title}</h3>
                      <p className="card-desc">{desc}</p>
                    </figcaption>
                  </figure>
                  <a href="#" className="btn btn-danger">Buy Now</a>
                </li>
              ))}
            </ul>
          </div>
  
          <div className="section-controls">
            <div className="scroller-controls">
              <button 
                onClick={() => handleScroll('prev')} 
                className="scroller-controls-btn prev-btn" 
                aria-label="Previous Item" 
                title="Previous Item"
                disabled={currentIndex === 0}
              >
                <svg aria-hidden="true" width="61" height="40" viewBox="0 0 61 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M20 38C10.0589 38 2 29.9411 2 20C2 10.0589 10.0589 2 20 2C29.9411 2 38 10.0589 38 20C38 29.9411 29.9411 38 20 38ZM20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20C40 31.0457 31.0457 40 20 40Z" />
                  <path className="arrow" fillRule="evenodd" clipRule="evenodd" d="M21.25 25.3923L16 20.1962L21.25 15V19.1962H61V21.1962H21.25V25.3923Z" />
                </svg>
              </button>
              <button 
                onClick={() => handleScroll('next')} 
                className="scroller-controls-btn next-btn" 
                aria-label="Next Item" 
                title="Next Item"
                disabled={currentIndex === totalItems - 1}
              >
                <svg aria-hidden="true" width="62" height="40" viewBox="0 0 62 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path className="circle" fillRule="evenodd" clipRule="evenodd" d="M41.5001 38C51.4412 38 59.5001 29.9411 59.5001 20C59.5001 10.0589 51.4412 2 41.5001 2C31.559 2 23.5001 10.0589 23.5001 20C23.5001 29.9411 31.559 38 41.5001 38ZM41.5001 40C52.5458 40 61.5001 31.0457 61.5001 20C61.5001 8.9543 52.5458 0 41.5001 0C30.4544 0 21.5001 8.9543 21.5001 20C21.5001 31.0457 30.4544 40 41.5001 40Z" />
                  <path className="arrow" fillRule="evenodd" clipRule="evenodd" d="M40.2501 25.3923L45.5001 20.1962L40.2501 15V19.1962H0.500122V21.1962H40.2501V25.3923Z" />
                </svg>
              </button>
            </div>
            <a href="#" className="btn-redirection">
              <span className="btn-redirection-content-group">
                <svg aria-hidden="true" className="btn-redirection-svg" width="23" height="10" viewBox="0 0 23 10" fill="var(--brand-color)" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M17.75 9.52628L23 4.76314L17.75 0V4.26314H0V5.26314H17.75V9.52628Z" />
                </svg>
                <span className="btn-redirection-text">Go to online store</span>
              </span>
            </a>
          </div>
        </div>
      </section>
    );
  };
  
  export default YourComponent;