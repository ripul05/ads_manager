import React from 'react';

function LandingForm() {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">Full Name <span className="text-danger">*</span></label>
        <input type="text" className="form-control" id="fullName" placeholder="Full Name" required />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
        <input type="email" className="form-control" id="email" placeholder="Email" required />
      </div>

      <div className="mb-3">
        <label htmlFor="companyName" className="form-label">Company Name</label>
        <input type="text" className="form-control" id="companyName" placeholder="Company Name" />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone <span className="text-danger">*</span></label>
        <input type="tel" className="form-control" id="phone" placeholder="Phone Number" required />
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">Message</label>
        <textarea className="form-control" id="message" rows="4" placeholder="Message"></textarea>
      </div>

      <button type="submit" className="btn btn-warning w-100">Request Callback</button>
    </form>
  );
}

export default LandingForm;
