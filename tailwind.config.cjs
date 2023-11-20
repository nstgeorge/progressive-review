const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['elza', ...defaultTheme.fontFamily.sans],
        serif: ['abril-display', ...defaultTheme.fontFamily.serif]
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
}
