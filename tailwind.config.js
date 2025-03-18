// @type {import('tailwindcss').Config}
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': {
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 50%'
          },
          '100%': {
            backgroundPosition: '0% 50%'
          },
        },
      },
    },
    animation: {
      gradient: 'gradient 8s linear infinite'
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}