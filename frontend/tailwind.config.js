/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes:[
      "luxury"
    ]
  },
  content: ['./src/**/*.jsx'],
  theme: {
    extend: {},
  },
  plugins: [
      require('daisyui'),
  ],
}

//test commit 