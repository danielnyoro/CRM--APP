// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Your custom colors
        "base-bg": "#000000",
        "surface-bg": "#1a1a1a",
        "card-bg": "#0d0d0d",
        "primary-accent": "#4d4df7",
        "secondary-accent": "#30363D",
        "warning-accent": "#e6d80e",
        "main-text": "#ffffff",
        "secondary-text": "#8B949E",
      },
    },
  },
  plugins: [],
};
