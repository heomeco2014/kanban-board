/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        raised: '0px 2px 1px #F8BDEB, 0px 0px 1px #80B3FF',
        custom: '0 .125rem .5rem rgba(0, 0, 0, .08)',
      },
      padding: {
        task: '7px 10px 2px',
      },
     
    },
  },
  variants: {},
  plugins: [],
}
