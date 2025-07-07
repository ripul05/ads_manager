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