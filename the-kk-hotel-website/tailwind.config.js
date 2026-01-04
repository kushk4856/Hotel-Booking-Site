/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E1E8EF",
          100: "#D4DEE7",
          200: "#B7C7D7",
          300: "#99B0C7",
          400: "#7C99B6",
          500: "#5E82A6",
          600: "#4C6B8A",
          700: "#3B546D",
          800: "#293D51",
          900: "#182634",
          950: "#141C24",
        },
        // Dark theme base colors
        dark: {
          bg: "#0a0a0f",
          surface: "#1a1a22",
          border: "#2a2a35",
          muted: "#6b6b6b",
        },
        // Light theme base colors
        light: {
          bg: "#0000000d",
          surface: "#ffffff",
          border: "#e5ddd5",
          text: "#3d3229",
          muted: "#6b5c4c",
        },
        accent: {
          50: "#FAF5F0",
          100: "#F4ECE1",
          200: "#E8D6BF",
          300: "#DDC09D",
          400: "#D2AA7B",
          500: "#C69459",
          600: "#9E7647",
          700: "#775935",
          800: "#4F3B24",
          900: "#281D12",
          950: "#140F09",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
    },
  },
  plugins: [],
};
