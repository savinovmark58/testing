import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F7',
        'primary-dark': '#1A1A1A',
        accent: '#C9A87C',
        'accent-dark': '#B8935F',
        'accent-light': '#E8D5B7',
        secondary: '#E8E0D5',
        'text-muted': '#6B6B6B',
        'border-soft': '#DDD5C8',
      },
      fontFamily: {
        heading: ['Georgia', 'Times New Roman', 'serif'],
        body: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'sans-serif',
        ],
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #FAF9F7 0%, #F0E8DC 40%, #E8D5B7 100%)',
        'accent-gradient':
          'linear-gradient(135deg, #C9A87C 0%, #B8935F 100%)',
        'dark-gradient':
          'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
      },
      boxShadow: {
        soft: '0 2px 20px rgba(201, 168, 124, 0.12)',
        card: '0 4px 30px rgba(26, 26, 26, 0.08)',
        'card-hover': '0 8px 40px rgba(26, 26, 26, 0.15)',
        glass: '0 8px 32px rgba(201, 168, 124, 0.15)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
