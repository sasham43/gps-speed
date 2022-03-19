module.exports = {
  content: [
    './*.{js,jsx,ts,tsx}',
    './components/*.{js,jsx,ts,tsx}',
    './components/Speed/*.{html,js}',

    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        'pantone-352': 'rgb(153,229,178)',
        'pantone-344': 'rgb(181,226,191)',
      }
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
