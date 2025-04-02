import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { CotizacionContext } from "../../context/CotizacionContext";

function EnvioComponent () {

    const {
        productosContext,
        setProductosContext,
        clientesContext,
        setClientesContext,
        opcionEnvioContext, 
        setOpcionEnvioContext,
        semanasEnvioContext, 
        setSemanasEnvioContext
    } = useContext(CotizacionContext);
    
    const navigate = useNavigate();
    const envioOption = clientesContext?.Direccion;
    const [envio, setEnvio] = useState();
    const [semanas, setSemanas] = useState(semanasEnvioContext);


    useEffect(() => {
        setEnvio(opcionEnvioContext)
    }, [opcionEnvioContext])


    const handleSiguienteClick = () => {
        navigate("/cotizaciones-pago");
        setOpcionEnvioContext(envio);
        setSemanasEnvioContext(semanas);
    };

    return (
        <div className="w-screen flex justify-center py-20">
            <div className="bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas rounded-lg w-[80%] h-[65vh] shadow-lg flex flex-col items-center py-10">
                
                <div className="w-[80%] h-[50%] flex">
                    <div className="w-[20%] h-full">
                        <section className="flex w-[50%] mb-10">
                            <input className="mr-4 scale-150" type="radio" name="envio" value={envioOption} onChange={() => setEnvio(envioOption)} checked={envio === envioOption}  />
                            <p className="text-text dark:text-dark-text font-bold text-[20px]">Dirección</p>
                        </section>
                        <section className="flex w-[50%]">
                            <input className="mr-4 scale-150" type="radio" name="envio" value="paqueteria" onChange={() => setEnvio("paqueteria")} checked={envio === "paqueteria"}  />
                            <p className="text-text dark:text-dark-text font-bold text-[20px]">Paquetería</p>
                        </section>
                    </div>
                    <div className="w-[80%] h-full">
                        <input className="w-full h-[20%] rounded-full bg-inputs text-text dark:text-dark-text outline-none px-5" value={envioOption} type="text" readOnly />
                    </div>
                </div>

                <div className="w-[80%] h-[30%] flex items-center">
                    <p className="text-text dark:text-dark-text text-[22px] font-bold mr-4" >Tiempo de entrega</p>
                    <input 
                        type="number" 
                        className="w-[10%] h-[50%] rounded-xl outline-none text-center text-text dark:text-dark-text text-[20px] font-semibold" 
                        min="1" 
                        name="" 
                        id="" 
                        defaultValue={semanasEnvioContext || 1}
                        onChange={(e) => setSemanas(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    <p className="text-text dark:text-dark-text text-[16px] font-bold ml-4" >Semanas</p>
                </div>

                <p className="w-full px-16 text-xs text-text dark:text-dark-text">Si coloca un valor de cero o negativo será por defecto 1 semana.</p>

                <div className="w-[80%] h-[20%] flex items-end">
                    <section className="w-[50%] h-full flex items-end justify-start">
                        <button className="bg-botones w-[50%] h-[60%] rounded-3xl text-white font-bold text-[16px]" onClick={() => navigate("/cotizaciones")}>
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
        </div>
    )
}

export default EnvioComponent;