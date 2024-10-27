import React from "react";
import { FaUserCircle } from "react-icons/fa";

function UserConfiguration(){

    return(
        <div className=" w-full flex flex-col items-center justify-center">
            <p className="text-[35px] font-semibold m-10 mb-16">Configurar cuenta</p>

            <div className=" w-full flex items-center justify-center mb-16">

                <div className="w-[30%] flex flex-col items-center justify-center p-6 border rounded-3xl border-gray-400 mr-28">
                    <FaUserCircle size={96} className="text-[#ef89e5]" />
                    <p className="m-4">Nombre Apellido</p>
                    <p className="m-4">correo_electronico@gmail.com</p>
                    <p className="m-4">Género</p>
                </div>

                <div className=" w-[40%] flex flex-col items-center justify-center p-6 border rounded-3xl border-gray-400">

                    <form className="w-full flex flex-col items-center justify-center">
                        <input
                            className="w-[90%] h-[40px] border rounded-lg border-gray-500 p-4 mb-5 md:text-sm sm:text-xs"
                            type="text"
                            placeholder="Nombre Apellido"
                        />
                        <input
                            className="w-[90%] h-[40px] border rounded-lg border-gray-500 p-4 mb-5 md:text-sm sm:text-xs"
                            type="text"
                            placeholder="correo_electronico@gmail.com"
                        />
                        <select name="" id="" className="w-[90%] h-[40px] border rounded-lg border-gray-500 p-4 mb-5 md:text-sm sm:text-xs">
                            <option value="mujer">Mujer</option>
                            <option value="hombre">Hombre</option>
                        </select>
                        <input
                            id="password"
                            className="w-[90%] h-[40px] border rounded-lg border-gray-500 p-4 mb-5 md:text-sm sm:text-xs"
                            type="password"
                            placeholder="******"
                        />
                        <input
                            className="w-[90%] h-[40px] border rounded-lg border-gray-500 p-4 mb-5 md:text-sm sm:text-xs"
                            type="password"
                            placeholder="******"
                        />

                        <button type="submit" className="bg-[#ef89e5] w-[60px] md:w-60 sm:w-72 h-[40px] rounded-xl text-white font-semibold mb-4 text-md md:text-sm sm:text-xs">
                            <a href="/home">Editar cuenta</a>
                        </button>
                    </form>
                </div>

            </div>

    </div>
    )
}

export default UserConfiguration;