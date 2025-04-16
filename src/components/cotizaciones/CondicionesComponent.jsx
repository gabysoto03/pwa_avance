import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { CotizacionContext } from "../../context/CotizacionContext";
import { jsPDF } from 'jspdf'
import HeaderPhoto from "../../assets/icons/template/header.png";
import FooterPhoto from "../../assets/icons/template/footer.png";
import { toast } from "react-toastify";

function CondicionesComponent () {
    const {
        productosContext,
        clientesContext,
        opcionEnvioContext,
        semanasEnvioContext,
        condicionesContext,
        consideracionContext, 
        setConsideracionesContext,
        consideracionDefectoContext, 
        setConsideracionesDefectoContext
    } = useContext(CotizacionContext);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [condiciones, setCondiciones] = useState([]);
    const [nuevoCondicion, setNuevoCondicion] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [allCondiseraciones, setAllConsideraciones] = useState([]);
    const fecha = new Date();
    const fechaActual = fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const partes = fechaActual.split("/");  // Dividimos la fecha en día, mes y año
    const fechaObj = new Date(partes[2], partes[1] - 1, partes[0]);  // Formato Date (año, mes, día)
    fechaObj.setDate(fechaObj.getDate() + 15);
    const fechaVigencia = fechaObj.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const [folioCoti, setFolioCoti] = useState();
    const [idVen, setIdVen] = useState('');


    const [condicionesDefecto, setCondicionesDefecto] = useState([
        "AL RECIBIR ORDEN DE COMPRA O PAGO REFERENTE A ESTA COTIZACIÓN SE HACEN APLICABLES TODAS LAS CONSIDERACIONES MENCIONADAS",
        "SE DEBERA DE COMPARTIR EL COMPROBANTE DE PAGO A compras@siaumex.com PARA PODER VALIDAR SU PAGO, DE LO CONTRARIO NO SE DARÁ POR ENTENDIDO QUE SE HAYA REALIZADO PAGO",
        "PRECIOS ESTIPULADOS EN MONEDA NACIONAL",
        "EL PRECIO NO INCLUYE I.V.A.",
        "LA CANCELACIÓN DE UN PEDIDO GENERA PENALIZACIÓN DEL 40% DEL VALOR TOTAL DE LA COTIZACIÓN POR CONCEPTO DE GASTOS ADMINISTRATIVOS",
        "TIEMPO DE ENTREGA ESTIMADO EN EL MOMENTO DE LA COTIZACIÓN",
        "EL COSTO DEL FLETE SE PAGA A LA PAQUETERÍA AL RECIBIR LA MERCANCÍA Y SU MONTO ES DETERMINADO POR LA MISMA",
        "EL COSTO SOLO CONSIDERA LO ESTIPULADO EN ESTA COTIZACIÓN, CUALQUIER MODIFICACIÓN GENERA COSTO ADICIONAL",
        "TODA INGENIERÍA ES ENTREGABLE AL RECIBIR LA ORDEN DE COMPRA Y SI ES APLICABLE EL ANTICIPO",
        "NO HAY DEVOLUCIONES DESPUPES DE 5 DÍAS NATURALES (APLICA EN TODAS LAS PARTIDAS). TODA DEVOLUCIÓN TENDRÁ UN CARGO DEL 40% SOBRE EL PRECIO BRUTO FACTURADO Y SE REALIZARÁ A TRAVÉS DE UNA NOTA DE CRÉDITO.",
        "EN CASO DE TENER MORA EN LOS PAGOS SE GENERARÁ UN CARGO DEL 10% MENSUAL DURANTE TODO EL TIEMPO QUE PERMANEZCA INSOLUTO",
        "SIAUMex NO SE HACE RESPONSABLE POR EQUIPOS ADQUIRIDOS POR EL CLIENTE",
        "CUALQUIER MODIFICACIÓN SOBRE SOFTWARE GENERA UN COSTO DEL 20% EN ADELANTE (DEPENDIENDO DEL GRADO DE MODIFICACIÓN) DEL PROYECTO",
        "EN CASO DE NO PODER REALIZAR LOS SERVICIOS POR CUESTIONES AJENAS A SIAUMex SE CONSIDERA COBRO ADICIONAL POR VIÁTICOS",
    ]);

    
    useEffect(() => {
        if (productosContext.length === 0){
            navigate('/')
        }
    })

    useEffect(() => {
        if (JSON.stringify(condiciones) !== JSON.stringify(consideracionContext)) {
            setConsideracionesContext(condiciones);
        }
        if (JSON.stringify(condicionesDefecto) !== JSON.stringify(consideracionDefectoContext)) {
            setConsideracionesDefectoContext(condicionesDefecto);
        }
    }, [condiciones, condicionesDefecto, consideracionContext, consideracionDefectoContext]);


    useEffect (() => {  
        const fetchData = async () => {   
        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch ('http://siaumex-001-site1.mtempurl.com/clientes/rfc-vendedor', {
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
    
    
    useEffect(() => {
        const listas = [...consideracionContext, ...consideracionDefectoContext]
        setAllConsideraciones(listas);
    }, [consideracionContext, consideracionDefectoContext]);



    useEffect(() => {
        const obtenerFolio = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await fetch (`http://siaumex-001-site1.mtempurl.com/cotizaciones/proximoFolio/${clientesContext.Folio}`, {
                method : 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });   
    
            if (response.ok) {
                const data = await response.json();
                setFolioCoti(data.folio);
            } else {
                const errorText = await response.text(); 
                console.error("Error:", response.status, errorText);
            }
            
          } catch (error) {
            console.error('Error al obtener el folio:', error);
          }
        };
        obtenerFolio();
    }, [clientesContext]);




    const uploadPDFToCloudinary = async (pdfBlob, rfcCliente) => {
        const formData = new FormData();
        formData.append("file", pdfBlob);
        formData.append('upload_preset', 'siaumex-ventas'); 
        formData.append("folder", `siaumex-ventas/ventas/${rfcCliente}`); 
    
        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dmvvrvjko/image/upload", {
                method: "POST",
                body: formData
            });
    
            const data = await response.json();
            //console.log("URL del PDF en Cloudinary:", data.secure_url);
            return data.secure_url; 
        } catch (error) {
            console.error("Error al subir el PDF a Cloudinary:", error);
        }
    };

    

    const generatePDF = async () => {
        const doc = new jsPDF();
      
        const addHeaderFooter = () => {
          doc.addImage(HeaderPhoto, 'PNG', 5, 5, 190, 40); 
          doc.addImage(FooterPhoto, 'PNG', 5, 260, 190, 50); 
        };

        const totalImporte = productosContext.reduce((sum, producto) => sum + (producto.costo * producto.cantidad), 0).toFixed(2);

        // Sombreado griss
        doc.setDrawColor(240, 236, 236);
        doc.setLineWidth(4.5); 
        doc.line(12, 99, 200, 99);
        doc.line(12, 109, 200, 109);
        doc.line(12, 119, 200, 119);
        doc.line(12, 149, 200, 149);
      
        // Página de productos. 
        addHeaderFooter();  
        doc.setFont("arial", "italic");  
        doc.setFontSize(9);  
        doc.text('COTIZACIÓN', 140, 58); 
        doc.text('FECHA', 130, 63);
        doc.text('FOLIO', 130, 68);
        doc.text('VIGENCIA', 130, 73);
        doc.text('CLIENTE', 130, 77);
         
        doc.setFont("arial", "normal"); 
        doc.text(`${fechaActual}`, 160, 63);
        doc.text(`${folioCoti}`, 160, 68);
        doc.text(`${fechaVigencia}`, 160, 73);
        doc.text(`${clientesContext?.Nombre}`, 160, 77);

        doc.setFont("arial", "italic"); 
        doc.text('RAZÓN SOCIAL', 15, 100);
        doc.text('RFC', 15, 105);
        doc.text('DIRECCIÓN', 15, 110);
        doc.text('CONTACTO', 15, 115);
        doc.text('SOLICITANTE', 15, 120);
        doc.text('CP', 150, 110);

        doc.setFont("arial", "nomal"); 
        doc.text(`${clientesContext?.Nombre}`, 50, 100);
        doc.text(`${clientesContext?.RFCClie}`, 50, 105);
        doc.text(`${clientesContext?.Direccion}`, 50, 110);
        doc.text(`${clientesContext?.Correo}`, 50, 115);
        doc.text(`${clientesContext?.Contacto}`, 50, 120);
        doc.text(`${clientesContext?.CP}`, 180, 110);


        doc.setFontSize(6); 
        doc.text('A TRAVÉS DE LA PRESENTE COTIZACIÓN NOS COMPLACE HACERLE LLEGAR NUESTRA PROPUESTA ECONÓMICA SOBRE LOS SERVICIOS Y/O PRODUCTOS SOLICITADOS', 20, 135);

        doc.setFont("arial", "italic"); 
        doc.setFontSize(9); 
        doc.text('PARTIDA', 20, 150);
        doc.text('DESCRIPCIÓN', 70, 150);
        doc.text('UNIDAD', 120, 150);
        doc.text('CANTIDAD', 140, 150);
        doc.text('PRECIO', 160, 150);
        doc.text('IMPORTE', 180, 150);

        let y = 160; 
        let c = 105;
        const margenSuperior = 10;

        productosContext.forEach((producto, index) => {
            let partida = index + 1; 
            let descripcion = doc.splitTextToSize(producto.producto, 120); 
            let unidad = "PIEZA";
            let cantidad = producto.cantidad;
            let precio = producto.costo.toFixed(2); 
            let importe = (producto.costo * producto.cantidad).toFixed(2); 
            
            let alturaDescripcion = descripcion.length * 6; 
    
            // Agregar datos a la tabla
            doc.setFont("arial", "normal");
            doc.text(`${partida}`, 25, y);
            doc.text(descripcion, 40, y, { maxWidth: 70 }); 
            doc.text(unidad, 122, y);
            doc.text(`${cantidad}`, 145, y);
            doc.text(`$ ${precio}`, 162, y);
            doc.text(`$ ${importe}`, 182, y);
    
            y += alturaDescripcion + margenSuperior; 
    
            if (y > 250) {  
                doc.addPage();
                addHeaderFooter();
                y = 50; 
            }
        });


        y += 20; 
        doc.setFont("arial", "italic");
        doc.setFontSize(8);  
        doc.text("GRAN TOTAL", 100, y+3)
        doc.setFont("arial", "normal");
        doc.setFontSize(20);  
        doc.text("$", 150, y);
        doc.text(`${totalImporte}`, 170, y);

        doc.addPage();
        addHeaderFooter();

        // Página de condiciones. 
        doc.setFont("arial", "italic");
        doc.setFontSize(8);
        doc.text("CONDICIONES DE ENTREGA", 15, 55);
        doc.text("LUGAR", 15, 65);
        doc.text("FECHA", 15, 70);
        doc.text("CONDICIONES DE PAGO", 15, 80);
        doc.text("A CONSIDERAR", 15, 100);


        doc.setFont("arial", "normal");
        doc.text(`${opcionEnvioContext}`, 40, 65);
        doc.text(`EL TIEMPO DE ENTREGA SE ESTIMA EN ${semanasEnvioContext} SEMANA(S)`, 40, 70);
        doc.text(`${condicionesContext}`, 15, 85);
    
        
            
        allCondiseraciones.forEach((texto, index) => {
            let lineas = doc.splitTextToSize(texto, 160);
            doc.text(`* ${lineas}`, 15, c, { maxWidth: 183 }); 

            let alturaTexto = lineas.length * 6; 
            c += alturaTexto; 

            if (c > 260) {  
                doc.addPage();
                addHeaderFooter();
                c = 50;
            }
        });


        const pdfBlob = new Blob([doc.output("blob")], { type: "application/pdf" });
        const pdfUrl = await uploadPDFToCloudinary(pdfBlob, idVen);

        if (pdfUrl) {
            return pdfUrl
        }
    
    };

    const guardarCotizacion = async (pdfUrl) => {
      
        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch ('http://siaumex-001-site1.mtempurl.com/cotizaciones/crear', {
                method : 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body : JSON.stringify({
                    clienteID : clientesContext.Folio, 
                    productos: productosContext,
                    entregaDomicilio: opcionEnvioContext === "paqueteria" ? false : true,
                    lugarEntrega : opcionEnvioContext,
                    tiempoEntrega : semanasEnvioContext, 
                    file : pdfUrl
                }),
            });

            if (response.ok) {
                toast.success("Cotización guardada exitosamente")
                navigate('/home');
            } else {
                toast.error("Error al agregar la cotización, por favor, intente nuevamente.")
                navigate('/home');
            }
        } catch (err) {
            console.error("ERROR:", err)
        } finally {
            setLoading(false);
        }
    }
    


    useEffect(() => {
        if(consideracionContext.length > 0  || consideracionDefectoContext.length > 0){
            setCondiciones(consideracionContext);
            setCondicionesDefecto(consideracionDefectoContext)
        }
    }, [consideracionContext, consideracionDefectoContext])


    const agregarCondicion = () => {
        if (nuevoCondicion.trim() !== "") { 
            setCondiciones([...condiciones, nuevoCondicion]);
            setNuevoCondicion(""); 
        }
    };

    const eliminarCondicion = (index) => {
        setCondiciones(condiciones.filter((_, i) => i !== index));
    };


    const eliminarCondicionDefecto = (index) => {
        setCondicionesDefecto((prevCondiciones) =>
            prevCondiciones.filter((_, i) => i !== index)
        );
    };


    const handleSubmitCotizacion = async () => {
        setLoading(true)
        const pdfUrl = await generatePDF(); 
        if (pdfUrl) {
            guardarCotizacion(pdfUrl); // Llama a guardarCotizacion con la URL del PDF
        } else {
            toast.error("Error al generar la cotización. Inténtalo de nuevo.");
        }
    };
    
    return (
        <div className="w-screen flex justify-center py-20">
            <div className="bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas rounded-lg w-[80%] h-[150vh] shadow-lg flex flex-col items-center py-10">
                
                <p className="text-text dark:text-dark-text h-[5%] font-bold text-[28px] mr-[5%]">Consideraciones</p>
                <p className="text-text dark:text-dark-text text-[10px] h-[8%] mb-[2%]">* La cotización esta sujeta a las consideraciones por defecto, si hay alguna consideración extra, agregala aquí. </p>
                
                <section className="h-[10%] w-[80%] flex">
                    <p className="text-text dark:text-dark-text h-[10%] font-bold text-[22px] mr-[5%]">Otro</p>
                    <input className="w-[80%] h-[50%] rounded-full bg-inputs text-text dark:text-dark-text outline-none px-5" type="text" value={nuevoCondicion} onChange={(e) => setNuevoCondicion(e.target.value)} />
                    <button className="w-[10%] h-[50%] flex items-center justify-center" onClick={agregarCondicion}>
                        <FaCheckCircle className="w-[70%] h-[70%] dark:text-white" />
                    </button>
                </section>

                <p className="text-text dark:text-dark-text text-[12px] h-[5%] mb-[1%] flex items-end"> <button className="text-blue-500 underline" onClick={() => setModalOpen(true)}>* Revisa aquí las cotizaciones por defecto </button></p>

                <div className="w-[80%] h-[80%] mb-[3%] bg-white rounded-3xl flex flex-col items-center py-4 shadow-lg overflow-x-auto overflow-y-auto">
                    <p className="text-text dark:text-dark-text h-[7%] font-bold text-[20px] mr-[5%] mb-[2%]">Consideraciones</p>
                    {condiciones.map ((condicion, index) =>(
                         <div className="w-[95%] min-h-[9vh] flex items-center px-5 mb-[3%] bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas">
                            <p className="font-semibold text-text dark:text-dark-text w-[93%] truncate">{condicion}</p>
                            <button className="w-[6%] h-[80%] rounded-full border-red-500 border-2 flex items-center justify-center" onClick={() => eliminarCondicion(index)}>
                                <FaRegTrashCan className="w-[50%] h-[50%] dark:text-white" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="w-[80%] h-[7%] flex items-end">
                    <section className="w-[50%] h-full flex items-end justify-start">
                        <button className="bg-botones w-[50%] h-[60%] rounded-3xl text-white font-bold text-[16px]" onClick={() => navigate("/cotizaciones-pago")}>
                            Anterior
                        </button>
                    </section>

                    <section className="w-[50%] h-full flex items-end justify-end">
                        <button className="bg-botones w-[50%] h-[60%] rounded-3xl text-white font-bold text-[16px]" onClick={handleSubmitCotizacion}>
                            Guardar cotización
                        </button>
                    </section>
                </div>

            </div>


            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-complemento  dark:bg-dark-complemento px-6 py-4 rounded-3xl shadow-lg w-[90%] h-[90%] border-[4px] border-border dark:border-dark-border flex flex-col items-center justify-center">

                        <section className="w-full h-[10%] flex items-center justify-center">
                            <p className="text-text dark:text-dark-text h-[7%] font-bold text-[20px] mr-[5%] mb-[2%]">Consideraciones por defecto.</p>
                        </section>

                        <section className="w-full h-[80%] overflow-y-auto">
                            {condicionesDefecto.map((condicion, index) => (
                                <div className="w-[95%] min-h-[8vh] flex items-center px-5 mb-[3%] bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas rounded-lg">
                                    <p
                                        className="font-semibold text-text dark:text-dark-text w-[95%] px-2 text-sm"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}
                                    >
                                        {condicion}
                                    </p>
                                    <button
                                        className="w-[5%] h-full rounded-full flex items-center justify-center"
                                        onClick={() => eliminarCondicionDefecto(index)}
                                    >
                                        <FaRegTrashCan className="w-[45%] h-[45%] dark:text-white" />
                                    </button>
                                </div>
                            ))}
                        </section>

                        <section className="w-full h-[10%] flex items-center justify-center">
                            <button
                                onClick={() => setModalOpen(false)}
                                className={`w-[30%] h-[70%] rounded-3xl bg-text text-white font-bold text-[16px]`}
                            >
                                Aceptar
                            </button>
                        </section>
                    </div>
                </div>
            )}


       
            {loading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl flex flex-col items-center shadow-lg">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-3 text-gray-700 font-semibold">Creando cotización</p>
                    </div>
                </div>
            )}                    
             

        </div>
    )
}

export default CondicionesComponent;