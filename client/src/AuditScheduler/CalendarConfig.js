// calendarConfig.js
export const calendarStyles = {
  eventPropGetter: (event) => ({
    className: `
      rounded-lg p-2 md:p-3 flex items-center justify-center h-full m-0 
      transition-all shadow-sm whitespace-normal break-words
      ${event.className?.includes("bg-red-100") 
        ? "bg-red-100 border-l-4 border-red-500 text-red-700 cursor-not-allowed" 
        : "bg-blue-50 border-l-4 border-blue-500 text-blue-700 hover:bg-blue-100 cursor-pointer"}
    `,
  }),

  slotPropGetter: () => ({
    className: "min-h-[60px] md:min-h-[70px] transition-all",
  }),

  headerStyle: {
    className: `
      bg-white border-b-2 border-gray-200 rounded-t-xl p-4 md:p-5
      font-semibold text-sky-900 shadow-sm
    `,
  },

  timeslotsWrapperStyle: {
    className: "border-r border-gray-200 bg-gray-50",
  },

  timeGutterStyle: {
    className: "bg-gray-50 border-r border-gray-200 text-slate-600 font-medium px-3 text-sm",
  },

  todayStyle: {
    className: "bg-gradient-to-br from-sky-100 to-sky-50 border-2 border-sky-300",
  }
};

export const calendarComponents = {
  event: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <span className="text-xs text-red-600 mt-1">Booked</span>
      </div>
    </div>
  ),

  dateCellWrapper: ({ value, children }) => (
    <div className={`relative h-full rounded-md overflow-hidden ${
      value < new Date() ? "opacity-30" : "hover:bg-blue-50"
    } transition-all duration-300 ease-in-out`}>
      {children}
      {value < new Date() && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-transparent via-gray-400 to-transparent opacity-40"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 85%, 15% 100%, 0 85%)",
            }}
          />
        </div>
      )}
    </div>
  ),

  eventWrapper: ({ children }) => <div className="m-0">{children}</div>,
   timeSlotWrapper: ({ children }) => (
    <div 
      className="relative touch-pan-y"
      onTouchStart={(e) => e.preventDefault()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
};

export const calendarFormats = {
  eventTimeRangeFormat: () => null,
  timeGutterFormat: 'ha'

};