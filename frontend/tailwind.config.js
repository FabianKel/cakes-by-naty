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
        customPink1: '#EA7E7E',
        buttonCardPink: '#DB7D7D',
        otherPink: '#EAC2C4',
        midPink: '#EA8F8F',
        hoverPink:'#E57373', 
        subtitlesPink: '#BC6B6B',
        customCream:'#FEFDED',
        customGray: '#EBEBEB',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
				navheader: ['Poppins','sans-serif'],
        subtitles: ['Merriweather Sans', 'sans-serif'],
        hsubtitles: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 1s ease-out',
        fadeIn: 'fadeIn 1s ease-out',
      },
    },
  },
  plugins: [],
};
