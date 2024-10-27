import React from "react";

function ResetPassword(){

    return(
        <div className="min-h-screen w-full flex items-center justify-center">
        <div className=" w-[50%] flex flex-col items-center justify-center p-6 border rounded-3xl border-gray-400">
            <p className="font-semibold text-[36px] text-2xl md:text-3xl lg:text-4xl mb-8">Restablece tu contraseña</p>

            <form  className="w-full flex flex-col items-center justify-center">

                <p className="mb-6">Porfavor ingresa tu correo, y se te enviará un mensaje con tu contraseña.  </p>
                <input
                    className="w-[90%] h-[40px] border rounded-lg border-gray-500 p-4 mb-5 md:text-sm sm:text-xs"
                    type="text"
                    placeholder="Escribe tu contraseña"
                />

                <button type="submit" className="bg-[#ef89e5] w-[60px] md:w-60 sm:w-72 h-[40px] rounded-xl text-white font-semibold mb-4 text-md md:text-sm sm:text-xs">
                    Envíar
                </button>


                <a className="text-blue-500 text-[14px] text-md md:text-sm sm:text-xs" href="/">
                    Volver al incio de sesión
                </a>
            </form>
        </div>
    </div>
    )
}

export default ResetPassword;