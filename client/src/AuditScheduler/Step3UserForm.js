import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const Step3UserForm = ({
  selectedDate,
  selectedTime,
  userDetails,
  submitted,
  onSubmit,
  onBack,
  onChange
}) => {
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    company: false
  });

  // Validate form whenever userDetails changes
  useEffect(() => {
    validateForm();
  }, [userDetails]);

  const validateForm = () => {
    const newErrors = {
      name: !userDetails.name ? 'Full name is required' : '',
      email: !userDetails.email 
        ? 'Email is required' 
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)
          ? 'Please enter a valid email'
          : '',
      company: !userDetails.company ? 'Company name is required' : ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      onSubmit(e);
    } else {
      // Mark all fields as touched to show errors
      setTouched({
        name: true,
        email: true,
        company: true
      });
    }
  };

  const isFormValid = () => {
    return (
      userDetails.name && 
      userDetails.email && 
      userDetails.company && 
      !errors.name && 
      !errors.email && 
      !errors.company
    );
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
      </div>

      {/* Streamlined Header */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
          <span className="text-cyan-400/80 font-mono text-xs uppercase tracking-wide">
            Final Details
          </span>
        </div>
        
        <h3 className="text-2xl font-light mb-2">
          <span className="text-white">Complete </span>
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-medium">
            Booking
          </span>
        </h3>
        
        <p className="text-gray-400 text-sm">
          Just a few details to confirm your audit session
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Compact Form Fields */}
          <div className="space-y-4">
            <FormField
              label="Full Name"
              type="text"
              value={userDetails.name}
              onChange={(value) => onChange('name', value)}
              onBlur={() => handleBlur('name')}
              error={touched.name && errors.name}
              required
              placeholder="Enter your full name"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

            <FormField
              label="Email Address"
              type="email"
              value={userDetails.email}
              onChange={(value) => onChange('email', value)}
              onBlur={() => handleBlur('email')}
              error={touched.email && errors.email}
              required
              placeholder="your.email@company.com"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />

            <FormField
              label="Company Name"
              type="text"
              value={userDetails.company}
              onChange={(value) => onChange('company', value)}
              onBlur={() => handleBlur('company')}
              error={touched.company && errors.company}
              required
              placeholder="Your company name"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />
          </div>

          {/* Compact Session Summary */}
          <div className="relative mt-8">
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-600/40 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span className="text-green-400/80 font-mono text-xs uppercase tracking-wide">
                  Session Details
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-white font-medium">
                    {moment(selectedDate).format("dddd, MMMM Do YYYY")}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-white font-medium">{selectedTime}</span>
                  <span className="text-gray-400 text-xs">
                    ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-400/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-white font-medium">Google Ads Audit</span>
                  <span className="text-gray-400 text-xs">(30 minutes)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Submit Button */}
          <div className="pt-4">
            <SubmitButton submitted={submitted} disabled={!isFormValid() || submitted} />
          </div>
        </form>
      </div>

      {/* Minimalist Footer */}
      <div className="relative z-10 pt-6 border-t border-gray-700/30">
        <BackButton onBack={onBack} />
      </div>
    </div>
  );
};

const FormField = ({ label, type, value, onChange, onBlur, error, required, placeholder, icon }) => (
  <div className="group">
    <label className={`block text-sm font-medium mb-1.5 flex items-center gap-2 ${
      error ? 'text-red-400' : 'text-gray-300'
    }`}>
      {icon && <div className={error ? 'text-red-400/70' : 'text-cyan-400/70'}>{icon}</div>}
      {label}
      {required && <span className="text-red-400/60 text-xs">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        required={required}
        className={`w-full px-3 py-2.5 bg-gray-900/30 backdrop-blur-sm border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
          error 
            ? 'border-red-400/60 focus:border-red-400/60 focus:ring-red-400/20' 
            : 'border-gray-600/40 focus:border-cyan-400/60 focus:ring-cyan-400/20 group-hover:border-gray-500/60'
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </div>
    {error && (
      <p className="mt-1 text-xs text-red-400/80 flex items-center gap-1">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

const SubmitButton = ({ submitted, disabled }) => (
  <button
    type="submit"
    disabled={disabled}
    className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-200 font-mono text-sm ${
      submitted 
        ? "bg-gray-700/50 cursor-not-allowed opacity-60 border border-gray-600/40" 
        : disabled
          ? "bg-gray-700/30 cursor-not-allowed opacity-70 border border-gray-600/30"
          : "bg-gradient-to-r from-cyan-500/80 to-blue-600/80 hover:from-cyan-400/90 hover:to-blue-500/90 active:scale-95 border border-cyan-400/40 hover:border-cyan-400/60"
    }`}
  >
    {submitted ? (
      <div className="flex items-center justify-center gap-2">
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        <span>Confirming...</span>
      </div>
    ) : (
      <div className="flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        <span>Confirm Booking</span>
      </div>
    )}
  </button>
);

const BackButton = ({ onBack }) => (
  <button
    type="button"
    onClick={onBack}
    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-600/40 bg-gray-900/30 backdrop-blur-sm text-gray-300 hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-200 active:scale-95 font-mono text-sm"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
    </svg>
    <span>Back</span>
  </button>
);

Step3UserForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  selectedTime: PropTypes.string.isRequired,
  userDetails: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    company: PropTypes.string,
  }).isRequired,
  submitted: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Step3UserForm;