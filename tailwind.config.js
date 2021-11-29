module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        grey: {
          // theme('colors.indigo.light')
          transparent: '#20202380',

          // theme('colors.indigo.DEFAULT')
          DEFAULT: '#202023',
          light: '#43434a',
        },
        change: {
          // theme('colors.indigo.light')
          light: '#FBD28D',
          lighthover: '#F6AD54',

          // theme('colors.indigo.DEFAULT')
          dark: '#7F5AD5',
          darkhover: '#6B46C1',
        },
        cyan: {
          // theme('colors.indigo.DEFAULT')
          dark: '#38B2AB',
          DEFAULT: '#81E6D9',
        },

        // theme('colors.indigo-dark')
        'grey-dark': '#202023',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
