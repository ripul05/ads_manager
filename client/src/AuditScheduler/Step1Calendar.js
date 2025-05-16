import { Calendar, momentLocalizer } from "react-big-calendar";
import { useState, useEffect } from "react";
import moment from "moment";
import {
  calendarStyles,
  calendarComponents,
  calendarFormats,
} from "./CalendarConfig";

const Step1Calendar = ({
  filteredEvents,
  onSelectSlot,
  selectedDate,
  workHours,
  onNavigate 
}) => {
  const localizer = momentLocalizer(moment);
  const [isMobile, setIsMobile] = useState(false);
  const [view, setView] = useState(window.innerWidth < 768 ? 'day' : 'week');
  
  // Add CSS for past time slots
  useEffect(() => {
    // Add custom CSS for past time slots
    const style = document.createElement('style');
    style.innerHTML = `
      .past-time-slot {
        position: relative;
        background: rgba(243, 244, 246, 0.7) !important;
      }
      
      .past-time-slot::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: repeating-linear-gradient(
          45deg,
          rgba(200, 200, 200, 0.2),
          rgba(200, 200, 200, 0.2) 10px,
          rgba(220, 220, 220, 0.3) 10px,
          rgba(220, 220, 220, 0.3) 20px
        );
        pointer-events: none;
        z-index: 1;
      }
      
      /* Ensure the entire slot cell is styled, not just the label */
      .rbc-time-slot.past-time-slot {
        background-color: rgba(243, 244, 246, 0.7) !important;
      }
      
      /* Override any existing background colors on the slots */
      .rbc-day-slot .rbc-time-slot.past-time-slot {
        background-color: rgba(243, 244, 246, 0.7) !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      setView(newIsMobile ? 'day' : 'week');
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (newDate) => {
    onNavigate(newDate);
  };

  const handleSlotSelection = (slotInfo) => {
    // Prevent selection of past time slots
    const slotStart = moment(slotInfo.start);
    if (slotStart.isBefore(moment())) {
      // Don't allow selection of past time slots
      return;
    }
    
    // Handle valid selections
    onSelectSlot(slotInfo);
  };
  
  const baseDate = selectedDate ? moment(selectedDate) : moment();
  
  const minDate = baseDate.clone()
    .set({ hour: workHours.start, minute: 0, second: 0 })
    .toDate();

  const maxDate = baseDate.clone()
    .set({ hour: workHours.end, minute: 0, second: 0 })
    .toDate();

  const customDayPropGetter = (date) => {
    const momentDate = moment(date);
    return {
      style: {
        backgroundColor: momentDate.isBefore(moment(), 'day') ? "#f3f4f6" : "#ffffff",
        transition: "background-color 0.3s ease",
      },
    };
  };
  
  // Custom slot prop getter to style past time slots
  const customSlotPropGetter = (date) => {
    const momentDate = moment(date);
    const now = moment();
    
    // Only color slots as "past" if they're from today AND before current time
    const isPastTime = 
      momentDate.isSame(now, 'day') && 
      momentDate.isBefore(now, 'minute');
    
    return {
      style: {
        backgroundColor: isPastTime ? "rgba(243, 244, 246, 0.7)" : "", // Tailwind gray-100
        cursor: isPastTime ? "not-allowed" : "pointer",
        position: "relative",
      },
      className: isPastTime ? "past-time-slot" : "",
    };
  };

  return (
    <div className="h-[500px] animate-fade-in touch-pan-y">
      {isMobile && moment(baseDate).isBefore(moment(), "day") && (
        <div className="mb-3 px-3 py-2 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 text-sm flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          The selected date ({moment(baseDate).format("MMM D, YYYY")}) has
          already passed. Try selecting a future date.
        </div>
      )}

      {isMobile &&
        moment(baseDate).isSame(moment(), "day") &&
        moment().hour() >= workHours.start && (
          <div className="mb-3 px-3 py-2 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 text-sm flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Some time slots today have already passed. Try selecting a future
            date.
          </div>
        )}

      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSlotSelection}
        min={minDate}
        max={maxDate}
        view={view}
        onView={setView}
        defaultView={isMobile ? "day" : "week"}
        views={["week", "day"]}
        step={isMobile ? 60 : 30} // Larger steps for mobile
        timeslots={isMobile ? 1 : 2} // Fewer timeslots for mobile
        className={`
          bg-white rounded-2xl shadow-xl border border-gray-200 p-4 md:p-6
          hover:shadow-2xl hover:border-blue-200 transition-all
          [&_.rbc-day-slot_.rbc-events-container]:mr-0
          ${isMobile ? "text-sm" : "text-base"}
        `}
        eventPropGetter={calendarStyles.eventPropGetter}
        dayPropGetter={customDayPropGetter}
        slotPropGetter={customSlotPropGetter}
        components={{
          ...calendarComponents,
          eventWrapper: ({ event }) => (
            <div className={`${event.className} pointer-events-none`}>
              {event.title}
            </div>
          ),
          timeSlotWrapper: ({ children }) => (
            <div className="select-none">{children}</div>
          ),
        }}
        formats={calendarFormats}
        headerStyle={calendarStyles.headerStyle}
        timeslotsWrapperStyle={calendarStyles.timeslotsWrapperStyle}
        timeGutterStyle={calendarStyles.timeGutterStyle}
        todayStyle={calendarStyles.todayStyle}
        onNavigate={handleNavigate}
        date={selectedDate || new Date()}
        dayLayoutAlgorithm={isMobile ? "no-overlap" : "fixed"}
        longPressThreshold={100} // Set to a very low value to effectively disable long press
      />
    </div>
  );
};

export default Step1Calendar;