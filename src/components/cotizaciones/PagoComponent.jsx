import React, {useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { CotizacionContext } from "../../context/CotizacionContext";
import CotizacionConfirm from "../../assets/icons/cotizacionConfirm.svg"

function PagoComponent () {

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
    
    const navigate = useNavigate();
    const [condicionesUser, setCondicionesUser] = useState(condicionesContext);
    const [modalConfirm, setModalConfirm] = useState(false);

    const handleCondicionesChange = (e) => {
        setCondicionesUser(e.target.value); 
    };

    useEffect(() => {
        if (productosContext.length === 0){
            navigate('/home')
        }
    })

    const handleSiguienteClick = () => {
        if (condicionesUser != ''){
            navigate("/cotizaciones-condiciones");
            setCondicionesContext(condicionesUser)
        } else {
            setModalConfirm(true);
        }
   
    };


    return (
        <div className="w-screen flex justify-center py-20">
            <div className="bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas rounded-lg w-[80%] h-[65vh] shadow-lg flex flex-col items-center py-10">
                
                <div className="w-[80%] h-[60%] mb-[10%] flex items-center">
                    <p className="text-text dark:text-dark-text font-bold text-[28px] mr-[5%]">Condiciones</p>
                    <input className="w-[80%] h-[20%] rounded-full bg-inputs text-text dark:text-dark-text outline-none px-5" type="text" defaultValue={condicionesContext} onChange={handleCondicionesChange} />
                </div>

                <div className="w-[80%] h-[20%] flex items-end">
                    <section className="w-[50%] h-full flex items-end justify-start">
                        <button className="bg-botones w-[50%] h-[60%] rounded-3xl text-white font-bold text-[16px]" onClick={() => navigate("/cotizaciones-envio")}>
                            Anterior
                        </button>
                    </section>

                    <section className="w-[50%] h-full flex items-end justify-end">
                        <button className="bg-botones w-[50%] h-[60%] rounded-3xl text-white font-bold text-[16px]" onClick={handleSiguienteClick}>
                            Siguiente
                        </button>
                    </section>
                </div>

            </div>


            {/* Modal */}
            {modalConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-complemento  dark:bg-dark-complemento px-6 py-4 rounded-3xl shadow-lg w-[50%] h-[40%] border-[4px] border-border dark:border-dark-border flex flex-col items-center justify-center ">

                        <section className="w-full h-[40%] flex justify-center">
                            <img src={CotizacionConfirm} alt="" />
                        </section>

                        <section className="w-full h-[30%] flex items-center justify-center">
                            <p className="font-semibold text-text dark:text-dark-text text-[18px]">Añade al menos una condición de entrega.</p>
                        </section>
                        
                        <section className="w-full h-[30%] flex items-center justify-center">
                            <button 
                                onClick={() => setModalConfirm(false)}
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

export default PagoComponent;