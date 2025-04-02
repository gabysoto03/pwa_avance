import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";


const Footer = () => {



    return (
        <div className="w-screen h-36 border-t-[2px] border-t-header">
            
            <div className=" flex h-[80%]">
                <div className="w-2/5 h-full py-6 px-4 ">
                    <section className="flex mb-4">
                        <FaPhoneAlt className="mt-1 mr-4" />
                        <p>442 757 29 32</p>
                    </section>
                    <section className="flex">
                        <MdEmail className="mt-1 mr-4" />
                        <p> ventas@siaumex.com</p>
                    </section>
                </div>

                <div className="w-2/5 h-full py-6 px-16">
                    <section className="mb-4">
                        <a href="https://www.siaumex.com/aviso.html">Aviso de privacidad</a>
                    </section>
                    <section className="mb-4">
                        <a href="https://www.siaumex.com/terms.html">Términos y condiciones</a>
                    </section>
                </div>

                <div className="w-1/5 h-full py-6 px-3">
                    <section className="flex h-full w-full">
                        <FaLocationDot className="mt-1 mr-4 h-[50%] w-[10%]" />
                        <p>Av. Sotavento 1005 Int. 37,Fracc. Real Solare, El Marqués, Qro.</p>
                    </section>
                </div>
            </div>


            <div className="w-full h-[20%] flex items-center justify-center">
                <p className="text-text_light">© Copyright SIAUMex.</p>
            </div>
            

        </div>
    );
}

export default Footer;
