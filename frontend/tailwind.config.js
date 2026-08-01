/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f4ff',
          100: '#e8e5ff',
          500: '#3b2bee',
          600: '#3122d6',
          700: '#2517b5',
          900: '#160d78',
        },
        figma: {
          bg: '#f6f7fc',
          card: '#ffffff',
          text: '#1e1b4b',
          muted: '#64748b',
          border: '#e8ebf7',
          purple: '#3b2bee',
          lightPurple: '#f0efff',
          green: '#10b981',
          lightGreen: '#e6f7f2',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
