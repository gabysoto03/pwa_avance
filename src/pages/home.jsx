import React, {useState, useRef, useEffect} from "react";
import IconWomen from "../assets/icon_woman.svg";
import Women from "../assets/women.svg";
import Men from "../assets/men.svg";
import { AiFillMessage } from "react-icons/ai";
import MenuChat from "../components/chatMenu";

function Home(){
    
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                toggleClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleClose = () =>{
        setIsOpen(false);
    }

    return(
        <div className="min-h-screen w-full p-6">

            <div className="flex flex-col items-center justify-center mt-10 mb-5">
                <p className="text-[48px] font-semibold mb-5">¡Hola, usuario!</p>
                <p className="text-[16px] mb-5">Selecciona el género para visualizar los productos. </p>
            </div>

            <div className="w-full flex items-center justify-center mb-10">
                <div className="w-[25%] h-80 rounded-3xl border-[#ef89e5] border-[2px] flex flex-col items-center justify-center mr-12" onClick={() => window.location.href = "/women_page"}> 
                    <p className="font-semibold text-3xl mb-4">Mujer</p>
                    <img src={Women} alt="Mujer" />
                </div>

                <div className="w-[25%] h-80 rounded-3xl border-[#0814e4] border-[2px] flex flex-col items-center justify-center mr-12" onClick={() => window.location.href = "/men_page"}> 
                    <p className="font-semibold text-3xl mb-4">Hombre</p>
                    <img src={Men} alt="Hombre" />
                </div>
                {isOpen && <MenuChat ref={menuRef} />}

            </div>

            <div className="flex items-end justify-end" >
                <div className="w-16 h-16 mr-4">
                    <AiFillMessage className="w-full h-full cursor-pointer" color="#e0248c" onClick={toggleMenu}/>
                </div>
            </div>
            
        </div>
    );
}

export default Home;