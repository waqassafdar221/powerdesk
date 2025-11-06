import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#eef2ff',
          200: '#e0e7ff',
          300: '#c7d2fe',
          400: '#a5b4fc',
          500: '#7c8af8',
          600: '#596ef0',
          700: '#3b4ee6',
          800: '#2a3bbf',
          900: '#1b2a8a',
        },
        glass: 'rgba(255,255,255,0.06)'
      },
      boxShadow: {
        'glass-sm': '0 1px 6px rgba(16,24,40,0.04), inset 0 1px 0 rgba(255,255,255,0.02)',
        'glass-md': '0 6px 24px rgba(2,6,23,0.4), inset 0 1px 0 rgba(255,255,255,0.02)',
        'glass-lg': '0 20px 40px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.03)'
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, rgba(124,138,248,0.12), rgba(41,56,191,0.08))',
        'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
        'radial-glow': 'radial-gradient(400px 200px at 10% 10%, rgba(124,138,248,0.12), transparent 30%), radial-gradient(300px 120px at 90% 90%, rgba(41,56,191,0.08), transparent 30%)'
      },
      backdropBlur: {
        xs: '2px',
        sm: '6px',
        md: '12px'
      },
      borderRadius: {
        xl: '1rem'
      }
    }
  },
  plugins: []
}

export default config
