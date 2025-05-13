import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  FaGoogle,
  FaChartLine,
  FaLayerGroup,
  FaDatabase,
  FaCrosshairs,
  FaCheckCircle,
  FaSearch,
  FaChess,
  FaRocket,
  FaChartBar
} from 'react-icons/fa';

import Navbar from "./Navbar";

const HomePage = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

return (
  <div
    id="HomeSection"
    className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden"
  >
    <Navbar />

    {/* Main Content Container */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:py-28 relative z-10">
      <motion.div
        className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Column - Text Content */}
        <div className="lg:w-1/2 flex flex-col space-y-8">
          <motion.div
            className="flex items-center gap-4 mb-6"
            variants={itemVariants}
          >
            <motion.div
              className="p-3 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ rotate: 15 }}
            >
              <FaGoogle className="text-3xl text-[#4285F4]" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
              Buzzbandits
            </h1>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight"
            variants={itemVariants}
          >
            Digital Marketing
            <br />
            <span className="bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
              Perfected
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 md:pr-8 leading-relaxed"
            variants={itemVariants}
          >
            At Buzzbandits, we combine{" "}
            <span className="text-[#4285F4] font-semibold">cutting-edge technology</span>{" "}
            with <span className="text-[#34A853] font-semibold">data-driven strategies</span>{" "}
            to deliver measurable results. With over 5 years of experience, we've helped 
            200+ businesses scale their digital presence through:
          </motion.p>

          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={itemVariants}
          >
            {['SEO Optimization', 'Social Media', 'PPC Campaigns', 'Content Strategy'].map((item, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white/80 p-3 rounded-lg">
                <FaCheckCircle className="text-[#34A853]" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            variants={itemVariants}
          >
            <button
              onClick={() => navigate("/contact")}
              className="bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => navigate("/about")}
              className="bg-white text-gray-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all border-2 border-gray-100"
            >
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Right Column - Visual Elements */}
<div className="lg:w-1/2 w-full mt-8 lg:mt-0">
  <div className="relative bg-gradient-to-tr from-[#4285F4]/20 to-[#34A853]/20 rounded-3xl overflow-hidden p-4 md:p-6 lg:p-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            {[
              {
                title: "ROI Focused",
                color: "#34A853",
                icon: <FaChartLine />,
                desc: "Maximize your marketing budget with performance-based strategies",
              },
              {
                title: "Full Funnel",
                color: "#4285F4",
                icon: <FaLayerGroup />,
                desc: "End-to-end solutions from awareness to conversion",
              },
              {
                title: "Real-Time Data",
                color: "#FBBC04",
                icon: <FaDatabase />,
                desc: "Instant insights with our advanced analytics dashboard",
              },
              {
                title: "360° Strategy",
                color: "#EA4335",
                icon: <FaCrosshairs />,
                desc: "Omnichannel approach for maximum market penetration",
              },
            ].map((feature, index) => (
        <motion.div
          key={index}
          className="bg-white/90 backdrop-blur-sm p-3 md:p-5 lg:p-6 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            y: -8,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.97 }} // Added tap animation for mobile
        >
          <div className="flex items-center md:flex-col md:items-center gap-3 md:gap-0">
            {/* Icon Container */}
            <motion.div
              className="p-2 md:p-4 rounded-lg shrink-0"
              style={{ backgroundColor: `${feature.color}10` }}
              whileHover={{ rotate: index % 2 === 0 ? -10 : 10 }}
            >
              {React.cloneElement(feature.icon, {
                className: "text-2xl md:text-3xl lg:text-4xl",
                style: { color: feature.color },
              })}
            </motion.div>

            {/* Text Content */}
            <div className="md:text-center">
              <motion.h3 
                className="text-base md:text-lg lg:text-xl font-bold text-gray-800"
                whileHover={{ color: feature.color }}
              >
                {feature.title}
              </motion.h3>
              <p className="text-xs md:text-sm text-gray-600 mt-1 hidden md:block">
                {feature.desc}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
        </div>
      </div>

      </motion.div>

      {/* Process Section */}
      <motion.div 
        className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[
          { title: "Discovery", icon: <FaSearch />, color: "#4285F4" },
          { title: "Strategy", icon: <FaChess />, color: "#34A853" },
          { title: "Execution", icon: <FaRocket />, color: "#FBBC04" },
          { title: "Optimization", icon: <FaChartBar />, color: "#EA4335" },
        ].map((step, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${step.color}10` }}
              >
                {React.cloneElement(step.icon, {
                  className: "text-2xl",
                  style: { color: step.color }
                })}
              </div>
              <div>
                <p className="text-sm text-gray-500">Step {index + 1}</p>
                <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
              </div>
            </div>
            <p className="mt-4 text-gray-600 text-sm">
              {[
                "Deep dive into your business objectives",
                "Customized campaign planning",
                "Rapid implementation across channels",
                "Continuous performance enhancement"
              ][index]}
            </p>
          </div>
        ))}
      </motion.div>

    </div>

    {/* Background Animation Elements */}
    <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-green-50/50 to-transparent" />
  </div>
);
};

export default HomePage;
