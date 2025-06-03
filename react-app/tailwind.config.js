module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-50%) scale(0.8)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        }
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out backwards',
      }
    }
  },
  plugins: [],
}
