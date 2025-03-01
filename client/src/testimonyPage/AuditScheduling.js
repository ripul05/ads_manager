import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Swal from "sweetalert2";

moment.locale('en');
const localizer = momentLocalizer(moment);

const AuditScheduling = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const start = moment().set({ hour: 9, minute: 0 });
    const end = moment().set({ hour: 17, minute: 0 });

    while (start.isBefore(end)) {
      slots.push(start.format('h:mm A'));
      start.add(30, 'minutes');
    }
    return slots;
  };

  const handleSelectSlot = ({ start }) => {
    if (moment(start).isBefore(moment(), 'day')) return;
    setSelectedDate(start);
    setStep(2);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
  
    try {
      const response = await fetch("/auditScheduling", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails), // Sending correct state
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
  
      const result = await response.json();
      console.log("Server response:", result);
  
      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "We'll get back to you soon",
        toast: true,
        position: "bottom-end",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
  
      // Reset the form
      setUserDetails({
        name: "",
        email: "",
        company: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
  
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "An error occurred. Please try again.",
        toast: true,
        position: "bottom-end",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } finally {
      setSubmitted(false); // Enable the submit button again
    }
  };
  

  const calendarEvents = [
    // Add existing events here if needed
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {!submitted ? (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Schedule Free Google Ads Audit
            </h2>

            {step === 1 && (
              <div className="h-[500px]">
                <Calendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    min={new Date()}
                    defaultView="week"
                    views={['week', 'day']}
                    step={30}
                    timeslots={2}
                    dayLayoutAlgorithm="no-overlap"
                    style={{ height: '100%' }}
                    tileDisabled={({ date }) => 
                        date.getDay() === 0 || date.getDay() === 6 || date < new Date()
                    }
                    components={{
                        dateCellWrapper: ({ value, children }) => (
                        <div className={`relative ${value < new Date() ? 'opacity-50' : ''}`}>
                            {children}
                            {value < new Date() && (
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="w-full h-full bg-gradient-to-br from-transparent via-gray-300 to-transparent opacity-50" 
                                    style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 85%, 15% 100%, 0 85%)'}} />
                            </div>
                            )}
                        </div>
                        )
                    }}
                    className="bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                    eventPropGetter={() => ({
                        className: 'bg-blue-100 border-l-4 border-blue-500 text-gray-800'
                    })}
                    dayPropGetter={(date) => ({
                        className: date < new Date() ? 'bg-gray-50' : 'hover:bg-blue-50'
                    })}
                    headerStyle={{
                        backgroundColor: '#f8fafc',
                        borderBottom: '1px solid #e2e8f0',
                        borderRadius: '0.75rem 0.75rem 0 0',
                        padding: '1rem'
                    }}
                    // Time slot styling
                    timeslotsWrapperStyle={{ 
                        borderRight: '1px solid #e2e8f0',
                        background: '#f8fafc'
                    }}
                    // Time column styling
                    timeGutterStyle={{ 
                        background: '#f8fafc',
                        borderRight: '1px solid #e2e8f0',
                        color: '#64748b'
                    }}
                    // Today header styling
                    todayStyle={{
                        backgroundColor: '#eff6ff',
                        color: '#1d4ed8',
                        fontWeight: '600'
                    }}
                    />
              </div>
            )}

            {step === 2 && (
            <div className="space-y-6">
                <h3 className="text-xl font-semibold">
                Select Time for {moment(selectedDate).format('MMMM Do YYYY')}
                </h3>
                
                {(() => {
                const isToday = moment(selectedDate).isSame(moment(), 'day');
                const filteredSlots = generateTimeSlots().filter(time => {
                    const [hours, minutes] = time.replace(/ AM| PM/, '').split(':');
                    const slotTime = moment(selectedDate)
                    .set({ 
                        hour: parseInt(hours) + (time.includes('PM') && hours !== '12' ? 12 : 0),
                        minute: parseInt(minutes)
                    });
                    return slotTime.isAfter(moment());
                });

                if (filteredSlots.length === 0 && isToday) {
                    return (
                    <><div className="text-center p-6 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 font-medium">
                                No available slots for today
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                Please select another date or check back tomorrow
                            </p>

                        </div><button
                            onClick={() => setStep(1)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                        >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Choose different date
                            </button></>
                    );
                }

                return (
                    <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {filteredSlots.map((time) => (
                        <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className={`p-3 rounded-lg transition-all ${
                            selectedTime === time
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-50 hover:bg-blue-100'
                            }`}
                        >
                            <span className="block text-sm font-medium">{time}</span>
                            <span className="block text-xs opacity-75">
                            {moment.duration(moment().diff(selectedDate)).humanize(true)}
                            </span>
                        </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setStep(1)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Choose different date
                    </button>
                    </>
                );
                })()}
            </div>
            )}

            {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                </label>
                <input
                    type="text"
                    required
                    className="w-full p-3 border rounded-lg"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    required
                    className="w-full p-3 border rounded-lg"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                </label>
                <input
                    type="text"
                    required
                    className="w-full p-3 border rounded-lg"
                    value={userDetails.company}
                    onChange={(e) => setUserDetails({ ...userDetails, company: e.target.value })}
                />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                    Scheduled for {moment(selectedDate).format('MMMM Do YYYY')} at {selectedTime}
                </p>
                </div>

                <button
                type="submit"
                disabled={submitted} // Disable button while submitting
                className={`w-full text-white py-3 rounded-lg transition-colors ${
                    submitted ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                >
                {submitted ? "Submitting..." : "Schedule Audit"}
                </button>

                <button
                type="button"
                onClick={() => setStep(2)}
                className="text-blue-600 hover:text-blue-800"
                >
                ← Choose different time
                </button>
            </form>
            )}

          </>
        ) : (
          <div className="text-center space-y-6">
            <div className="text-green-500 text-6xl">✓</div>
            <h3 className="text-2xl font-bold text-gray-800">
              Audit Scheduled Successfully!
            </h3>
            <p className="text-gray-600">
              We've sent a confirmation email to {userDetails.email}.<br />
              Our Google Ads specialist will contact you at the scheduled time.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditScheduling;