import React, { useState, useEffect } from "react";
import Input from "../formulario_components/Input";
import Label from "../formulario_components/Label";
import Section from "../formulario_components/Section";
import InputFolder from "../formulario_components/InputFolder";
import UserConfirm from "../../assets/icons/clientesConfirm.svg";

const UserAdd = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [idVen, setIdVen] = useState('');
    const [formIncomplete, setFormIncomplete] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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



    const [formData, setFormData] = useState({
        rfc: '',
        nombre: '',
        contacto: '',
        correo: '',
        telefono: '',
        celular: '',
        direccion: '',
        cp: '',
        estado : '',
        condiciones : ''
    });

    const [errors, setErrors] = useState({
        rfc: '',
        nombre: '',
        contacto: '',
        correo: '',
        telefono: '',
        celular: '',
        direccion: '',
        cp: '',
        estado : '',
        condiciones : ''
    });

    const [touched, setTouched] = useState({
        rfc: false,
        nombre: false,
        contacto: false,
        correo: false,
        telefono: false,
        celular: false,
        direccion: false,
        cp: false,
        estado : false,
        condiciones : false
    });

    //Función para colocar la carpeta seleccionada
    const handleFolderChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFocus = (e) => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
        setErrors(prev => ({ ...prev, [e.target.name]: '' }));
        setFormIncomplete(false)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsModalOpen(false);

        const newErrors = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = "";
            }
        });

        if (formData.rfc && formData.rfc.length !== 13) {
            newErrors.rfc = "El RFC debe tener 13 caracteres.";
        }

        if (formData.nombre && /\d/.test(formData.nombre)) {
            newErrors.nombre = "El nombre no debe contener números.";
        }

        if (formData.contacto && /\d/.test(formData.contacto)) {
            newErrors.contacto = "El contacto no debe contener números.";
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (formData.correo && !emailRegex.test(formData.correo)) {
            newErrors.correo = "El correo no tiene un formato válido.";
        }

        if (formData.telefono && !/^\d{10}$/.test(formData.telefono)) {
            newErrors.telefono = "El teléfono debe ser de 10 dígitos y solo números.";
        }

        if (formData.celular && !/^\d{10}$/.test(formData.celular)) {
            newErrors.celular = "El celular debe ser de 10 dígitos y solo números.";
        }

        if (formData.cp && !/^\d{5}$/.test(formData.cp)) {
            newErrors.cp = "El CP debe ser un valor numérico de 5 dígitos.";
        }

        setErrors(newErrors);
        const validation = Object.keys(newErrors).length > 0;
        setFormIncomplete(Object.keys(newErrors).length > 0);

        if (validation) {
            setError("Por favor rellena los campos correctamente. ")
            return; 
        }
         

        setLoading(true);
        setSuccess(false);
        setError("");

        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch ('http://localhost:3000/clientes/alta', {
                method : 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body : JSON.stringify({
                    RFCClie: formData.rfc,
                    Nombre: formData.nombre,
                    Contacto: formData.contacto,
                    Correo: formData.correo,
                    Telefono: formData.telefono,
                    Celular: formData.celular,
                    Direccion: formData.direccion,
                    CP: formData.cp,
                    ModoOscuro: false, 
                    Envio: 0, 
                    Estado : formData.estado,
                    RFCVent: idVen, 
                    CondicionesPago: formData.condiciones 
                }),
            });

            if (response.ok) {
                setSuccess(true);
                setError(""); 
            } else {
                const errorText = await response.text(); 
                console.error("Error:", response.status, errorText);

                if (errorText.includes("Violation of UNIQUE KEY")) {
                    setError("El correo electrónico o el RFC ya está registrado");
                } else {
                    setError("Hubo un error al registrar el usuario. Intenta nuevamente.");
                }
            }

        } catch (err) {
            console.error("ERROR:", err)
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full h-full">

            <Section pWidth="15%" divWidth="85%" text="Datos personales" />
            <div className="flex w-full h-[15%] justify-center items-center">
                
                <Label w="10%" text="RFC" />
                <div className="flex-col h-[15%] w-[25%]">
                    <Input
                        name="rfc"
                        border_color={((errors.rfc && !touched.rfc) || formIncomplete) ? 'red' : 'transparent'}
                        w="100%"
                        h="100%"
                        value={formData.rfc}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                    {errors.rfc  && (
                        <p className="text-red-500 text-xs ml-4 mt-2">{errors.rfc}</p>
                    )}
                </div>

                <Label w="10%" text="Nombre" />
                <div className="flex-col h-[15%] w-[40%]">
                    <Input
                        name="nombre"
                        border_color={((errors.nombre && !touched.nombre) || formIncomplete) ? 'red' : 'transparent'}
                        w="100%"
                        h="100%"
                        value={formData.nombre}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                    {errors.nombre && (
                        <p className="text-red-500 text-xs ml-4 mt-2">{errors.nombre}</p>
                    )}
                </div>
            </div>

            <Section pWidth="10%" divWidth="90%" text="Contacto" />
            <div className="w-full h-[35%]  py-5">
                <section className="w-full h-[25%] flex items-center justify-center">
                    <Label w="10%" text="Contacto" />
                    <div className="flex-col h-[25%] w-[40%]">
                        <Input
                            name="contacto"
                            border_color={((errors.contacto && !touched.contacto) || formIncomplete) ? 'red' : 'transparent'}
                            w="100%"
                            h="100%"
                            value={formData.contacto}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        {errors.contacto  && (
                            <p className="text-red-500 text-xs ml-4 mt-2">{errors.contacto}</p>
                        )}
                    </div>


                    <Label w="10%" text="Correo" />
                    <div className="flex-col h-[25%] w-[30%]">
                        <Input
                            name="correo"
                            border_color={((errors.correo && !touched.correo) || formIncomplete) ? 'red' : 'transparent'}
                            w="100%"
                            h="100%"
                            value={formData.correo}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        {errors.correo &&  (
                            <p className="text-red-500 text-xs ml-4 mt-2">{errors.correo}</p>
                        )}
                    </div>
                </section>
                
                <section className="w-full h-[25%] flex items-center justify-center">
                    <Label w="10%" text="Teléfono" />
                    <div className="flex-col h-[25%] w-[35%]">
                        <Input
                            name="telefono"
                            border_color={((errors.telefono && !touched.telefono) || formIncomplete) ? 'red' : 'transparent'}
                            w="100%"
                            h="100%"
                            type = "number"
                            value={formData.telefono}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        {errors.telefono && (
                            <p className="text-red-500 text-xs ml-4 mt-2">{errors.telefono}</p>
                        )}
                    </div>

                    <Label w="10%" text="Celular" />
                    <div className="flex-col h-[25%] w-[35%]">
                        <Input
                            name="celular"
                            border_color={((errors.celular && !touched.celular) || formIncomplete) ? 'red' : 'transparent'}
                            w="100%"
                            h="100%"
                            type = "number"
                            value={formData.celular}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        {errors.celular && (
                            <p className="text-red-500 text-xs ml-4 mt-2">{errors.celular}</p>
                        )}
                    </div>
                </section>
                
                <section className="w-full h-[25%] flex items-center justify-center">
                    <Label w="10%" text="Dirección" />
                    <Input
                        name="direccion"
                        w="80%"
                        h="25%"
                        border_color={ formIncomplete ? 'red' : 'transparent'}
                        value={formData.direccion}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                </section>

                <section className="w-full h-[25%] flex items-center justify-center">
                    <Label w="10%" text="Estado" />
                    <Input
                        name="estado"
                        w="50%"
                        h="25%"
                        border_color={ formIncomplete ? 'red' : 'transparent'}
                        value={formData.estado}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                    <Label w="10%" text="CP" />
                    <div className="flex-col h-[25%] w-[20%]">
                        <Input
                            name="cp"
                            border_color={((errors.cp && !touched.cp) || formIncomplete) ? 'red' : 'transparent'}
                            w="100%"
                            h="100%"
                            type = "number"
                            value={formData.cp}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        {errors.cp  && (
                            <p className="text-red-500 text-xs ml-4 mt-2">{errors.cp}</p>
                        )}
                    </div>
                </section>
            </div>

            <Section pWidth="8%" divWidth="92%" text="Envío" />

            <div className="w-full h-[20%] flex">

                <div className="w-[60%] p-10 ml-28 mt-5 h-full flex flex-col items-center justify-center">
                    <div className="w-full h-[30%] flex">
                        <Label w="10%" text="Condiciones" />
                        <Input
                            name="condiciones"
                            border_color={(formIncomplete) ? 'red' : 'transparent'}
                            w="100%"
                            h="50%"
                            type = "text"
                            value={formData.condiciones}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                    </div>                    
                </div>
            </div>

            <div className="w-full h-[13%] flex flex-col items-center">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-botones w-[25%] h-[20%] rounded-3xl text-white font-bold text-[16px]">
                    Agregar cliente
                </button>

                {(formIncomplete || error )&& (
                    <p className="text-red-500 text-sm mt-16 font-bold">
                        {error}
                    </p>
                )}
                
                <div className="py-5 w-full flex items-center justify-center">
                    {loading && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-xl flex flex-col items-center shadow-lg">
                                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="mt-3 text-gray-700 font-semibold">Registrando usuario</p>
                            </div>
                        </div>
                    )}
                    {success && <p className="text-green-500">Cliente registrado exitosamente!</p>}
                    
                </div>
            </div>


            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-complemento px-6 py-4 rounded-3xl shadow-lg w-[50%] h-[40%] border-[4px] border-[#089CE4] flex flex-col items-center justify-center ">

                        <section className="w-full h-[40%] flex justify-center">
                            <img src={UserConfirm} alt="" />
                        </section>

                        <section className="w-full h-[30%] flex items-center justify-center">
                            <p className="font-semibold text-text text-[18px]">¿Seguro que quieres dar de alta al usuario {formData.nombre}?</p>
                        </section>
                        
                        <section className="w-full h-[30%] flex items-center justify-center">
                            <button 
                                onClick={handleSubmit} 
                                className={`w-[20%] h-[50%] rounded-3xl bg-text text-white font-bold text-[16px] mr-[20%] `}
                            >
                                Si
                            </button>


                            <button 
                                onClick={() => {setIsModalOpen(false);}}
                                className={`w-[20%] h-[50%] bg-botones rounded-3xl text-white font-bold text-[16px] `}
                            >
                                No
                            </button>
                        </section>
                        </div>

                </div>        
            )}
        </div>
    );
};

export default UserAdd;
