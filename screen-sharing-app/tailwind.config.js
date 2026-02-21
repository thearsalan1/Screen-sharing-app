module.exports = {
  theme: {
    extend: {
      textShadow: {
        sm: "1px 1px 2px rgba(0,0,0,0.25)",
        DEFAULT: "2px 2px 4px rgba(0,0,0,0.3)",
        lg: "4px 4px 6px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
