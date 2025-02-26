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
      },
  },
  plugins: [],
}