const colors = require('tailwindcss/colors')

module.exports = {
  prefix: '',
  purge: {
    enabled: process.env.NODE_ENV === 'prod',
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};