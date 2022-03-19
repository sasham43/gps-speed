module.exports = {
  content: [
    './*.{js,jsx,ts,tsx}',
    './components/*.{js,jsx,ts,tsx}',
    './components/Speed/*{js}',

    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
