import React, { useContext, useState } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaTruck } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { CotizacionContext } from "../../context/CotizacionContext";
import CotizacionConfirm from "../../assets/icons/cotizacionConfirm.svg"

const StatusBar = ({ status }) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
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
        setCondicionesContext
    } = useContext(CotizacionContext);


    const handleEnvio = () => {
        if (productosContext.length > 0) {
            navigate("/cotizaciones-envio");
        } else {
            setModalOpen(true);
        }
    }

    const handlePago = () => {
        if (productosContext.length > 0) {
            navigate("/cotizaciones-pago");
        } else {
            setModalOpen(true);
        }
    }


    const handleCondiciones = () => {
        if (productosContext.length > 0 && condicionesContext != '') {
            navigate("/cotizaciones-condiciones");
        } else {
            setModalOpen(true);
        }
    }


    return (
        <div className="w-full h-[27vh] flex items-center justify-center">
            <section onClick={() => navigate("/cotizaciones")} className="w-[8%] h-full flex flex-col items-center justify-center mr-40 ">
                <div className={`rounded-full w-[100%] h-[60%] border-[4px] border-botones flex items-center justify-center ${status === "cotizacion" ? "bg-header" : "bg-fondo_tarjetas"}`}>
                    <MdOutlineAttachMoney className="w-[70%] h-[70%]" />
                </div>
                <p className={`text-[20px] font-bold mt-2 ${status === "cotizacion" ? "text-text dark:text-dark-text" : "text-black dark:text-white"}`}>Cotización</p>
            </section>

            <section onClick={handleEnvio} className="w-[8%] h-full flex flex-col items-center justify-center mr-40 ">
                <div className={`rounded-full w-[100%] h-[60%] border-[4px] border-botones flex items-center justify-center ${status === "envio" ? "bg-header" : "bg-fondo_tarjetas"}`}>
                    <FaTruck className="w-[70%] h-[70%]" />
                </div>
                <p className={`text-[20px] font-bold mt-2 ${status === "envio" ? "text-text dark:text-dark-text" : "text-black dark:text-white"}`}>Envío</p>
            </section>

            <section onClick={handlePago} className="w-[8%] h-full flex flex-col items-center justify-center mr-40 ">
            <div className={`rounded-full w-[100%] h-[60%] border-[4px] border-botones flex items-center justify-center ${status === "pago" ? "bg-header" : "bg-fondo_tarjetas"}`}>
                    <FaHandHoldingUsd className="w-[70%] h-[70%]" />
                </div>
                <p className={`text-[20px] font-bold mt-2 ${status === "pago" ? "text-text dark:text-dark-text" : "text-black dark:text-white"}`}>Pago</p>
            </section>

            <section onClick={handleCondiciones} className="w-[8%] h-full flex flex-col items-center justify-center ">
            <div className={`rounded-full w-[100%] h-[60%] border-[4px] border-botones flex items-center justify-center ${status === "condiciones" ? "bg-header" : "bg-fondo_tarjetas"}`}>
                    <GoChecklist className="w-[70%] h-[70%]" />
                </div>
                <p className={`text-[20px] font-bold mt-2 ${status === "condiciones" ? "text-text dark:text-dark-text" : "text-black dark:text-white"}`}>Consideraciones</p>
            </section>



                {/* Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-complemento  dark:bg-dark-complemento px-6 py-4 rounded-3xl shadow-lg w-[50%] h-[40%] border-[4px] border-border dark:border-dark-border flex flex-col items-center justify-center ">

                            <section className="w-full h-[40%] flex justify-center">
                                <img src={CotizacionConfirm} alt="" />
                            </section>

                            <section className="w-full h-[30%] flex items-center justify-center">
                                <p className="font-semibold text-text dark:text-dark-text text-[18px]">Completa correctamente esta etapa para pasar a la siguiente.</p>
                            </section>
                            
                            <section className="w-full h-[30%] flex items-center justify-center">
                                <button 
                                    onClick={() => setModalOpen(false)}
                                    className={`w-[30%] h-[70%] rounded-3xl bg-text text-white font-bold text-[16px] `}
                                >
                                    Aceptar
                                </button>
                            </section>
                            </div>

                    </div>        
                )}
        </div>
    )
}

export default StatusBar;