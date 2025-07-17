import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaStar,
  FaQuoteRight,
  FaChevronLeft,
  FaChevronRight,
  FaAtom,
  FaNetworkWired,
  FaBrain,
  FaRocket,
  FaEye,
  FaChartLine,
  FaSearch,
  FaCrosshairs,
  FaDatabase,
  FaLayerGroup,
  FaChartBar,
  FaBolt,
  FaCube,
} from "react-icons/fa";

// Futuristic background with moving lines and nodes (matching home page)
const FuturisticBackground = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      for (let i = 0; i < 20; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5,
        });
      }
      setNodes(newNodes);
    };

    generateNodes();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated grid lines */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "100px 100px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating nodes with connections */}
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node, i) => (
          <g key={node.id}>
            {/* Connection lines */}
            {nodes.slice(i + 1).map((otherNode, j) => {
              const distance = Math.sqrt(
                Math.pow(node.x - otherNode.x, 2) +
                  Math.pow(node.y - otherNode.y, 2)
              );
              return distance < 25 ? (
                <motion.line
                  key={j}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${otherNode.x}%`}
                  y2={`${otherNode.y}%`}
                  stroke="rgba(0, 255, 255, 0.2)"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ) : null;
            })}

            {/* Nodes */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="rgba(0, 255, 255, 0.6)"
              animate={{
                r: [node.size, node.size * 1.5, node.size],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: node.duration,
                repeat: Infinity,
                delay: node.delay,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Scanning lines */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        style={{ width: "2px" }}
        animate={{
          x: ["-100vw", "100vw"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
        style={{ height: "2px" }}
        animate={{
          y: ["-100vh", "100vh"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Real-time metrics dashboard with mobile responsiveness

const LiveMetrics = () => {
  const metrics = [
    {
      value: "50+",
      label: "Active Clients",
      icon: <FaNetworkWired />,
      color: "text-cyan-400",
    },
    {
      value: "5.2x",
      label: "Avg ROAS",
      icon: <FaChartLine />,
      color: "text-blue-400",
    },
    {
      value: "185+",
      label: "Live Campaigns",
      icon: <FaRocket />,
      color: "text-purple-400",
    },
    {
      value: "$45K+",
      label: "Monthly Spend",
      icon: <FaDatabase />,
      color: "text-pink-300", // Updated to softer pink
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric, i) => (
        <motion.div
          key={i}
          className="bg-black/40 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className={`${metric.color} text-2xl mb-2`}>
            {metric.icon}
          </div>
          <div className={`${metric.color} text-xl font-bold`}>
            {metric.value}
          </div>
          <div className="text-gray-400 text-sm">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  );
};



const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "E-commerce Director",
    company: "TechFashion Co.",
    text: "BuzzBandits transformed our Google Ads performance completely. Their AI-powered bid strategies and advanced audience targeting increased our ROAS by 340% in just 3 months.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 340, costReduction: 45, conversions: 180 },
    industry: "E-commerce",
    serviceType: "Google Ads",
    adSpend: "$85K/month",
  },
  {
    id: 2,
    name: "Mike Roberts",
    role: "Marketing Director",
    company: "SaaS Solutions Inc.",
    text: "The granular campaign optimization and real-time bid management resulted in a 42% cost reduction while doubling our lead generation. True Google Ads specialists!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 280, costReduction: 42, conversions: 220 },
    industry: "SaaS",
    serviceType: "PPC Management",
    adSpend: "$125K/month",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "Founder",
    company: "Carter Digital Agency",
    text: "They helped us scale our client ad spend efficiently while maintaining high-quality leads. The level of analysis and optimization they provide is unmatched in the industry.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 195, costReduction: 38, conversions: 150 },
    industry: "Agency",
    serviceType: "Campaign Management",
    adSpend: "$60K/month",
  },
  {
    id: 4,
    name: "David Mitchell",
    role: "Growth Manager",
    company: "FinTech Pros",
    text: "Before working with BuzzBandits, our campaigns were underperforming. Now, our cost per acquisition has dropped by 35%, and we're seeing record-high conversion rates.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 260, costReduction: 35, conversions: 175 },
    industry: "FinTech",
    serviceType: "Google Ads",
    adSpend: "$95K/month",
  },
  {
    id: 5,
    name: "Jessica Lee",
    role: "Marketing Manager",
    company: "Wellness Direct",
    text: "We struggled with low-quality leads until BuzzBandits stepped in. With their refined targeting and A/B testing, our conversion rates increased by 55% while reducing costs.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 225, costReduction: 28, conversions: 135 },
    industry: "Healthcare",
    serviceType: "Shopping Ads",
    adSpend: "$45K/month",
  },
  {
    id: 6,
    name: "Tom Anderson",
    role: "E-commerce Director",
    company: "Tech Gadget Store",
    text: "Their advanced remarketing strategies and shopping campaign optimization boosted our revenue by 67%. Highly recommend for any e-commerce business looking to scale.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 310, costReduction: 32, conversions: 240 },
    industry: "E-commerce",
    serviceType: "Shopping Ads",
    adSpend: "$110K/month",
  },
  {
    id: 7,
    name: "Sophia Martinez",
    role: "CMO",
    company: "EduTech Hub",
    text: "Thanks to their data-driven approach, our student enrollments skyrocketed while keeping acquisition costs under control. The ROI improvement has been phenomenal.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 245, costReduction: 25, conversions: 160 },
    industry: "Education",
    serviceType: "Search Ads",
    adSpend: "$70K/month",
  },
  {
    id: 8,
    name: "James Wilson",
    role: "Performance Marketing Head",
    company: "AutoParts Direct",
    text: "The difference in our ad performance before and after BuzzBandits is night and day. ROAS is up by 85%, and our ad spend is now optimized across all channels.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 285, costReduction: 40, conversions: 210 },
    industry: "Automotive",
    serviceType: "Multi-Channel",
    adSpend: "$150K/month",
  },
];

const TestimonialPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const carouselRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const animationRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Start the animation
  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: [currentPosition, -1920],
        transition: {
          duration: (60 * (1920 + currentPosition)) / 1920,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls, currentPosition]);

  // Handle hover events
  const handleHoverStart = () => {
    if (carouselRef.current) {
      const transform = window.getComputedStyle(carouselRef.current).transform;
      const matrix = new DOMMatrix(transform);
      setCurrentPosition(matrix.m41);
    }
    setIsPaused(true);
  };

  const handleHoverEnd = () => {
    setIsPaused(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = () => {
    if (carouselRef.current) {
      const transform = window.getComputedStyle(carouselRef.current).transform;
      const matrix = new DOMMatrix(transform);
      setCurrentPosition(matrix.m41);
    }
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <motion.div
        key={i}
        className="text-cyan-400 text-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
      >
        <FaStar />
      </motion.div>
    ));
  };

const getServiceIcon = (serviceType) => {
  switch (serviceType) {
    case "Google Ads":
      return <FaGoogle />;
    case "PPC Management":
      return <FaCrosshairs />;
    case "Campaign Management":
      return <FaLayerGroup />;
    case "Shopping Ads":
      return <FaCube />;
    case "Search Ads":
      return <FaSearch />;
    case "Multi-Channel":
      return <FaNetworkWired />;
    default:
      return <FaChartLine />;
  }
};

const getServiceColor = (serviceType) => {
  switch (serviceType) {
    case "Google Ads":
      return {
        gradient: "from-cyan-600/20 to-blue-600/20",
        text: "text-cyan-300",
        border: "border-cyan-500/30"
      };
    case "PPC Management":
      return {
        gradient: "from-blue-600/20 to-purple-600/20",
        text: "text-blue-300",
        border: "border-blue-500/30"
      };
    case "Campaign Management":
      return {
        gradient: "from-purple-600/20 to-pink-600/20",
        text: "text-purple-300",
        border: "border-purple-500/30"
      };
    case "Shopping Ads":
      return {
        gradient: "from-pink-600/20 to-red-600/20",
        text: "text-pink-300",
        border: "border-pink-500/30"
      };
    case "Search Ads":
      return {
        gradient: "from-green-600/20 to-cyan-600/20",
        text: "text-green-300",
        border: "border-green-500/30"
      };
    case "Multi-Channel":
      return {
        gradient: "from-orange-600/20 to-yellow-600/20",
        text: "text-orange-300",
        border: "border-orange-500/30"
      };
    default:
      return {
        gradient: "from-cyan-600/20 to-blue-600/20",
        text: "text-cyan-300",
        border: "border-cyan-500/30"
      };
  }
};


  // Duplicate testimonials for infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div
      id="TestimonySection"
      className="min-h-screen bg-black relative overflow-hidden"
    >
      {/* Futuristic Background */}
      <FuturisticBackground />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* System Status */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 font-mono text-sm">
                CLIENT SUCCESS MATRIX - {currentTime.toLocaleTimeString()}
              </span>
            </div>

            {/* Brand Icon */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-16 h-16 border-2 border-cyan-400 rounded-full flex items-center justify-center">
                  <FaAtom className="text-cyan-400 text-2xl" />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                CLIENT SUCCESS
              </h1>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              PROVEN
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                RESULTS
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Real testimonials from businesses that achieved exponential growth
              through our
              <span className="text-cyan-400 font-semibold">
                {" "}
                AI-powered digital marketing strategies
              </span>
            </p>

            {/* Live Metrics */}
            <LiveMetrics />
          </motion.div>

          {/* Continuous Scrolling Testimonials */}
          <div className="relative" id="Clients">
            <div className="overflow-hidden">
              <motion.div
                ref={carouselRef}
                className="flex gap-6"
                animate={controls}
                initial={{ x: 0 }}
              >
                {duplicatedTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.id}-${index}`}
                    className="w-96 flex-shrink-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-xl border border-cyan-400/30 p-6 h-full hover:border-cyan-400/50 transition-all duration-300 group">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400/30">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-400 mb-1">
                            {testimonial.role}
                          </p>
                          <p className="text-sm text-cyan-400 font-semibold mb-2">
                            {testimonial.company}
                          </p>
                          <div className="flex gap-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-4 rounded-lg mb-4 border border-cyan-400/10">
                        <p className="text-gray-300 text-sm italic leading-relaxed">
                          "{testimonial.text}"
                        </p>
                        <FaQuoteRight className="absolute bottom-2 right-2 text-2xl text-cyan-400/20" />
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-400/20">
                          <div className="text-cyan-400 text-lg font-bold">
                            {testimonial.stats.roas}%
                          </div>
                          <div className="text-cyan-400 text-xs">ROAS</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/20">
                          <div className="text-blue-400 text-lg font-bold">
                            {testimonial.stats.costReduction}%
                          </div>
                          <div className="text-blue-400 text-xs">Cost ↓</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/20">
                          <div className="text-purple-400 text-lg font-bold">
                            {testimonial.stats.conversions}%
                          </div>
                          <div className="text-purple-400 text-xs">Conv ↑</div>
                        </div>
                      </div>

                      {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r ${getServiceColor(testimonial.serviceType).gradient} ${getServiceColor(testimonial.serviceType).border}`}
                      >
                        <div className={getServiceColor(testimonial.serviceType).text}>
                          {getServiceIcon(testimonial.serviceType)}
                        </div>
                        <span className={`${getServiceColor(testimonial.serviceType).text} text-sm font-semibold`}>
                          {testimonial.serviceType}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-400 text-xs">Ad Spend</div>
                        <div className="text-cyan-400 font-bold text-sm">
                          {testimonial.adSpend}
                        </div>
                      </div>
                    </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Pause indicator */}
            {isPaused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-4 py-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-cyan-400 text-sm font-mono">
                    PAUSED
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Manual Control Button (for testing) */}

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-xl border border-cyan-400/30 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Join Our Success Stories?
              </h3>
              <p className="text-gray-300 mb-6">
                Scale your business with AI-powered digital marketing strategies
                that deliver results.
              </p>
              <motion.button
                onClick={() => navigate("/contact")}
                className="relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaRocket />
                  START YOUR SUCCESS STORY
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default TestimonialPage;
