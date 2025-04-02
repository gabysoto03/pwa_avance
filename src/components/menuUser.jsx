import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MenuUser({ onClose }) {
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Detectar clics fuera del menú
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    // Función para el cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true }); 
    }

    return (
        <div ref={menuRef} className="absolute right-0 w-64 h-32 bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas border-header border-[4px] rounded-3xl shadow-lg py-2 z-20 mt-6 mr-10 flex-col items-center justify-center" >

            <button onClick={() => navigate("/cambiarPassword")} className="h-[50%] w-full font-bold text-text dark:text-dark-text text-[16px] border-b-header border-b-[4px]">
                Cambiar contraseña
            </button>

            <button onClick={handleLogout}  className="h-[50%] w-full font-bold text-text dark:text-dark-text text-[16px]">
                Cerrar sesión
            </button>
      
        </div>
    );
}

export default MenuUser;
