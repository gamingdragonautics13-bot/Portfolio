/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spider: {
          bg: "#070811",
          card: "rgba(18, 20, 38, 0.65)",
          glass: "rgba(255, 255, 255, 0.05)",
          glassBorder: "rgba(255, 255, 255, 0.12)",
          red: "#f43f5e",
          rose: "#fb7185",
          lavender: "#c4b5fd",
          lavenderLight: "#ede9fe",
          blue: "#60a5fa",
          powderBlue: "#bae6fd",
          mint: "#6ee7b7",
          softMint: "#d1fae5",
          peach: "#fed7aa",
          pink: "#f472b6",
          neonCyan: "#38bdf8",
          dark: "#0a0b16",
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        futuristic: ['"Syne"', 'sans-serif'],
        glitch: ['"Rubik Glitch"', '"Cinzel Decorative"', '"Rubik Dirt"', 'cursive', 'sans-serif'],
        cinzel: ['"Cinzel Decorative"', '"Rubik Glitch"', 'serif'],
        comic: ['"Bangers"', 'cursive'],
        bungee: ['"Bungee"', 'cursive'],
        dela: ['"Dela Gothic One"', 'cursive'],
      },
      animation: {
        'spider-tingle': 'spiderTingle 3s ease-in-out infinite',
        'hologram-scan': 'hologramScan 4s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'web-draw': 'webDraw 1.5s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        spiderTingle: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.8' },
          '50%': { transform: 'scale(1.08) rotate(2deg)', opacity: '1' },
        },
        hologramScan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(196, 181, 253, 0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 18px rgba(244, 63, 94, 0.7))' },
        },
        webDraw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'spider-glow': '0 0 25px -5px rgba(196, 181, 253, 0.25), 0 0 10px -5px rgba(244, 63, 94, 0.2)',
        'spider-red': '0 0 30px -5px rgba(244, 63, 94, 0.4)',
        'spider-blue': '0 0 30px -5px rgba(96, 165, 250, 0.4)',
        'spider-mint': '0 0 30px -5px rgba(110, 231, 183, 0.4)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
