/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customPink: '#FEE4E5',
        custom1Pink: '#EA7E7E',
        otherPink: '#EAC2C4',
        midPink: '#EA8F8F',
        hoverPink:'#E57373', 
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
				navheader: ['Poppins','sans-serif'],
        subtitles: ['Merriweather Sans', 'sans-serif'],
			},
    },
  },
  plugins: [],
};
