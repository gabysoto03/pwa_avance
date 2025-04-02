import React from "react";
import CotizacionIcon from "../../src/assets/icons/cotizacionIcon.svg"
import StatusBar from "../components/cotizaciones/StatusBar";
import CotizacionComponent from "../components/cotizaciones/CotizaciónComponent";

const CotizacionPage = () => {

    return (
        <div className="w-screen flex-col justify-center py-20">
            <div className="w-full h-[10%] flex">
                <p className="w-[90%] h-full flex items-center justify-center text-[60px] text-text font-bold pl-32">
                    Cotizaciones
                </p>
               
                <div className="w-[6.5%] h-[73%] p-3 flex items-center justify-center rounded-full border-[4px] border-botones bg-fondo_tarjetas mt-2">
                    <img src={CotizacionIcon} alt="" />
                </div>
            </div>

            <StatusBar status={"cotizacion"} ></StatusBar>

            <CotizacionComponent></ CotizacionComponent>
        </div>
    )
}

export default CotizacionPage;