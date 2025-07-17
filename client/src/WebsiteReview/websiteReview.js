import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { ConsultationSuccessModal } from '../ContactPage/ContactPage';
import { AnimatePresence } from 'framer-motion';
import {
  Globe,
  Rocket,
  Search,
  TrendingUp,
  Gauge,
  Shield,
  Eye,
  Wifi,
  Bug,
  Zap,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  X,
} from "lucide-react";


const phoneInputStyles = `
  .PhoneInputCountrySelect {
    background-color: rgb(31 41 55 / 0.8) !important;
    border: 1px solid rgb(34 197 94 / 0.4) !important;
    color: rgb(229 231 235) !important;
    border-radius: 0.5rem !important;
    padding: 0.5rem 0.75rem !important;
    margin-right: 0.75rem !important;
    backdrop-filter: blur(8px) !important;
    font-size: 0.875rem !important;
    min-width: 4rem !important;
    transition: all 0.2s ease !important;
  }
  
  .PhoneInputCountrySelect:hover {
    background-color: rgb(31 41 55 / 0.9) !important;
    border-color: rgb(34 197 94 / 0.6) !important;
    transform: translateY(-1px) !important;
  }
  
  .PhoneInputCountrySelect:focus {
    outline: none !important;
    border-color: #f8f9fa !important;
    box-shadow: 0 0 0 2px rgb(34 197 94 / 0.3) !important;
    background-color: rgb(31 41 55 / 0.9) !important;
  }
  
  .PhoneInputCountrySelectArrow {
    color: #f8f9fa !important;
    border-top-color: #f8f9fa !important;
    margin-left: 0.5rem !important;
  }
  
  .PhoneInputInput {
    height: 100% !important;
    border: none !important; /* Since outer .PhoneInput already has border */
    padding: 0 !important; /* Remove padding here to rely on wrapper */
    margin: 0 !important;
    flex: 1 !important;
    background-color: transparent !important;
    font-size: 1rem !important;
    color: rgb(229 231 235) !important;
    outline: none !important;
  }
  .PhoneInputInput:focus {
    border-color: #f8f9fa !important;
      box-shadow: 0 0 0 2px transparent !important;
    background-color: rgb(31 41 55 / 0.8) !important;
  }
  
  .PhoneInputInput:hover {
    background-color: rgb(31 41 55 / 0.8) !important;
    border-color: rgb(34 197 94 / 0.5) !important;
  }
  
  .PhoneInputInput::placeholder {
    color: rgb(156 163 175)
    opacity: 1 !important;
  }
  
  .PhoneInputCountryIcon {
    width: 1.5rem !important;
    height: 1.125rem !important;
    border-radius: 0.125rem !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
  }
  
  .PhoneInputCountryIcon--square {
    border-radius: 0.25rem !important;
  }
  
  /* Enhanced dropdown menu styling */
  .PhoneInputCountrySelect option {
    background-color: rgb(31 41 55) !important;
    color: rgb(229 231 235) !important;
    padding: 0.75rem 1rem !important;
    border-bottom: 1px solid rgb(55 65 81) !important;
  }
  
  .PhoneInputCountrySelect option:hover {
    background-color: rgb(55 65 81) !important;
    color: #f8f9fa !important;
  }
  
  .PhoneInputCountrySelect option:selected {
    background-color: #f8f9fa !important;
    color: rgb(15 23 42) !important;
    font-weight: 600 !important;
  }
  
  /* Container styling */
.PhoneInput {
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  width: 100% !important;
  height: 3rem !important; /* Matches h-12 (48px) */
  border-radius: 0.5rem !important;
  border: 1px solid #f8f9fa !important;
  background-color: rgb(31 41 55 / 0.6) !important;
  padding: 0 0.75rem !important;
  backdrop-filter: blur(4px) !important;
  transition: all 0.2s ease !important;
}
  
  /* Error state styling */
  .PhoneInput--error .PhoneInputCountrySelect {
    border-color: rgb(239 68 68) !important;
  }
  
  .PhoneInput--error .PhoneInputInput {
    border-color: rgb(239 68 68) !important;
  }
  
  /* Focus state improvements */
  .PhoneInput:focus-within .PhoneInputCountrySelect {
    border-color: #f8f9fa !important;
    box-shadow: 0 0 0 1px #f8f9fa !important;
  }
  
  .PhoneInput:focus-within .PhoneInputInput {
    border-color: #f8f9fa !important;
  }
`;
// Futuristic Background matching homepage
const FuturisticBackground = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      const nodeCount = window.innerWidth < 768 ? 8 : 15;
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1.5,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5,
        });
      }
      setNodes(newNodes);
    };

    generateNodes();
    window.addEventListener("resize", generateNodes);
    return () => window.removeEventListener("resize", generateNodes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10 md:opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize:
              window.innerWidth < 768 ? "50px 50px" : "100px 100px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* Animated nodes */}
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node, i) => (
          <g key={node.id}>
            {/* Connection lines */}
            {window.innerWidth >= 768 &&
              nodes.slice(i + 1).map((otherNode, j) => {
                const distance = Math.sqrt(
                  Math.pow(node.x - otherNode.x, 2) +
                    Math.pow(node.y - otherNode.y, 2)
                );
                return distance < 30 ? (
                  <line
                    key={j}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${otherNode.x}%`}
                    y2={`${otherNode.y}%`}
                    stroke="rgba(0, 255, 255, 0.2)"
                    strokeWidth="1"
                    style={{
                      animation: `pulse-line 3s infinite ${i * 0.2}s`,
                    }}
                  />
                ) : null;
              })}

            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="rgba(0, 255, 255, 0.6)"
              style={{
                animation: `pulse-node ${node.duration}s infinite ${node.delay}s`,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Scanning lines */}
      <div className="hidden md:block">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
          style={{
            width: "2px",
            animation: "scan-line 8s linear infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 50px 50px;
          }
        }
        @keyframes pulse-line {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes pulse-node {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
        }
        @keyframes scan-line {
          0% {
            transform: translateX(-100vw);
          }
          100% {
            transform: translateX(100vw);
          }
        }
      `}</style>
    </div>
  );
};

const EmailReportModal = ({ isOpen, onClose, websiteUrl, setShowSuccessModal }) => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    countryCode: "+1",
    firstName: "",
    lastName: "",
    monthlyBudget: "",
    teamSize: "",
    businessType: "",
    industry: "",
    urgency: "",
    message: "",
    websiteUrl,
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Auto-close error modal after 5 seconds
  useEffect(() => {
    if (showErrorModal) {
      const timer = setTimeout(() => {
        setShowErrorModal(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showErrorModal]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (websiteUrl) {
      setFormData((prev) => ({ ...prev, websiteUrl }));
    }
  }, [websiteUrl]);

  const [phoneData, setPhoneData] = useState({
    phone: "",
    errors: {},
    touched: {},
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePhone = (phone) => {
    if (!phone || phone.trim() === '') {
      return "Phone number is required";
    }
    
    try {
      const phoneNumber = parsePhoneNumberFromString(phone);
      if (!phoneNumber || !phoneNumber.isValid()) {
        return "Please enter a valid phone number";
      }
      return null;
    } catch (error) {
      return "Please enter a valid phone number";
    }
  };

  const handlePhoneChange = (value) => {
    setPhoneData(prev => ({
      ...prev,
      phone: value || "",
      errors: prev.errors.phone ? { ...prev.errors, phone: "" } : prev.errors
    }));
    
    setFormData(prev => ({ ...prev, phoneNumber: value || "" }));
  };

  const handlePhoneBlur = () => {
    if (phoneData.phone || phoneData.touched.phone) {
      const error = validatePhone(phoneData.phone);
      setPhoneData(prev => ({
        ...prev,
        errors: { ...prev.errors, phone: error },
        touched: { ...prev.touched, phone: true }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Clear previous errors
    setFormErrors({});
    setErrorMessage("");
    
    const phoneError = validatePhone(phoneData.phone);
    if (phoneError) {
      setPhoneData(prev => ({
        ...prev,
        errors: { ...prev.errors, phone: phoneError },
        touched: { ...prev.touched, phone: true }
      }));
      
      const phoneField = document.querySelector('.phone-input-themed');
      if (phoneField) {
        phoneField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setIsSubmitting(false);
      return;
    }

    const errors = {};
    if (formData.message.trim().length < 5) {
      errors.message = 'Message must be at least 5 characters.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {


      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('timeout')), 5000)
      );

      // Create the fetch promise
      const fetchPromise = fetch(`${process.env.REACT_APP_API_BASE_URL}requestCallback/generate-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      const result = await response.json();

      if (response.ok) {

        setIsSubmitting(false);
        onClose();
        setShowSuccessModal(true);
      } else {
        // Backend validation failed
        console.error("Backend validation error:", result.errors[0] || "Something went wrong");
        setIsSubmitting(false);
        setErrorMessage(result.errors[0]  || "Something went wrong. Please try again.");
        setShowErrorModal(true);
      }
    } catch (error) {
      setIsSubmitting(false);
      
      if (error.message === 'timeout') {
        // If timeout occurs, show success modal and close

        onClose();
        setShowSuccessModal(true);
      } else {
        // Other errors (network, etc.)
        console.error("Submission error:", error);
        setIsSubmitting(false);
        setErrorMessage("An error occurred while submitting the form. Please try again.");
        setShowErrorModal(true);
      }
    }
  };

  // Error Modal Component
  const ErrorModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
      <div className="bg-gradient-to-br from-red-900/95 to-red-800/95 rounded-xl border border-red-600/30 max-w-md w-full shadow-2xl animate-fade-in">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Submission Failed</h3>
          </div>
          
          <p className="text-red-200 mb-6 leading-relaxed">
            {errorMessage}
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowErrorModal(false)}
              className="flex-1 h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                setShowErrorModal(false);
                onClose();
              }}
              className="flex-1 h-10 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-all duration-200"
            >
              Cancel
            </button>
          </div>
          
          {/* Auto-close progress bar */}
          <div className="mt-4 bg-red-900/50 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-red-400 transition-all duration-[5000ms] ease-linear"
              style={{ width: showErrorModal ? '0%' : '100%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-xl border border-slate-600/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
          <style dangerouslySetInnerHTML={{ __html: phoneInputStyles }} />
          
          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 rounded-xl"></div>
          </div>

          {/* Modal Header */}
          <div className="relative p-6 border-b border-slate-600/30">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-400 font-mono text-xs">
                    Analysis Complete - {currentTime.toLocaleTimeString()}
                  </span>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-400 font-medium text-sm">
                      Website Analysis Results
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    We found some issues with your website that could be affecting
                    your performance, security, and search rankings. Get your
                    detailed report to see how we can help improve these areas.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Website Report Ready
                </h3>
                <p className="text-slate-400 text-sm">
                  Get your personalized improvement recommendations
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors ml-4"
                disabled={isSubmitting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="relative p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-12 bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all disabled:opacity-50"
                      id="email"
                      required
                      placeholder="your@email.com"
                      type="email"
                      value={formData.email}
                      name="email"
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm font-medium">Phone Number</label>
                  <div className="relative">
                    <div className="phone-input-wrapper">
                      <PhoneInput
                        international
                        placeholder="Phone Number"
                        required
                        value={phoneData.phone}
                        onChange={handlePhoneChange}
                        onBlur={handlePhoneBlur}
                        defaultCountry="US"
                        disabled={isSubmitting}
                        className={`phone-input-themed ${
                          phoneData.errors.phone && phoneData.touched.phone ? 'error' : ''
                        }`}
                      />
                    </div>
                    <div className="min-h-[20px] mt-1">
                      {phoneData.errors.phone && phoneData.touched.phone && (
                        <p className="text-red-400 text-sm animate-fade-in">
                          {phoneData.errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* First Name and Last Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm font-medium">
                    First Name
                  </label>
                  <input
                    className="w-full h-12 bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all disabled:opacity-50"
                    placeholder="First Name"
                    required
                    type="text"
                    value={formData.firstName}
                    name="firstName"
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    className="w-full h-12 bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all disabled:opacity-50"
                    placeholder="Last Name"
                    required
                    type="text"
                    value={formData.lastName}
                    name="lastName"
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Budget and Team Size Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm font-medium">
                    Monthly Budget
                  </label>
                  <select
                    className="w-full h-12 bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all disabled:opacity-50"
                    value={formData.monthlyBudget}
                    name="monthlyBudget"
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  >
                    <option value="" className="bg-slate-800">
                      Select Budget Range
                    </option>
                    <option value="Under $750" className="bg-slate-800">
                      Under $750
                    </option>
                    <option value="$750 to $1,500" className="bg-slate-800">
                      $750 to $1,500
                    </option>
                    <option value="$1,500 to $5,000" className="bg-slate-800">
                      $1,500 to $5,000
                    </option>
                    <option value="$5,000 to $10,000" className="bg-slate-800">
                      $5,000 to $10,000
                    </option>
                    <option value="$10,000 to $25,000" className="bg-slate-800">
                      $10,000 to $25,000
                    </option>
                    <option value="$25,000 to $50,000" className="bg-slate-800">
                      $25,000 to $50,000
                    </option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm font-medium">
                    Team Size
                  </label>
                  <select
                    className="w-full h-12 bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all disabled:opacity-50"
                    value={formData.teamSize}
                    name="teamSize"
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  >
                    <option value="" className="bg-slate-800">
                      Select Team Size
                    </option>
                    <option
                      value="I don't have marketing team"
                      className="bg-slate-800"
                    >
                      No marketing team
                    </option>
                    <option value="1 Person" className="bg-slate-800">
                      1 Person
                    </option>
                    <option value="2-5 People" className="bg-slate-800">
                      2-5 People
                    </option>
                    <option value="6-10 People" className="bg-slate-800">
                      6-10 People
                    </option>
                    <option value="10+ People" className="bg-slate-800">
                      10+ People
                    </option>
                  </select>
                </div>
              </div>

              {/* Business Type and Industry Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm font-medium">
                    Business Type
                  </label>
                  <select
                    className="w-full h-12 bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all disabled:opacity-50"
                    value={formData.businessType}
                    name="businessType"
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  >
                    <option value="" className="bg-slate-800">
                      Select Business Type
                    </option>
                    <option value="Ecommerce" className="bg-slate-800">
                      Ecommerce
                    </option>
                    <option
                      value="Professional Services"
                      className="bg-slate-800"
                    >
                      Professional Services
                    </option>
                    <option value="SaaS" className="bg-slate-800">
                      SaaS
                    </option>
                    <option value="Other" className="bg-slate-800">
                      Other
                    </option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm font-medium">
                    Industry
                  </label>
                  <select
                    className="w-full h-12 bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all disabled:opacity-50"
                    value={formData.industry}
                    name="industry"
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  >
                    <option value="" className="bg-slate-800">
                      Select Industry
                    </option>
                    <option value="Art & Entertainment" className="bg-slate-800">
                      Art & Entertainment
                    </option>
                    <option
                      value="Attorneys, Laws & Legal"
                      className="bg-slate-800"
                    >
                      Attorneys, Laws & Legal
                    </option>
                    <option value="Automotive" className="bg-slate-800">
                      Automotive
                    </option>
                    <option
                      value="Education, Coaching & Instruction"
                      className="bg-slate-800"
                    >
                      Education, Coaching & Instruction
                    </option>
                    <option
                      value="Finance, Banks, Investments & Accounting"
                      className="bg-slate-800"
                    >
                      Finance, Banks, Investments & Accounting
                    </option>
                    <option
                      value="Marketing, Advertising, PR & Digital Services"
                      className="bg-slate-800"
                    >
                      Marketing, Advertising, PR & Digital Services
                    </option>
                    <option value="Other" className="bg-slate-800">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              {/* Urgency */}
              <div className="space-y-2">
                <label className="text-slate-300 text-sm font-medium">
                  Priority Level
                </label>
                <select
                  className="w-full h-12 bg-slate-800/40 border border-slate-600/30 rounded-lg px-4 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all disabled:opacity-50"
                  value={formData.urgency}
                  name="urgency"
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                >
                  <option value="" className="bg-slate-800">
                    What's your timeline?
                  </option>
                  <option
                    value="I Need Help IMMEDIATELY"
                    className="bg-slate-800"
                  >
                    High Priority - Need help soon
                  </option>
                  <option
                    value="I Need to start working on this quarter"
                    className="bg-slate-800"
                  >
                    This Quarter - Planning to start
                  </option>
                  <option
                    value="I Have 6 months to decide"
                    className="bg-slate-800"
                  >
                    6 Months - Exploring options
                  </option>
                  <option
                    value="I Have more than A year"
                    className="bg-slate-800"
                  >
                    1+ Year - Long-term planning
                  </option>
                  <option value="Not a Priority" className="bg-slate-800">
                    Just Researching - No immediate plans
                  </option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-slate-300 text-sm font-medium">
                  Tell us about your goals
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="What are your main concerns about your website? What would you like to improve most?"
                  rows="4"
                  className={`w-full bg-slate-800/40 border ${
                    formErrors.message ? 'border-red-400' : 'border-slate-600/30'
                  } rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none disabled:opacity-50`}
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <div className="min-h-[20px]">
                  {formErrors.message && (
                    <p className="text-red-400 text-sm animate-fade-in">{formErrors.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  className={`w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group ${
                    isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Get My Website Report</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Error Modal */}
      {showErrorModal && <ErrorModal />}
    </>
  );
};

const AnalysisResults = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [detectedIssues, setDetectedIssues] = useState([]);

  const analysisSteps = [
    {
      icon: <Search className="w-5 h-5" />,
      text: "Scanning SEO structure",
      color: "text-cyan-400",
    },
    {
      icon: <Gauge className="w-5 h-5" />,
      text: "Testing page speed",
      color: "text-blue-400",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Security vulnerability scan",
      color: "text-green-400",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      text: "User experience analysis",
      color: "text-purple-400",
    },
    {
      icon: <Wifi className="w-5 h-5" />,
      text: "Mobile responsiveness check",
      color: "text-orange-400",
    },
    {
      icon: <Bug className="w-5 h-5" />,
      text: "Identifying critical issues",
      color: "text-red-400",
    },
  ];

  const mockIssues = [
    {
      type: "critical",
      text: "Page load time exceeds 4 seconds",
      icon: <Gauge className="w-4 h-4" />,
    },
    {
      type: "warning",
      text: "Missing meta descriptions",
      icon: <Search className="w-4 h-4" />,
    },
    {
      type: "critical",
      text: "SSL certificate issues detected",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      type: "warning",
      text: "Mobile usability problems",
      icon: <Wifi className="w-4 h-4" />,
    },
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 500);

    const issueInterval = setInterval(() => {
      setDetectedIssues((prev) => {
        if (prev.length < mockIssues.length) {
          return [...prev, mockIssues[prev.length]];
        }
        return prev;
      });
    }, 800);

    const timer = setTimeout(() => {
      clearInterval(stepInterval);
      clearInterval(issueInterval);
      setLoading(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(stepInterval);
      clearInterval(issueInterval);
    };
  }, [url]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm p-8 rounded-3xl border border-cyan-400/50 relative overflow-hidden">
        {/* Scanning Animation Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full mx-auto animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-pulse flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <h3 className="text-cyan-400 font-mono text-2xl mb-2">
              DEEP ANALYSIS IN PROGRESS
            </h3>
            <p className="text-gray-300 mb-6">
              Scanning{" "}
              <span className="text-cyan-400 font-semibold">{url}</span> for
              optimization opportunities
            </p>
          </div>

          {/* Analysis Steps */}
          <div className="space-y-4 mb-8">
            {analysisSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  index <= currentStep
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30"
                    : "bg-gray-800/30 border border-gray-700/30"
                }`}
              >
                <div
                  className={`${step.color} ${
                    index <= currentStep ? "animate-pulse" : "text-gray-500"
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-sm ${
                    index <= currentStep ? "text-white" : "text-gray-500"
                  }`}
                >
                  {step.text}
                </span>
                {index <= currentStep && (
                  <div className="ml-auto">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Detected Issues */}
          {detectedIssues.length > 0 && (
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h4 className="text-red-400 font-semibold">Issues Detected</h4>
              </div>
              <div className="space-y-3">
                {detectedIssues.map((issue, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border animate-fadeIn ${
                      issue.type === "critical"
                        ? "bg-red-500/10 border-red-500/30"
                        : "bg-orange-500/10 border-orange-500/30"
                    }`}
                  >
                    <div
                      className={
                        issue.type === "critical"
                          ? "text-red-400"
                          : "text-orange-400"
                      }
                    >
                      {issue.icon}
                    </div>
                    <span className="text-gray-200 text-sm">{issue.text}</span>
                    <div
                      className={`ml-auto w-2 h-2 rounded-full ${
                        issue.type === "critical"
                          ? "bg-red-500"
                          : "bg-orange-500"
                      } animate-pulse`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-3 mt-6">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{
                width: `${((currentStep + 1) / analysisSteps.length) * 100}%`,
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              Analysis Progress:{" "}
              {Math.round(((currentStep + 1) / analysisSteps.length) * 100)}%
            </p>
          </div>
        </div>

        {/* CSS animation */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  // When loading is false, you can return a summary or another final UI here
  return (
    <div className="bg-gray-900 p-8 rounded-2xl text-center text-white border border-cyan-400/30">
      <h3 className="text-xl font-bold text-cyan-400 mb-2">
        Analysis Complete
      </h3>
      <p className="text-gray-300 mb-4">
        Optimization report for{" "}
        <span className="text-cyan-400 font-semibold">{url}</span> is ready.
      </p>
      <p className="text-sm text-gray-400">
        You can now view detailed results or export the report.
      </p>
    </div>
  );
};
// Website Review Form Component
const WebsiteReviewPage = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false); // Add this state
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!websiteUrl.trim()) return;

    setIsAnalyzing(true);
    setShowResults(false);

    // Modified: Show modal instead of results after analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowModal(true); // Show modal instead of results
    }, 3000);
  };

  const handleNewAnalysis = () => {
    setShowResults(false);
    setShowModal(false); // Close modal
    setWebsiteUrl("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowResults(false);
    setWebsiteUrl("");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      {/* Futuristic Background */}
      <FuturisticBackground />
      <AnimatePresence>
      {showSuccessModal && (
        <ConsultationSuccessModal 
          onClose={() => setShowSuccessModal(false)}
          pageType="websiteReview"
        />
      )}
    </AnimatePresence>
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            {/* Status indicator */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 font-mono text-sm">
                ANALYSIS ENGINE ONLINE - {currentTime.toLocaleTimeString()}
              </span>
            </div>

            {/* Main title */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Globe className="text-4xl md:text-5xl text-cyan-400" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                WEBSITE REVIEW
              </h1>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              CONDUCT YOUR
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {" "}
                WEBSITE REVIEW
              </span>
            </h2>

            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Advanced AI-powered analysis engine that scans your website for
              performance, SEO, security, and user experience optimization
              opportunities.
            </p>
          </div>

          {/* Review Form */}
          {/* Review Form */}
          {!showResults && (
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-cyan-400/20 mb-8">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="Enter website URL..."
                      className="w-full pl-10 pr-4 py-3 bg-black/40 border border-cyan-400/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAnalyzing || !websiteUrl.trim()}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4" />
                      Analyze
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Analysis Results */}
          {showResults && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  Analysis Results for:{" "}
                  <span className="text-cyan-400">{websiteUrl}</span>
                </h2>
                <button
                  onClick={handleNewAnalysis}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                >
                  New Analysis
                </button>
              </div>
              <AnalysisResults url={websiteUrl} />
            </div>
          )}

          {/* Loading State */}
          {isAnalyzing && (
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm p-8 rounded-2xl border border-cyan-400/30 text-center">
              <div className="animate-spin w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-cyan-400 font-mono text-lg mb-2">
                Analyzing Website...
              </h3>
              <p className="text-gray-300">This may take a few moments</p>
            </div>
          )}

          {/* Features Grid */}
          {!showResults && !isAnalyzing && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                {
                  icon: <Search className="w-6 h-6" />,
                  title: "SEO Analysis",
                  desc: "Technical audit",
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: "Performance",
                  desc: "Speed & metrics",
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Security",
                  desc: "Vulnerability scan",
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Optimization",
                  desc: "Recommendations",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-900/30 to-black/30 backdrop-blur-sm p-4 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all group text-center hover:scale-105"
                >
                  <div className="text-cyan-400 text-2xl mb-2 flex justify-center">
                    {feature.icon}
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">
                    {feature.title}
                  </div>
                  <div className="text-gray-400 text-xs">{feature.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <EmailReportModal
        isOpen={showModal}
        onClose={handleCloseModal}
        websiteUrl={websiteUrl}
        setShowSuccessModal={setShowSuccessModal}
      />
    </div>
  );
};

export default WebsiteReviewPage;
