/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E11D48",
        secondary: "#F43F5E",
        dark: "#1b1b1b",
        success: '#00ff00',
      },
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
        sans: [ "Poppins", "sans-serif"]
      },
    },
  },
  plugins: [],
}