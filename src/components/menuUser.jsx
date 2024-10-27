import React, { useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

function MenuUser({ onClose }) {
    const menuRef = useRef(null);

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

    return (
        <div ref={menuRef} className="absolute right-0 w-48 h-36 bg-gray-50 rounded-lg shadow-lg py-2 z-20 mt-56 mr-4">
            <div className="w-full h-[40%] border-b border-gray-300 flex items-center justify-center">
                <FaUserCircle size={28} className="text-[#ef89e5]" />
                <p className="text-[16px] ml-3">Nombre Apellido</p>
            </div>
            <a href="/configuration" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-[14px]">
                Configuración
            </a>
            <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-[14px]">
                Cerrar sesión
            </a>
        </div>
    );
}

export default MenuUser;
