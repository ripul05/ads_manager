


import { useState, useEffect } from "react";
import { useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import Step1Calendar from "./Step1Calendar";
import Step2TimeSelection from "./Step2TimeSelection";
import Step3UserForm from "./Step3UserForm";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShieldAlt,
  FaRocket,
  FaCheckCircle,
  FaStar
} from "react-icons/fa";

moment.locale("en");
const localizer = momentLocalizer(moment);

// Futuristic Background Component
const FuturisticOverlay = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      const nodeCount = window.innerWidth < 768 ? 6 : 12;
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 15 + 10,
          delay: Math.random() * 3,
        });
      }
      setNodes(newNodes);
    };

    generateNodes();
    window.addEventListener('resize', generateNodes);
    return () => window.removeEventListener('resize', generateNodes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Floating nodes */}
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node, i) => (
          <g key={node.id}>
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="rgba(0, 255, 255, 0.4)"
              className="animate-pulse"
              style={{
                animationDelay: `${node.delay}s`,
                animationDuration: `${node.duration}s`
              }}
            />
          </g>
        ))}
      </svg>

      {/* Scanning line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse" />
    </div>
  );
};

const AuditScheduling = ({ occupiedSlots, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [localOccupiedSlots, setLocalOccupiedSlots] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const closeButtonRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const convertedSlots = occupiedSlots.map((slot) => {
      const utcMoment = moment.utc(slot.audtiDateTime);
      const localMoment = utcMoment.local();

      return {
        start: localMoment.toDate(),
        end: localMoment.add(30, "minutes").toDate(),
        timeZone: moment.tz.guess(),
      };
    });

    setLocalOccupiedSlots(convertedSlots);
  }, [occupiedSlots]);

  const generateTimeSlots = () => {
    const slots = [];
    const today = moment().startOf("day");
    const start = today.clone().set({ hour: 9, minute: 0 });
    const end = today.clone().set({ hour: 17, minute: 0 });

    while (start.isBefore(end)) {
      const slotTime = start.format("h:mm A");
      slots.push(slotTime);
      start.add(30, "minutes");
    }

    return slots;
  };

  const handleSelectSlot = ({ start }) => {
    if (!start || moment(start).isBefore(moment(), 'day')) return;

    if (isMobile) {
      setTimeout(() => {
        setSelectedDate(start);
        setStep(2);
      }, 100);
    } else {
      setSelectedDate(start);
      setStep(2);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(3);
  };

const handleSubmit = async () => {
  setSubmitted(true);

  try {
    const [time, modifier] = selectedTime.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const auditDateTime = moment(selectedDate)
      .set({ hour: hours, minute: minutes })
      .toISOString();

    const payload = {
      ...userDetails,
      auditDateTime,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      meetingDuration: "30 minutes",
      meetingType: "Google Ads Audit",
    };

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auditScheduling`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    // Show success animation
    setShowSuccessAnimation(true);

    // Download calendar invite after 1.5s
    setTimeout(() => {
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        `DTSTART:${moment(auditDateTime).format("YYYYMMDDTHHmmss")}Z`,
        `DTEND:${moment(auditDateTime).add(30, "minutes").format("YYYYMMDDTHHmmss")}Z`,
        `SUMMARY:Google Ads Audit Meeting with ${userDetails.company.replace(/,/g, '\\,')}`,
        `DESCRIPTION:Meeting with ${userDetails.name.replace(/,/g, '\\,')} (${userDetails.email})`,
        "LOCATION:Online",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const blob = new Blob([icsContent], {
        type: "text/calendar;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);

      if (navigator.share && window.innerWidth < 768) {
        navigator
          .share({
            title: "Audit Schedule",
            files: [new File([blob], "audit-schedule.ics", { type: "text/calendar" })],
          })
          .catch(console.error);
      } else {
        const link = document.createElement("a");
        link.href = url;
        link.download = "audit-schedule.ics";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 1500); // slight delay to let the animation feel smooth

    // Reset UI state
    setUserDetails({ name: "", email: "", company: "" });
    setStep(1);
    setSelectedDate(null);
    setSelectedTime("");

    // Hide success animation after 5 seconds
    setTimeout(() => {
      setShowSuccessAnimation(false);
      closeButtonRef.current?.click();
    }, 5000);
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Error: " + error.message); // Temporary fallback error
  } finally {
    setSubmitted(false);
  }
};


  const calendarEvents = localOccupiedSlots.map((slot) => ({
    start: slot.start,
    end: slot.end,
    title: " ",
    allDay: false,
    resource: null,
    tooltip: "This slot is already booked",
    className: "bg-red-500/20 border-l-4 border-red-500 text-red-400 flex items-center justify-center cursor-not-allowed h-full m-0",
  }));

  const WORK_START = 9, WORK_END = 17;
  let filteredEvents = calendarEvents.filter((evt) => {
    const h1 = evt.start.getHours(), h2 = evt.end.getHours();
    return h1 >= WORK_START && h2 <= WORK_END;
  });

  const now = new Date();
  filteredEvents = filteredEvents.filter((evt) => evt.start > now);

  const getStepTitle = () => {
    switch (step) {
      case 1: return "SELECT DATE";
      case 2: return "CHOOSE TIME";
      case 3: return "ENTER DETAILS";
      default: return "AUDIT SCHEDULER";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return "Choose your preferred date from the calendar";
      case 2: return `Available time slots for ${moment(selectedDate).format("MMM D, YYYY")}`;
      case 3: return "Complete your information to finalize the audit";
      default: return "Schedule your free Google Ads audit";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-400/30 rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl shadow-cyan-400/20 transform transition-all duration-300 ease-out flex flex-col relative overflow-hidden">

        {/* Futuristic Background Overlay */}
        <FuturisticOverlay />
        <AnimatePresence>
  {showSuccessAnimation && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        className="relative z-10 text-center px-8"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-6xl mb-4"
          >
            <FaCheckCircle className="text-green-400 mx-auto" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-white mb-2"
          >
            Audit Scheduled Successfully!
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 mb-6"
          >
            Our audit team will reach out to confirm the details shortly.
          </motion.p>

          {/* Animated Rocket */}
          <motion.div
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{
              x: [0, 100, 300, 800],
              y: [0, -50, -150, -400],
              scale: [1, 1.2, 0.8, 0.3],
              rotate: [0, 15, 30, 45],
            }}
            transition={{
              duration: 4,
              delay: 1,
              ease: "easeInOut",
            }}
            className="text-4xl inline-block"
          >
            <FaRocket className="text-cyan-400" />
          </motion.div>

          {/* Rocket Trail */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1.5, 2],
              x: [0, 50, 150, 400],
            }}
            transition={{
              duration: 3.5,
              delay: 1.5,
              ease: "easeOut",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full opacity-60"></div>
          </motion.div>

          {/* Success Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-2 text-sm text-gray-400"
          >
            <div className="flex items-center justify-center gap-2">
              <FaStar className="text-yellow-400" />
              <span>We'll contact you within 24–48 hours</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FaShieldAlt className="text-green-400" />
              <span>Your details are secure and confidential</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
            }}
            transition={{
              duration: 2,
              delay: 0.5 + i * 0.1,
              ease: "easeOut",
            }}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

        
        {/* Header */}
        <div className="relative z-10 flex-none p-6 sm:p-8 border-b border-cyan-400/20">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-cyan-400 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-gray-600 group-hover:border-cyan-400/50 flex items-center justify-center group-hover:bg-cyan-400/10 transition-all">
              <XMarkIcon className="h-4 w-4" />
            </div>
          </button>
          
          {/* System Status */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-mono text-xs sm:text-sm">
              AUDIT SCHEDULER v3.0 - {currentTime.toLocaleTimeString()}
            </span>
          </div>
          
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            <span className="text-white">SCHEDULE </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              FREE AUDIT
            </span>
          </h2>
          
          {/* Step Indicator */}
          <div className="flex items-center gap-4 sm:gap-6 mb-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`w-2 h-2 rounded-full transition-all ${
                    step >= stepNum 
                      ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <div className="text-cyan-400 font-mono text-sm">
              STEP {step}/3: {getStepTitle()}
            </div>
          </div>
          
          {/* Step Description */}
          <p className="text-gray-300 text-sm sm:text-base">
            {getStepDescription()}
          </p>
        </div>

        {/* Content Area */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <Step1Calendar
                filteredEvents={localOccupiedSlots}
                onSelectSlot={handleSelectSlot}
                selectedDate={selectedDate}
                workHours={{ start: 9, end: 17 }}
                onNavigate={setSelectedDate}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  BACK
                </button>
                <div className="text-cyan-400 font-mono text-sm">
                  {moment(selectedDate).format("dddd, MMMM D, YYYY")}
                </div>
              </div>
              
              <Step2TimeSelection
                selectedDate={selectedDate}
                onTimeSelect={handleTimeSelect}
                onBack={() => setStep(1)}
                localOccupiedSlots={localOccupiedSlots}
                selectedTime={selectedTime}
                generateTimeSlots={generateTimeSlots}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  BACK
                </button>
                <div className="text-cyan-400 font-mono text-sm">
                  {moment(selectedDate).format("MMM D")} at {selectedTime}
                </div>
              </div>
              
              <Step3UserForm
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                userDetails={userDetails}
                submitted={submitted}
                onSubmit={handleSubmit}
                onBack={() => setStep(2)}
                onChange={(field, value) =>
                  setUserDetails((prev) => ({ ...prev, [field]: value }))
                }
              />
            </div>
          )}
        </div>

        {/* Footer */}
        {/* <div className="relative z-10 flex-none p-6 sm:p-8 border-t border-cyan-400/20">
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <span>SECURE CONNECTION</span>
            </div>
            <div className="flex items-center gap-4">
              <span>BUZZBANDITS SYSTEMS</span>
              <span>•</span>
              <span>AI-POWERED SCHEDULING</span>
            </div>
          </div>
        </div> */}
      </div>
      
      {/* Additional CSS for animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { background-position: 0px 0px; }
          100% { background-position: 50px 50px; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
export default AuditScheduling;