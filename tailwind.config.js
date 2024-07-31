/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'media',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        'name': '25vw'
      },
      colors:{
        'blue': '#D1ECF3',
        'blue-active': '#94D2E2',
        'blue-table': '#EDF7FA'
      },
      transitionProperty:{
        'height': 'height'
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
          ".no-scrollbar::-webkit-scrollbar": {
              display: "block",
              position: "absolute"
          },
          ".no-scrollbar": {
              "-ms-overflow-style": "auto",
              "scrollbar-width": "16px",
          },
          "button":{
              "user-select": "none",
          }
      };
      addUtilities(newUtilities);
    },
    require('tailwind-scrollbar')
],
}

