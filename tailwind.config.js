/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Jost"', 'sans-serif'],
      },
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe0e8',
          200: '#ffc2d1',
          300: '#ff9ab5',
          400: '#ff6b94',
          500: '#f43f72',
        },
        violet: {
          50: '#f5f0ff',
          100: '#ede5ff',
          200: '#dcceff',
          300: '#c3a8ff',
          400: '#a67cff',
          500: '#8b5cf6',
        },
        rose: {
          petal: '#f9d5e5',
          soft: '#f7c5d8',
          blush: '#fde8f0',
        },
        lavender: {
          light: '#ede9f8',
          soft: '#ddd6f3',
          medium: '#c4b5fd',
        },
        cream: '#fdfaf6',
        pearl: '#f8f4f0',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'petal-fall': 'petalFall 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
