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
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};