import React from "react";
import * as Yup from'yup';
import { useFormik } from 'formik';

const validationSchema = Yup.object().shape({

    password : Yup.string()
        .min(8, 'La contraseña debe de ser mayor a ocho caracteres')
        .matches(/[0-9]/, 'La contraseña debe incluir al menos un número')
        .matches(/[!@#$%^&*]/, 'La contraseña debe incluir al menos un carácter especial')
        .required('La contraseña es obligatoria'),
});


function Register(){
    
    const formik = useFormik({
        initialValues: {
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          alert('Formulario enviado con éxito');
        },
      });



    return(
        <div className="min-h-screen w-full flex items-center justify-center">
        <div className=" w-[50%] flex flex-col items-center justify-center p-6 border rounded-3xl border-gray-400">
            <p className="font-semibold text-[36px] text-2xl md:text-3xl lg:text-4xl mb-8">Crear una cuenta</p>

            <form className="w-full flex flex-col items-center justify-center" onSubmit={formik.handleSubmit}>
                <input
                    className="w-[90%] h-[40px] border rounded-lg border-gray-500 p-4 mb-5 md:text-sm sm:text-xs"
                    type="text"
                    placeholder="Escribe tu nombre completo"
                />
                <input
                    className="w-[90%] h-[40px] border rounded-lg border-gray-500 p-4 mb-5 md:text-sm sm:text-xs"
                    type="text"
                    placeholder="Correo eléctronico"
                />
                <select name="" id="" className="w-[90%] h-[40px] border rounded-lg border-gray-500 p-4 mb-5 md:text-sm sm:text-xs">
                    <option value="mujer">Mujer</option>
                    <option value="hombre">Hombre</option>
                </select>
                <input
                    id="password"
                    className="w-[90%] h-[40px] border rounded-lg border-gray-500 p-4 mb-5 md:text-sm sm:text-xs"
                    type="password"
                    placeholder="Escribe tu contraseña"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div style={{ color: 'red' }}>{formik.errors.password}</div>
                ) : null}
                <input
                    className="w-[90%] h-[40px] border rounded-lg border-gray-500 p-4 mb-5 md:text-sm sm:text-xs"
                    type="password"
                    placeholder="Confirma tu contraseña"
                />

                <button type="submit" className="bg-[#ef89e5] w-[60px] md:w-60 sm:w-72 h-[40px] rounded-xl text-white font-semibold mb-4 text-md md:text-sm sm:text-xs">
                    <a href="/home">Crear una cuenta</a>
                </button>

                <a className="text-blue-500 text-[14px] text-md md:text-sm sm:text-xs" href="/">
                        Acceder
                </a>
            </form>
        </div>
    </div>
    )
}

export default Register;