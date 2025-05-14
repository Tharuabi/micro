/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#01EFFC',
        'accent-hover': '#00D8E6',
        'brand-text': '#2D3748',
        'brand-bg': '#F7FAFC',
        'brand-surface': '#FFFFFF',
        'brand-secondary': '#4A5568',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};
