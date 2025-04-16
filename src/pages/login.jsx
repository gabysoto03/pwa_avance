import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/icons/logo.svg";
import PasswordInput from "../components/PasswordInput";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/home");
        } else {
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = function () {
                window.history.pushState(null, "", window.location.href);
            };
        }
    }, [navigate]);


    // Función para loguearse 
    const handleLogin = async () => {
        let hasError = false;
        setError("");
        setEmailError(false);
        setPasswordError(false);

        const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRule.test(email)) {
            setError("El correo es inválido");
            setEmailError(true);
            hasError = true;
        }

        if (!password || !email) {
            setError("Favor de llenar todos los campos");
            setPasswordError(true);
            hasError = true;
        }

        if (hasError) return;

        setIsLoading(true); 

        try {
            const response = await fetch("http://siaumex-001-site1.mtempurl.com/usuario/login", {
                method: "POST",
                headers: { "Content-Type": "application/json",},
                
                body: JSON.stringify({
                    correo: email,
                    contraseña: password,
                    tipo: "vendedor",
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Error al iniciar sesión");
                setEmailError(true);
                setPasswordError(true);
                return;
            }

            localStorage.setItem("token", data.token);
            navigate("/home");

        } catch (error) {
            setError("Error de conexión con el servidor");
        } finally {
            setIsLoading(false); 
        }
    };

    

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center relative">
            
            {isLoading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl flex flex-col items-center shadow-lg">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-3 text-gray-700 font-semibold">Cargando...</p>
                    </div>
                </div>
            )}

            <img src={Logo} alt="Logo" />

            <div className="w-[45%] h-[55%] mt-10 rounded-3xl border-[4px] border-fondo_tarjetas shadow-lg py-2">
                <div className="w-full h-[32%] py-2 flex flex-col items-center justify-center">
                    <p className="text-[20px] text-text dark:text-dark-text font-bold mb-2">Usuario</p>
                    <input
                        className={`w-[90%] h-[40%] rounded-3xl px-10 shadow-sm outline-none text-text dark:text-dark-text ${emailError ? "bg-fondo_error border-2 border-botones" : "bg-inputs"}`}
                        type="text"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => {
                            setEmailError(false);
                            setError("");
                        }}
                    />
                </div>

                <PasswordInput
                    label="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => {
                        setPasswordError(false);
                        setError("");
                    }}
                    error={passwordError}
                />
              

                <div className="w-full h-[36%] py-2 flex flex-col items-center justify-center">
                    <button
                        className="bg-botones w-[30%] h-[35%] rounded-3xl text-white font-bold text-[16px] mt-10"
                        onClick={handleLogin}
                        disabled={isLoading}>
                        {isLoading ? "Ingresando..." : "Ingresar"}
                    </button>

                    <div className="h-[20%] mt-4">
                        {error && (
                            <p className="mt-2 text-[12px] text-botones font-semibold">{error}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
