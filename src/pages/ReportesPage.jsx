import React, { useState } from "react";
import ReportesIcon from "../assets/icons/reportesIcon.svg"
import GeneralReports from "../components/reports/GeneralReports";
import ReportsDetails from "../components/reports/DetailsReports";


const ReportesPage = () => {

    const [mode,  setMode] = useState("general");

    
    const handleChangeMode = (value) => {
        setMode(value);
    }

    return (
        <div className="w-screen h-[200vh] flex-col justify-center py-3 dark:bg-dark-body">
            <div className="w-full h-[10%] flex">
                <p className="w-[90%] h-full flex items-center justify-center text-[60px] text-text dark:text-dark-text font-bold  pl-32">
                    Reportes
                </p>
               
                <div className="w-[6.3%] h-[65%] p-3 flex items-center justify-center rounded-full border-[4px] border-botones bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas mt-2">
                    <img src={ReportesIcon} alt="" />
                </div>
            </div>


            <div className="w-full h-[90%] px-40 ">
                <div className="w-[35%] h-[3%] ml-10 flex">
                    <button onClick={() => handleChangeMode("general")} className={`w-[49%] rounded-t-3xl mr-4 text-text dark:text-dark-text text-[14px] font-bold ${mode === "general" ? "bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas" : "bg-inputs"}`}>Reporte general</button>
                    <button onClick = {() => handleChangeMode("detalle")} className={`w-[49%] rounded-t-3xl text-text dark:text-dark-text text-[14px] font-bold ${mode === "detalle" ? "bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas" : "bg-inputs" }`}>Detalle del reporte</button>
                </div>

                <div className="w-full h-[97%] rounded-3xl bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas shadow-2xl">      
                    { mode === "general" && (
                        <GeneralReports ></GeneralReports>
                    )}  
                    
                    { mode === "detalle" && (
                        <ReportsDetails ></ReportsDetails>
                    )}  
                </div>  
                              
            </div>
        </div>
    )
}

export default ReportesPage;