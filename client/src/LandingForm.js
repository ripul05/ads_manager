import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function LandingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    websiteLink: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.phone) {
      alert("Please enter a valid phone number.");
      return;
    }else{
      alert(`Form Number :: ${formData.phone}`)
    }

    try {
      const response = await fetch("/requestCallback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form.");
      }

      const result = await response.json();
      alert("Form submitted successfully!");
      console.log("Server response:", result);

      // Reset the form
      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        phone: "",
        websiteLink: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">
          Full Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          placeholder="Full Name"
          required
          value={formData.fullName}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email <span className="text-danger">*</span>
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="companyName" className="form-label">
          Company Name
        </label>
        <input
          type="text"
          className="form-control"
          id="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone <span className="text-danger">*</span>
        </label>
        <PhoneInput
          international
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handlePhoneChange}
          defaultCountry="IN"
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="websiteLink" className="form-label">
          Website Link
        </label>
        <input
          type="url"
          className="form-control"
          id="websiteLink"
          placeholder="Your Website Link"
          value={formData.websiteLink}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <textarea
          className="form-control"
          id="message"
          rows="4"
          placeholder="Message"
          value={formData.message}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-warning w-100">
        Request Callback
      </button>
    </form>
  );
}

export default LandingForm;


// export default LandingForm;



// const LandingForm = () => {
//   const [value, setValue] = useState(''); // Initialize with empty string
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (value) { // Check if a value is entered
//         setPhoneNumber(value);
//         alert(`Phone Number: ${value}`);
//         // Here you can send the value to your backend or handle it as needed
//     } else {
//         alert("Please enter a phone number.")
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}> {/* Wrap in a form */}
//       <PhoneInput
//         placeholder="Enter phone number"
//         value={value}
//         onChange={setValue}
//         defaultCountry="IN" // Set default country
//       />
//       <button type="submit">Submit</button> {/* Add a submit button */}
//       {phoneNumber && <p>Phone Number State: {phoneNumber}</p>}
//     </form>
//   );
// };

// export default LandingForm;