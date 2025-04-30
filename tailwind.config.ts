import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wolf: {
          gray: '#4B5563',
          dark: '#1E1E2F',
          light: '#9CA3AF',
        },
        forest: {
          green: '#182428',
          light: '#293D36',
          dark: '#0C1A15',
        },
        mountain: {
          blue: '#00F0FF',
          purple: '#DF00FE',
        },
        cyber: {
          pink: '#FC28FB',
          blue: '#03EDF9',
          yellow: '#FEF851',
          green: '#39FF14',
          red: '#FF003C',
        },
      },
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
        heading: ['Orbitron', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [animate],
};

export default config;
