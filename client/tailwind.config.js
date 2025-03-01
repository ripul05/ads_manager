// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
          spacing: {
              '128': '32rem',
              '144': '36rem',
          },
          borderRadius: {
              '4xl': '2rem',
          },
          perspective: {
            1000: '1000px',
          },
          rotate: {
            'y-180': 'rotateY(180deg)',
          },
          backfaceVisibility: {
            hidden: 'hidden',
          },
          preserve3d: {
            preserve: 'preserve-3d',
          },
          colors: {
            'blue-50': '#eff6ff',
            'blue-100': '#dbeafe',
            'blue-500': '#3b82f6',
            'blue-600': '#2563eb',
            'gray-50': '#f8fafc',
            'gray-100': '#f1f5f9',
            'gray-500': '#64748b',
            'gray-700': '#334155',
          }
      },
  },
  plugins: [],
}