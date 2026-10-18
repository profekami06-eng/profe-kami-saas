/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vino: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d2d9',
          300: '#f4adbc',
          400: '#ec7d95',
          500: '#df5072',
          600: '#c83256',
          700: '#9e1c3b',
          800: '#7a152d',
          900: '#5c1122',
          950: '#380612',
        },
        rosa: {
          50: '#fff5f7',
          100: '#ffeef2',
          200: '#ffdce4',
          300: '#ffc1d0',
          400: '#ff96b0',
          500: '#f86e92',
          600: '#e14771',
        },
        calido: {
          50: '#faf8f6',
          100: '#f5f0ec',
          200: '#ebe2dc',
          300: '#dbcbc1',
          400: '#baa394',
          800: '#2d2623',
          900: '#1c1715',
        },
        dorado: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'soft-vino': '0 10px 30px -10px rgba(122, 21, 45, 0.15)',
        'glow-vino': '0 0 25px rgba(158, 28, 59, 0.25)',
        'glow-rosa': '0 0 20px rgba(255, 150, 176, 0.3)',
      }
    },
  },
  plugins: [],
}
