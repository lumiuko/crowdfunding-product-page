/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.{html,js}'],
  theme: {
    extend: {
      colors: {
        gray: '#7A7A7A',
        line: 'rgba(0, 0, 0, 0.0497193)',
        progress: '#f4f4f4',
        'line-2': 'rgba(0, 0, 0, 0.15)',
        'line-menu': '#ebebeb',
        'moderate-cyan': '#3CB3AB',
        'dark-cyan': '#147A73',
        'dark-gray': '#2F2F2F',
        'light-gray': '#FAFAFA',
        'modal-overlay': 'rgb(0 0 0 / 50%)'
      }
    },
    backgroundImage: {
      'hero-mobile': 'url("/image-hero-mobile.jpg")',
      'hero-desktop': 'url("/image-hero-desktop.jpg")',
      'header-gradient': 'linear-gradient(180deg, rgb(0 0 0 / 60%) 0%, rgb(0, 0, 0, 0.0001) 100%)',
      overlay: 'linear-gradient(180deg, rgb(0 0 0 / 60%) 0%, rgba(0, 0, 0, 0.0001) 100%)'
    },
    fontSize: {
      h1: '2rem', // 32px
      h2: '1.75rem', // 28px
      h3: '1.5rem', // 24px
      h4: '1.25rem', // 20px
      h5: '1.125rem', // 18px
      'body-1': '1rem', // 16px
      'body-2': '0.875rem' // 14px
    },
    lineHeight: {
      h1: '2.4375rem', // 39px
      h2: '2.125rem', // 34px
      h3: '1.875rem', // 30px
      h4: '1.5rem', // 24px
      h5: '1.375rem', // 22px
      'body-1': '1.875rem', // 30px
      'body-2': '1.5rem' // 24px
    },
    borderRadius: {
      card: '8px',
      btn: '34px',
      progress: '34px',
      full: '50%'
    },
    screens: {
      md: '768px',
      xl: '1110px'
    }
  },
  plugins: []
}
