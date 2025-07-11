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
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Add futuristic CSS for calendar
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Futuristic Calendar Styles */
      .futuristic-calendar {
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(0, 0, 0, 0.95) 100%);
        border: 1px solid rgba(34, 211, 238, 0.3);
        border-radius: 16px;
        box-shadow: 0 25px 50px -12px rgba(0, 255, 255, 0.1);
        backdrop-filter: blur(16px);
        position: relative;
        overflow: hidden;
      }

      .futuristic-calendar::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.5), transparent);
        animation: scan-line 3s linear infinite;
      }

      @keyframes scan-line {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      /* Calendar Header */
      .futuristic-calendar .rbc-toolbar {
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%);
        border-bottom: 1px solid rgba(34, 211, 238, 0.2);
        padding: 1rem;
        margin-bottom: 0;
        backdrop-filter: blur(8px);
      }

      .futuristic-calendar .rbc-toolbar button {
        background: linear-gradient(135deg, rgba(75, 85, 99, 0.6) 0%, rgba(55, 65, 81, 0.6) 100%);
        border: 1px solid rgba(34, 211, 238, 0.3);
        color: rgba(156, 163, 175, 1);
        border-radius: 8px;
        padding: 8px 16px;
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 12px;
        transition: all 0.3s ease;
        backdrop-filter: blur(4px);
      }

      .futuristic-calendar .rbc-toolbar button:hover {
        background: linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
        border-color: rgba(34, 211, 238, 0.6);
        color: rgba(34, 211, 238, 1);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(34, 211, 238, 0.2);
      }

      .futuristic-calendar .rbc-toolbar button.rbc-active {
        background: linear-gradient(135deg, rgba(34, 211, 238, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%);
        border-color: rgba(34, 211, 238, 0.8);
        color: rgba(34, 211, 238, 1);
        box-shadow: 0 0 16px rgba(34, 211, 238, 0.3);
      }

      .futuristic-calendar .rbc-toolbar-label {
        color: rgba(255, 255, 255, 0.9);
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 16px;
        font-weight: bold;
        text-shadow: 0 0 8px rgba(34, 211, 238, 0.5);
      }

      /* Calendar Grid */
      .futuristic-calendar .rbc-calendar {
        background: transparent;
        color: rgba(255, 255, 255, 0.9);
      }

      .futuristic-calendar .rbc-header {
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%);
        border-bottom: 1px solid rgba(34, 211, 238, 0.2);
        color: rgba(34, 211, 238, 0.9);
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        padding: 12px 8px;
        backdrop-filter: blur(4px);
      }

      .futuristic-calendar .rbc-time-view {
        background: transparent;
        border: none;
      }

      .futuristic-calendar .rbc-time-gutter {
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%);
        border-right: 1px solid rgba(34, 211, 238, 0.2);
        backdrop-filter: blur(4px);
      }

      .futuristic-calendar .rbc-time-gutter .rbc-timeslot-group {
        border-bottom: 1px solid rgba(34, 211, 238, 0.1);
      }

      .futuristic-calendar .rbc-time-slot {
        color: rgba(156, 163, 175, 0.8);
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 10px;
      }

      .futuristic-calendar .rbc-time-content {
        background: transparent;
        border: none;
      }

      .futuristic-calendar .rbc-day-slot {
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
        border-left: 1px solid rgba(34, 211, 238, 0.1);
        backdrop-filter: blur(2px);
      }

      .futuristic-calendar .rbc-day-slot .rbc-time-slot {
        border-bottom: 1px solid rgba(34, 211, 238, 0.05);
        transition: all 0.3s ease;
      }

      .futuristic-calendar .rbc-day-slot .rbc-time-slot:hover {
        background: linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
        border-color: rgba(34, 211, 238, 0.3);
        cursor: pointer;
      }

      /* Current time indicator */
      .futuristic-calendar .rbc-current-time-indicator {
        background: linear-gradient(90deg, rgba(34, 211, 238, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%);
        height: 2px;
        z-index: 10;
        box-shadow: 0 0 8px rgba(34, 211, 238, 0.6);
      }

      /* Past time slots */
      .futuristic-calendar .past-time-slot {
        background: linear-gradient(135deg, rgba(75, 85, 99, 0.3) 0%, rgba(55, 65, 81, 0.3) 100%);
        position: relative;
        cursor: not-allowed;
      }
      
      .futuristic-calendar .past-time-slot::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: repeating-linear-gradient(
          45deg,
          rgba(75, 85, 99, 0.1),
          rgba(75, 85, 99, 0.1) 8px,
          rgba(55, 65, 81, 0.2) 8px,
          rgba(55, 65, 81, 0.2) 16px
        );
        pointer-events: none;
        z-index: 1;
      }

      /* Booked events */
      .futuristic-calendar .rbc-event {
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(220, 38, 38, 0.8) 100%);
        border: 1px solid rgba(239, 68, 68, 0.6);
        border-radius: 6px;
        color: rgba(255, 255, 255, 0.9);
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 10px;
        backdrop-filter: blur(4px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      }

      /* Selected slot styling */
      .futuristic-calendar .rbc-selected {
        background: linear-gradient(135deg, rgba(34, 211, 238, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%);
        border: 1px solid rgba(34, 211, 238, 0.6);
        box-shadow: 0 0 16px rgba(34, 211, 238, 0.4);
      }

      /* Mobile optimizations */
      @media (max-width: 768px) {
        .futuristic-calendar .rbc-toolbar {
          padding: 0.75rem;
        }
        
        .futuristic-calendar .rbc-toolbar button {
          padding: 6px 12px;
          font-size: 11px;
        }
        
        .futuristic-calendar .rbc-toolbar-label {
          font-size: 14px;
        }
        
        .futuristic-calendar .rbc-header {
          font-size: 11px;
          padding: 8px 4px;
        }
        
        .futuristic-calendar .rbc-time-slot {
          font-size: 9px;
        }
      }

      /* Scrollbar styling */
      .futuristic-calendar .rbc-time-view::-webkit-scrollbar {
        width: 6px;
      }
      
      .futuristic-calendar .rbc-time-view::-webkit-scrollbar-track {
        background: rgba(17, 24, 39, 0.3);
      }
      
      .futuristic-calendar .rbc-time-view::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, rgba(34, 211, 238, 0.6) 0%, rgba(59, 130, 246, 0.6) 100%);
        border-radius: 3px;
      }
      
      .futuristic-calendar .rbc-time-view::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, rgba(34, 211, 238, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%);
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
      return;
    }
    
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
    const isPastDay = momentDate.isBefore(moment(), 'day');
    
    return {
      style: {
        backgroundColor: isPastDay ? "rgba(75, 85, 99, 0.2)" : "transparent",
        transition: "all 0.3s ease",
      },
    };
  };
  
  const customSlotPropGetter = (date) => {
    const momentDate = moment(date);
    const now = moment();
    
    const isPastTime = 
      momentDate.isSame(now, 'day') && 
      momentDate.isBefore(now, 'minute');
    
    return {
      style: {
        backgroundColor: isPastTime ? "rgba(75, 85, 99, 0.3)" : "",
        cursor: isPastTime ? "not-allowed" : "pointer",
        position: "relative",
        transition: "all 0.3s ease",
      },
      className: isPastTime ? "past-time-slot" : "",
    };
  };

  return (
    <div className="relative">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Animated corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-400/30 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-400/30 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-400/30 rounded-br-2xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-cyan-400 font-mono text-xs sm:text-sm">
            CALENDAR INTERFACE - {currentTime.toLocaleTimeString()}
          </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold mb-2">
          <span className="text-white">SELECT </span>
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            DATE & TIME
          </span>
        </h3>
        
        <p className="text-gray-300 text-sm md:text-base">
          Choose your preferred appointment slot from the calendar below
        </p>
      </div>

      {/* Warning Messages */}
      {isMobile && moment(baseDate).isBefore(moment(), "day") && (
        <div className="relative z-10 mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg blur-xl"></div>
          <div className="relative p-4 bg-gray-900/80 border border-amber-500/30 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-amber-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-amber-400 font-bold text-sm">TEMPORAL CONFLICT</h4>
                <p className="text-gray-300 text-xs">
                  Selected date ({moment(baseDate).format("MMM D, YYYY")}) has passed. Select a future date.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobile && moment(baseDate).isSame(moment(), "day") && moment().hour() >= workHours.start && (
        <div className="relative z-10 mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg blur-xl"></div>
          <div className="relative p-4 bg-gray-900/80 border border-amber-500/30 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-amber-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-amber-400 font-bold text-sm">PARTIAL AVAILABILITY</h4>
                <p className="text-gray-300 text-xs">
                  Some slots today have passed. Consider future dates for full availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Container */}
      <div className="relative z-10 h-[500px] md:h-[600px] animate-fade-in touch-pan-y">
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
          step={isMobile ? 60 : 30}
          timeslots={isMobile ? 1 : 2}
          className="futuristic-calendar"
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
          longPressThreshold={100}
        />
      </div>

      {/* Footer Status */}
      <div className="relative z-10 mt-4 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
          <span>REAL-TIME SYNC</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            AVAILABLE
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            OCCUPIED
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            PAST
          </span>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Step1Calendar;

// import { Calendar, momentLocalizer } from "react-big-calendar";
// import { useState, useEffect } from "react";
// import moment from "moment";
// import {
//   calendarStyles,
//   calendarComponents,
//   calendarFormats,
// } from "./CalendarConfig";

// const Step1Calendar = ({
//   filteredEvents,
//   onSelectSlot,
//   selectedDate,
//   workHours,
//   onNavigate 
// }) => {
//   const localizer = momentLocalizer(moment);
//   const [isMobile, setIsMobile] = useState(false);
//   const [view, setView] = useState(window.innerWidth < 768 ? 'day' : 'week');
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [showTimeSlots, setShowTimeSlots] = useState(false);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [tempSelectedDate, setTempSelectedDate] = useState(selectedDate || new Date());

//   // Update current time
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Show time slots if a date is already selected
//   useEffect(() => {
//     if (selectedDate) {
//       setShowTimeSlots(true);
//     }
//   }, [selectedDate]);

//   // Add simplified CSS for calendar
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.innerHTML = `
//       /* Compact Calendar Styles */
//       .compact-calendar {
//         background: linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(0, 0, 0, 0.95) 100%);
//         border: 1px solid rgba(34, 211, 238, 0.2);
//         border-radius: 12px;
//         box-shadow: 0 8px 32px rgba(0, 255, 255, 0.1);
//         backdrop-filter: blur(8px);
//         overflow: hidden;
//         height: 100%;
//       }

//       /* Compact Calendar Header */
//       .compact-calendar .rbc-toolbar {
//         background: rgba(17, 24, 39, 0.8);
//         border-bottom: 1px solid rgba(34, 211, 238, 0.15);
//         padding: 16px 20px;
//         margin-bottom: 0;
//         min-height: auto;
//       }

//       .compact-calendar .rbc-toolbar button {
//         background: rgba(75, 85, 99, 0.6);
//         border: 1px solid rgba(34, 211, 238, 0.2);
//         color: white;
//         border-radius: 8px;
//         padding: 10px 16px;
//         font-size: 13px;
//         font-weight: 500;
//         transition: all 0.2s ease;
//         margin: 0 4px;
//       }

//       .compact-calendar .rbc-toolbar button:hover {
//         background: rgba(34, 211, 238, 0.15);
//         border-color: rgba(34, 211, 238, 0.4);
//         color: rgba(34, 211, 238, 1);
//       }

//       .compact-calendar .rbc-toolbar button.rbc-active {
//         background: rgba(34, 211, 238, 0.2);
//         border-color: rgba(34, 211, 238, 0.6);
//         color: rgba(34, 211, 238, 1);
//       }

//       .compact-calendar .rbc-toolbar-label {
//         color: white;
//         font-size: 18px;
//         font-weight: 600;
//         margin: 0 16px;
//       }

//       /* Compact Calendar Grid */
//       .compact-calendar .rbc-calendar {
//         background: transparent;
//         color: white;
//         font-family: system-ui, -apple-system, sans-serif;
//         height: calc(100% - 60px);
//       }

//       .compact-calendar .rbc-header {
//         background: rgba(17, 24, 39, 0.5);
//         border-bottom: 1px solid rgba(34, 211, 238, 0.15);
//         color: rgba(34, 211, 238, 0.8);
//         font-size: 14px;
//         font-weight: 600;
//         text-align: center;
//         padding: 16px 8px;
//       }

//       .compact-calendar .rbc-time-gutter {
//         background: rgba(17, 24, 39, 0.3);
//         border-right: 1px solid rgba(34, 211, 238, 0.15);
//         font-size: 12px;
//         min-width: 60px;
//       }

//       .compact-calendar .rbc-time-slot {
//         color: rgba(156, 163, 175, 0.7);
//         font-size: 13px;
//         border-bottom: 1px solid rgba(34, 211, 238, 0.05);
//         min-height: 45px;
//       }

//       .compact-calendar .rbc-day-slot {
//         background: rgba(17, 24, 39, 0.15);
//         border-left: 1px solid rgba(34, 211, 238, 0.08);
//       }

//       /* Available Time Slots - Subtle Hover */
//       .compact-calendar .rbc-day-slot .rbc-time-slot {
//         transition: all 0.2s ease;
//         position: relative;
//       }

//       .compact-calendar .rbc-day-slot .rbc-time-slot:hover {
//         background: rgba(34, 211, 238, 0.1);
//         border-color: rgba(34, 211, 238, 0.2);
//         cursor: pointer;
//       }

//       .compact-calendar .rbc-day-slot .rbc-time-slot:hover::after {
//         content: '✓';
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//         background: rgba(34, 211, 238, 0.9);
//         color: white;
//         padding: 4px 8px;
//         border-radius: 6px;
//         font-size: 12px;
//         font-weight: 600;
//         z-index: 10;
//         box-shadow: 0 2px 8px rgba(34, 211, 238, 0.3);
//       }

//       /* Current time indicator */
//       .compact-calendar .rbc-current-time-indicator {
//         background: rgba(34, 211, 238, 0.8);
//         height: 2px;
//         z-index: 10;
//       }

//       /* Past time slots */
//       .compact-calendar .past-time-slot {
//         background: rgba(75, 85, 99, 0.2) !important;
//         cursor: not-allowed !important;
//         opacity: 0.5;
//       }

//       /* Booked events */
//       .compact-calendar .rbc-event {
//         background: rgba(239, 68, 68, 0.7);
//         border: 1px solid rgba(239, 68, 68, 0.5);
//         border-radius: 6px;
//         color: white;
//         font-size: 11px;
//         font-weight: 500;
//         padding: 4px 8px;
//         min-height: 20px;
//       }

//       /* Selected slot */
//       .compact-calendar .rbc-selected {
//         background: rgba(34, 211, 238, 0.2) !important;
//         border: 1px solid rgba(34, 211, 238, 0.6) !important;
//       }

//       /* Mobile optimizations */
//       @media (max-width: 768px) {
//         .compact-calendar .rbc-toolbar {
//           padding: 12px 16px;
//           flex-direction: column;
//           gap: 10px;
//         }
        
//         .compact-calendar .rbc-toolbar button {
//           padding: 8px 12px;
//           font-size: 12px;
//         }
        
//         .compact-calendar .rbc-toolbar-label {
//           font-size: 16px;
//         }
        
//         .compact-calendar .rbc-header {
//           font-size: 12px;
//           padding: 12px 4px;
//         }
        
//         .compact-calendar .rbc-time-slot {
//           font-size: 12px;
//           min-height: 40px;
//         }
        
//         .compact-calendar .rbc-time-gutter {
//           font-size: 11px;
//           min-width: 50px;
//         }
//       }

//       /* Compact scrollbar */
//       .compact-calendar .rbc-time-view::-webkit-scrollbar {
//         width: 8px;
//       }
      
//       .compact-calendar .rbc-time-view::-webkit-scrollbar-track {
//         background: rgba(17, 24, 39, 0.2);
//         border-radius: 4px;
//       }
      
//       .compact-calendar .rbc-time-view::-webkit-scrollbar-thumb {
//         background: rgba(34, 211, 238, 0.5);
//         border-radius: 4px;
//       }
      
//       .compact-calendar .rbc-time-view::-webkit-scrollbar-thumb:hover {
//         background: rgba(34, 211, 238, 0.7);
//       }
//     `;
//     document.head.appendChild(style);
    
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       const newIsMobile = window.innerWidth < 768;
//       setIsMobile(newIsMobile);
//       setView(newIsMobile ? 'day' : 'week');
//     };
    
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Calendar grid functionality
//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDayOfWeek = firstDay.getDay();
    
//     const days = [];
    
//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       days.push(null);
//     }
    
//     // Add days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       days.push(new Date(year, month, day));
//     }
    
//     return days;
//   };

//   const isDateOccupied = (date) => {
//     if (!date) return false;
//     return filteredEvents.some(event => 
//       moment(event.start).isSame(moment(date), 'day')
//     );
//   };

//   const isDateSelectable = (date) => {
//     if (!date) return false;
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     return date >= today;
//   };

//   const handleDateSelect = (date) => {
//     setTempSelectedDate(date);
//     setShowTimeSlots(true);
//     onNavigate(date);
//   };

//   const handleSlotSelection = (slotInfo) => {
//     // Prevent selection of past time slots
//     const slotStart = moment(slotInfo.start);
//     if (slotStart.isBefore(moment())) {
//       return;
//     }
    
//     onSelectSlot(slotInfo);
//   };

//   const handleBackToCalendar = () => {
//     setShowTimeSlots(false);
//   };

//   const baseDate = tempSelectedDate ? moment(tempSelectedDate) : moment();
  
//   const minDate = baseDate.clone()
//     .set({ hour: workHours.start, minute: 0, second: 0 })
//     .toDate();

//   const maxDate = baseDate.clone()
//     .set({ hour: workHours.end, minute: 0, second: 0 })
//     .toDate();

//   const customSlotPropGetter = (date) => {
//     const momentDate = moment(date);
//     const now = moment();
    
//     const isPastTime = 
//       momentDate.isSame(now, 'day') && 
//       momentDate.isBefore(now, 'minute');
    
//     return {
//       style: {
//         backgroundColor: isPastTime ? "rgba(75, 85, 99, 0.2)" : "",
//         cursor: isPastTime ? "not-allowed" : "pointer",
//       },
//       className: isPastTime ? "past-time-slot" : "",
//     };
//   };

//   const days = getDaysInMonth(currentMonth);
//   const monthNames = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   return (
//     <div className="flex flex-col h-full relative">
//       {/* Subtle Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
//         <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
//       </div>

//       {/* Compact Header */}
//       <div className="relative z-10 mb-6">
//         <div className="flex items-center gap-2 mb-3">
//           <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
//           <span className="text-cyan-400/80 font-mono text-xs uppercase tracking-wide">
//             {showTimeSlots ? 'Select Time' : 'Select Date'}
//           </span>
//         </div>
        
//         <div className="flex items-center gap-4 mb-2">
//           <h3 className="text-2xl font-light">
//             <span className="text-white">Choose Your </span>
//             <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-medium">
//               Appointment
//             </span>
//           </h3>
          
//           {showTimeSlots && (
//             <button
//               onClick={handleBackToCalendar}
//               className="px-4 py-2 text-sm bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 hover:border-cyan-400/30 rounded-lg transition-all duration-200 text-gray-300 hover:text-cyan-400"
//             >
//               ← Back to Calendar
//             </button>
//           )}
//         </div>
        
//         <p className="text-gray-400 text-sm">
//           {showTimeSlots 
//             ? `Selected: ${moment(tempSelectedDate).format('MMMM D, YYYY')} - Click on any available time slot`
//             : 'Select a date to see available time slots'
//           }
//         </p>
//       </div>

//       {/* Content Container */}
//       <div className="flex-1 relative z-10 min-h-0">
//         {!showTimeSlots ? (
//           /* Date Selection Grid */
//           <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-cyan-400/20 h-full">
//             {/* Calendar Header */}
//             <div className="flex items-center justify-between mb-6">
//               <button
//                 onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
//                 className="p-2 rounded-lg hover:bg-cyan-400/10 transition-colors group"
//               >
//                 <div className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300">
//                   <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </div>
//               </button>
              
//               <h3 className="text-xl font-semibold text-white">
//                 {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
//               </h3>
              
//               <button
//                 onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
//                 className="p-2 rounded-lg hover:bg-cyan-400/10 transition-colors group"
//               >
//                 <div className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300">
//                   <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </div>
//               </button>
//             </div>

//             {/* Day Headers */}
//             <div className="grid grid-cols-7 gap-1 mb-4">
//               {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//                 <div key={day} className="text-center text-sm text-gray-400 font-medium py-2">
//                   {day}
//                 </div>
//               ))}
//             </div>

//             {/* Calendar Grid */}
//             <div className="grid grid-cols-7 gap-1">
//               {days.map((date, index) => (
//                 <button
//                   key={index}
//                   onClick={() => date && isDateSelectable(date) && handleDateSelect(date)}
//                   disabled={!date || !isDateSelectable(date)}
//                   className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200 relative group ${
//                     !date
//                       ? 'invisible'
//                       : tempSelectedDate && date.toDateString() === tempSelectedDate.toDateString()
//                       ? 'bg-gradient-to-r from-cyan-400 to-blue-400 text-white shadow-lg shadow-cyan-400/30'
//                       : isDateSelectable(date)
//                       ? 'hover:bg-cyan-400/20 text-white border border-transparent hover:border-cyan-400/30 hover:scale-105'
//                       : 'text-gray-600 cursor-not-allowed'
//                   }`}
//                 >
//                   {date && (
//                     <div className="relative">
//                       {date.getDate()}
//                       {isDateOccupied(date) && (
//                         <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full" />
//                       )}
//                       {isDateSelectable(date) && (
//                         <div className="absolute inset-0 rounded-lg border border-cyan-400/0 group-hover:border-cyan-400/50 transition-all duration-200" />
//                       )}
//                     </div>
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* Date Selection Legend */}
//             <div className="mt-6 pt-4 border-t border-gray-700/30">
//               <div className="flex items-center justify-center gap-4 text-xs">
//                 <div className="flex items-center gap-1.5">
//                   <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
//                   <span className="text-gray-400">Available</span>
//                 </div>
//                 <div className="flex items-center gap-1.5">
//                   <div className="w-2 h-2 bg-red-400 rounded-full"></div>
//                   <span className="text-gray-400">Has Events</span>
//                 </div>
//                 <div className="flex items-center gap-1.5">
//                   <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
//                   <span className="text-gray-400">Past</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* Time Slot Selection */
//           <Calendar
//             localizer={localizer}
//             events={filteredEvents.filter(event => 
//               moment(event.start).isSame(moment(tempSelectedDate), 'day')
//             )}
//             startAccessor="start"
//             endAccessor="end"
//             selectable
//             onSelectSlot={handleSlotSelection}
//             min={minDate}
//             max={maxDate}
//             view={view}
//             onView={setView}
//             defaultView={isMobile ? "day" : "week"}
//             views={["week", "day"]}
//             step={30}
//             timeslots={2}
//             className="compact-calendar"
//             eventPropGetter={calendarStyles.eventPropGetter}
//             slotPropGetter={customSlotPropGetter}
//             components={{
//               ...calendarComponents,
//               eventWrapper: ({ event }) => (
//                 <div className="pointer-events-none">
//                   {event.title}
//                 </div>
//               ),
//             }}
//             formats={calendarFormats}
//             onNavigate={onNavigate}
//             date={tempSelectedDate}
//             longPressThreshold={100}
//           />
//         )}
//       </div>

//       {/* Status Legend - Only show when in time slot view */}
//       {showTimeSlots && (
//         <div className="relative z-10 pt-4 border-t border-gray-700/30">
//           <div className="flex items-center justify-center gap-4 text-xs">
//             <div className="flex items-center gap-1.5">
//               <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
//               <span className="text-gray-400">Available</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <div className="w-2 h-2 bg-red-400 rounded-full"></div>
//               <span className="text-gray-400">Booked</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
//               <span className="text-gray-400">Past</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Step1Calendar;