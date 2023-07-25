/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'background-cover': 'url("assets/cover.svg")',
      },
    },
  },
  plugins: [],
};
