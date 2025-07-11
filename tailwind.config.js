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
        animation: {
        'bounce-slow': 'bounce-slow 3s infinite',
        'fade-in': 'fade-in 0.8s ease-out forwards',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    
      },
    },
  },
  plugins: [],
};
   
  