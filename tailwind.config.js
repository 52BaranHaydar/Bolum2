/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        night: {
          950: '#0b0f1a',
          900: '#111827',
        },
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(251, 191, 36, 0.35)',
        card: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
        panel:
          '0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 50px -15px rgba(251, 191, 36, 0.22)',
        inset: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
        lift: '0 12px 28px -8px rgba(0, 0, 0, 0.55)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(8px, -12px) scale(1.02)' },
          '66%': { transform: 'translate(-6px, 6px) scale(0.98)' },
        },
        pop: {
          '0%': { transform: 'scale(0.96)', opacity: '0.85' },
          '40%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'check-flip': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.55s ease-out both',
        float: 'float 18s ease-in-out infinite',
        pop: 'pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'check-flip': 'check-flip 0.35s ease-out',
        shake: 'shake 0.35s ease-in-out',
      },
    },
  },
  plugins: [],
}
