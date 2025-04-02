import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { CotizacionContext } from "../../context/CotizacionContext";
import { jsPDF } from 'jspdf'
import HeaderPhoto from "../../assets/icons/template/header.png";
import FooterPhoto from "../../assets/icons/template/footer.png";

function CondicionesComponent () {
    const {
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
    } = useContext(CotizacionContext);

    console.log("Cliente: ", clientesContext);

    const navigate = useNavigate();
    const [condiciones, setCondiciones] = useState([]);
    const [nuevoCondicion, setNuevoCondicion] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [allCondiseraciones, setAllConsideraciones] = useState([]);
    const fecha = new Date();
    const fechaActual = fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

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


    const productos = [
        { codigo: '001', categoria: 'Electrodomésticos', producto: 'Refrigerador de última generación con tecnología de enfriamiento rápido y sistema de ahorro de energía que mantiene los alimentos frescos por más tiempo.', precio: 250, cantidad: 2 },
        { codigo: '002', categoria: 'Electrodomésticos', producto: 'Horno microondas con múltiples funciones de cocción, pantalla táctil y diseño elegante que complementa cualquier cocina moderna.', precio: 120, cantidad: 1 },
        { codigo: '003', categoria: 'Tecnología', producto: 'Laptop ultradelgada con procesador de última generación, pantalla de alta resolución y batería de larga duración, ideal para profesionales y estudiantes.', precio: 800, cantidad: 3 },
        { codigo: '004', categoria: 'Muebles', producto: 'Sofá de cuero premium con diseño ergonómico, reposabrazos ajustables y sistema reclinable para una comodidad inigualable en el hogar.', precio: 450, cantidad: 1 },
        { codigo: '005', categoria: 'Herramientas', producto: 'Taladro inalámbrico con batería de larga duración, múltiples velocidades y diseño ergonómico para un agarre seguro y cómodo.', precio: 90, cantidad: 4 },
        { codigo: '006', categoria: 'Ropa', producto: 'Chaqueta impermeable resistente al viento y con forro térmico, ideal para climas fríos y actividades al aire libre.', precio: 70, cantidad: 2 },
        { codigo: '007', categoria: 'Tecnología', producto: 'Smartphone con pantalla de alta definición, cámara de 108MP, almacenamiento de 256GB y procesador de última generación.', precio: 999, cantidad: 2 },
        { codigo: '008', categoria: 'Juguetes', producto: 'Juego de construcción con más de 500 piezas para estimular la creatividad y el aprendizaje en los niños.', precio: 50, cantidad: 5 },
        { codigo: '009', categoria: 'Electrodomésticos', producto: 'Aspiradora robot inteligente con detección de obstáculos, control por aplicación móvil y batería de larga duración.', precio: 300, cantidad: 1 },
        { codigo: '010', categoria: 'Deportes', producto: 'Bicicleta de montaña con suspensión doble, frenos de disco y marco de aluminio ligero para aventuras extremas.', precio: 600, cantidad: 1 },
        { codigo: '011', categoria: 'Cocina', producto: 'Juego de cuchillos profesionales de acero inoxidable con mango ergonómico y filo de larga duración.', precio: 80, cantidad: 3 },
        { codigo: '012', categoria: 'Automotriz', producto: 'Cargador portátil para automóvil con carga rápida y múltiples puertos USB.', precio: 40, cantidad: 2 },
        { codigo: '013', categoria: 'Jardinería', producto: 'Kit de herramientas de jardinería con pala, rastrillo, tijeras de poda y guantes resistentes.', precio: 55, cantidad: 3 },
        { codigo: '014', categoria: 'Hogar', producto: 'Juego de sábanas de algodón egipcio de 1000 hilos para una experiencia de descanso inigualable.', precio: 150, cantidad: 2 },
        { codigo: '015', categoria: 'Electrónica', producto: 'Bocina Bluetooth con sonido envolvente, resistencia al agua y batería de 24 horas de duración.', precio: 120, cantidad: 1 },
        { codigo: '016', categoria: 'Moda', producto: 'Bolso de cuero genuino con compartimentos múltiples y diseño elegante para toda ocasión.', precio: 200, cantidad: 2 },
        { codigo: '017', categoria: 'Salud', producto: 'Reloj inteligente con monitor de ritmo cardíaco, contador de pasos y conexión a aplicaciones de salud.', precio: 180, cantidad: 1 },
        { codigo: '018', categoria: 'Tecnología', producto: 'Monitor de 27 pulgadas con resolución 4K, tasa de refresco de 144Hz y tecnología de protección ocular.', precio: 500, cantidad: 2 },
        { codigo: '019', categoria: 'Hogar', producto: 'Purificador de aire con filtro HEPA y detección automática de calidad del aire.', precio: 250, cantidad: 1 },
        { codigo: '020', categoria: 'Oficina', producto: 'Silla ergonómica con soporte lumbar ajustable, reposabrazos acolchados y base giratoria de 360 grados.', precio: 320, cantidad: 1 },
    ];
    
    useEffect(() => {
        if (JSON.stringify(condiciones) !== JSON.stringify(consideracionContext)) {
            setConsideracionesContext(condiciones);
        }
        if (JSON.stringify(condicionesDefecto) !== JSON.stringify(consideracionDefectoContext)) {
            setConsideracionesDefectoContext(condicionesDefecto);
        }
    }, [condiciones, condicionesDefecto, consideracionContext, consideracionDefectoContext]);
    
    
    useEffect(() => {
        const listas = [...consideracionContext, ...consideracionDefectoContext]
        setAllConsideraciones(listas);
    }, [consideracionContext, consideracionDefectoContext])

    const generatePDF = () => {
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
        doc.text('PROVEEDOR', 130, 73);
        doc.text('VIGENCIA', 130, 77);
        doc.text('CLIENTE', 130, 82);
         
        doc.setFont("arial", "normal"); 
        doc.text(`${fechaActual}`, 160, 63);
        doc.text('folio-tem', 160, 68);
        doc.text('prov-tem', 160, 73);
        doc.text('vig', 160, 77);
        doc.text(`${clientesContext?.Nombre}`, 160, 82);

        doc.setFont("arial", "italic"); 
        doc.text('RAZÓN SOCIAL', 15, 100);
        doc.text('RFC', 15, 105);
        doc.text('DIRECCIÓN', 15, 110);
        doc.text('CONTACTO', 15, 115);
        doc.text('SOLICITANTE', 15, 120);
        doc.text('CP', 150, 110);

        doc.setFont("arial", "nomal"); 
        doc.text('no se', 50, 100);
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
    
        doc.save("cotizacion.pdf");
    };

    const guardarCotizacion = async () => {
        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch ('http://localhost:3000/cotizaciones/crear', {
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
                    tiempoEntrega : semanasEnvioContext
                }),
            });

            if (response.ok) {
                alert("Cotización guardada exitosamente")
                navigate('/home');
            } else {
                alert("Error al agregar la cotización, por favor, intente nuevamente.")
                navigate('/home');
            }
        } catch (err) {
            console.error("ERROR:", err)
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
        generatePDF();
        guardarCotizacion();
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

        </div>
    )
}

export default CondicionesComponent;