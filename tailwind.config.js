/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd3ff',
          300: '#8eb4ff',
          400: '#588aff',
          500: '#3563ff',
          600: '#1d40f5',
          700: '#162de1',
          800: '#1825b6',
          900: '#0a1450',
          950: '#060a2e',
        },
        accent: {
          cyan: '#22d3ee',
          purple: '#a855f7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(ellipse at 50% 0%, rgba(53,99,255,0.25), transparent 60%)',
        'card-glow': 'radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.12), transparent 70%)',
      },
    },
  },
  plugins: [],
};
