import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaStar, FaQuoteRight, FaRegChartBar } from "react-icons/fa";
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "E-commerce Manager",
    company: "UrbanFashion Co.",
    text: "Their Google Ads expertise tripled our ROAS in just 3 months. The strategic use of SKAGs and expert bid management transformed our account structure completely.",
    rating: 5,
    image: "avatar1.jpg",
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
    image: "avatar2.jpg",
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
    image: "avatar3.jpg",
    stats: { roas: 180, costReduction: 35, clicks: 95 },
    industry: "Marketing",
    serviceType: "Search Ads",
  },
  {
    id: 4,
    name: "David Mitchell",
    role: "Head of Growth",
    company: "FinTech Pros",
    text: "Before working with them, our campaigns were all over the place. Now, our cost per acquisition has dropped by 35%, and we’re seeing record-high engagement.",
    rating: 5,
    image: "avatar4.jpg",
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
    image: "avatar5.jpg",
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
    image: "avatar6.jpg",
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
    image: "avatar7.jpg",
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
    image: "avatar8.jpg",
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
    image: "avatar9.jpg",
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
    image: "avatar10.jpg",
    stats: { roas: 190, costReduction: 22, clicks: 110 },
    industry: "SaaS",
    serviceType: "Search Ads",
  },
];
const TestimonialPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState("all");
  const [isHovered, setIsHovered] = useState(false);

  const filteredTestimonials = testimonials.filter((t) =>
    filter === "all" ? true : t.serviceType === filter
  );

  const totalPages = Math.ceil(filteredTestimonials.length / 3);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      const nextIndex = prev + 3;
      return nextIndex >= filteredTestimonials.length ? prev : nextIndex;
    });
  }, [filteredTestimonials.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, handleNext]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

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

  const visibleTestimonials = [];
  for (let i = 0; i < 3; i++) {
    const index = activeIndex + i;
    if (index < filteredTestimonials.length) {
      visibleTestimonials.push(filteredTestimonials[index]);
    }
  }

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
  className={`flex md:grid ${
    visibleTestimonials.length === 1
      ? "justify-center"
      : "md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
  } relative pb-4 md:overflow-visible overflow-x-scroll no-scrollbar`}
  drag="x"
  dragConstraints={{ left: -500, right: 0 }}
  whileTap={{ cursor: "grabbing" }}
>
  {visibleTestimonials.map((testimonial) => (
    <motion.div
      key={testimonial.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[85vw] sm:w-[70vw] md:w-full max-w-full md:max-w-[400px] flex-shrink-0"
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
            { value: testimonial.stats.roas, color: "#34A853", label: "ROAS" },
            {
              value: testimonial.stats.costReduction,
              color: "#4285F4",
              label: "Costs",
            },
            { value: testimonial.stats.clicks, color: "#34A853", label: "Clicks" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-2 md:p-3 rounded-md"
              style={{
                background: `linear-gradient(to bottom right, ${stat.color}1A, ${stat.color}33)`,
              }}
            >
              <p className="text-lg md:text-xl font-bold" style={{ color: stat.color }}>
                {stat.value}%
              </p>
              <p className="text-[10px] md:text-xs" style={{ color: stat.color }}>
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
  ))}
</motion.div>

        </div>

        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i * 3)}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                Math.floor(activeIndex / 3) === i
                  ? "bg-gradient-to-r from-[#4285F4] to-[#34A853] w-6 md:w-8"
                  : "bg-gray-200 w-4 md:w-3"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialPage;
