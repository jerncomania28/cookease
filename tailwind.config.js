/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'background-cover': 'url("assets/cover.svg")',
        'week-recipe': 'url("assets/week-recipe.svg")',
      },
    },
  },
  plugins: [],
};
