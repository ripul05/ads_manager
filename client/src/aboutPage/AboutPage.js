import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGoogle, FaChartLine, FaDollarSign, FaBullseye } from 'react-icons/fa';


const AboutUs = () => {
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
    <div
      id="AboutSection"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50"
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

          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#34A853]">
            Google Ads Excellence
          </h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
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
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <motion.h2
              className="text-4xl font-bold text-gray-800"
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
              Leverage 10+ years of specialized experience in Google Ads
              management
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg"
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
      <section className="container mx-auto px-6 py-24">
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
      </section>

      {/* Certification Showcase */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
          >
            <h3 className="text-3xl font-bold mb-8 text-gray-800">
              <span className="text-[#34A853]">Google Certified</span>{" "}
              Excellence
            </h3>

            <div className="flex flex-wrap justify-center gap-8">
              {["Search", "Display", "Shopping", "Video"].map((cert, index) => (
                <motion.div
                  key={cert}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white font-semibold"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {cert} Certified
                </motion.div>
              ))}
            </div>

            <motion.p
              className="mt-12 text-gray-600 text-lg max-w-2xl mx-auto"
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
      <section className="container mx-auto px-6 py-24 relative">
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
          className="relative bg-white/90 backdrop-blur-xl rounded-[48px] p-16 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          {/* Gradient Accent Elements */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-r from-[#4285F4]/20 to-[#34A853]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-r from-[#4285F4]/20 to-[#34A853]/20 rounded-full blur-3xl" />

          {/* Core Content */}
          <div className="relative z-10 space-y-16 text-center">
            {/* Headline Section */}
            <div className="space-y-8">
              <motion.h2
                className="text-5xl font-bold text-gray-800"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
              >
                <span className="bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
                  Precision Engineered
                </span>
                <br />
                Google Ads Solutions
              </motion.h2>

              <motion.p
                className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                Harness our Premier Partner expertise to transform clicks into
                customers through data-driven campaign optimization.
              </motion.p>
            </div>

            {/* Animated Metrics Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-white rounded-xl shadow-lg border border-gray-100"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
                    {stat.number}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Certification Showcase */}
            <motion.div
              className="flex flex-col items-center space-y-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <div className="relative w-32 h-32">
                <motion.div
                  className="absolute inset-0 border-8 border-[#34A853]/20 rounded-full"
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
                <FaGoogle className="text-6xl text-[#4285F4] absolute inset-0 m-auto" />
              </div>

              <div className="text-lg font-semibold text-gray-600">
                Premier Google Partner Certified
              </div>
            </motion.div>

            {/* Animated Divider */}
            <motion.div
              className="mx-auto w-48 h-1 bg-gradient-to-r from-[#4285F4] to-[#34A853] rounded-full"
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