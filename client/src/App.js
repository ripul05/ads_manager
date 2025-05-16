import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomePage from './Home/Home';
import ContactPage from './ContactPage/ContactPage';
import AboutUs from './aboutPage/AboutPage';
import TestimonialPage from './testimonyPage/Testimony';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app-container">
            <HomePage />
            <AboutUs />
            <TestimonialPage />
          </div>
        }
      />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


export default App;