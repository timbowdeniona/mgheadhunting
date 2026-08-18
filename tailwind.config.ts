import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep Navy scale (Primary Brand - Authority, Seniority, Industrial Gravitas)
        navy: {
          950: '#07111D',
          900: '#0F243A',
          800: '#163A5F', // Primary Brand Navy
          700: '#1E4C7A',
          600: '#2A649E',
          500: '#3D7DC0',
          400: '#5C96D2',
          300: '#8BB4DF',
          200: '#B6D1ED',
          100: '#D8E6F5',
          50: '#F1F6FB',
          DEFAULT: '#163A5F',
        },
        // Medium Teal scale (Accent - Directional Focus, Precision CTAs & Dividers)
        teal: {
          950: '#062E30',
          900: '#094648',
          800: '#0D5F61',
          700: '#107679',
          600: '#138D90', // Primary Accent Teal
          500: '#17A9AC',
          400: '#22C8CB',
          300: '#5EE2E6',
          200: '#8CE5E7',
          100: '#D2F5F6',
          50: '#F0FBFC',
          DEFAULT: '#138D90',
        },
        // Concrete / Steel Grey scale (Structural Neutral - Hairline borders & grids)
        steel: {
          950: '#171B1C',
          900: '#252B2E',
          800: '#384044',
          700: '#4B5458',
          600: '#626D73',
          500: '#7A858A',
          400: '#A9B2B6',
          300: '#D0D4D6', // Structural Concrete / Steel Grey
          200: '#E2E5E7',
          100: '#EFF1F2',
          50: '#F8FAFB',
          DEFAULT: '#D0D4D6',
        },
        // Canvas & Architectural Surfacing
        canvas: {
          white: '#FFFFFF',
          light: '#F8FAFB',
          muted: '#F1F4F5',
          dark: '#0F243A',
          darker: '#081523',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', '"Public Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0em',
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.15em',
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '2px',
        md: '4px',
        lg: '6px',
      },
      borderWidth: {
        '1': '1px',
        hairline: '1px',
        accent: '2px',
      },
      boxShadow: {
        none: 'none',
        subtle: '0 1px 2px 0 rgba(15, 36, 58, 0.05)',
        architectural: '0 4px 14px -2px rgba(15, 36, 58, 0.08)',
        card: '0 1px 3px 0 rgba(15, 36, 58, 0.06), 0 1px 2px -1px rgba(15, 36, 58, 0.04)',
        elevated: '0 4px 16px -2px rgba(15, 36, 58, 0.10), 0 2px 6px -2px rgba(15, 36, 58, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
