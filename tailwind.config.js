module.exports = {
  content: [
    './*.{js,jsx,ts,tsx}',
    './components/*.{js,jsx,ts,tsx}',
    './components/Speed/*.{html,js}',

    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
