import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaGoogle,
  FaStar,
  FaQuoteRight,
  FaRegChartBar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "E-commerce Manager",
    company: "UrbanFashion Co.",
    text: "Their Google Ads expertise tripled our ROAS in just 3 months. The strategic use of SKAGs and expert bid management transformed our account structure completely.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 300, costReduction: 40, clicks: 120 },
    industry: "Fashion",
    serviceType: "Search Ads",
  },
  {
    id: 2,
    name: "Mike Roberts",
    role: "Marketing Director",
    company: "TechSolutions Ltd",
    text: "The granular campaign structuring and smart audience targeting resulted in a 40% cost reduction while maintaining conversion volume. True Google Ads specialists!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 220, costReduction: 40, clicks: 200 },
    industry: "Technology",
    serviceType: "Display Ads",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "Founder & CEO",
    company: "Carter Digital Marketing",
    text: "They helped us scale our ad spend efficiently while doubling our lead generation. The level of detail and analysis they provide is unmatched.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 180, costReduction: 35, clicks: 95 },
    industry: "Marketing",
    serviceType: "Search Ads",
  },
  {
    id: 4,
    name: "David Mitchell",
    role: "Head of Growth",
    company: "FinTech Pros",
    text: "Before working with them, our campaigns were all over the place. Now, our cost per acquisition has dropped by 35%, and we're seeing record-high engagement.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 260, costReduction: 35, clicks: 175 },
    industry: "Finance",
    serviceType: "Search Ads",
  },
  {
    id: 5,
    name: "Jessica Lee",
    role: "Marketing Manager",
    company: "Wellness & Co.",
    text: "We struggled with low-quality leads until their team stepped in. With their refined targeting and A/B testing, our conversion rates increased by 50%.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 210, costReduction: 25, clicks: 130 },
    industry: "Health & Wellness",
    serviceType: "Shopping Ads",
  },
  {
    id: 6,
    name: "Tom Anderson",
    role: "E-commerce Director",
    company: "Gadget Store Online",
    text: "Their advanced remarketing strategies brought back lost customers and boosted our revenue by 60%. Highly recommend for any serious business.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 280, costReduction: 30, clicks: 220 },
    industry: "E-commerce",
    serviceType: "Display Ads",
  },
  {
    id: 7,
    name: "Sophia Martinez",
    role: "CMO",
    company: "EduTech Hub",
    text: "Thanks to their data-driven approach, our student enrollments skyrocketed while keeping acquisition costs under control. Brilliant team to work with!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 230, costReduction: 20, clicks: 140 },
    industry: "Education",
    serviceType: "Search Ads",
  },
  {
    id: 8,
    name: "James Wilson",
    role: "Performance Marketing Head",
    company: "AutoParts Direct",
    text: "The difference in our ad performance before and after working with them is night and day. ROAS is up by 80%, and our ad spend is now optimized perfectly.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 280, costReduction: 38, clicks: 210 },
    industry: "Automotive",
    serviceType: "Shopping Ads",
  },
  {
    id: 9,
    name: "Olivia Brown",
    role: "Brand Manager",
    company: "Luxury Home Decor",
    text: "Their insights on ad creatives and landing page optimization helped us reduce bounce rates and increase conversions. Amazing experience!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 250, costReduction: 30, clicks: 160 },
    industry: "Home Decor",
    serviceType: "Display Ads",
  },
  {
    id: 10,
    name: "Daniel Evans",
    role: "Digital Marketing Lead",
    company: "B2B SaaS Solutions",
    text: "We were struggling with stagnant growth, but they turned things around. Our lead quality improved significantly, and our pipeline is stronger than ever.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    stats: { roas: 190, costReduction: 22, clicks: 110 },
    industry: "SaaS",
    serviceType: "Search Ads",
  },
];

const TestimonialPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState("all");
  const [, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset activeIndex whenever filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  const filteredTestimonials = testimonials.filter((t) =>
    filter === "all" ? true : t.serviceType === filter
  );

  const cardsToShow = isMobile ? 1 : 3;
  const totalPages = Math.ceil(filteredTestimonials.length / cardsToShow);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev + cardsToShow >= filteredTestimonials.length ? 0 : prev + cardsToShow
    );
  }, [filteredTestimonials.length, cardsToShow]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev - cardsToShow < 0
        ? Math.max(0, filteredTestimonials.length - cardsToShow)
        : prev - cardsToShow
    );
  }, [filteredTestimonials.length, cardsToShow]);

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.velocity.x) > 500) {
      if (info.velocity.x > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <motion.span
        key={i}
        whileHover={{ scale: 1.2 }}
        className="text-yellow-400 text-xl"
      >
        <FaStar />
      </motion.span>
    ));
  };

  // Make sure we don't try to show testimonials that don't exist
  const visibleTestimonials = filteredTestimonials.slice(
    activeIndex,
    activeIndex + cardsToShow
  );

  // If no testimonials are visible after filtering, reset to the first one
  useEffect(() => {
    if (visibleTestimonials.length === 0 && filteredTestimonials.length > 0) {
      setActiveIndex(0);
    }
  }, [visibleTestimonials.length, filteredTestimonials.length]);

  return (
    <div
      id="TestimonySection"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto py-8 md:py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-4">
            <FaGoogle className="text-3xl md:text-4xl text-[#4285F4]" />
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2 md:mt-0">
              Google Ads Success Stories
            </h2>
          </div>
          <p className="text-gray-600 text-base md:text-lg px-2">
            Hear from businesses who've accelerated growth through our expert
            PPC management
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-4 md:mt-8 px-2">
            {["all", "Search Ads", "Display Ads", "Shopping Ads"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base transition-all ${
                    filter === type
                      ? "bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-50 shadow-md"
                  }`}
                >
                  {type.replace("all", "All Campaigns")}
                </button>
              )
            )}
          </div>
        </motion.div>

        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className={`flex ${
              isMobile
                ? "w-full overflow-hidden"
                : filteredTestimonials.length < 3
                ? "md:flex md:justify-center md:gap-8"
                : "md:grid md:grid-cols-3 gap-8"
            }`}
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: isMobile ? "grabbing" : "auto" }}
          >
            {visibleTestimonials.length > 0 ? (
              visibleTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className={`${
                    isMobile
                      ? "w-[85vw] min-w-[85vw] mx-2"
                      : filteredTestimonials.length < 3
                      ? "w-full max-w-md mx-4"
                      : "w-full"
                  } flex-shrink-0`}
                >
                  <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                      <motion.div
                        className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/20 to-[#34A853]/20" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start">
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-800">
                              {testimonial.name}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600">
                              {testimonial.role} at {testimonial.company}
                            </p>
                          </div>
                          <span className="px-2 py-1 md:px-3 md:py-1 bg-gradient-to-r from-[#4285F4]/10 to-[#34A853]/10 text-[#34A853] rounded-full text-xs md:text-sm mt-1 md:mt-0">
                            {testimonial.industry}
                          </span>
                        </div>
                        <div className="flex gap-1 mt-1 md:mt-2">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="relative overflow-hidden rounded-lg md:rounded-xl bg-gradient-to-br from-[#4285F4]/5 to-[#34A853]/5 p-3 md:p-4 mb-3 md:mb-4"
                      whileHover={{ y: window.innerWidth >= 768 ? -5 : 0 }}
                    >
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed italic relative z-10 line-clamp-4">
                        "{testimonial.text}"
                      </p>
                      <FaQuoteRight className="absolute bottom-1 right-1 md:bottom-2 md:right-2 text-2xl md:text-4xl text-[#4285F4]/20" />
                    </motion.div>

                    <div className="grid grid-cols-3 gap-1 md:gap-2 text-center mb-3 md:mb-4">
                      {[
                        {
                          value: testimonial.stats.roas,
                          color: "#34A853",
                          label: "ROAS",
                        },
                        {
                          value: testimonial.stats.costReduction,
                          color: "#4285F4",
                          label: "Costs",
                        },
                        {
                          value: testimonial.stats.clicks,
                          color: "#34A853",
                          label: "Clicks",
                        },
                      ].map((stat, index) => (
                        <div
                          key={index}
                          className="p-2 md:p-3 rounded-md"
                          style={{
                            background: `linear-gradient(to bottom right, ${stat.color}1A, ${stat.color}33)`,
                          }}
                        >
                          <p
                            className="text-lg md:text-xl font-bold"
                            style={{ color: stat.color }}
                          >
                            {stat.value}%
                          </p>
                          <p
                            className="text-[10px] md:text-xs"
                            style={{ color: stat.color }}
                          >
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 md:mt-4 flex flex-col md:flex-row items-center justify-between gap-2">
                      <span className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white rounded-full text-xs md:text-sm flex items-center gap-1 md:gap-2">
                        <FaRegChartBar className="text-sm md:text-lg" />
                        {testimonial.serviceType}
                      </span>
                      <div className="flex items-center gap-1 md:gap-2">
                        <FaGoogle className="text-xl md:text-2xl text-[#4285F4]" />
                        <span className="text-xs md:text-sm text-[#4285F4]">
                          Google Premier Partner
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="w-full text-center py-12">
                <p className="text-gray-600">
                  No testimonials found for this category.
                </p>
              </div>
            )}
          </motion.div>

          {isMobile && filteredTestimonials.length > 1 && (
            <div className="flex justify-between absolute top-1/2 w-full px-4 -translate-y-1/2">
              <button
                onClick={handlePrev}
                className="p-2 bg-white rounded-full shadow-lg"
              >
                <FaChevronLeft className="text-blue-600" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-white rounded-full shadow-lg"
              >
                <FaChevronRight className="text-blue-600" />
              </button>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i * cardsToShow)}
                className={`h-2 w-8 rounded-full transition-all ${
                  activeIndex === i * cardsToShow
                    ? "bg-gradient-to-r from-[#4285F4] to-[#34A853]"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default TestimonialPage;
