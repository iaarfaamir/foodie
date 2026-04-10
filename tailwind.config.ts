import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D62828',
        secondary: '#F77F00',
        background: '#FFF3E0',
        text: '#2B2B2B',
        accent: '#2A9D8F',
        surface: '#fff8f2',
      },
      boxShadow: {
        soft: '0 20px 45px rgba(0,0,0,0.08)',
      },
      fontFamily: {
        headline: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Be Vietnam Pro', 'sans-serif'],
      },
      borderRadius: {
        xl: '1.75rem',
      },
    },
  },
  plugins: [],
};

export default config;
