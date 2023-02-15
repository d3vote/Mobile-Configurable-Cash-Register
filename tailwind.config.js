/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./**/*.{js,jsx,ts,tsx}"],
  darkMode: 'media',
  theme: {
    extend: {}
  },
  plugins: [require('tailwindcss-safe-area')],
}
