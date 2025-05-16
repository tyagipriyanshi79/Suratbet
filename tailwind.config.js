/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        exo: ['Exo', 'sans-serif'],
      },
      colors: {
        blue: {
            50: '#140e38',
            100: 'rgb(0, 174, 239)',
        },
        white: {
            50: '#fff',
            75: '#ffffff',
        }
      },

      
    },
  },
  plugins: [],
}