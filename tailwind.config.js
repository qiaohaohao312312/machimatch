/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#F5EEE4',
        ink: '#2C2825',
        'teal-deep': '#1D5C6B',
        'teal-soft': '#3A7F8F',
        sand: '#E8DDD0',
        ochre: '#C4873A',
        moss: '#6B7C5C',
        blush: '#D4A89A',
      },
      fontFamily: {
        display: ['"Kaisei Tokumin"', 'Georgia', 'serif'],
        body: ['"Nanum Pen Script"', 'cursive'],
        handwritten: ['"Nanum Pen Script"', 'cursive'],
        ui: ['"Nanum Pen Script"', 'cursive'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
