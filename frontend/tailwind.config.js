/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#48b9d7',
        'primary-hover': '#3aa3c0',
        'primary-light': '#e8f6fa',
      }
    },
  },
  plugins: [],
}
