/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'powder-blue': '#F0F8FF',
        'sea-salt': '#F7F7F7',
        'sky-blue': '#87CEEB',
        'steel-blue': '#4682B4',
        'deep-ocean': '#001F3F',
        'slate-blue': '#2C3E50',
        'light-steel-blue': '#B0C4DE', // New background color
      }
    },
  },
  plugins: [],
}