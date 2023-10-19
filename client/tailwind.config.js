/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'tablet': {'max': '640px'},
      // => @media (min-width: 640px) { ... }

      'laptop': {'max': '1024px'},
      // => @media (min-width: 1024px) { ... }

      'desktop': {'max': '1280px'},
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [],
}