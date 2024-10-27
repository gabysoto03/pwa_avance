import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useLocation } from "react-router-dom";

function ShoesWomen() {
    const [shoes, setShoes] = useState([]);
    const location = useLocation();
    const { pagina } = location.state || {};



    const listenShoes = (pagina) => {
        const shoesRef = collection(db, "zapatos", "womenShoes", pagina);

        return onSnapshot(shoesRef, (snapshot) => {
            const shoesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setShoes(shoesData);
        });
    };

    useEffect(() => {
        if (pagina) {
            const unsubscribe = listenShoes(pagina);
            return () => unsubscribe();
        }
    }, [pagina]);


    return (
        <div className="min-h-screen w-full p-6">

            <p className="flex items-center justify-center text-[40px] mb-10 mt-2 font-semibold">{pagina} para mujer</p>

            {shoes.map((shoe) =>(
                <div className="flex items-center justify-center w-[95%] mr-7 mb-6 border-[#ef89e5] border-[3px] rounded-3xl">
                    <div className="w-[10%]">
                        <img src={shoe.img} alt="" className="w-full p-3" />
                    </div>

                    <div className="w-[85%]">
                        <p className="text-[25px] mb-6 font-semibold">{shoe.descripcion}</p>
                        
                        <div className="flex"> 
                            <p className="w-[50%] text-[18px]">{shoe.modelo}</p>
                            <p className="w-[50%] flex items-end justify-end text-[20px]">{`$${shoe.precio}`}</p>
                        </div>
                    
                    </div>
                    
                </div>
            ))}
            

        </div>
    );
}

export default ShoesWomen;
