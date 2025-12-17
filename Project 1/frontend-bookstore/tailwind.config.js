/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2f855a",      // Main green for buttons, headers
        accent: "#38a169",       // Secondary green for highlights, hover states
        lightBg: "#f0fff4",      // Main background
        softGreen: "#c6f6d5",    // Subtle sections, cards
        darkText: "#2d3748",     // Main text
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
