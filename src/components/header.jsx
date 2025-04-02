import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/icons/logo.svg';
import MenuUser from "./MenuUser";
import { MdHome, MdDarkMode, MdLightMode } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const Header = ({ toggleModoOscuro }) => {
    const [isOpenUser, setIsOpenUser] = useState(false);
    const navigate = useNavigate();
    
    // Verificar el estado del modo oscuro en localStorage al cargar la página
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("modoOscuro") === "dark"
    );

    const handleToggleDarkMode = () => {
        const nuevoModo = !isDarkMode;
        setIsDarkMode(nuevoModo);
        localStorage.setItem("modoOscuro", nuevoModo ? "dark" : "light");

        
        if (nuevoModo) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        toggleModoOscuro();
    };

    const toggleMenuUser = () => {
        setIsOpenUser(!isOpenUser);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    
    return (
        <div className={`w-screen h-20 bg-header flex py-2 dark:bg-dark-header`}>
            <div className="w-[15%] h-full flex items-center justify-center" onClick={() => navigate("/home")}>
                <img src={Logo} alt="Logo" className="w-[90%] h-[90%]" />
            </div>

            <div className="w-[85%] h-full flex items-center justify-end px-14">
                <div className="w-[4.45%] h-[80%] rounded-full p-1 bg-white dark:bg-black dark:text-white mr-5" onClick={() => navigate("/home")}>
                    <MdHome className="w-full h-full"/>
                </div>

                {/* Botón de Modo Oscuro */}
                <div className="w-[4.45%] h-[80%] rounded-full p-2 bg-white dark:bg-black dark:text-white mr-5" onClick={handleToggleDarkMode}>
                    {isDarkMode ? <MdLightMode className="w-full h-full" /> : <MdDarkMode className="w-full h-full" />}
                </div>

                <div className="w-[4.45%] h-[80%] rounded-full p-3 bg-white dark:bg-black dark:text-white" onClick={toggleMenuUser}>
                    <FaUserAlt className="w-full h-full"/>
                    {isOpenUser && <MenuUser onClose={() => setIsOpenUser(false)} />}
                </div>
            </div>
        </div>
    );
}

export default Header;
