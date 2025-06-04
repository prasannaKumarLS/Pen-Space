module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-50%) scale(0.8)" },
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
      },
      animation: {
        slideIn: "slideIn 0.5s ease-out backwards",
        "fade-in-down": "fadeInDown 0.3s ease-out",
        "fade-out-delay": "fadeOut 0.5s ease-in-out 3.5s forwards",
        "progress-bar": "progressShrink 4s linear forwards",
      },
    },
  },
  plugins: [],
};
