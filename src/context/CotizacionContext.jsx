import React, { createContext, useState, useEffect } from "react";

const CotizacionContext = createContext();

const CotizacionProvider = ({ children }) => {
    const [productosContext, setProductosContext] = useState([]);
    const [clientesContext, setClientesContext] = useState([]);
    const [opcionEnvioContext, setOpcionEnvioContext] = useState("");
    const [semanasEnvioContext, setSemanasEnvioContext] = useState(1);
    const [condicionesContext, setCondicionesContext] = useState("");
    const [consideracionContext, setConsideracionesContext] = useState([]);
    const [consideracionDefectoContext, setConsideracionesDefectoContext] = useState([]);

    
    useEffect(() => {
        if (clientesContext && typeof clientesContext === "object") {
            setOpcionEnvioContext(clientesContext.Direccion || "");
            setCondicionesContext(clientesContext.CondicionesPago || "");
        }
    }, [clientesContext]); 


    return (
        <CotizacionContext.Provider
            value={{
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
            }}
        >
            {children}
        </CotizacionContext.Provider>
    );
};

export { CotizacionProvider, CotizacionContext };
