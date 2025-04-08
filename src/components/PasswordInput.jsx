import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ label = "Contraseña", value, onChange, onFocus, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full h-[32%] py-2 flex flex-col items-center justify-center relative">
            <p className="text-[20px] text-text dark:text-dark-text font-bold mb-2">{label}</p>
            <div className="w-[90%] h-[40%] relative flex items-center">
                <input
                    className={`w-full h-full rounded-3xl px-10 shadow-sm outline-none text-text dark:text-dark-text ${error ? "bg-fondo_error border-2 border-botones" : "bg-inputs"}`}
                    type={showPassword ? "text" : "password"}
                    placeholder={label}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-500"
                >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
