import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGoogle, FaChartLine, FaDollarSign, FaUsers, FaBullseye } from 'react-icons/fa';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const stats = [
    { number: 150, label: 'Campaigns Launched', suffix: '+' },
    { number: 95, label: 'Client ROI Improved', suffix: '%' },
    { number: 300, label: 'Ad Groups Managed', suffix: '+' },
    { number: 10, label: 'Years Experience', suffix: '+' },
  ];

  const services = [
    {
      title: 'Search Network Expertise',
      icon: <FaGoogle />,
      description: 'Mastery of Google Search Network targeting and keyword optimization'
    },
    {
      title: 'Performance Analytics',
      icon: <FaChartLine />,
      description: 'Real-time campaign tracking and ROI optimization'
    },
    {
      title: 'Smart Bidding',
      icon: <FaDollarSign />,
      description: 'AI-powered bid strategies for maximum conversions'
    },
    {
      title: 'Audience Targeting',
      icon: <FaBullseye />,
      description: 'Precision audience segmentation using Google\'s data'
    },
  ];

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-8">
            <FaGoogle className="text-4xl text-[#4285F4]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Google Ads <span className="text-[#34A853]">Specialists</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We live and breathe Google Ads. As Premier Google Partners, we combine cutting-edge technology with human expertise to drive measurable results.
          </p>
        </motion.div>
      </section>

      {/* Stats Grid */}
      <section className="bg-[#F8F9FA] py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl font-bold text-[#4285F4] mb-2">
                {stat.number}
                <span className="text-[#34A853]">{stat.suffix}</span>
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Google Ads Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-all"
              onMouseEnter={() => setActiveTab(index)}
            >
              <div className="text-4xl text-[#4285F4] mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certification Section */}
      <section className="bg-[#F8F9FA] py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 }
            }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-[#34A853]">Premier</span> Google Partners
              </h3>
              <p className="text-gray-600 mb-6">
                Certified in all Google Ads disciplines with proven performance history
              </p>
              <div className="flex justify-center space-x-6">
                <div className="bg-[#4285F4] text-white px-6 py-2 rounded-full">Search Certified</div>
                <div className="bg-[#FBBC05] text-white px-6 py-2 rounded-full">Display Certified</div>
                <div className="bg-[#EA4335] text-white px-6 py-2 rounded-full">Shopping Certified</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-[#4285F4] to-[#34A853] p-12 rounded-3xl text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Dominate Google Search?</h2>
          <p className="mb-8 text-xl">Let's create a results-driven strategy tailored to your business</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#4285F4] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Start Your Free Audit
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;