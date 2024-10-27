import React, { forwardRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const MenuChat = forwardRef((props, ref) => {

    const [pregunta1, setPregunta1] = useState(false);
    const [pregunta2, setPregunta2] = useState(false);
    const [pregunta3, setPregunta3] = useState(false);

    const changePreguntaUno = () =>{
        setPregunta1(true);
        setPregunta2(false);
        setPregunta3(false)
    }

    const changePreguntaDos = () =>{
        setPregunta1(false);
        setPregunta2(true);
        setPregunta3(false)
    }

    const changePreguntaTres = () =>{
        setPregunta1(false);
        setPregunta2(false);
        setPregunta3(true)
    }

    return (
        <div ref={ref} className="absolute right-0 w-80 h-3/5 bg-[#f3c2f5] rounded-lg shadow-lg z-20 mr-4 -mb-20 p-4 py-8">
            <div className="bg-white p-2 rounded-2xl mb-4">
                <p className="text-[12px]">¡Hola! ¿En que podemos ayudarte?</p>
            </div>

            {/*Div de mensajes*/}
            <div className="w-[99%] h-[75%]">
                {pregunta1 && (
                    <>
                    <div className="flex items-end justify-end p-2 rounded-3xl bg-[#ef89e5] mb-5">
                        <p className="text-[12px]">¿Cómo hacer una compra?</p>
                    </div>

                    <div className="p-2 py-4 rounded-3xl bg-white">
                        <p className="text-[12px]">Elige tus modelos aquí y la numeración que desees y puedes enviar el modelo y el número al télefono 448 112 8889</p>
                    </div>
                    </>
                )}

                {pregunta2 && (
                    <>
                    <div className="flex items-end justify-end p-2 rounded-3xl bg-[#ef89e5] mb-5">
                        <p className="text-[12px]">¿Dónde veo más modelos?</p>
                    </div>

                    <div className="p-2 py-4 rounded-3xl bg-white">
                        <p className="text-[12px]">Esta página se mantendrá actualizada cada semana, sin embargo si buscas ayuda con algun modelo, puedes mandar mensaje a la asesora de venta al número 448 112 8889. O seguir la página en instagram donde publicamos modelos fuera de línea: collection.st</p>
                    </div>
                    </>
                )}


                {pregunta3 && (
                    <>
                    <div className="flex items-end justify-end p-2 rounded-3xl bg-[#ef89e5] mb-5">
                        <p className="text-[12px]">¿Cuánto tarda en llegar?</p>
                    </div>

                    <div className="p-2 py-4 rounded-3xl bg-white">
                        <p className="text-[12px]">Los modelos tardan un aproximado de dos a tres semanas, cuando lleguen serás notificado por el número donde realizaste el pedido</p>
                    </div>
                    </>
                )}
            </div>

            <div className="w-[98%] h-[15%] flex py-2">
                <button className="text-[9px] bg-[#ef89e5] rounded-3xl mr-1 p-1" onClick={changePreguntaUno}>¿Cómo hacer una compra?</button>
                <button className="text-[9px] bg-[#ef89e5] rounded-3xl mr-1 p-1" onClick={changePreguntaDos}>¿Dónde veo más modelos?</button>
                <button className="text-[9px] bg-[#ef89e5] rounded-3xl mr-1 p-1" onClick={changePreguntaTres}>¿Cuánto tarda en llegar?</button>
            </div>
        </div>
    );
});

export default MenuChat;