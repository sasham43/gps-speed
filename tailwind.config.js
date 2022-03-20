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
      },
      fontSize: {
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
        '8xl': '5rem',
      },
      height: {
        '120': '30rem',
        '150': '40rem',
      }
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
