/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        parchment: '#e8e0d4',
        ink: '#0a0a0a',
        'ink-light': '#1a1a1a',
        'ink-lighter': '#2a2a2a',
        gold: '#c4a35a',
        'gold-dim': '#8a7340',
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      lineHeight: {
        reading: '1.85',
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
};
