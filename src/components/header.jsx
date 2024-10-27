import React from "react";
import Icon from "../assets/icon.svg"; 
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";

function Header() {
    return (
        <header className="w-full h-16 bg-[#ef89e5] flex items-center p-4">
            <img src={Icon} alt="Icono" className="h-14 mr-6 ml-6"/> 
            <span className="w-[87%] h-full"></span>
            <SlSocialInstagram size={32} className="text-white m-2"/>
            <SlSocialFacebook size={32} className="text-white m-2"/>
        </header>
    );
}

export default Header;
