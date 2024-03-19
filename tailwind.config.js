/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'media',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        'blue': '#D1ECF3',
        'blue-active': '#94D2E2'
      }
    },
  },
  plugins: [],
}

