/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
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
        "primary-200": "#79d2f2",
        "primary-100": "#eaf6fa",
        //   100: "#eaf6fa",
        //   200: "#79d2f2",
        //   300: "#009fd9",
        // },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
