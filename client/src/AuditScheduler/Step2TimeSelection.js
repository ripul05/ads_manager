
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const Step2TimeSelection = ({
  selectedDate,
  onTimeSelect,
  onBack,
  localOccupiedSlots,
  selectedTime,
  generateTimeSlots
}) => {
  const isToday = moment(selectedDate).isSame(moment(), "day");
  const allSlots = generateTimeSlots();
  
  const availableSlots = allSlots.filter((time) => {
    const [hours, minutes] = time.replace(/ AM| PM/, "").split(":");
    const slotTime = moment(selectedDate)
      .clone()
      .set({
        hour: parseInt(hours) + (time.includes("PM") && hours !== "12" ? 12 : 0),
        minute: parseInt(minutes),
        second: 0,
        millisecond: 0,
      });
    return slotTime.isAfter(moment());
  });

  return (
    <div className="flex flex-col h-full relative">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
      </div>

      {/* Streamlined Header */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
          <span className="text-cyan-400/80 font-mono text-xs uppercase tracking-wide">
            Select Time
          </span>
        </div>
        
        <h3 className="text-2xl font-light mb-2">
          <span className="text-white">Available </span>
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-medium">
            Times
          </span>
        </h3>
        
        <p className="text-gray-400 text-sm">
          {moment(selectedDate).format("dddd, MMMM Do YYYY")}
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto relative z-10">
        {availableSlots.length === 0 && isToday ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 border border-red-400/30 rounded-full mb-4">
              <svg className="w-6 h-6 text-red-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-red-400 font-medium text-lg mb-2">No slots available</h4>
            <p className="text-gray-400 text-sm">
              All time slots for today have passed. Please select another date.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 pb-6">
            {availableSlots.map((time) => {
              const [hours, minutes] = time.replace(/ AM| PM/, "").split(":");
              const slotStart = moment(selectedDate).clone().set({
                hour: parseInt(hours) + (time.includes("PM") && hours !== "12" ? 12 : 0),
                minute: parseInt(minutes),
                second: 0,
                millisecond: 0,
              });

              const isBooked = localOccupiedSlots.some((occupied) => {
                const occupiedStart = moment(occupied.start)
                  .seconds(0)
                  .milliseconds(0);
                const occupiedEnd = moment(occupied.end)
                  .seconds(0)
                  .milliseconds(0);

                return (
                  slotStart.isSameOrAfter(occupiedStart) &&
                  slotStart.isBefore(occupiedEnd)
                );
              });

              return (
                <TimeSlotButton
                  key={time}
                  time={time}
                  isBooked={isBooked}
                  isSelected={selectedTime === time}
                  onSelect={() => !isBooked && onTimeSelect(time)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Minimalist Footer */}
      <div className="relative z-10 pt-6 border-t border-gray-700/30">
        <BackButton onBack={onBack} />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes subtle-glow {
          0%, 100% { box-shadow: 0 0 0 1px rgba(6, 182, 212, 0.2); }
          50% { box-shadow: 0 0 0 1px rgba(6, 182, 212, 0.4), 0 0 8px rgba(6, 182, 212, 0.2); }
        }
        
        .animate-subtle-glow {
          animation: subtle-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const TimeSlotButton = ({ time, isBooked, isSelected, onSelect }) => {
  if (isBooked) {
    return (
      <button
        disabled
        className="relative px-3 py-2.5 rounded-lg border border-red-400/20 bg-gray-900/40 backdrop-blur-sm cursor-not-allowed transition-all"
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-4 h-4 flex items-center justify-center">
            <svg className="w-3 h-3 text-red-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <span className="text-red-400/60 text-xs font-mono">{time}</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onSelect}
      className={`relative px-3 py-2.5 rounded-lg border transition-all duration-200 backdrop-blur-sm font-mono group ${
        isSelected
          ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-400 animate-subtle-glow'
          : 'border-gray-600/40 bg-gray-900/30 text-gray-300 hover:border-cyan-400/40 hover:bg-gray-900/50 hover:text-cyan-300'
      } active:scale-95`}
    >
      <div className="flex flex-col items-center gap-1">
        <div className={`w-4 h-4 flex items-center justify-center transition-all ${
          isSelected 
            ? 'text-cyan-400' 
            : 'text-gray-500 group-hover:text-cyan-400'
        }`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className={`text-xs font-medium ${
          isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
        }`}>
          {time}
        </span>
      </div>
    </button>
  );
};

const BackButton = ({ onBack }) => (
  <button
    onClick={onBack}
    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-600/40 bg-gray-900/30 backdrop-blur-sm text-gray-300 hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-200 active:scale-95 font-mono text-sm"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
    </svg>
    <span>Back</span>
  </button>
);

Step2TimeSelection.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onTimeSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  localOccupiedSlots: PropTypes.array.isRequired,
  selectedTime: PropTypes.string,
  generateTimeSlots: PropTypes.func.isRequired
};

export default Step2TimeSelection;