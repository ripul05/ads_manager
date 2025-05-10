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

moment.locale("en");
const localizer = momentLocalizer(moment);

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
  const closeButtonRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const convertedSlots = occupiedSlots.map((slot) => {
      // Create moment object in UTC
      const utcMoment = moment.utc(slot.audtiDateTime);

      // Convert to local timezone
      const localMoment = utcMoment.local();

      return {
        start: localMoment.toDate(),
        end: localMoment.add(30, "minutes").toDate(),
        timeZone: moment.tz.guess(), // Get user's timezone
      };
    });

    setLocalOccupiedSlots(convertedSlots);
  }, [occupiedSlots]);

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const today = moment().startOf("day"); // reset time to 00:00

    const start = today.clone().set({ hour: 9, minute: 0 }); // Start from 9 AM
    const end = today.clone().set({ hour: 17, minute: 0 }); // End at 5 PM

    while (start.isBefore(end)) {
      const slotTime = start.format("h:mm A");
      slots.push(slotTime);

      start.add(30, "minutes");
    }

    return slots;
  };

const handleSelectSlot = ({ start }) => {
  if (!start || moment(start).isBefore(moment(), 'day')) return;

  // Mobile-specific handling
  if (isMobile) {
    setTimeout(() => {
      setSelectedDate(start);
      setStep(2);
    }, 100); // Short delay for touch devices
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
      // Combine date and time into ISO string
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

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}auditScheduling`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

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
    <div class="text-left space-y-2">
      <p class="text-base font-medium">Confirmation sent to ${userDetails.email}</p>
      <div class="text-sm space-y-1">
        <p class="flex items-center gap-2">
          <svg class="w-4 h-4 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          ${moment(selectedDate).format("MMM D, YYYY")}
        </p>
        <p class="flex items-center gap-2">
          <svg class="w-4 h-4 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          ${selectedTime} (${Intl.DateTimeFormat().resolvedOptions().timeZone})
        </p>
      </div>
    </div>
  `,
  position: window.innerWidth < 768 ? "center" : "bottom-end",
  toast: window.innerWidth >= 768,
  width: window.innerWidth < 768 ? "90%" : "auto",
  backdrop: window.innerWidth < 768,
  timer: window.innerWidth < 768 ? 8000 : 5000,
  timerProgressBar: true,
  showConfirmButton: true,
  confirmButtonText: "Add to Calendar",
  showCancelButton: true,
  cancelButtonText: "Close",
  showCloseButton: window.innerWidth >= 768,
  customClass: {
    container: '!flex items-center justify-center', // Force center alignment
    popup: '!rounded-xl !text-left !m-4', // Add margin for mobile
    title: '!text-lg !mb-3',
    htmlContainer: '!px-4 !pb-2',
    actions: '!mt-4 !flex-col md:!flex-row !gap-2 !px-4 !pb-4',
    confirmButton: '!bg-blue-600 !w-full md:!w-auto !py-3 !text-sm',
    cancelButton: '!bg-gray-100 !text-gray-700 hover:!bg-gray-200 !w-full md:!w-auto !py-3 !text-sm'
  }
}).then((result) => {
  if (result.isConfirmed) {
    // Create ICS file with proper escaping
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
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    // Mobile-friendly download
    if (navigator.share && window.innerWidth < 768) {
  navigator.share({
    title: 'Audit Schedule',
    files: [new File([blob], "audit-schedule.ics", { type: "text/calendar" })] // Fixed: added closing parenthesis here
  }).catch(console.error);
}
 else {
      const link = document.createElement("a");
      link.href = url;
      link.download = "audit-schedule.ics";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
      setSelectedTime("");
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

  const calendarEvents = localOccupiedSlots.map((slot) => ({
    start: slot.start,
    end: slot.end,
    title: " ",
    allDay: false,
    resource: null,
    tooltip: "This slot is already booked",
    className:
      "bg-red-100 border-l-4 border-red-500 text-red-700 flex items-center justify-center cursor-not-allowed h-full m-0",
  }));

  const WORK_START = 9,
    WORK_END = 17;
  let filteredEvents = calendarEvents.filter((evt) => {
    const h1 = evt.start.getHours(),
      h2 = evt.end.getHours();
    return h1 >= WORK_START && h2 <= WORK_END;
  });

  // 2) then only keep those whose start is in the future:
  const now = new Date();
  filteredEvents = filteredEvents.filter((evt) => evt.start > now);

  return (
<div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
  <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] shadow-2xl transform transition-all duration-300 ease-out scale-95 animate-fade-in flex flex-col">
    {/* Fixed Header */}
    <div className="flex-none">
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Schedule Free Google Ads Audit
      </h2>
    </div>

    {/* Scrollable Content Area */}
    <div className="flex-1 overflow-y-auto">
      {step === 1 && (
        <Step1Calendar
          filteredEvents={localOccupiedSlots}
          onSelectSlot={handleSelectSlot}
          selectedDate={selectedDate}
          workHours={{ start: 9, end: 17 }}
          onNavigate={setSelectedDate}
        />
      )}

      {step === 2 && (
        <Step2TimeSelection
          selectedDate={selectedDate}
          onTimeSelect={handleTimeSelect}
          onBack={() => setStep(1)}
          localOccupiedSlots={localOccupiedSlots}
          selectedTime={selectedTime}
          generateTimeSlots={generateTimeSlots}
        />
      )}

      {step === 3 && (
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
      )}
    </div>
  </div>
</div>
  );
};

export default AuditScheduling;
