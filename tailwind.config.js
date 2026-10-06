/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#fdfbf7',
          100: '#f9f6ef',
          200: '#f2eae1',
          300: '#e7d8c6',
          DEFAULT: '#f9f6ef',
        },
        champagne: {
          light: '#f4e8c1',
          DEFAULT: '#d4af37',
          gold: '#c5a059',
          dark: '#9a7b38',
        },
        charcoal: {
          light: '#333333',
          DEFAULT: '#1c1c1c',
          dark: '#111111',
        },
        beige: {
          light: '#f5f2eb',
          DEFAULT: '#e8e2d5',
          dark: '#d3c9b7',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'invitation': '0 20px 40px -15px rgba(0, 0, 0, 0.07), 0 0 15px rgba(197, 160, 89, 0.1)',
        'card-hover': '0 25px 50px -12px rgba(28, 28, 28, 0.12)',
        'envelope': '0 30px 60px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'subtle-pulse': 'subtlePulse 3s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
      },
      keyframes: {
        subtlePulse: {
          '0%, 100%': { opacity: 0.9, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
