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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (newDate) => {
    onNavigate(newDate);
  };

  const handleSlotSelection = (slotInfo) => {
    if (isMobile) {
      setTimeout(() => {
        onSelectSlot(slotInfo);
      }, 150); // Increased delay for better mobile touch handling
    } else {
      onSelectSlot(slotInfo);
    }
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

  return (
    <div className="h-[500px] animate-fade-in touch-pan-y">
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSlotSelection}
        min={minDate}
        max={maxDate}
        defaultView={isMobile ? 'day' : 'week'}
        views={["week", "day"]}
        step={isMobile ? 60 : 30} // Larger steps for mobile
        timeslots={isMobile ? 1 : 2} // Fewer timeslots for mobile
        className={`
          bg-white rounded-2xl shadow-xl border border-gray-200 p-4 md:p-6
          hover:shadow-2xl hover:border-blue-200 transition-all
          [&_.rbc-day-slot_.rbc-events-container]:mr-0
          ${isMobile ? 'text-sm' : 'text-base'}
        `}
        eventPropGetter={calendarStyles.eventPropGetter}
        dayPropGetter={customDayPropGetter}
        components={{
          ...calendarComponents,
          eventWrapper: ({ event }) => (
            <div className={`${event.className} pointer-events-none`}>
              {event.title}
            </div>
          ),
          timeSlotWrapper: ({ children }) => (
            <div 
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="select-none"
            >
              {children}
            </div>
          )
        }}
        formats={calendarFormats}
        slotPropGetter={calendarStyles.slotPropGetter}
        headerStyle={calendarStyles.headerStyle}
        timeslotsWrapperStyle={calendarStyles.timeslotsWrapperStyle}
        timeGutterStyle={calendarStyles.timeGutterStyle}
        todayStyle={calendarStyles.todayStyle}
        onNavigate={handleNavigate}
        date={selectedDate || new Date()}
        dayLayoutAlgorithm={isMobile ? 'no-overlap' : 'fixed'}
        longPressThreshold={isMobile ? 200 : 150} // Better mobile long-press handling
      />
    </div>
  );
};

export default Step1Calendar;