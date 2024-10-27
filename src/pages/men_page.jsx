import React from "react";
import { useEffect } from "react";
import IconZapatos from "../assets/zapatos_icon.svg"; 
import IconTenis from "../assets/tenis_men_icon.svg"; 
import IconDeporte from "../assets/deportes_icon.svg"; 
import IconBotas from "../assets/botas_man_icon.svg"; 
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function MenPage(){

    const navigate = useNavigate();

    const handleNavigate = (pagina) => {
        navigate("/shoesMen", { state: { pagina } });
    };
    
    return(
        <div className="min-h-screen w-full p-6">

            <div className="flex flex-col items-center justify-center mt-5 mb-5">
                <p className="font-semibold text-[40px] mb-2">Zapatos para hombre</p>
                <p className="text-[18px]">No sólo camines, deslumbra</p>
            </div>
            
            <div className="flex items-center justify-center w-[90%] h-64 mr-10 ml-20 mb-10">
                
                <div 
                className="w-[45%] h-full flex flex-col items-center justify-center rounded-3xl border-[#0814e4] border-[2px] mr-4"
                onClick={() => handleNavigate('zapatos')}
                style={{ cursor: "pointer" }}
                >
                    
                    <div className="h-[30%] w-full flex items-center justify-center">
                        <p className="font-semibold text-[24px]">Zapatos</p>
                    </div>
                    
                    <div className="h-[57%] w-[25%] flex items-center justify-center p-4 m-2 rounded-3xl bg-[#0992BD]">
                        <img src={IconZapatos} alt="" />
                    </div>
                    
                    <div className="h-[10%] w-full flex items-end justify-end p-6">
                        <p>50 pares</p>
                    </div>
                </div>

                <div 
                className="w-[45%] h-full flex flex-col items-center justify-center rounded-3xl border-[#0814e4] border-[2px] mr-4"
                onClick={() => handleNavigate('tenis')}
                style={{ cursor: "pointer" }}>
                    
                    <div className="h-[30%] w-full flex items-center justify-center">
                        <p className="font-semibold text-[24px]">Tenis</p>
                    </div>
                    
                    <div className="h-[57%] w-[25%] flex items-center justify-center p-4 m-2 rounded-3xl bg-[#0992BD]">
                        <img src={IconTenis} alt="" />
                    </div>
                    
                    <div className="h-[10%] w-full flex items-end justify-end p-6">
                        <p>20 pares</p>
                    </div>
                </div>
                
            </div>

            <div className="flex items-center justify-center w-[90%] h-64 mr-10 ml-20 mb-10">

                <div 
                className="w-[45%] h-full flex flex-col items-center justify-center rounded-3xl border-[#0814e4] border-[2px] mr-4" 
                onClick={() => handleNavigate('botas')}
                style={{ cursor: "pointer" }}>
                    
                    <div className="h-[30%] w-full flex items-center justify-center">
                        <p className="font-semibold text-[24px]">Botas</p>
                    </div>
                    
                    <div className="h-[57%] w-[25%] flex items-center justify-center p-4 m-2 rounded-3xl bg-[#0992BD]">
                        <img src={IconBotas} alt="" />
                    </div>
                    
                    <div className="h-[10%] w-full flex items-end justify-end p-6">
                        <p>23 pares</p>
                    </div>
                </div>

                <div 
                className="w-[45%] h-full flex flex-col items-center justify-center rounded-3xl border-[#0814e4] border-[2px] mr-4"
                onClick={() => handleNavigate('deporte')}
                style={{ cursor: "pointer" }}>
                    
                    <div className="h-[30%] w-full flex items-center justify-center">
                        <p className="font-semibold text-[24px]">Deporte</p>
                    </div>
                    
                    <div className="h-[57%] w-[25%] flex items-center justify-center p-4 m-2 rounded-3xl bg-[#0992BD]">
                        <img src={IconDeporte} alt="" />
                    </div>
                    
                    <div className="h-[10%] w-full flex items-end justify-end p-6">
                        <p>16 pares</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MenPage;