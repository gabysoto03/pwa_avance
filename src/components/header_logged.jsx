import React, { useState } from "react";
import Icon from "../assets/icon.svg";
import { FaUserAlt } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import MenuUser from "./menuUser";
import NotificationMenu from "./notificationsMenu";
import { useNavigate } from "react-router-dom";


function HeaderLogged() {
    const navigate = useNavigate();

    const handleSelectChangeMen = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue) {
            handleNavigateMen(selectedValue);
        }
    };

    const handleSelectChangeWomen = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue) {
            handleNavigateWomen(selectedValue);
        }
    };

    const handleNavigateMen = (pagina) => {
        navigate("/shoesMen", { state: { pagina } });
    };

    const handleNavigateWomen = (pagina) => {
        navigate("/shoesWomen", { state: { pagina } });
    };

    const [isOpenUser, setIsOpenUser] = useState(false);
    const [isOpenNotifications, setIsOpenNotifications] = useState(false);

    const toggleMenuUser = () => {
        setIsOpenUser(!isOpenUser);
    };

    const toggleMenuNotifications = () => {
        setIsOpenNotifications(!isOpenNotifications);
    };

    return (
        <header className="w-full h-16 bg-[#ef89e5] flex items-center p-4">
            <a href="/home">
                <img src={Icon} alt="Icono" className="h-14 mr-6 ml-6" />
            </a>

            <a href="/home"> Inicio</a>
            
            <span className="w-[85%] h-full flex items-center justify-center">
                <select name="" id="" className="w-[20%] border border-gray-300 bg-transparent mr-6" onChange={handleSelectChangeMen} style={{ cursor: "pointer" }}>
                    <option value="">Hombre</option>
                    <option value="botas">Botas</option>
                    <option value="tenis">Tenis</option>
                    <option value="zapatos">Zapatos</option>
                    <option value="deporte">Deporte</option>
                </select>
                <select name="" id="" className="w-[20%] border border-gray-300 bg-transparent mr-6" onChange={handleSelectChangeWomen} style={{ cursor: "pointer" }}>
                    <option value="">Mujer</option>
                    <option value="tenis">Tenis</option>
                    <option value="zapatillas">Zapatillas</option>
                    <option value="botas">Botas</option>
                    <option value="sandalias">Sandalias</option>
                </select>
            </span>
            <FaBell size={28} className="text-white m-4 mr-4 cursor-pointer" onClick={toggleMenuNotifications} />
            {isOpenNotifications && <NotificationMenu onClose={() => setIsOpenNotifications(false)} />}
            <FaUserAlt size={28} className="text-white m-4 mr-4 cursor-pointer" onClick={toggleMenuUser} />
            {isOpenUser && <MenuUser onClose={() => setIsOpenUser(false)} />}
        </header>
    );
}

export default HeaderLogged;
