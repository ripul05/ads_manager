import React, { useState } from "react";
import './SecondPage.css'
import GoogleAdsDetails from "./redirection";

function SecondPage(){
    const [selectedPage, setSelectedPage] = useState("");

    const handleRedirection = (page) => {
        setSelectedPage(page);
    };

    if (selectedPage === "googleAds") {
        return <GoogleAdsDetails />;
    }

    return (
      <section class="creative-cards style-one">
        <div class="container">
          <div class="row">
            <div class="card-column">
              <div class="card-details">
                <div class="card-icons">
                  <img
                    class="light-icon"
                    src="/images/pngwing.com.png"
                    alt="icon"
                  />
                </div>
                <h3><a onClick={() => handleRedirection("googleAds")}>Google Ads</a>                </h3>
                <p>
                  We optimize campaigns on Google Ads to target high-intent
                  keywords, ensuring maximum visibility and conversion rates.
                </p>
                <a class="read-more-btn"  onClick={() => handleRedirection("googleAds")}>
                  <i class="fa-solid fa-angles-right"></i>
                </a>
              </div>
            </div>
            <div class="card-column">
              <div class="card-details">
                <div class="card-icons">
                  <img class="light-icon" src="/images/meta.png" alt="icon" />
                </div>
                <h3>
                  <a href="https://www.fiverr.com/aliali44">Meta Ads</a>
                </h3>
                <p>
                  On Meta Ads, we leverage detailed audience targeting and
                  engaging ad formats to boost brand awareness and drive sales.
                </p>
                <a class="read-more-btn" href="https://www.fiverr.com/aliali44">
                  <i class="fa-solid fa-angles-right"></i>
                </a>
              </div>
            </div>
            <div class="card-column">
              <div class="card-details">
                <div class="card-icons">
                  <img class="light-icon" src="/images/bing.png" alt="icon" />
                </div>
                <h3>
                  <a href="https://www.fiverr.com/aliali44">Bing Ads</a>
                </h3>
                <p>
                  With Bing Ads, we focus on competitive bidding strategies and
                  optimizing ad placements to capture the attention of a unique
                  audience.
                </p>
                <a class="read-more-btn" href="https://www.fiverr.com/aliali44">
                  <i class="fa-solid fa-angles-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default SecondPage