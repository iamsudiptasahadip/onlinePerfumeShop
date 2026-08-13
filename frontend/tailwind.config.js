/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: '#d4af37',
        dark: '#0b0a0a',
        'dark-card': '#141110',
        'dark-border': '#2a2624',
        cream: '#f0eae3',
        'cream-light': '#f5efe8',
        muted: '#b8a68b',
        'muted-text': '#cdc2b5',
      },
      fontFamily: {
        serif: ['"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
}