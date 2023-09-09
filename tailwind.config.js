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
          cols: "repeat(4, 100px)",
      },
      gridColumn: {
          fullWidth: "1 / -1"
      },
      gridTemplateRows: {
          rows: "minmax(120px, auto) repeat(5, 100px)"
      } ,   
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textColor: {
        grayText: "#575353",
      }
    },
  },
  plugins: [],
}
