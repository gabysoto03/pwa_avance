import React, {useState, useContext, useEffect} from "react";
import { IoCloudDownload } from "react-icons/io5";
import { ReporteContext } from "../../context/ReportsContext";

const ReportsDetails = () => {

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
    const [clientes, setClientes] = useState([]);
    const [selectedClient, setSelectedClient] = useState(clienteContext);
    const [startedDate, setStartedDate ] = useState(startDateContext);
    const [endDate, setEndDate] = useState(endDateContext);
    const [informacion, setInformacion] = useState([]);
    const [folio, setFolio] = useState(clienteContext?.Folio);
    const [loading, setLoading] = useState(false);
    const [cotizacionesAgrupadas, setCotizacionesAgrupadas] = useState([]);

    
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


    useEffect (() => {  
            setFolio(selectedClient?.Folio)
            setClienteContext(selectedClient)
    }, [selectedClient] );

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


    const handleClientChange = (e) => {
        const selectedName = e.target.value;
        const client = clientes.find( c => c.Nombre === selectedName );
        setSelectedClient(client);
    }

    const handleReset = (e) => {
        setClienteContext([]);
        setStartDateContext(fechaMesAnterior);
        setEndDateContext(fechaHoy);
        setSelectedClient([]);
        setStartedDate(fechaMesAnterior);
        setEndDate(fechaHoy);
        setFolio("");
    }
    

    return (
        <div className="w-full h-full flex flex-col items-center py-5">
            <p className="font-bold text-[40px] text-text h-[5%]">{clienteContext?.Nombre || "Todos"}</p>
            <div className="flex font-semibold text-[16px] text-text h-[3%]"> 
                <p> Del</p>
                <p className="font-extrabold ml-2 mr-2"> {startDateContext} </p>
                <p> al </p>
                <p className="font-extrabold ml-2 mr-2">{endDateContext}</p>
            </div>
            

            <div className="w-full h-[10%] flex items-center justify-center">
                
                <div className="w-[40%] h-[40%] flex items-center mr-[5%]">
                    <p className="text-[24px] text-text font-semibold mr-2">Cliente</p>
                    <select 
                            id="client-select"
                            className="w-full p-2 border rounded-3xl focus:outline-none bg-inputs custom-select"
                            value={selectedClient?.Nombre || ""} 
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

                <div className="w-[20%] h-[40%] flex items-center mr-[5%]">
                    <p className="text-[24px] text-text font-semibold mr-2">Inicio</p>
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


                
                <div className="w-[20%] h-[40%] flex items-center">
                    <p className="text-[24px] text-text font-semibold mr-2">Fin</p>
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

            <button onClick={handleReset} className="h-[5%] flex items-end mb-2 text-text">Limpiar filtros</button>


            {/* TABLA */}
            <div className="w-[90%] h-[69%] bg-header rounded-3xl border-[4px] border-border px-4 py-10">
                <div className="w-full h-full overflow-y-auto max-h-full pr-2">  
                    { cotizacionesAgrupadas && cotizacionesAgrupadas.length > 0 && cotizacionesAgrupadas.map((cotizacion) => (
                        <div key={cotizacion.id} className="w-full mb-16">
                            <div className="flex w-full">
                                <p className="w-[35%] font-semibold text-[15px] text-text">{cotizacion.id}</p>
                                <p className="w-[35%] font-semibold text-[15px] text-text">Fecha: {cotizacion.fechaVenta}</p>
                                <p className="w-[30%] font-semibold text-[15px] text-text">Cliente: {cotizacion.cliente}</p>
                            </div>

                            <div className="w-full h-[85%] flex-1 overflow-y-auto py-2 mb-5">
                                <table className="w-full border-collapse text-center">
                                    <thead>
                                        <tr className="bg-complemento text-white">
                                            <th className="border-[3px] p-2 border-text w-[30%]">Producto</th>
                                            <th className="border-[3px] p-2 border-text w-[20%]">Categoria</th>
                                            <th className="border-[3px] p-2 border-text w-[20%]">Precio unitario</th>
                                            <th className="border-[3px] p-2 border-text w-[15%]">Cantidad</th>
                                            <th className="border-[3px] p-2 border-text w-[15%]">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cotizacion.productos.map((producto, index) => (
                                            <tr key={index} className="bg-white">
                                                <td className="border-[3px] p-2 border-text w-[30%]">{producto.producto}</td>
                                                <td className="border-[3px] p-2 border-text w-[20%]">{producto.categoria}</td>
                                                <td className="border-[3px] p-2 border-text w-[20%]">$ {producto.precioUnitario}</td>
                                                <td className="border-[3px] p-2 border-text w-[15%]"> {producto.cantidad} </td>
                                                <td className="border-[3px] p-2 border-text w-[15%]"> { producto.precioUnitario * producto.cantidad } </td>
                                            </tr>
                                        ))}
                                        
                                        <tr className="bg-complemento text-white">
                                            <td className="border-[3px] p-2 border-text w-[30%]" colSpan={3}>Total</td>
                                            <td className="border-[3px] p-2 border-text w-[15%]">
                                                {cotizacion.productos.reduce((total, producto) => total + producto.cantidad, 0)}
                                            </td>
                                            <td className="border-[3px] p-2 border-text w-[15%]">
                                                $ {cotizacion.productos.reduce((total, producto) => total + (producto.precioUnitario * producto.cantidad), 0)}
                                            </td>
                                        </tr>
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )) }

                    {cotizacionesAgrupadas.length == 0 && (
                        <>
                            <p className="text-text font-bold w-full h-full flex items-center justify-center">No hay registros que coincidan con los filtros. </p>
                        </>
                    )}
                </div>
                
            </div>


            {/* BOTÓN */}
            <div className="w-full h-[8%] flex items-end justify-end p-4 px-20">
                <button className="h-[95%] w-[12%] rounded-3xl bg-header p-2">
                    <IoCloudDownload className="h-full w-full"/>
                </button>
            </div>


        </div>
    )
}


export default ReportsDetails;



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


