/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        playing: {
          '0%': { transform: 'scaleY(0.15)' },
          '50%': { transform: 'scaleY(1.25)' },
          '100%': { transform: 'scaleY(0.15)' },
        },
      },
    },
  },
  plugins: [],
};
