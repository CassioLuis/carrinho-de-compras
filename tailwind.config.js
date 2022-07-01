/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(240px, 240px))",
      },
      dropShadow: {
        "3xl":
          "0px 0px 3px rgba(0, 0, 0, 0.13), 0px 3px 6px rgba(0, 0, 0, 0.26)",
      },
      fontSize: {
        xxs: ".6rem",
      },
    },
  },
  plugins: [],
};
