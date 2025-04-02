import React, { useState, useEffect, useContext } from "react";
import Section from "../formulario_components/Section";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CotizacionConfirm from "../../assets/icons/cotizacionConfirm.svg"
import { CotizacionContext } from "../../context/CotizacionContext";


function CotizacionComponent () {
    
    const navigate = useNavigate();
    const [selectedClient, setSelectedClient] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productos, setProductos] = useState([]);
    const [codigoProducto, setCodigoProducto] = useState("");
    const [nombreProducto, setNombreProducto] = useState("");
    const [precioProducto, setPrecioProducto] = useState("");
    const [productoEncontrado, setProductoEncontrado] = useState(null);
    const [ total, setTotal ] = useState(0);
    const [idVen, setIdVen] = useState('');
    const [clientes, setClientes] = useState([]);
    const [cantidad, setCantidad] = useState(1);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [codigoReg, setCodigoReg] = useState('');
    const [nombreReg, setNombreReg] = useState('');
    const [tiempoEntregaReg, setTiempoEntregaReg] = useState('');
    const [costoReg, setCostoReg] = useState('');
    const [entrega, setEntrega] = useState('');
    const [imagenReg, setImagenReg] = useState('');
    const [categoriaReg, setCategoriaReg] = useState('');
    const [modalAgregar, setModalAgregar] = useState(false);

    const {
        productosContext,
        setProductosContext,
        clientesContext,
        setClientesContext
    } = useContext(CotizacionContext);


    useEffect (() => {  
        const fetchInfo = () => {   
        try {
            setSelectedClient(clientesContext);
            setProductos(productosContext);
        } catch (err){
            console.error("Error: ", err)
        }
    }
    fetchInfo();
    }, [] )


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

    
    
    const handleSiguienteClick = () => {
        if (productos.length > 0) {
            navigate("/cotizaciones-envio");
            setProductosContext([]);
            setClientesContext([]);

            setProductosContext(productos);
            setClientesContext(selectedClient);
        } else {
            setModalConfirm(true);
        }
    };
    
    
    const handleCantidadChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (value <= 0 || isNaN(value)) {
            value = 1;
        }
        setCantidad(value);
    };
    
    const handleClientChange = (e) => {
        const selectedName = e.target.value;
        const client = clientes.find( c => c.Nombre === selectedName );
        setSelectedClient(client);
    }

    const handleCodigoProdChange = ( e ) => {
        setCodigoProducto(e.target.value);
    }

    const handleNombreProdChange = ( e ) => {
        setCodigoProducto("");
        setNombreProducto(e.target.value);
    }

    const handlePrecioProdChange = (e) => {
        setPrecioProducto(e.target.value);
    };


    const handleAgregarProducto = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch( `http://localhost:3000/productos/agregar`, {
                    method : 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    
                    body : JSON.stringify({
                        codigo: codigoReg,
                        nombre: nombreReg,
                        descripcion: "null",
                        costo: costoReg,
                        entrega: tiempoEntregaReg,
                        imagen: "null",
                        categoria: categoriaReg,
                        clienteID: "82"
                    }),
                });

                if (response.ok) {
                    setModalAgregar(false);
                    alert("Producto agregado correctamente.")
                    console.log("Producto agregado correctamente. ")
                } else {
                    setModalAgregar(false);
                    alert("Producto agregado correctamente.")
                    console.log("Ocurrio un error");
                }
            
        } catch (err) {
            console.error("Error: ", err)
        } 
    }



    const handleBuscarProducto = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            console.log("Token: ", token)
            const response = await fetch( `http://localhost:3000/buscar-exacto?tabla=Producto&campo=Codigo&informacion=${codigoProducto}&limite=1`, {
                    method : 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            
            const data = await response.json();
        
            if(data.length === 0){
                setModalAgregar(true);
                setProductoEncontrado([]);
            } else {
                setProductoEncontrado(data);
            }
        } catch (err) {
            console.error("Error: ", err)
        } 
    }


    const handleSetProducto = () => {
        const codigo = productoEncontrado[0].Codigo;
        const productoExistente = productos.find(p => p.codigo === codigo);

        if (productoExistente) {
            setProductos(productos.map(p => 
                p.codigo === codigo ? { ...p, cantidad: p.cantidad + cantidad } : p
            ));
        } else{
            const producto = { 
                codigo : productoEncontrado[0].Codigo, 
                categoria : productoEncontrado[0].Categoria, 
                producto : productoEncontrado[0].Nombre, 
                costo : productoEncontrado[0].Costo,
                cantidad: cantidad,

            }

            setProductos([...productos, producto]);
        }
        setIsModalOpen(false)
        setProductoEncontrado([]);
        setCantidad(1); 
    }


    const handleEliminarProducto = (index) => {
        const nuevosProductos = productos.filter((_, i) => i !== index);
        setProductos(nuevosProductos);
    };

    useEffect(() => {
        const nuevoTotal = productos.reduce((acumulador, producto) => acumulador + parseFloat(producto.costo * producto.cantidad), 0);
        setTotal(nuevoTotal);
    }, [productos]);

    return (
        <div className="w-screen flex justify-center py-20"> 
            
            <div className="bg-fondo_tarjetas rounded-lg w-[80%] h-auto shadow-lg flex flex-col items-center py-10">
                
                {/* Información inicial del cliente */}
                <p className="text-text font-bold text-[14px]">Selecciona el cliente</p>
                <div className="flex justify-center items-center mt-8 w-full h-[6vh]">
                    <p className="text-text text-[32px] font-bold mr-5">Cliente</p>
                    <select 
                        id="client-select"
                        className="w-[60%] h-[80%] border rounded-3xl focus:outline-none bg-inputs custom-select px-3"
                        value={selectedClient?.Nombre || ""} 
                        onChange={ handleClientChange }
                    >
                        <option value="" disabled>Selecciona una opción</option>
                        {clientes.map((client, index) => (
                            <option key={index} value={client.Nombre}>
                                {client.Nombre}
                            </option>
                    ))}
                    </select>
                </div>

                {/* Div que aparece si se elije el cliente */}
                { selectedClient && Object.keys(selectedClient).length > 0 && (
                    <div className="w-[90%]  mt-20">
                        
                        {/* Sección del contacto */}
                        <Section pWidth="10%" divWidth="100%" text="Contacto" />
                        <div className="w-full h-[45vh] mt-2 py-10">
                            <div className="w-full h-[50%] flex justify-center">
                                <section className="w-[50%]">
                                    <p className="text-text text-[28px] font-bold">Contacto</p>
                                    <input className="w-[80%] h-[25%] rounded-full bg-inputs text-text outline-none px-5" type="text" readOnly value={selectedClient.Contacto} />
                                </section>

                                <section className="w-[40%]">
                                    <p className="text-text text-[28px] font-bold">Correo</p>
                                    <input className="w-[80%] h-[25%] rounded-full bg-inputs text-text outline-none px-5" type="text" readOnly value={selectedClient.Correo} />
                                </section>
                            </div>
                            
                            <div className="w-full h-[50%] flex justify-center">
                                <section className="w-[90%]">
                                    <p className="text-text text-[28px] font-bold">Teléfono</p>
                                    <input className="w-[45%] h-[25%] rounded-full bg-inputs text-text outline-none px-5" type="text" readOnly value={selectedClient.Telefono} />
                                </section>
                            </div>
                        </div>


                        {/* Sección del producto */}
                        <Section pWidth="10%" divWidth="100%" text="Productos" />
                        <div className="w-full h-[50vh] flex items-center justify-center">
                            <section className="w-[20%] h-full flex items-center justify-center">
                                <button className="w-[80%] h-[12%] text-white font-bold rounded-full bg-complemento" onClick={() => setIsModalOpen(true)}>Agregar producto</button>
                            </section>

                            <section className="w-[80%] h-[80%] flex flex-col justify-center items-end">
                                <div className="w-[90%] h-[90%] bg-[#C0CCD4] rounded-3xl py-4 border-[4px] border-[#839197] shadow-xl flex flex-col">
                                    
                                    {/* Div de la tabla */}
                                    <div className="w-full  h-[90%] flex-1 overflow-y-auto p-2">
                                        <table className="w-full border-collapse text-center">
                                            <thead>
                                                <tr className="bg-complemento text-white">
                                                    <th className="border-[3px] p-2 border-text w-[35%]">Producto</th>
                                                    <th className="border-[3px] p-2 border-text w-[25%]">Categoría</th>
                                                    <th className="border-[3px] p-2 border-text w-[5%]">Cantidad</th>
                                                    <th className="border-[3px] p-2 border-text w-[15%]">Precio</th>
                                                    <th className="border-[3px] p-2 border-text w-[15%]">Subtotal</th>
                                                    <th className="border-[3px] p-2 border-text w-[5%]"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { productos.length === 0 && (
                                                    <tr className="bg-white">
                                                        <td className="border-[3px] p-2 border-text w-[43%]" colSpan = "6" rowSpan = "3">Sin Productos</td>
                                                    </tr>
                                                )}
                                                {productos.map((producto, i) => (
                                                    <tr key={i} className="bg-white">
                                                        <td className="border-[3px] p-2 border-text w-[35%]">{producto.producto}</td>
                                                        <td className="border-[3px] p-2 border-text w-[25%]">{producto.categoria}</td>
                                                        <td className="border-[3px] p-2 border-text w-[5%]">{producto.cantidad}</td>
                                                        <td className="border-[3px] p-2 border-text w-[15%]">$ {producto.costo}</td>
                                                        <td className="border-[3px] p-2 border-text w-[15%]">$ {producto.costo * producto.cantidad}</td>
                                                        <td className="border-[3px] p-2 border-text w-[5%]"> <FaRegTrashCan className="cursor-pointer" onClick={() => handleEliminarProducto(i)} /> </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Div del total */}
                                    <div className="w-full h-[15%] flex items-center justify-center">
                                        <p className="w-[30%] font-bold text-[16px] px-4">Total</p>
                                        <p className="w-[70%] font-bold text-[24px] flex items-end justify-end px-4">$ {total}</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="w-full h-[25vh] flex items-center justify-center">
                            <button 
                                className="bg-botones w-[30%] h-[25%] rounded-3xl text-white font-bold text-[16px]" 
                                onClick={handleSiguienteClick}
                            >
                                    Siguiente
                            </button>
                        </div>

                    </div>
                )}                
            </div>



            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-complemento px-6 py-4 rounded-3xl shadow-lg w-[50%] border-[4px] border-[#089CE4] flex flex-col items-center justify-center ">
                        <button className="w-full flex justify-end" onClick={() => {setIsModalOpen(false); setProductoEncontrado([])}}>Cerrar</button>
                        <h2 className="text-[32px] text-text font-bold mb-4">Agregar Producto</h2>

                        <section className="w-[80%] h-[10vh] mb-5">
                            <p className="text-text text-[16px] font-bold mb-1">Código del producto</p>
                            <input defaultValue = { productoEncontrado?.[0]?.Codigo || '' } onChange={handleCodigoProdChange} className="w-full h-[50%] rounded-full bg-inputs text-text outline-none px-5" type="text" />
                        </section>

                        {(productoEncontrado?.length > 0) && (
                            <div className="w-[80%]">
                                <section className="w-full h-[10vh] mb-5">
                                    <p className="text-text text-[16px] font-bold mb-1">Cantidad</p>
                                    <input 
                                        defaultValue={1} 
                                        onChange={handleCantidadChange} 
                                        className="w-full h-[50%] rounded-full bg-inputs text-text outline-none px-5" 
                                        type="number" 
                                        min="1" 
                                    />
                                </section>                

                                <section className="w-full h-[10vh] mb-5">
                                    <p className="text-text text-[16px] font-bold mb-1">Producto</p>
                                    <input defaultValue = { productoEncontrado?.[0]?.Nombre || '' } onChange={handleNombreProdChange} className="w-full h-[50%] rounded-full bg-inputs text-text outline-none px-5" type="text" readOnly />
                                </section>


                                <section className="w-full h-[10vh] mb-5">
                                    <p className="text-text text-[16px] font-bold mb-1">Categoría</p>
                                    <input defaultValue = { productoEncontrado?.[0]?.Categoria || '' }  className="w-full h-[50%] rounded-full bg-inputs text-text outline-none px-5" type="text" readOnly />
                                </section>


                                <section className="w-full h-[10vh] mb-10">
                                    <p className="text-text text-[16px] font-bold mb-1">Precio</p>
                                    <input  
                                        defaultValue = { productoEncontrado?.[0]?.Costo || '' } 
                                        className="w-full h-[50%] rounded-full bg-inputs text-text outline-none px-5" 
                                        type="number" 
                                        onChange={handlePrecioProdChange}
                                        readOnly
                                    />
                                </section>
                            </div>
                        )}

                        <div className="flex w-full h-[6vh] mb-4">
                            <section className="w-[50%] h-full flex items-center justify-center">
                                <button onClick={ handleBuscarProducto } className="bg-botones w-[50%] h-full rounded-3xl text-white font-bold text-[16px]">
                                    Buscar
                                </button>
                            </section>

                            <section className="w-[50%] h-full flex items-center justify-center">
                            <button 
                                onClick={handleSetProducto} 
                                disabled={!productoEncontrado?.length} 
                                className={`w-[50%] h-full rounded-3xl text-white font-bold text-[16px] 
                                            ${!productoEncontrado?.length  ? 'bg-gray-500 cursor-not-allowed' : 'bg-botones'}`}
                            >
                                Agregar
                            </button>
                            </section>
                        </div>

                    </div>
                </div>
            )}



            {/* Modal */}
            {modalConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-complemento px-6 py-4 rounded-3xl shadow-lg w-[50%] h-[40%] border-[4px] border-[#089CE4] flex flex-col items-center justify-center ">

                        <section className="w-full h-[40%] flex justify-center">
                            <img src={CotizacionConfirm} alt="" />
                        </section>

                        <section className="w-full h-[30%] flex items-center justify-center">
                            <p className="font-semibold text-text text-[18px]">Añade al menos un producto para continuar con tu cotización.</p>
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



            {/* Modal */}
            {modalAgregar && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-complemento px-6 py-1 rounded-3xl shadow-lg w-[50%] border-[4px] border-[#089CE4] flex flex-col items-center justify-center ">
                        <button className="w-full flex justify-end" onClick={() => {setModalAgregar(false); setProductoEncontrado([])}}>Cerrar</button>
                        <h2 className="text-[32px] text-text font-bold mb-2">¡Uy, no se encontro!</h2>
                        <p className="text-text text-[10px] w-[90%] flex justify-center mb-4">Verifica el código del producto, o en su defecto registralo para agregarlo a la cotización.</p>

                        <section className="w-[80%] h-[10vh] mb-3">
                            <p className="text-text text-[16px] font-bold mb-1">Código del producto</p>
                            <input defaultValue = { productoEncontrado?.[0]?.Codigo || '' } onChange={(e) => setCodigoReg(e.target.value)} className="w-full h-[50%] rounded-full bg-inputs text-text outline-none px-5" type="text" />
                        </section>

                        <section className="w-[80%] h-[10vh] mb-3">
                            <p className="text-text text-[16px] font-bold mb-1">Nombre del producto </p>
                            <input defaultValue = { productoEncontrado?.[0]?.Nombre || '' } onChange={(e) => setNombreReg(e.target.value)} className="w-full h-[50%] rounded-full bg-inputs text-text outline-none px-5" type="text" />
                        </section>
                        
                        <section className="w-[80%] h-[10vh] mb-3">
                            <p className="text-text text-[16px] font-bold mb-1">Tiempo de entrega </p>
                            <input defaultValue={1} onChange={(e) => setTiempoEntregaReg(e.target.value)} className="w-full h-[50%] rounded-full bg-inputs text-text outline-none px-5" type="number"  min="1" />
                        </section>
                        
                        <section className="w-[80%] h-[10vh] mb-3">
                            <p className="text-text text-[16px] font-bold mb-1">Categoría</p>
                            <input defaultValue = { productoEncontrado?.[0]?.Categoria || '' }  onChange={(e) => setCategoriaReg(e.target.value)} className="w-full h-[50%] rounded-full bg-inputs text-text outline-none px-5" type="text" />
                        </section>
                        

                        <section className="w-[80%] h-[10vh] mb-3">
                            <p className="text-text text-[16px] font-bold mb-1">Precio</p>
                            <input  
                                defaultValue = { productoEncontrado?.[0]?.Costo || '' } 
                                className="w-full h-[50%] rounded-full bg-inputs text-text outline-none px-5" 
                                type="number" 
                                onChange={(e) => setCostoReg(e.target.value)}
                            />
                        </section>


                        <section className="w-[80%] h-[10vh] mb-5">
                            <p className="text-text text-[16px] font-bold mb-1">Imagen</p>
                            <input  
                                defaultValue = { productoEncontrado?.[0]?.Costo || '' } 
                                className="w-full h-[50%] rounded-full bg-inputs text-text outline-none px-5" 
                                type="number" 
                                onChange={(e) => setCostoReg(e.target.value)}
                            />
                        </section>
                        
                        <div className="flex w-full h-[6vh] mb-4">
                            <section className="w-full h-full flex items-center justify-center">
                                <button onClick={ handleAgregarProducto } className="bg-botones w-[40%] h-full rounded-3xl text-white font-bold text-[16px]">
                                    Agregar
                                </button>
                            </section>
                        </div>

                    </div>
                </div>
            )}



        </div>
    );
}

export default CotizacionComponent;