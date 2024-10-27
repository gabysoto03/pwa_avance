import React, { useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

function NotificationMenu({ onClose }) {
    const menuRef = useRef(null);
    const notifications = 20;

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
        <div ref={menuRef} className="absolute right-0 w-96 h-80 bg-gray-100 rounded-lg shadow-lg py-2 z-20 mt-96 mr-4">
            <div className="w-full h-[15%] border-b border-gray-300 flex items-center justify-center">
                <p className="text-[20px] ml-3">Notificaciones</p>
            </div>

            <div className="overflow-y-auto h-[75%]">
                {Array.from({ length: notifications }, (_, index) => (
                    <div key={index} className="w-[95%] h-1/5 p-2 mb-4 border border-[#ef89e5] mt-2 ml-2">
                        <p className="text-[14px]">Notificación {index + 1}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationMenu;
