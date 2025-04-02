/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'sans': ['Poppins', 'sans-serif'],
          'barlow': ['Barlow', 'sans-serif'],
        },
        colors: {
          // Colores para el modo claro
          header: "#6BC4EF",
          fondo_tarjetas: "#DDF1FA",
          botones: "#F3434D",
          inputs: "#D9D9D9",
          complemento: "#38B8F4",
          text: "#104C84",
          fondo_error: "#FACECC",
          text_light: "#7F7D7D",
          border: "#089CE4",
  
          // Colores para el modo oscuro
          'dark-body': "#000000",
          'dark-header': "#04182A", 
          'dark-fondo_tarjetas': "#032839",
          'dark-complemento': "#182B33", 
          'dark-text': "#3A8FDE",
          'dark-fondo_error': "#2D3748", 
          'dark-text_light': "#E2E8F0", 
          'dark-border': "#04182A", 
          'dark-color_tarjetas' : "#DDF1FA",
        },
      },
    },
    darkMode: 'class', 
    plugins: [],
  }
  