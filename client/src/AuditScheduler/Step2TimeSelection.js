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
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
              animation: 'gridMove 15s linear infinite'
            }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-cyan-400 font-mono text-xs sm:text-sm">
            TIME SLOT SELECTION
          </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold mb-2">
          <span className="text-white">AVAILABLE </span>
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            TIME SLOTS
          </span>
        </h3>
        
        <p className="text-gray-300 text-sm md:text-base">
          {moment(selectedDate).format("dddd, MMMM Do YYYY")}
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto relative z-10">
        {availableSlots.length === 0 && isToday ? (
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-lg blur-xl"></div>
              <div className="relative text-center p-6 md:p-8 bg-gray-900/80 border border-red-500/30 rounded-lg backdrop-blur-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 border-2 border-red-400 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-red-400 font-bold text-lg mb-2">NO SLOTS AVAILABLE</h4>
                <p className="text-gray-300 text-sm md:text-base mb-1">
                  All time slots for today have passed
                </p>
                <p className="text-gray-400 text-xs md:text-sm">
                  Please select another date or check back tomorrow
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pb-6">
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

      {/* Fixed Footer */}
      <div className="relative z-10 pt-6 border-t border-cyan-400/20 sticky bottom-0 bg-gradient-to-t from-gray-900 to-transparent">
        <BackButton onBack={onBack} />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { background-position: 0px 0px; }
          100% { background-position: 30px 30px; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.3); }
          50% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.6); }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const TimeSlotButton = ({ time, isBooked, isSelected, onSelect }) => {
  if (isBooked) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg blur-md"></div>
        <button
          disabled
          className="relative w-full p-4 md:p-5 rounded-lg border border-red-500/30 bg-gray-900/80 backdrop-blur-sm cursor-not-allowed transition-all"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-red-400 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="text-red-400 font-mono text-xs md:text-sm">OCCUPIED</span>
            <span className="text-gray-500 text-xs">{time}</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className={`absolute inset-0 rounded-lg blur-md transition-all duration-300 ${
        isSelected 
          ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30' 
          : 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 group-hover:from-cyan-500/20 group-hover:to-blue-500/20'
      }`}></div>
      
      <button
        onClick={onSelect}
        className={`relative w-full p-4 md:p-5 rounded-lg border transition-all duration-300 backdrop-blur-sm font-mono ${
          isSelected
            ? 'border-cyan-400 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 shadow-lg shadow-cyan-400/20'
            : 'border-cyan-400/30 bg-gray-900/60 text-gray-300 hover:border-cyan-400/50 hover:bg-gray-900/80 hover:text-cyan-400'
        } active:scale-95 touch-manipulation`}
      >
        <div className="flex flex-col items-center gap-2">
          <div className={`w-8 h-8 border-2 rounded-full flex items-center justify-center transition-all ${
            isSelected 
              ? 'border-cyan-400 bg-cyan-400/20' 
              : 'border-cyan-400/50 group-hover:border-cyan-400'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xs md:text-sm">AVAILABLE</span>
          <span className={`text-sm md:text-base font-bold ${
            isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
          }`}>
            {time}
          </span>
        </div>
        
        {isSelected && (
          <div className="absolute inset-0 rounded-lg animate-pulse-glow pointer-events-none"></div>
        )}
      </button>
    </div>
  );
};

const BackButton = ({ onBack }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-lg blur-md group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-300"></div>
    
    <button
      onClick={onBack}
      className="relative w-full md:w-auto flex items-center justify-center md:justify-start gap-3 px-6 py-4 rounded-lg border border-gray-600/50 bg-gray-900/60 backdrop-blur-sm text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 active:scale-95 touch-manipulation font-mono"
    >
      <div className="w-6 h-6 border border-gray-500 rounded-full flex items-center justify-center group-hover:border-cyan-400 transition-all">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <span className="text-sm md:text-base">BACK TO CALENDAR</span>
    </button>
  </div>
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