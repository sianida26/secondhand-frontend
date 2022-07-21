/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          1: '#E2D4F0',
          2: '#D0B7E6',
          3: '#A06ECE',
          4: '#7126B5',
          5: '#4B1979',
        },
        cream: {
          1: '#FFF8ED',
          2: '#FFF0DC',
          3: '#FFE9CA',
          4: '#D4C2A8',
          5: '#AA9B87',
        },
        allert: {
          danger: '#FA2C5A',
          warning: '#F9CC00',
          success: '#73CA5C'
        },
        neutral: {
          1: '#FFFFFF',
          2: '#D0D0D0',
          3: '#8A8A8A',
          4: '#3C3C3C',
          5: '#151515',
        }
      },

      boxShadow: {
        low: "0px 0px 4px rgba(0, 0, 0, 0.15)",
        high: "0px 0px 10px rgba(0, 0, 0, 0.15)",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
