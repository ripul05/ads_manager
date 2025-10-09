import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import HomePage from "./Home/Home";
import { ContactPage } from "./ContactPage/ContactPage";
import AboutUs from "./aboutPage/AboutPage";
import TestimonialPage from "./testimonyPage/Testimony";
import ServicesPage from "./services/services";
import GoogleAdsPage from "./services/googleAds";
import SEOPage from "./services/seo";
import WebDevPage from "./services/webDevelopment";
import Footer from "./Home/footer";
import WebsiteReviewPage from "./WebsiteReview/websiteReview";
function App() {
  const [activeIndex, setActiveIndex] = useState(0); // ✅ Lifted state
  useEffect(() => {
    // Fire and forget the GET request
    fetch(`${process.env.REACT_APP_API_BASE_URL}requestCallback/serverUp`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).catch((err) => {
      // Optional: log error or ignore
      console.error("Server check failed:", err);
    });
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app-container">
            <HomePage
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
            <WebsiteReviewPage />
            <AboutUs setActiveIndex={setActiveIndex} />
            <ServicesPage setActiveIndex={setActiveIndex} />
            <Footer />
          </div>
        }
      />
      <Route
        path="/Google-ads"
        element={<GoogleAdsPage setActiveIndex={setActiveIndex} />}
      />
      <Route
        path="/Web-development"
        element={<WebDevPage setActiveIndex={setActiveIndex} />}
      />
      <Route
        path="/Seo"
        element={<SEOPage setActiveIndex={setActiveIndex} />}
      />
      <Route
        path="/contact"
        element={<ContactPage setActiveIndex={setActiveIndex} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
