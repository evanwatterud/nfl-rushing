module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      scoreblue: {
        100: "#162053",
        200: "#0f163a"
      },
      scoreyellow: "#f0aa41"
    }
    },
  },
  plugins: [],
}
