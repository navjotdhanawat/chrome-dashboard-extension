module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  darkMode: "class",
  theme: {
    fontSize: {
      "2xs": "0.35rem",
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
        "vw-50": "50vw",
      },
      scale: {
        100: "1",
        101: "1.01",
      },
      colors: {
        "input-dark": "#25273C",
        "bg-light": "#fafafa",
        "bg-dark": "#181824",
        dark: "#181824",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["dark"],
      fontWeight: ["hover"],
    },
  },
  plugins: [],
  exclude: ["worker"],
};
