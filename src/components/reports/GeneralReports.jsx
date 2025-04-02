import React, { useState, useEffect, useContext } from "react";
import { IoCloudDownload } from "react-icons/io5";
import { ReporteContext } from "../../context/ReportsContext";


const GeneralReports = () => {

    const {
        clienteContext, 
        setClienteContext,
        startDateContext, 
        setStartDateContext,
        endDateContext, 
        setEndDateContext,
    } = useContext(ReporteContext);

    //console.log("Fecha de inicio: ", startDateContext, "fecha de fin: ", endDateContext)
    

    const [idVen, setIdVen] = useState('');
    const [clientes, setClientes] = useState([]);
    const [selectedClient, setSelectedClient] = useState(clienteContext);
    const [startedDate, setStartedDate ] = useState(startDateContext);
    const [endDate, setEndDate] = useState(endDateContext);
    const [informacion, setInformacion] = useState([]);
    const [folio, setFolio] = useState(clienteContext?.Folio);
    const [countVentas, setCountVentas] = useState(0);
    const [countTotalVentas, setCountTotalVentas] = useState(0);
    const [countCotizaciones, setCountCotizaciones] = useState(0);
    const [countTotalCotizaciones, setCountTotalCotizaciones] = useState(0);
    const [loading, setLoading] = useState(false);

    console.log("Información: ", informacion?.infoCotizaciones);
    //console.log("Cliente del contexto:", clienteContext)
    //console.log("Este es el cliente:", folio);

    

    useEffect (() => {  
        setFolio(selectedClient?.Folio)
        setClienteContext(selectedClient)
    }, [selectedClient] );


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
    }, [] )


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
                        const cotizacionesLength = data.cotizaciones.length;
                        const ventasLength = data.ventas.length;
                        const totalCotizaciones = data.cotizaciones.reduce((sum, cotizacion) => sum + cotizacion.Total, 0);
                        const totalVentas = data.ventas.reduce((sum, venta) => sum + venta.Total, 0);

                        setCountVentas(ventasLength);
                        setCountCotizaciones(cotizacionesLength);
                        setCountTotalCotizaciones(totalCotizaciones);
                        setCountTotalVentas(totalVentas);

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
                        const cotizacionesLength = data.cotizaciones.length;
                        const ventasLength = data.ventas.length;
                        const totalCotizaciones = data.cotizaciones.reduce((sum, cotizacion) => sum + cotizacion.Total, 0);
                        const totalVentas = data.ventas.reduce((sum, venta) => sum + venta.Total, 0);

                        setCountVentas(ventasLength);
                        setCountCotizaciones(cotizacionesLength);
                        setCountTotalCotizaciones(totalCotizaciones);
                        setCountTotalVentas(totalVentas);


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


   
    const handleClientChange = (e) => {
        const selectedName = e.target.value;
        const client = clientes.find( c => c.Nombre === selectedName );
        setSelectedClient(client);
    }

    return (
        <div className="w-full h-full">
            {/* PRIMERA SECCIÓN */}
            <div className="w-full h-[45%] flex">
                <div className="w-[45%] h-full py-20 px-10">
                    <p className="font-bold h-[20%] text-text dark:text-dark-text text-[36px] mb-4">Periodo</p>
                    <p className="text-[16px] text-text dark:text-dark-text font-bold">Inicio</p>
                    <input 
                        defaultValue={startedDate || ''}
                        onChange={(e) => {
                            setStartedDate(e.target.value)
                            setStartDateContext(e.target.value)
                        }}
                        className=" w-full h-[12%] rounded-3xl bg-inputs outline-none px-6 text-[16px] pr-10 cursor-pointer mb-10" 
                        type="date"
                    />
                    
                    <p className="text-[16px] text-text dark:text-dark-text font-bold">Fin</p>
                    <input
                        defaultValue={endDate || ''} 
                        onChange={(e) => {
                            setEndDate(e.target.value)
                            setEndDateContext(e.target.value)
                        }}
                        className=" w-full h-[12%] rounded-3xl bg-inputs outline-none px-6 text-[16px] pr-10 cursor-pointer" 
                        type="date"
                    />
                </div>
                
                <div className="w-[55%] h-full py-12 px-20 mt-20">
                    <div className="w-full h-[60%] bg-header rounded-3xl border-[4px] border-[#0A79AF] shadow-md flex flex-col items-center">

                        <p className="h-[20%] flex items-center font-bold text-[36px] text-text dark:text-dark-text">Ventas</p>
                        
                        <section className="flex items-center justify-center h-[30%] w-[90%]">
                            <p className="flex items-end justify-end w-[55%] px-6 text-[18px] text-text dark:text-dark-text font-bold">Número de ventas</p>
                            <input className="w-[30%] h-[50%] rounded-3xl text-center text-text dark:text-dark-text font-semibold text-[20px] focus:outline-none" type="number" readOnly value={countVentas} />
                        </section>
                        
                        <section className="flex items-center justify-center h-[30%] w-[90%]">
                            <p className="flex items-end justify-end w-[55%] px-6 text-[18px] text-text dark:text-dark-text font-bold">Dinero vendido</p>
                            <input 
                                className="w-[30%] h-[50%] rounded-3xl text-center text-text dark:text-dark-text font-semibold text-[20px] focus:outline-none" 
                                type="text" 
                                readOnly  
                                value={`$${countTotalVentas.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                            />
                        </section>
                    </div>
                </div>
            </div>

            
            {/* SEGUNDA SECCIÓN */}
            <div className="w-full h-[40%] flex">
                <div className="w-[45%] h-full py-20 px-10">
                    <div className="w-full h-[70%]">
                        <p className="font-bold h-[20%] text-text dark:text-dark-text text-[36px] mb-10">Cliente</p>
                        <select 
                            id="client-select"
                            className="w-full py-2 border rounded-3xl focus:outline-none bg-inputs custom-select px-3"
                            value={selectedClient?.Nombre} 
                            onChange={ handleClientChange }
                        >
                            <option value="">Todos</option>
                            {clientes.map((client, index) => (
                                <option key={index} value={client.Nombre}>
                                    {client.Nombre}
                                </option>
                        ))}
                    </select>
                    </div>
                    <div className="w-full h-[30%] flex items-end">
                        <p className="font-bold h-[20%] text-text dark:text-dark-text text-[28px] mb-10 mr-48">Comisión</p>
                        <input className="w-[30%] h-[60%] rounded-3xl text-center mb-4 text-text dark:text-dark-text font-semibold text-[20px] border-black border-[1px] focus:outline-none" type="number" readOnly />
                    </div>
                </div>
                
                <div className="w-[55%] h-full py-12 px-20">
                    <div className="w-full h-full bg-header rounded-3xl border-[4px] border-[#0A79AF] shadow-md flex flex-col items-center">
                        
                        <p className="h-[30%] flex items-center font-bold text-[36px] text-text dark:text-dark-text">Cotizaciones</p>
                        
                        <section className="flex items-center justify-center h-[30%] w-[90%]">
                            <p className="flex items-end justify-end w-[65%] px-6 text-[18px] text-text dark:text-dark-text font-bold">Número de cotizaciones</p>
                            <input className="w-[30%] h-[50%] rounded-3xl text-center text-text dark:text-dark-text font-semibold text-[20px] focus:outline-none" type="number" readOnly  value={countCotizaciones}/>
                        </section>
                        
                        <section className="flex items-center justify-center h-[30%] w-[90%]">
                            <p className="flex items-end justify-end w-[65%] px-6 text-[18px] text-text dark:text-dark-text font-bold">Dinero en cotizaciones</p>
                            <input 
                                className="w-[30%] h-[50%] rounded-3xl text-center text-text dark:text-dark-text font-semibold text-[20px] focus:outline-none" 
                                type="text" 
                                readOnly 
                                value={`$${countTotalCotizaciones.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`} 
                            />
                        </section>
                    </div>
                </div>
            </div>

            {/* BOTÓN */}
            <div className="w-full h-[8%] flex items-end justify-end p-4 px-20">
                <button className="h-[95%] w-[12%] rounded-3xl bg-header p-2">
                    <IoCloudDownload className="h-full w-full"/>
                </button>
            </div>

            {loading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl flex flex-col items-center shadow-lg">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-3 text-gray-700 font-semibold">Cargando información, ¡Espere!</p>
                    </div>
                </div>
            )}
                            
        </div>

    )
}

export default GeneralReports;