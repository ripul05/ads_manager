import React from 'react';
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
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="space-y-6">
          {/* Data Input Fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 font-mono text-sm">IDENTITY VERIFICATION</span>
            </div>
            
            <FormField
              label="FULL NAME"
              type="text"
              value={userDetails.name}
              onChange={(value) => onChange('name', value)}
              required
              placeholder="Enter your full name"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

            <FormField
              label="EMAIL ADDRESS"
              type="email"
              value={userDetails.email}
              onChange={(value) => onChange('email', value)}
              required
              placeholder="your.email@company.com"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />

            <FormField
              label="COMPANY NAME"
              type="text"
              value={userDetails.company}
              onChange={(value) => onChange('company', value)}
              required
              placeholder="Your company name"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />
          </div>

          {/* Session Summary */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-lg"></div>
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-mono text-sm">SESSION CONFIRMED</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <div>
                    <span className="text-white font-semibold">
                      {moment(selectedDate).format("dddd, MMMM Do YYYY")}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <span className="text-white font-semibold">{selectedTime}</span>
                    <span className="text-gray-400 text-sm ml-2">
                      ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <span className="text-white font-semibold">Google Ads Audit</span>
                    <span className="text-gray-400 text-sm ml-2">(30 minutes)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 to-gray-900/80 backdrop-blur-sm pt-6 border-t border-cyan-400/20">
        <SubmitButton submitted={submitted} onSubmit={handleFormSubmit} />
        <BackButton 
          onBack={onBack} 
          label="← MODIFY TIME SLOT" 
          className="mt-4"
        />
      </div>
    </div>
  );
};

const FormField = ({ label, type, value, onChange, required, placeholder, icon }) => (
  <div className="group">
    <label className="block text-sm font-mono text-cyan-400 mb-2 flex items-center gap-2">
      {icon && <div className="text-cyan-400">{icon}</div>}
      {label}
      {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        required={required}
        className="w-full p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 group-hover:border-gray-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
    </div>
  </div>
);

const SubmitButton = ({ submitted, onSubmit }) => (
  <button
    type="submit"
    disabled={submitted}
    onClick={onSubmit}
    className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-200 transform ${
      submitted 
        ? "bg-gray-700 cursor-not-allowed opacity-50" 
        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:scale-[1.02] shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"
    }`}
  >
    {submitted ? (
      <div className="flex items-center justify-center gap-3">
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        <span className="font-mono">INITIALIZING PROTOCOL...</span>
      </div>
    ) : (
      <div className="flex items-center justify-center gap-3">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        <span className="font-mono">INITIALIZE AUDIT PROTOCOL</span>
      </div>
    )}
  </button>
);

const BackButton = ({ onBack, label, className }) => (
  <button
    type="button"
    onClick={onBack}
    className={`flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors font-mono text-sm ${className}`}
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
    {label}
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