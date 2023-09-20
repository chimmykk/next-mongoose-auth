/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(300px, 1fr))",
      },    
      backgroundColor: {
        bgGreen: "#25D366",
        hoverGreen: "#1EAC4F",
        bgGray: "#F7F7F8",
        bgDark: "#313338",
        darkLint: "#1E1F22"
      },
      textColor: {
        grayText: "#f1eeee",
        hoverGreen: "#1EAC4F",
        bgGreen: "#25D366",
        bgDark: "#313338",
      },
      borderColor: {
        borderC: "#25D366",
        bgDark: "#313338"
      },
      boxShadowColor: {
        bgGreen: "#25D366"
      }
      
    },
  },
  plugins: [],
}