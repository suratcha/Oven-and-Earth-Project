/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",  
    "./components/**/*.{js,ts,jsx,tsx}",   
  ],
  theme: {
    extend: {
      fontFamily: {
        Sarabun: ['"Sarabun"', 'sans-serif'],
      },
      colors: {
        brown : '#8B5E3C',
        cream : '#FDF6EC',
        cocoa_taupe : '#8B5E3C',
        almond_cream : '#FFF9F4',
        dark_cocoa : '#4B2E1B',
        milk_tea : '#6B4F3B',
        rose_pink : '#C96A6A',
        biscuit : '#7B4B28',
        berry : '#B54848',
        honey : '#D98F34',
        matcha : '#6E8B61',
        strawberry : '#D96C6C',
        grey : '#C9B9A0', 
        milk : '#fffcfa',
        caramel: '#D8BFAA',    
      },
    },
  },
  plugins: [],
};

