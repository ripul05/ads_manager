const plugin = require('tailwindcss/plugin');

module.exports = {
  // other Tailwind config options...
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.touch-pan-y': {
          'touch-action': 'pan-y',
        },
        '.rbc-time-slot': {
          'min-height': '60px',
          '@screen md': {
            'min-height': '70px',
          },
        },
      });
    }),
  ],
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        md: "12px",
      },
      backgroundImage: {
        "conic-gradient": "conic-gradient(var(--tw-gradient-stops))",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      perspective: {
        1000: "1000px",
      },
      rotate: {
        "y-180": "rotateY(180deg)",
      },
      backfaceVisibility: {
        hidden: "hidden",
      },
      preserve3d: {
        preserve: "preserve-3d",
      },
      colors: {
        "blue-50": "#eff6ff",
        "blue-100": "#dbeafe",
        "blue-500": "#3b82f6",
        "blue-600": "#2563eb",
        "gray-50": "#f8fafc",
        "gray-100": "#f1f5f9",
        "gray-500": "#64748b",
        "gray-700": "#334155",
      },
      touchAction: {
        'pan-y': 'pan-y',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
plugins: [
  require('@tailwindcss/forms'),
  plugin(function({ addComponents }) {
    addComponents({
      '.touch-pan-y': {
        'touch-action': 'pan-y',
      },
      '.rbc-time-slot': {
        'min-height': '60px',
        '@screen md': {
          'min-height': '70px',
        },
      },
    });
  }),
],

};
