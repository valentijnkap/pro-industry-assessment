/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    colors: {
      primary: '#F4313F',
      secondary: '#19a8f5',
      white: '#ffffff',
      'border-gray': 'rgba(0, 0, 0, 0.15)',
      'background-gray': '#EFF4F6',
      'text-black': '#050606',
    },
    container: {
      padding: '2rem',
      center: true,
    },
  },
  plugins: [],
};
