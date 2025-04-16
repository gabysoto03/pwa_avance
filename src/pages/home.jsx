import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CotizacionIcon from "../assets/icons/cotizacionIcon.svg"
import ReportesIcon from "../assets/icons/reportesIcon.svg"
import ClientesIcon from "../assets/icons/clientesIcon.svg"
import { CotizacionContext } from "../context/CotizacionContext";

const HomePage = () => {
    
    const navigate = useNavigate();
    const {
        productosContext,
        setProductosContext,
        clientesContext,
        setClientesContext,
        opcionEnvioContext,
        setOpcionEnvioContext,
        semanasEnvioContext,
        setSemanasEnvioContext,
        condicionesContext,
        setCondicionesContext,
        consideracionContext, 
        setConsideracionesContext,
        consideracionDefectoContext, 
        setConsideracionesDefectoContext
    } = useContext(CotizacionContext);

    const token = localStorage.getItem("token");
    console.log("Token: ", token)

    
    // Limpiamos el context para que no tenga datos de otras cotizaciones. 
    useEffect (() => {
        setProductosContext([]);
        setClientesContext([]);
        setOpcionEnvioContext(clientesContext.Direccion || "");
        setSemanasEnvioContext(1);
        setCondicionesContext(clientesContext.CondicionesPago || "");
        setConsideracionesContext([]);
        setConsideracionesDefectoContext([]);

    }, [])


    return (
        <div className="w-screen h-screen flex flex-col items-center dark:bg-dark-body ">
            <div className="w-full h-[25%] flex items-center justify-center">
                <p className="text-[60px] text-text dark:text-dark-text font-bold">¡Bienvenido!</p>
            </div>

            <div className="w-full h-[70%] flex items-center px-44">
                
                <section className="w-[30%] h-[90%] mr-24 bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas shadow-lg rounded-3xl flex flex-col items-center" onClick={() => navigate("/cotizaciones")}>
                    <p className="h-[20%] flex items-center text-[32px] text-text dark:text-dark-text font-bold">Cotizaciones</p>
                    <div className="h-[70%] w-full flex justify-center p-4">
                        <div className="w-[53%] h-[50%] flex items-center justify-center rounded-full border-[4px] border-botones">
                            <img src={CotizacionIcon} alt="" />
                        </div>
                    </div>
                    <p className="text-[15px] dark:text-white">Realiza cotizaciones a tus clientes. </p>
                </section>

                <section className="w-[30%] h-[90%] mr-24 bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas shadow-lg rounded-3xl flex flex-col items-center" onClick={() => navigate("/reportes")}>
                    <p className="h-[20%] flex items-center text-[32px] text-text dark:text-dark-text font-bold">Reportes</p>
                    <div className="h-[70%] w-full flex justify-center p-4">
                        <div className="w-[53%] h-[50%] flex items-center justify-center rounded-full border-[4px] border-botones">
                            <img src={ReportesIcon} alt="" />
                        </div>
                    </div>
                    <p className="text-[15px] dark:text-white">Realiza reportes de fechas determinadas. </p>
                </section>

                <section className="w-[30%] h-[90%] bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas shadow-lg rounded-3xl flex flex-col items-center" onClick={() => navigate("/clientes")}>
                    <p className="h-[20%] flex items-center text-[32px] text-text dark:text-dark-text font-bold">Clientes</p>
                    <div className="h-[70%] w-full flex justify-center p-4">
                        <div className="w-[53%] h-[50%] flex items-center justify-center rounded-full border-[4px] border-botones">
                            <img src={ClientesIcon} alt="" />
                        </div>
                    </div>
                    <p className="text-[15px] dark:text-white px-4">Registra, elimina y administra a los usuarios.</p>
                </section>
            </div>
        </div>
    )
}

export default HomePage;