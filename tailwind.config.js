/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B3A4D',
        secondary: '#FDF2F2',
        surface: '#F9FAFB',
      },
      fontFamily: {
        serif: ['Montserrat', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
