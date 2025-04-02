import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const CambiarPassword = () => {
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [idVen, setIdVen] = useState('');
    const navigate = useNavigate();

    const validatePassword = () => {
        
        const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRule.test(password)) {
            setErrorMessage("Debe tener al menos 8 caracteres, letras, números y al menos un carácter especial.");
            setPasswordError(true);
            setConfirmError(true);
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden.");
            setPasswordError(true);
            setConfirmError(true);
            return false;
        }
        setErrorMessage("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validatePassword()) {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch ('http://localhost:3000/usuario/newPass', {
                    method : 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body : JSON.stringify({
                        rfc : idVen,
                        pass : password
                    }),
                });

                if (response.ok) {
                    setSuccessMessage("Contraseñas cambiadas correctamente. ")
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                } else {
                    setErrorMessage("Ocurrio un error, intente nuevamente")
                }
            } catch(e) {
                console.error("Err: ", e)
            }
        
        }
    };



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

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            
            <p className="text-text text-[48px] font-bold">Cambiar contraseña</p>
        
            <div className="w-[45%] h-[55%] mt-10 rounded-3xl border-[4px] border-header shadow-lg py-2 bg-fondo_tarjetas">
                <div className="w-full h-[32%] py-2 flex flex-col items-center justify-center">
                    <p className="text-[16px] text-text font-bold mb-2">Contraseña</p>
                    <input
                        className={`w-[90%] h-[40%] rounded-3xl px-10 shadow-sm outline-none text-text ${ passwordError ? "bg-fondo_error border-2 border-botones" : "bg-inputs"}`}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => {
                            setPasswordError(false);
                            setConfirmError(false);
                            setErrorMessage("");
                        }}
                    />
                </div>
                
                <div className="w-full h-[32%] py-2 flex flex-col items-center justify-center">
                    <p className="text-[16px] text-text font-bold mb-2">Confirmar contraseña</p>
                    <input
                        className={`w-[90%] h-[40%] rounded-3xl px-10 shadow-sm outline-none text-text ${ confirmError ? "bg-fondo_error border-2 border-botones" : "bg-inputs"}`}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => {
                            setConfirmError(false);
                            setPasswordError(false)
                            setErrorMessage("");
                        }}
                    />
                </div>
                
                
                <div className="w-full h-[36%] py-2 flex flex-col items-center justify-center">
                    
                <button
                            className="bg-botones w-[30%] h-[40%] rounded-3xl text-white font-bold text-[16px] mt-10"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Aceptar
                        </button>

                        <div className="h-[10%] mt-4 text-red-500">
                            {errorMessage}
                        </div>

                        <div className="h-[10%] mt-4 text-green-500">
                            {successMessage}
                        </div>
            </div>
            </div>
        </div>
    )
}

export default CambiarPassword;