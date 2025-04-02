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
          'dark-header': "#2D3748", // Fondo oscuro del header
          'dark-fondo_tarjetas': "#1A202C", // Fondo oscuro de las tarjetas
          'dark-botones': "#F56565", // Botones en modo oscuro
          'dark-inputs': "#4A5568", // Inputs en modo oscuro
          'dark-complemento': "#3182CE", // Complemento oscuro
          'dark-text': "#E2E8F0", // Texto claro en modo oscuro
          'dark-fondo_error': "#2D3748", // Fondo de error en modo oscuro
          'dark-text_light': "#E2E8F0", // Texto claro de advertencia
          'dark-border': "#2B6CB0" // Borde en modo oscuro
        },
      },
    },
    darkMode: 'class', // Esto habilita el uso de clases para modo oscuro
    plugins: [],
  }
  