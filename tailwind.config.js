/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 2s ease-out forwards',
        'typing': 'typing 4s steps(40) 1 normal both',
        'float1': 'float1 8s ease-in-out infinite',
        'float2': 'float2 10s ease-in-out infinite',
        'float3': 'float3 12s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        float1: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-40px)' },
        },
        float3: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-60px)' },
        },
      },
    },
  },
  plugins: [],
};
