/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bone: {
          50:  "#F4F2EC",
          100: "#ECE9E1",
          200: "#E4E2DC",
          300: "#D8D4C8",
          400: "#BFBAAA",
        },
        ink: {
          1000: "#0C0C0C",
          900:  "#161616",
          800:  "#2A2926",
          700:  "#3F3D38",
          600:  "#5B5852",
          500:  "#7A766E",
          400:  "#9B968C",
        },
        forest: {
          900: "#0E2E1E",
          800: "#14422A",
          700: "#1A5134",
          600: "#1F5A3A",
          500: "#2A6E48",
          400: "#4A8D68",
          300: "#7FB296",
          200: "#B7D5C3",
          100: "#DEEAE2",
          50:  "#EEF4F0",
        },
      },
      fontFamily: {
        display: ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans:    ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        caps: '0.14em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadein: { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeup: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadein: 'fadein 280ms cubic-bezier(0.22, 1, 0.36, 1) both',
        fadeup: 'fadeup 320ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};