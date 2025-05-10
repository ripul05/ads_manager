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
    onSubmit(e); // Pass the event to parent handler
  };

return (
  <form 
    onSubmit={handleFormSubmit} 
    className="flex flex-col h-full"
  >
    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto pb-4">
      <div className="space-y-6">
        <FormField
          label="Full Name"
          type="text"
          value={userDetails.name}
          onChange={(value) => onChange('name', value)}
          required
        />

        <FormField
          label="Email Address"
          type="email"
          value={userDetails.email}
          onChange={(value) => onChange('email', value)}
          required
        />

        <FormField
          label="Company Name"
          type="text"
          value={userDetails.company}
          onChange={(value) => onChange('company', value)}
          required
        />

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            Scheduled for {moment(selectedDate).format("MMMM Do YYYY")} at {selectedTime}
          </p>
        </div>
      </div>
    </div>

    {/* Fixed Footer */}
    <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-100">
      <SubmitButton submitted={submitted} />
      <BackButton 
        onBack={onBack} 
        label="← Choose different time" 
        className="mt-2"
      />
    </div>
  </form>
);
};

const FormField = ({ label, type, value, onChange, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      required={required}
      className="w-full p-3 border rounded-lg"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const SubmitButton = ({ submitted }) => (
  <button
    type="submit"
    disabled={submitted}
    className={`w-full text-white py-3 rounded-lg transition-colors ${
      submitted ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
    }`}
  >
    {submitted ? "Submitting..." : "Schedule Audit"}
  </button>
);

const BackButton = ({ onBack, label }) => (
  <button
    type="button"
    onClick={onBack}
    className="text-blue-600 hover:text-blue-800"
  >
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