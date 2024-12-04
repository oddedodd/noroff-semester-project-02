/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}","!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#F9F9F9', 
          secondary: '#CCF3EF',
          footer: '#233E51',
        },
      },
    },
  },
  plugins: [],
}

