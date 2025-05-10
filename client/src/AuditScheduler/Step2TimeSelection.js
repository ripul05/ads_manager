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
  <div className="flex flex-col h-full">
    {/* Header */}
    <h3 className="text-lg md:text-xl font-semibold px-2 md:px-0 mb-4">
      Select Time for {moment(selectedDate).format("MMMM Do YYYY")}
    </h3>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto">
      {availableSlots.length === 0 && isToday ? (
        <div className="space-y-4">
          <div className="text-center p-4 md:p-6 bg-gray-50 rounded-lg mx-2 md:mx-0">
            <p className="text-gray-500 font-medium text-sm md:text-base">No available slots for today</p>
            <p className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">
              Please select another date or check back tomorrow
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 px-2 md:px-0 pb-4">
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
    <div className="pt-4 border-t border-gray-100 sticky bottom-0 bg-white">
      <BackButton onBack={onBack} />
    </div>
  </div>
);

//   return (
//     <div className="space-y-4 md:space-y-6">
//       <h3 className="text-lg md:text-xl font-semibold px-2 md:px-0">
//         Select Time for {moment(selectedDate).format("MMMM Do YYYY")}
//       </h3>

//       {availableSlots.length === 0 && isToday ? (
//         <div className="space-y-4">
//           <div className="text-center p-4 md:p-6 bg-gray-50 rounded-lg mx-2 md:mx-0">
//             <p className="text-gray-500 font-medium text-sm md:text-base">No available slots for today</p>
//             <p className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">
//               Please select another date or check back tomorrow
//             </p>
//           </div>
//           <BackButton onBack={onBack} />
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 px-2 md:px-0">
//             {availableSlots.map((time) => {
//               const [hours, minutes] = time.replace(/ AM| PM/, "").split(":");
//               const slotStart = moment(selectedDate).clone().set({
//                 hour: parseInt(hours) + (time.includes("PM") && hours !== "12" ? 12 : 0),
//                 minute: parseInt(minutes),
//                 second: 0,
//                 millisecond: 0,
//               });

//               const isBooked = localOccupiedSlots.some((occupied) => {
//                 const occupiedStart = moment(occupied.start)
//                   .seconds(0)
//                   .milliseconds(0);
//                 const occupiedEnd = moment(occupied.end)
//                   .seconds(0)
//                   .milliseconds(0);

//                 return (
//                   slotStart.isSameOrAfter(occupiedStart) &&
//                   slotStart.isBefore(occupiedEnd)
//                 );
//               });

//               return (
//                 <TimeSlotButton
//                   key={time}
//                   time={time}
//                   isBooked={isBooked}
//                   isSelected={selectedTime === time}
//                   onSelect={() => !isBooked && onTimeSelect(time)}
//                 />
//               );
//             })}
//           </div>
//           <BackButton onBack={onBack} />
//         </div>
//       )}
//     </div>
//   );
};

const TimeSlotButton = ({ time, isBooked, isSelected, onSelect }) => (
  <button
    onClick={onSelect}
    disabled={isBooked}
    className={`
      p-3 md:p-4 rounded-lg transition-all flex flex-col items-center 
      active:scale-95 touch-manipulation w-full
      ${isBooked
        ? "bg-red-100 text-red-700 cursor-not-allowed"
        : isSelected
        ? "bg-blue-600 text-white"
        : "bg-blue-50 hover:bg-blue-100"}
    `}
  >
    {isBooked ? (
      <>
        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span className="block text-xs md:text-sm font-medium">Booked</span>
      </>
    ) : (
      <span className="block text-sm md:text-base font-medium">{time}</span>
    )}
  </button>
);

const BackButton = ({ onBack }) => (
  <button
    onClick={onBack}
    className="
      text-blue-600 hover:text-blue-800 flex items-center gap-2 
      px-4 py-2 md:py-3 w-full md:w-auto justify-center md:justify-start
      active:scale-95 touch-manipulation
    "
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    <span className="text-sm md:text-base">Choose different date</span>
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