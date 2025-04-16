import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";

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

                const response = await fetch ('http://siaumex-001-site1.mtempurl.com/usuario/newPass', {
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

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center dark:bg-dark-body">
            
            <p className="text-text dark:text-dark-text text-[48px] font-bold">Cambiar contraseña</p>
        
            <div className="w-[45%] h-[55%] mt-10 rounded-3xl border-[4px] border-header shadow-lg py-2 bg-fondo_tarjetas dark:bg-dark-fondo_tarjetas">
                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => {
                        setPasswordError(false);
                        setConfirmError(false);
                        setErrorMessage("");
                    }}
                    error={passwordError}
                />
                
                <PasswordInput
                    label="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => {
                        setConfirmError(false);
                        setPasswordError(false);
                        setErrorMessage("");
                    }}
                    error={confirmError}
                />
                
                
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