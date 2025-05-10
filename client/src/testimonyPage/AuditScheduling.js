import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone'; 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Swal from "sweetalert2";
import { format } from 'date-fns';

moment.locale('en');
const localizer = momentLocalizer(moment);

const AuditScheduling = ({ occupiedSlots, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [localOccupiedSlots, setLocalOccupiedSlots] = useState([]);
  const closeButtonRef = useRef(null);
  useEffect(() => {
    const convertedSlots = occupiedSlots.map(slot => {
      // Create moment object in UTC
      const utcMoment = moment.utc(slot.audtiDateTime);
      
      // Convert to local timezone
      const localMoment = utcMoment.local();
      
      return {
        start: localMoment.toDate(),
        end: localMoment.add(30, 'minutes').toDate(),
        timeZone: moment.tz.guess() // Get user's timezone
      };
    });
    
    setLocalOccupiedSlots(convertedSlots);
  }, [occupiedSlots]);

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const today = moment().startOf('day'); // reset time to 00:00
  
    const start = today.clone().set({ hour: 9, minute: 0 });  // Start from 9 AM
    const end = today.clone().set({ hour: 17, minute: 0 });   // End at 5 PM
  
    while (start.isBefore(end)) {
      const slotTime = start.format('h:mm A');
      slots.push(slotTime);
  
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
      // Combine date and time into ISO string
      const [time, modifier] = selectedTime.split(' ');
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours);
      minutes = parseInt(minutes);
  
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
  
      const auditDateTime = moment(selectedDate)
        .set({ hour: hours, minute: minutes })
        .toISOString();
  
      const payload = {
        ...userDetails,
        auditDateTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        meetingDuration: '30 minutes',
        meetingType: 'Google Ads Audit'
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
  
      const result = await response.json();
      console.log("Server response:", result);
  
      // Show success alert with calendar options
      Swal.fire({
        icon: "success",
        title: "Scheduled!",
        html: `
          <div class="text-left">
            <p>We've sent a confirmation to ${userDetails.email}</p>
            <p class="mt-2">
              <strong>Date:</strong> ${moment(selectedDate).format('MMMM Do YYYY')}<br>
              <strong>Time:</strong> ${selectedTime} (${Intl.DateTimeFormat().resolvedOptions().timeZone})
            </p>
          </div>
        `,
        toast: true,
        position: "bottom-end",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: 'Add to Calendar',
        showCancelButton: true,
        cancelButtonText: 'Close'
      }).then((result) => {
        if (result.isConfirmed) {
          // Create ICS file
          const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `DTSTART:${moment(auditDateTime).format('YYYYMMDDTHHmmss')}Z`,
            `DTEND:${moment(auditDateTime).add(30, 'minutes').format('YYYYMMDDTHHmmss')}Z`,
            `SUMMARY:Google Ads Audit Meeting with ${userDetails.company}`,
            `DESCRIPTION:Meeting with ${userDetails.name} (${userDetails.email})`,
            'LOCATION:Online',
            'END:VEVENT',
            'END:VCALENDAR'
          ].join('\n');
  
          const blob = new Blob([icsContent], { type: 'text/calendar' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'audit-schedule.ics';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
  
      // Reset form
      setUserDetails({
        name: "",
        email: "",
        company: "",
      });
      setStep(1);
      setSelectedDate(null);
      setSelectedTime('');
      closeButtonRef.current?.click();
  
    } catch (error) {
      console.error("Error submitting form:", error);
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
      setSubmitted(false);
    }
  };

  const calendarEvents = localOccupiedSlots.map(slot => ({
    start: slot.start,
    end: slot.end,
    title: ' ',
    allDay: false,
    resource: null,
    tooltip: 'This slot is already booked',
    className: "bg-red-100 border-l-4 border-red-500 text-red-700 flex items-center justify-center cursor-not-allowed h-full m-0"
  }));
  
  const WORK_START = 9, WORK_END = 17;
  let filteredEvents = calendarEvents.filter(evt => {
    const h1 = evt.start.getHours(), h2 = evt.end.getHours();
    return h1 >= WORK_START && h2 <= WORK_END;
  });

  // 2) then only keep those whose start is in the future:
  const now = new Date();
  filteredEvents = filteredEvents.filter((evt) => evt.start > now);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-3xl w-full shadow-2xl transform transition-all duration-300 ease-out scale-95 animate-fade-in">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {
         (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Schedule Free Google Ads Audit
            </h2>

            {step === 1 && (
              <div className="h-[500px] animate-fade-in">
                <Calendar
                  localizer={localizer}
                  events={filteredEvents}
                  startAccessor="start"
                  endAccessor="end"
                  selectable
                  onSelectSlot={handleSelectSlot}
                  // min={new Date()}
                  min={new Date(selectedDate).setHours(WORK_START,0,0)}
                  max={new Date(selectedDate).setHours(WORK_END,0,0)}
                  defaultView="week"
                  views={["week", "day"]}
                  step={30}
                  timeslots={2}
                  dayLayoutAlgorithm="no-overlap"
                  className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 h-full transition-all duration-500 ease-in-out hover:shadow-3xl hover:border-blue-100 [&_.rbc-day-slot_.rbc-events-container]:mr-0"
                  eventPropGetter={(event) => ({
                    style: {
                      backgroundColor: event.className?.includes("bg-red-100")
                        ? "#fee2e2"
                        : "#dbeafe",
                      borderLeft: `4px solid ${
                        event.className?.includes("bg-red-100")
                          ? "#ef4444"
                          : "#3b82f6"
                      }`,
                      color: event.className?.includes("bg-red-100")
                        ? "#b91c1c"
                        : "#1e40af",
                      borderRadius: "0.75rem",
                      padding: "0.75rem",
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: event.className?.includes("bg-red-100")
                        ? "not-allowed"
                        : "pointer",
                      height: "100%",
                      margin: "0",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",

                      // <— allow text to wrap
                      whiteSpace: "normal",
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    },
                  })}
                  dayPropGetter={(date) => ({
                    style: {
                      backgroundColor:
                        date < new Date() ? "#f3f4f6" : "#ffffff",
                      transition: "background-color 0.3s ease",
                    },
                  })}
                  components={{
                    event: () => (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-red-600 mt-1">Booked</span>
                        </div>
                      </div>
                    ),

                    dateCellWrapper: ({ value, children }) => (
                      <div
                        className={`relative h-full rounded-md overflow-hidden ${
                          value < new Date() ? "opacity-30" : "hover:bg-blue-50"
                        } transition-all duration-300 ease-in-out`}
                      >
                        {children}
                        {value < new Date() && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div
                              className="w-full h-full bg-gradient-to-br from-transparent via-gray-400 to-transparent opacity-40"
                              style={{
                                clipPath:
                                  "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 85%, 15% 100%, 0 85%)",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ),

                    eventWrapper: ({ children }) => {
                      // console.log("Children", children);
                      return <div className="m-0">{children}</div>;
                    },
                  }}
                  formats={{
                    eventTimeRangeFormat: () => null,
                  }}
                  slotPropGetter={() => ({
                    style: {
                      minHeight: "50px",
                      transition: "all 0.3s ease",
                    },
                  })}
                  headerStyle={{
                    backgroundColor: "#ffffff",
                    borderBottom: "2px solid #e2e8f0",
                    borderRadius: "0.75rem 0.75rem 0 0",
                    padding: "1.25rem",
                    fontWeight: "600",
                    fontSize: "1.125rem",
                    color: "#0c4a6e",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                  timeslotsWrapperStyle={{
                    borderRight: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.03)",
                  }}
                  timeGutterStyle={{
                    background: "#f8fafc",
                    borderRight: "1px solid #e2e8f0",
                    color: "#64748b",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    padding: "0 1rem",
                  }}
                  todayStyle={{
                    background:
                      "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)",
                    color: "#0c4a6e",
                    fontWeight: "bold",
                    border: "2px solid #7dd3fc",
                  }}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">
                  Select Time for {moment(selectedDate).format("MMMM Do YYYY")}
                </h3>

                {(() => {
                  const isToday = moment(selectedDate).isSame(moment(), "day");

                  const allSlots = generateTimeSlots();

                  const availableSlots = allSlots.filter((time) => {
                    const [hours, minutes] = time
                      .replace(/ AM| PM/, "")
                      .split(":");
                    const slotTime = moment(selectedDate)
                      .clone()
                      .set({
                        hour:
                          parseInt(hours) +
                          (time.includes("PM") && hours !== "12" ? 12 : 0),
                        minute: parseInt(minutes),
                        second: 0,
                        millisecond: 0,
                      });

                    return slotTime.isAfter(moment());
                  });

                  if (availableSlots.length === 0 && isToday) {
                    return (
                      <>
                        <div className="text-center p-6 bg-gray-50 rounded-lg">
                          <p className="text-gray-500 font-medium">
                            No available slots for today
                          </p>
                          <p className="text-sm text-gray-400 mt-2">
                            Please select another date or check back tomorrow
                          </p>
                        </div>
                        <button
                          onClick={() => setStep(1)}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                          </svg>
                          Choose different date
                        </button>
                      </>
                    );
                  }

                  return (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {availableSlots.map((time) => {
                          const [hours, minutes] = time
                            .replace(/ AM| PM/, "")
                            .split(":");
                          const slotStart = moment(selectedDate)
                            .clone()
                            .set({
                              hour:
                                parseInt(hours) +
                                (time.includes("PM") && hours !== "12"
                                  ? 12
                                  : 0),
                              minute: parseInt(minutes),
                              second: 0,
                              millisecond: 0,
                            });

                          const isBooked = localOccupiedSlots.some(
                            (occupied) => {
                              const occupiedStart = moment(occupied.start)
                                .seconds(0)
                                .milliseconds(0); // snap to 00 sec
                              const occupiedEnd = moment(occupied.end)
                                .seconds(0)
                                .milliseconds(0); // snap to 00 sec

                              return (
                                slotStart.isSameOrAfter(occupiedStart) &&
                                slotStart.isBefore(occupiedEnd)
                              );
                            }
                          );

                          return (
                            <button
                              key={time}
                              onClick={() =>
                                !isBooked && handleTimeSelect(time)
                              }
                              disabled={isBooked}
                              className={`p-3 rounded-lg transition-all flex flex-col items-center ${
                                isBooked
                                  ? "bg-red-100 text-red-700 cursor-not-allowed"
                                  : selectedTime === time
                                  ? "bg-blue-600 text-white"
                                  : "bg-blue-50 hover:bg-blue-100"
                              }`}
                            >
                              {isBooked ? (
                                <>
                                  <svg
                                    className="w-5 h-5 mb-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                  <span className="block text-xs font-medium">
                                    Booked
                                  </span>
                                </>
                              ) : (
                                <span className="block text-sm font-medium">
                                  {time}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => setStep(1)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
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
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, name: e.target.value })
                    }
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
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
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
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        company: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Scheduled for {moment(selectedDate).format("MMMM Do YYYY")}{" "}
                    at {selectedTime}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitted} // Disable button while submitting
                  className={`w-full text-white py-3 rounded-lg transition-colors ${
                    submitted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
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
        )
        //  : (
        //   <div className="text-center space-y-6">
        //     <div className="text-green-500 text-6xl">✓</div>
        //     <h3 className="text-2xl font-bold text-gray-800">
        //       Audit Scheduled Successfully!
        //     </h3>
        //     <p className="text-gray-600">
        //       We've sent a confirmation email to {userDetails.email}.<br />
        //       Our Google Ads specialist will contact you at the scheduled time.
        //     </p>
        //     <button
        //       onClick={onClose}
        //       className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        //     >
        //       Close
        //     </button>
        //   </div>
        // )
        }
      </div>
    </div>
  );
};

export default AuditScheduling;