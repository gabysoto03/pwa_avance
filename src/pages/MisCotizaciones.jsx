import React, { useState, useEffect, useContext } from "react";
import ReportesIcon from "../assets/icons/reportesIcon.svg"
import GeneralReports from "../components/reports/GeneralReports";
import ReportsDetails from "../components/reports/DetailsReports";
import { ReporteContext } from "../context/ReportsContext";
import { IoCloudDownload } from "react-icons/io5";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";


function MisCotizaciones (){  

    const {
        clienteContext, 
        setClienteContext,
        startDateContext, 
        setStartDateContext,
        endDateContext, 
        setEndDateContext,
    } = useContext(ReporteContext);

    const hoy = new Date();
    const primerDiaMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    hoy.setHours(0, 0, 0, 0); 
    const fechaHoy = hoy.toISOString().split('T')[0];
    const fechaMesAnterior = primerDiaMesActual.toISOString().split('T')[0];

    const [idVen, setIdVen] = useState('');
    const [startedDate, setStartedDate ] = useState(startDateContext);
    const [endDate, setEndDate] = useState(endDateContext);
    const [informacion, setInformacion] = useState([]);
    const [folio, setFolio] = useState(clienteContext?.Folio);
    const [loading, setLoading] = useState(false);
    const [cotizacionesAgrupadas, setCotizacionesAgrupadas] = useState([]);
    const [clientes, setClientes] = useState([]);

    
    useEffect(() => {
        if (informacion) {
            if (informacion.infoCotizaciones && informacion.infoCotizaciones.length > 0) {
                const agrupadas = agruparCotizaciones(informacion?.infoCotizaciones);
                const cotizacionesAgrupadas = agrupadas ? Object.values(agrupadas) : [];
                setCotizacionesAgrupadas(cotizacionesAgrupadas);
            } else {
                setCotizacionesAgrupadas([]); 
            }
        }
    }, [informacion]);

    useEffect (() => {  
    const fetchData = async () => {   
        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch ('http://localhost:3000/clientes/rfc-vendedor', {
                method : 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setIdVen(data.RFC);
            } else {
                const errorText = await response.text(); 
                console.error("Error:", response.status, errorText);
            }

        } catch (err){
            console.error("Error: ", err)
        }
    }
    fetchData();
    }, [] );

    
    useEffect (() => {  
        const fetchData = async () => {   
            try {
                const token = localStorage.getItem('token');
                
                if(idVen){
                    const response = await fetch (`http://localhost:3000/clientes/buscar-clientes-vendedor?campo=RFCVent&informacion=${idVen}`, {
                        method : 'GET',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
        
                    if (response.ok) {
                        const data = await response.json();
                        setClientes(data);
                    } else {
                        const errorText = await response.text(); 
                        console.error("Error:", response.status, errorText);
                    }
                }
            } catch (err){
                console.error("Error: ", err)
            }
        }
        fetchData();
    }, [idVen] )


    // Ruta para obtener las cotizaciones
    useEffect (() => {  
        const fetchData = async () => { 
            setLoading(true);  
            try {
                const token = localStorage.getItem('token');
                
                if(folio){
                    const response = await fetch (`http://localhost:3000/reportes/obtener-cotizaciones-y-ventas?fechaInicio=${startedDate}&fechaFin=${endDate}&folioCliente=${folio}`, {
                        method : 'GET',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
        
                    if (response.ok) {
                        const data = await response.json();
                        setInformacion(data);
                    } else {
                        const errorText = await response.text(); 
                        console.error("Error:", response.status, errorText);
                    }
                } else {
                    const response = await fetch (`http://localhost:3000/reportes/obtener-cotizaciones-y-ventas?fechaInicio=${startedDate}&fechaFin=${endDate}`, {
                        method : 'GET',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
        
                    if (response.ok) {
                        const data = await response.json();
                        setInformacion(data);   
                    } else {
                        const errorText = await response.text(); 
                        console.error("Error:", response.status, errorText);
                    }
                }
            } catch (err){
                console.error("Error: ", err)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [startedDate, endDate, folio] );


    return (
        <div className="w-screen h-[150vh] flex-col justify-center py-3 dark:bg-dark-body">

            <div className="w-full h-[15%] flex">
                <p className="w-[90%] h-full flex items-center justify-center text-[60px] text-text dark:text-dark-text font-bold  pl-32">
                    Mis cotizaciones
                </p>
            </div>

            <div className="w-full h-[80%] px-40 ">
                <div className="flex flex-col justify-center w-full h-full rounded-3xl bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas shadow-2xl overflow-y-auto max-h-full"> 

                    <div className="flex w-full h-[20%]">
                        <div className="w-[50%]"></div>
                        
                        <div className="w-[50%] flex py-10">
                            <div className="w-[50%] h-[40%] flex items-center mr-[5%]">
                                <p className="text-[18px] text-text dark:text-dark-text font-semibold mr-2">Inicio</p>
                                <input 
                                    onChange={(e) => {
                                        setStartedDate(e.target.value)
                                        setStartDateContext(e.target.value)
                                    }}
                                    value={startedDate || ''}
                                    className=" w-full h-full rounded-3xl bg-inputs outline-none px-6 text-[16px] cursor-pointer" 
                                    type="date"
                                />
                            </div>
                                        
                            <div className="w-[50%] h-[40%] flex items-center mr-[5%]">
                                <p className="text-[18px] text-text dark:text-dark-text font-semibold mr-2">Fin</p>
                                <input 
                                    onChange={(e) => {
                                        setEndDate(e.target.value)
                                        setEndDateContext(e.target.value)
                                    }}
                                    value={endDate || ''} 
                                    className=" w-full h-full rounded-3xl bg-inputs outline-none px-6 text-[16px] cursor-pointer" 
                                    type="date"
                                />
                            </div>
                        </div>
                    </div>    
                    
            {/* TABLA COTIZACIONES */}
                <div className="w-[90%] h-[80%] ml-[5%] pr-2 mt-10">  
                    { cotizacionesAgrupadas && cotizacionesAgrupadas.length > 0 && cotizacionesAgrupadas.map((cotizacion) => (
                        <div key={cotizacion.id} className="w-full mb-16">
                            <div className="w-full h-[85%] flex-1 overflow-y-auto py-2 mb-5">
                                <table className="w-full border-collapse text-center">
                                    <thead>
                                        <tr className="bg-complemento text-white">
                                            <th className="border-[3px] p-2 border-text w-[30%]" colSpan={3}>{cotizacion.id}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        <tr className="bg-white h-[10vh]">
                                            <td className="border-[3px] p-2 border-text w-[30%]">Fecha</td>
                                            <td className="border-[3px] p-2 border-text w-[30%]">{cotizacion.fechaVenta}</td>
                                            <td className="border-[3px] p-2 border-text w-[40%]" rowSpan={3}> 
                                                <BsFillFileEarmarkPdfFill className="w-[50%] h-[50%] ml-[25%] text-text"/>
                                            </td>
                                        </tr>

                                        <tr className="bg-white h-[10vh]">
                                            <td className="border-[3px] p-2 border-text w-[30%]">Cliente</td>
                                            <td className="border-[3px] p-2 border-text w-[30%]">{cotizacion.cliente}</td>
                                        </tr>

                                        <tr className="bg-white h-[10vh]">
                                            <td className="border-[3px] p-2 border-text w-[30%]" colSpan={2}>
                                                <IoCloudDownload  className="w-[6%] h-[6%] ml-[45%]"/>
                                            </td>
                                        </tr>
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )) }

                    {cotizacionesAgrupadas.length == 0 && (
                        <>
                            <p className="text-text dark:text-dark-text font-bold w-full h-full flex items-center justify-center">No hay registros que coincidan con los filtros. </p>
                        </>
                    )}
                </div>
                </div>  
                              
            </div>
        </div>
    )
}

export default MisCotizaciones;



// Función para agrupar cotizaciones por folio
const agruparCotizaciones = (infoCotizaciones) => {
    if(infoCotizaciones.length > 0){
        return infoCotizaciones.reduce((acc, item) => {
            const { Folio, Total, Fecha, ClienteNombre, ProductoNombre, CantidadProducto, Costo, Categoria } = item;
            const fechaObj = new Date(Fecha);
            const fechaFormateada = `${fechaObj.getFullYear()}/${(fechaObj.getMonth() + 1).toString().padStart(2, '0')}/${fechaObj.getDate().toString().padStart(2, '0')}`;

            if (!acc[Folio]) {
                acc[Folio] = {
                    id: Folio,
                    fechaVenta: fechaFormateada,
                    cliente: ClienteNombre,
                    productos: []
                };
            }

            acc[Folio].productos.push({
                producto: ProductoNombre,
                cantidad: CantidadProducto,
                precioUnitario: Costo,
                categoria: Categoria
            });

            return acc;
        }, {});
    } else{
        return null;
    }
};