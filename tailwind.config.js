/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/components/*.{jsx, js}",
    "./src/components/*/*.{jsx, js}",
    "./src/components/editor/*.{jsx, js}",
    "./src/components/admin/*.{jsx, js}",
    "./src/components/chat/*.{jsx, js}",
    "./src/components/setting/*.{jsx, js}",
    "./src/components/policy/*.{jsx, js}",
    "./src/components/authMiddleware/*.{jsx, js}",
    "./src/components/artist/*.{jsx,js}",
    "./src/componenets/news/*.{jsx, js}",
    "./src/components/notification/*.{jsx,js}",
    "./src/components/analysis/*.{jsx, js}",
    "./src/components/static_data/*.{jsx, js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
