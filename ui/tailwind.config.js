/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        venture: {
          ink: '#0B0B0B',
          mute: '#6C6C70',
          line: '#E8E8E9',
          card: '#FCFCFD',
          soft: '#F5F5F6',
          navy: '#030C5A',
          accent: '#111111'
        },
        chip: {
          yellow: '#F8EFB7',
          blue: '#DCE5FF',
          violet: '#ECDCFD',
          orange: '#FDE4C5',
          green: '#D7F0DE',
          red: '#FAD7D7'
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Segoe UI', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Manrope', 'sans-serif']
      },
      boxShadow: {
        panel: '0 1px 0 rgba(16, 24, 40, 0.03), 0 1px 2px rgba(16, 24, 40, 0.06)'
      },
      borderRadius: {
        card: '10px'
      }
    }
  },
  plugins: []
};
