/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#f5ede1", light: "#faf5ec", dark: "#e8dcc8" },
        espresso: { DEFAULT: "#3a2317", light: "#5c3d29", dark: "#251409" },
        caramel: { DEFAULT: "#c98a4b", light: "#e0ac72", dark: "#a56d34" },
        cyan: { DEFAULT: "#9fc9c8" },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "Helvetica Neue", "sans-serif"],
      },
      boxShadow: {
        warm: "0 20px 50px -12px rgba(58, 35, 23, 0.35)",
      },
    },
  },
  plugins: [],
};
