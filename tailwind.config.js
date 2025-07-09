/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // ✅ Muy importante que incluya `.js`
  ],
  theme: {
    extend: {
        
        backgroundImage: {
        // Clave: 'ipdepot', puedes usarla luego como bg-ipdepot
        'ipdepot': "url('/src/assets/background1.svg')", 
      },
    },
  },
  plugins: [],
};
   
  