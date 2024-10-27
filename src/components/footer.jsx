import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";

function Footer() {
    return (
        <footer className="w-full h-44 border border-gray-500 flex bg-[#faeff90] py-4">
            
            <div className="w-[30%] h-full px-10">
                <p className="font-semibold py-2 text-[18px]">Contáctanos</p>
                <div className="flex mb-2">
                    <FaPhoneAlt className="text-[#ef89e5] mr-2"/>
                    <p className="text-[14px] text-[#252525] md:text-sm sm:text-xs">448 112 88 89</p>
                </div>
                <div className="flex">
                    <MdEmail className="text-[#ef89e5] mr-2 mt-1"/>
                    <p className="text-[14px] text-[#252525] md:text-sm sm:text-xs">gabyst03@gmail.com</p>
                </div>
            </div>

            <div className="w-[40%] h-full flex-col items-center justify-center">
                <p className="font-semibold mb-2 text-[18px]">¿Tienes dudas?</p>
                <p className="mb-2 text-[14px]">Déjanos saberlas</p>
                <input type="text" className="w-[50%] h-[20px] border rounded-lg border-gray-500 p-4 mb-5 md:text-sm sm:text-xs" />
                <br />
                <button className="bg-[#ef89e5] w-[30px] md:w-60 sm:w-72 h-[30px] rounded-xl text-white font-semibold mb-4 text-md md:text-sm sm:text-xs"> Enviar </button>
            </div>

            <div className="w-[30%] h-full ">
                <p className="font-semibold mb-2 text-[18px]">Nuestras redes sociales</p>
                <div className="flex">
                    <SlSocialInstagram className="text-[#ef89e5] mr-2 mt-1 mb-3" />
                    <p className="text-[14px] text-[#252525] md:text-sm sm:text-xs" >by.collection.st</p>
                </div>
                <div className="flex">
                    <SlSocialFacebook className="text-[#ef89e5] mr-2 mt-1" />
                    <p className="text-[14px] text-[#252525] md:text-sm sm:text-xs">Collection ST</p>
                </div>
            </div>

        </footer>
    );
}

export default Footer;
