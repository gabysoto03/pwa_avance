import React, { useState } from "react";
import ClientesIcon from "../assets/icons/clientesIcon.svg" 
import UserAdd from "../components/administrar_usuario/AgregarUsuario";
import UserAdmin from "../components/administrar_usuario/AdministrarUsuario";

const ClientePage = () => {

    const [mode,  setMode] = useState("add");

    const handleChangeMode = (value) => {
        setMode(value);
    }

    return (
        <div className="w-screen h-[250vh] flex-col justify-center py-5 dark:bg-dark-body">
            <div className="w-full h-[10%] flex">
                <p className="w-[90%] h-full flex items-center justify-center text-[60px] text-text dark:text-dark-text font-bold pl-32">
                    Clientes
                </p>
               
                <div className="w-[6%] h-[65%] p-3 flex items-center justify-center rounded-full border-[4px] border-botones bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas mt-2">
                    <img src={ClientesIcon} alt="" />
                </div>
            
            </div>


            <div className="w-full h-[85%] px-40">
                <div className="w-[35%] h-[3%] ml-10 flex">
                    <button onClick={() => handleChangeMode("add")} className={`w-[49%] rounded-t-3xl mr-4 text-text dark:text-dark-text text-[14px] font-bold ${mode === "add" ? "bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas" : "bg-inputs"}`}>Agregar cliente</button>
                    <button onClick = {() => handleChangeMode("update")} className={`w-[49%] rounded-t-3xl text-text dark:text-dark-text text-[14px] font-bold ${mode === "update" ? "bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas" : "bg-inputs" }`}>Administrar clientes</button>
                </div>
                
                <div className="w-full h-[97%] rounded-3xl bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas shadow-2xl">
                    
                    { mode === "add" && (
                        <UserAdd ></UserAdd>
                    )}  
                    
                    { mode === "update" && (
                        <UserAdmin ></UserAdmin>
                    )}  
                   
                </div>

                
            </div>
        </div>
    )
}

export default ClientePage;