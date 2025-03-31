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
      transitionDelay: {
        '4000': '40000ms', // Adds delay-3000 as a utility
      },
    },
    animation: {
      'gradient': 'gradient 8s linear infinite',
      'rot55': 'rot55 0.7s linear infinite',
    },
    keyframes: {
      rot55: {
        to: {
          transform: 'rotate(360deg)',
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}