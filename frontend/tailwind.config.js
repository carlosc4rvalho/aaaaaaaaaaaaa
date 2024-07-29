/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: '#9D0506',
        green: '#008000',
        dark: '#0D1117',
        black: '#000000',
        white: '#FFFFFF',
        light: '#E9E9E9',
      },keyframes: {
        'fade-in': {
          '0%': { opacity: .5 },
          '100%': { opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: .5 },
        },
        'slide-up': {
          '0%': { transform: 'translateY(50%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-down': {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(50%)', opacity: 0 },
        },
        'slide-left': {
          '0%': { transform: 'translateX(50%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-50%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.5)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.5)', opacity: 0 },
        },
        carousel: {
          '0%': {
            transform: 'translateX(150%)',
            opacity: '0',
          },
          '15%, 85%': {
            transform: 'translateX(0%)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(-150%)',
            opacity: '0',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 2s ease-in-out forwards',
        'fade-out': 'fade-out 2s ease-in-out forwards',
        'slide-up': 'slide-up 1s ease-in-out forwards',
        'slide-down': 'slide-down 1s ease-in-out forwards',
        'slide-left': 'slide-left 1s ease-in-out forwards',
        'slide-right': 'slide-right 1s ease-in-out forwards',
        'scale-in': 'scale-in 1s ease-in-out forwards',
        'scale-out': 'scale-out 1s ease-in-out forwards',
        'carousel' : 'carousel 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}