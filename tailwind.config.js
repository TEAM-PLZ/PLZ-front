/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      colors: {
        snackbar: '#1B2125',
      },
      backgroundImage: {
        messageBackground: 'url("/images/message_background.png")',
      },
    },
  },
  plugins: [],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
