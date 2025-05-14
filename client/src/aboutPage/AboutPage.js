import { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGoogle, FaChartLine, FaDollarSign, FaBullseye, FaChevronDown } from 'react-icons/fa';


const AboutUs = () => {
  const controls = useAnimation();
  const [, inView] = useInView();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const stats = [
    { number: 150, label: 'Campaigns Launched', suffix: '+' },
    { number: 95, label: 'Client ROI Improved', suffix: '%' },
    { number: 300, label: 'Ad Groups Managed', suffix: '+' },
    { number: 3, label: 'Years Experience', suffix: '+' },
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
    <div
      id="AboutSection"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50"
    >
      {/* Parallax Hero Section */}
      <section className="container mx-auto px-6 py-24 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.div
            className="mb-12 inline-block bg-gradient-to-r from-[#4285F4] to-[#34A853] p-2 rounded-full"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1 }}
          >
            <FaGoogle className="text-6xl text-white p-3 bg-gray-800 rounded-full" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl md:leading-[1.3] font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#34A853]">
            Google Ads Excellence
          </h1>


          <motion.p
            className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            As certified Premier Google Partners, we engineer data-driven
            advertising solutions that convert browsers into buyers.
          </motion.p>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10 z-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-[#34A853]/20 rounded-full"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="space-y-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              Why Choose Our Expertise?
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Leverage years of specialized experience in Google Ads
              management
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-4 md:p-6 bg-white rounded-lg shadow-md"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
                  {stat.number}
                  {stat.suffix}
                </div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Visualization */}
<section className="container mx-auto px-4 md:px-6 py-8 md:py-24">
  {/* Mobile Accordion View */}
  <div className="md:hidden">
    <motion.h2
      className="text-2xl font-bold text-center mb-6 text-gray-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      Our Strategic Approach
    </motion.h2>

    <div className="flex flex-col gap-3">
      {services.map((service, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <button
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className="w-full p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="text-[#4285F4] text-3xl">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {service.title}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: expandedIndex === index ? 180 : 0 }}
              className="text-gray-500"
            >
              <FaChevronDown />
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-4"
              >
                <p className="text-gray-600 text-base mb-4">
                  {service.description}
                </p>
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#34A853]"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Desktop Grid View */}
  <div className="hidden md:block">
    <motion.h2
      className="text-4xl font-bold text-center mb-20 text-gray-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      Our Strategic Approach
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={index}
          className="group relative h-96 bg-white rounded-2xl shadow-xl overflow-hidden"
          whileHover={{ y: -10 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/5 to-[#34A853]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="p-8 h-full flex flex-col">
            <div className="mb-6 text-[#4285F4] text-5xl">
              {service.icon}
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              {service.title}
            </h3>

            <p className="text-gray-600 text-lg leading-relaxed">
              {service.description}
            </p>

            <div className="mt-auto">
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#34A853]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      {/* Certification Showcase */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 md:p-12 text-center"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              <span className="text-[#34A853]">Google Certified</span>{" "}
              Excellence
            </h3>

            <div className="flex flex-wrap justify-center gap-2 md:gap-8">
              {["Search", "Display", "Shopping", "Video"].map((cert, index) => (
                <motion.div
                  key={cert}
                  className="px-4 py-2 text-sm md:text-base md:px-8 md:py-4 rounded-full bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white font-semibold"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {cert} Certified
                </motion.div>
              ))}
            </div>

            <motion.p
              className="mt-8 text-gray-600 text-base md:text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              Our team maintains 100% certification across all Google Ads
              specializations, ensuring cutting-edge campaign strategies.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container mx-auto px-4 py-12 md:py-24 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#34A853]/10"
              style={{
                fontSize: `${Math.random() * 40 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <FaGoogle />
            </motion.div>
          ))}
        </div>

        {/* Main Content Container */}
<motion.div 
  className="relative bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-[48px] p-4 md:p-16 shadow-lg md:shadow-2xl overflow-hidden mx-2 md:mx-0"
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ type: "spring", stiffness: 50 }}
>
  {/* Gradient Accent Elements - Adjusted for Mobile */}
  <div className="absolute -top-20 -right-20 w-40 h-40 md:-top-32 md:-right-32 md:w-64 md:h-64 bg-gradient-to-r from-[#4285F4]/20 to-[#34A853]/20 rounded-full blur-xl md:blur-3xl" />
  <div className="absolute -bottom-20 -left-20 w-40 h-40 md:-bottom-32 md:-left-32 md:w-64 md:h-64 bg-gradient-to-r from-[#4285F4]/20 to-[#34A853]/20 rounded-full blur-xl md:blur-3xl" />

  {/* Core Content */}
  <div className="relative z-10 space-y-6 md:space-y-16 text-center">
    {/* Headline Section */}
    <div className="space-y-4 px-2">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight"
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
      >
        <span className="bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent block">
          Precision Engineered
        </span>
        <span className="block mt-2 md:mt-0">Google Ads Solutions</span>
      </motion.h2>

      <motion.p
        className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        Harness our Premier Partner expertise to transform clicks into customers through data-driven campaign optimization.
      </motion.p>
    </div>

    {/* Animated Metrics Grid */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
      initial="hidden"
      whileInView="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="p-4 md:p-6 bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg border border-gray-100"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{
            y: window.innerWidth >= 768 ? -10 : 0,
            transition: { type: "spring", stiffness: 300 },
          }}
        >
          <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
            {stat.number}
            {stat.suffix}
          </div>
          <div className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>

    {/* Certification Showcase */}
    <motion.div
      className="flex flex-col items-center space-y-4 md:space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <motion.div
          className="absolute inset-0 border-4 md:border-8 border-[#34A853]/20 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <FaGoogle className="text-4xl md:text-6xl text-[#4285F4] absolute inset-0 m-auto" />
      </div>

      <div className="text-base md:text-lg font-semibold text-gray-600 px-4">
        Premier Google Partner Certified
      </div>
    </motion.div>

    {/* Animated Divider */}
    <motion.div
      className="mx-auto w-1/2 md:w-48 h-1 bg-gradient-to-r from-[#4285F4] to-[#34A853] rounded-full"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1 }}
    />
  </div>
</motion.div>
      </section>
    </div>
  );
};


export default AboutUs;