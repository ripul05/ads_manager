import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomePage from './Home/Home';
import ContactPage from './ContactPage/ContactPage';
import AboutUs from './aboutPage/AboutPage';
import TestimonialPage from './testimonyPage/Testimony';

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
            <TestimonialPage setActiveIndex={setActiveIndex} />
          </div>
        }
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