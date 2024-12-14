/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}","!./node_modules/**/*"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        headlines: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        '2.5xl': '1.75rem',
        '4.5xl': '2.75rem',
      },
      colors: {
        background: {
          primary: '#F9F9F9', 
          secondary: '#CCF3EF',
          footer: '#233E51',
          charcoal: '#233E51',
          ecru: '#C8B181',
          scarlet: '#F42C04',
          'scarlet-light': '#FEC9B6',
          'scarlet-extra-light': '#FFE4DF',
          turquoise: '#34D1BF',
          'dark-purple': '#31081F',
        },
        charcoal: '#233E51',
        ecru: '#C8B181',
        scarlet: '#F42C04',
        'scarlet-light': '#FEC9B6',
        'scarlet-extra-light': '#FFE4DF',
        turquoise: '#34D1BF',
        'dark-purple': '#31081F',
      },
    },
  },
  plugins: [],
}

