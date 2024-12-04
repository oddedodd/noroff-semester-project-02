/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}","!./node_modules/**/*"],
  theme: {
    extend: {
      fontSize: {
        '2.5xl': '1.75rem',
        '4.5xl': '2.5rem',
      },
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

