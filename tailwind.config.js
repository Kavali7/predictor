/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5B21B6',
        secondary: '#0EA5E9',
        accent: '#F97316',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['"Sora"', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['"Sora"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        elevate: '0 20px 45px -15px rgba(91, 33, 182, 0.35)',
      },
      borderRadius: {
        xl: '1.1rem',
      },
    },
  },
  plugins: [],
}
