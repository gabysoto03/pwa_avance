import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/icons/logo.svg';
import MenuUser from "./MenuUser";
import { MdHome } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

const Header = ({ toggleModoOscuro }) => {

    const [isOpenUser, setIsOpenUser] = useState(false);
    const navigate = useNavigate();
    

    const toggleMenuUser = (event) => {
        setIsOpenUser(!isOpenUser);
    };


    return (
        <div className={`w-screen h-20 bg-header flex py-2`}>

            <div className="w-[15%] h-full flex items-center justify-center" onClick={() => navigate("/home")}>
                <img src={Logo} alt="" className="w-[90%] h-[90%]" />
            </div>

            <div className="w-[85%] h-full flex items-center justify-end px-14">
                
                <div className="w-[4.45%] h-[80%] rounded-full p-1 bg-white mr-5" onClick={() => navigate("/home")}>
                    <MdHome className="w-full h-full"/>
                </div>

                <div className="w-[4.45%] h-[80%] rounded-full p-2 bg-white mr-5" onClick={toggleModoOscuro}>
                    <MdDarkMode className="w-full h-full" />
                </div>

                <div className="w-[4.45%] h-[80%] rounded-full p-3 bg-white" onClick={toggleMenuUser}>
                    <FaUserAlt className="w-full h-full"/>
                    {isOpenUser && <MenuUser onClose={() => setIsOpenUser(false)} />}
                </div>

            </div>

        </div>
    );
}

export default Header;
