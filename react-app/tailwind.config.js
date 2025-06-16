module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-50%) scale(0.8)" },
          "100%": { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        slideInFromYaxis: {
          "0%": { opacity: "1", transform: "translateY(-30%) scale(0.9)" },
          "100%": { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        progressShrink: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        shimmer: {
          "0%": { "background-position": "-468px 0" },
          "100%": { "background-position": "468px 0" },
        },
        "pulse-spin": {
          "0%": { opacity: "0.5", transform: "rotate(0deg) scale(0.8)" },
          "50%": { opacity: "1", transform: "rotate(180deg) scale(1)" },
          "100%": { opacity: "0.5", transform: "rotate(360deg) scale(0.8)" },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-out backwards",
        slideInForward: "slideInFromYaxis 0.5s ease-out backwards",
        "fade-in-down": "fadeInDown 0.3s ease-out",
        "fade-out-delay": "fadeOut 0.5s ease-in-out 3.5s forwards",
        "progress-bar": "progressShrink 4s linear forwards",
        shimmer: "shimmer 1.5s infinite linear",
        "pulse-spin": "pulse-spin 2s ease-in-out infinite",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
