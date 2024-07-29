/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{html,js}",
    "./pages/**/*.{html,js}",
    "./index.html",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        Purple: "hsl(259, 100%, 65%)",
        lightRed: " hsl(0, 100%, 67%)",
        offWhite: " hsl(0, 0%, 94%)",
        lightGrey: "hsl(0, 0%, 86%)",
        smokeyGrey: "hsl(0, 1%, 44%)",
        offBlack: "hsl(0, 0%, 8%)",
      },
      fontFamily: {
        popin: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
