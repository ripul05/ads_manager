import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    text: "Since partnering with this team, our Google Ads performance has skyrocketed – our ROI has increased by over 200%!",
    name: "John Doe",
    title: "CEO, TechCorp",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: 2,
    text: "Their expertise in Google Ads is unparalleled. Our campaigns are optimized to perfection, delivering outstanding results.",
    name: "Jane Smith",
    title: "CMO, MarketingGuru",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: 3,
    text: "We saw an immediate boost in traffic and conversions after they took over our Google Ads. Highly recommended!",
    name: "Mike Johnson",
    title: "Founder, Startup Inc.",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
];

// Define animation variants for the testimonial card
const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const Testimonial = () => {
  const [current, setCurrent] = useState(0);

  // Automatically cycle testimonials every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-10">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-10">
        What Our Clients Say
      </h2>
      <div className="relative max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[current].id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <p className="text-xl text-gray-700 mb-6">"{testimonials[current].text}"</p>
            <div className="flex items-center justify-center">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-gray-800">{testimonials[current].name}</p>
                <p className="text-gray-500 text-sm">{testimonials[current].title}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            onClick={prevTestimonial}
            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-all"
          >
            &#8592;
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            onClick={nextTestimonial}
            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-all"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
