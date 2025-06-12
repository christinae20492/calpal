/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    colors: {
        redpink: {
          50: '#ffe5e9',
          100: '#fcbfc6',
          200: '#f995a2',
          default: '#F56578',
          700: '#d83f56',
          800: '#b82f44',
          900: '#992035',
        },
        limegreen: {
          50: '#e7ffe8',
          100: '#b9fcb9',
          200: '#8ff98f',
          default: '#5DF55E',
          700: '#42c544',
          800: '#2da82f',
          900: '#1f871f',
        },
        peach: {
          50: '#fff5dc',
          100: '#ffe4aa',
          200: '#fcd77e',
          default: '#F5C270',
          700: '#dba351',
          800: '#b7853c',
          900: '#93662c',
        },
        skyblue: {
          50: '#e6f2ff',
          100: '#b8dafe',
          200: '#8ac4fc',
          default: '#71B6F5',
          700: '#5397d6',
          800: '#3f7cb8',
          900: '#2f6499',
        },
        offblack: "#141414",
        offwhite: "#F7F7F7"
      },
    extend: {
      body: ["FiraSans-Regular", "sans-serif"],
      header: ["Gabarito-VariableFont_wght","sans-serif"]
    },
  },
  plugins: [],
}

