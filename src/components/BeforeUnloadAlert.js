import React, { useEffect } from 'react';

const BeforeUnloadAlert = () => {
  useEffect(() => {
    // Manejador de antes de descargar (recargar o salir de la página)
    const handleBeforeUnload = (event) => {
      const mensaje = "¿Estás seguro de que deseas salir o recargar la página?";
      event.returnValue = mensaje;  // Necesario para algunos navegadores
      return mensaje;  // Necesario para algunos navegadores
    };

    // Manejador de confirmación de salida
    const handleUnload = (event) => {
      // Solo se puede usar confirm() en este punto, no puede ser asíncrono
      const confirmExit = window.confirm('¿Quieres ir a la página de inicio?');
      if (confirmExit) {
        // Redirige a la página de inicio usando window.location.replace
        window.location.replace('/home');
        event.preventDefault();  // Impide que la página se recargue después de redirigir
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return null;  // Este componente no necesita renderizar nada
};

export default BeforeUnloadAlert;
