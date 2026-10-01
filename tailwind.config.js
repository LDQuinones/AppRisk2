/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        institutional: {
          blue: "#0A2540",
          cyan: "#0070F3",
          dark: "#0F172A",
          surface: "#F8FAFC",
        }
      }
    },
  },
  plugins: [],
}
