/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  important: true,
  theme: {
    fontFamily: {
      mark: "Mark, Avenir, Helvetica, Arial, sans-serif",
      "mark-bold": "Mark bold, Avenir, Helvetica, Arial, sans-serif",
      "mark-heavy": "Mark heavy, Avenir, Helvetica, Arial, sans-serif",
    },
    extend: {
      colors: {
        black: "#2f3033",
        grayish: "#676d73",
        primary: "#009fd9",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
