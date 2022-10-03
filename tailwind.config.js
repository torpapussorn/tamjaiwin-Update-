module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        button: '0 5px 10px 0 rgba(0, 0, 0, 0.1)',
      },
      colors: {
        blue: '#003057',
        gold: { DEFAULT: '#b3a369', metallic: '#a28d5b' },
        db2777: { DEFAULT: '#db2777', hover: '#e6629d', loading: '#f390bc' },
        '7a58bf': { DEFAULT: '#7a58bf', hover: '#9a7fcf', loading: '#bcaae0' },
        '34cc9a': { DEFAULT: '#34cc9a', hover: '#65dbb4', loading: '#86e4c5' },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      opacity: {
        16: '0.16',
        56: '0.56',
      },
      spacing: {
        '9px': '9px',
        '10px': '10px',
        '20px': '20px',
      },
    },
    fontSize: {
      xxs: ['10px', { lineHeight: '14px' }],
      xs: ['12px', { lineHeight: '18px' }],
      sm: ['14px', { lineHeight: '20px' }],
      md: ['16px', { lineHeight: '24px' }],
      lg: ['18px', { lineHeight: '26px' }],
      xl: ['24px', { lineHeight: '34px' }],
      xxl: ['36px', { lineHeight: '52px' }],
      sxl: ['48px', { lineHeight: '68px' }],
    },
    screens: {
      xxs: '0px',
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
      sxl: '1920px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
