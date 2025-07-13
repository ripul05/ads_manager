import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomePage from './Home/Home';
import {ContactPage} from './ContactPage/ContactPage';
import AboutUs from './aboutPage/AboutPage';
import TestimonialPage from './testimonyPage/Testimony';
import ServicesPage from "./services/services";
import GoogleAdsPage from "./services/googleAds";
import MetaAdsPage from "./services/metaAds";
import SEOPage from "./services/seo";
import WebDevPage from "./services/webDevelopment";
import Footer from "./Home/footer";
function App() {
  const [activeIndex, setActiveIndex] = useState(0); // ✅ Lifted state

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
            <AboutUs setActiveIndex={setActiveIndex} />
            <ServicesPage setActiveIndex = {setActiveIndex}/>
            <TestimonialPage setActiveIndex={setActiveIndex} />
            <Footer/>
          </div>
        }
      />
      <Route
        path="/Google-ads"
        element={<GoogleAdsPage setActiveIndex={setActiveIndex} />}
      />
      {/* <Route
        path="/Meta-ads"
        element={<MetaAdsPage setActiveIndex={setActiveIndex} />}
      /> */}
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