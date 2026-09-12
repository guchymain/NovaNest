/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '390px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1728px',
    },
    extend: {
      colors: {
        forest: {
          950: '#0F2420',
          900: '#142E28',
          850: '#16332C',
          800: '#183B34',
          750: '#1D453D',
          700: '#235047',
        },
        sage: {
          100: '#EAF1EF',
          200: '#D5E4DF',
          300: '#A3C6BE',
          400: '#8FB5AC',
          500: '#7AA69B',
          600: '#678F85',
        },
        amber: {
          accent: '#EAB842',
        },
        card: {
          light: '#F7FAF9',
          border: '#E3ECE8',
        }
      },
      fontFamily: {
        manrope: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
        sans: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
