import React, { createContext, useState, useEffect } from "react";

const ReporteContext = createContext();

const ReporteProvider = ({ children }) => {

    const hoy = new Date();
    const primerDiaMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    hoy.setHours(0, 0, 0, 0); 
    const fechaHoy = hoy.toISOString().split('T')[0];
    const fechaMesAnterior = primerDiaMesActual.toISOString().split('T')[0];


    const [clienteContext, setClienteContext] = useState([]);
    const [startDateContext, setStartDateContext] = useState(fechaMesAnterior);
    const [endDateContext, setEndDateContext] = useState(fechaHoy);


    return (
        <ReporteContext.Provider
            value={{
                clienteContext, setClienteContext,
                startDateContext, setStartDateContext,
                endDateContext, setEndDateContext,
            }}
        >
            {children}
        </ReporteContext.Provider>
    );
};

export { ReporteProvider, ReporteContext };
