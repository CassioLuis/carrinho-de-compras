/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(213.67px, 213.67px))",
      },
      dropShadow: {
        "3xl":
          "0px 0px 3px rgba(0, 0, 0, 0.13), 0px 3px 6px rgba(0, 0, 0, 0.26)",
        shadowInset: "inset 0 0 5px rgba(0,0,0,.2)",
      },
      fontSize: {
        xxs: ".6rem",
      },
      shadowInset: {},
    },
  },
  plugins: [],
};
