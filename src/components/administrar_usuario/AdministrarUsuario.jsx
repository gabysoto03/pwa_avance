import React, { useState, useEffect } from "react";
import Input from "../formulario_components/Input";
import Label from "../formulario_components/Label";
import Section from "../formulario_components/Section";
import { IoSearchSharp } from "react-icons/io5";
import UserConfirm from "../../assets/icons/clientesConfirm.svg";

const UserAdmin = () => {
    const [formIncomplete, setFormIncomplete] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [idVen, setIdVen] = useState('');
    const [folio, setFolio] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        condiciones : '',
        activo : ''
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
        condiciones : '',
        activo : true
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
        condiciones : false,
        activo : true
    });

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

    useEffect(() => {
        if (userData) {
          setFormData({
            rfc : userData.RFCClie || '',
            nombre: userData.Nombre || '',
            contacto: userData.Contacto || '',
            correo: userData.Correo || '',
            telefono: userData.Telefono || '',
            celular: userData.Celular || '',
            direccion: userData.Direccion || '',
            cp: userData.CP || '',
            activo : userData.Activo === true,
            estado : userData.Estado || '',
            condiciones : userData.CondicionesPago || '',
          });

          setFolio(userData.Folio || '');
        }
      }, [userData]);    


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
            const value = formData[key];
            if (value && typeof value === 'string' && !value.trim()) {
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
            
            const response = await fetch(`http://localhost:3000/clientes/editar/${folio}`, {
                method : 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body : JSON.stringify({
                    RFCClie: formData.rfc,
                    Nombre: formData.nombre,
                    Direccion: formData.direccion,
                    Estado : formData.estado,
                    CP: formData.cp,
                    ModoOscuro: false, 
                    Telefono: formData.telefono,
                    Contacto: formData.contacto,
                    Celular: formData.celular,
                    Correo: formData.correo,
                    Envio: 0, 
                    RFCVent: idVen, 
                    CondicionesPago: formData.condiciones,
                }),
            });


            const responseValidar = await fetch(`http://localhost:3000/clientes/eliminar/${folio}`, {
                method : 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body : JSON.stringify({
                    Activo: formData.activo,
                }),
            });

            if (response.ok && responseValidar.ok) {
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


    // Función para buscar los usuarios en la base de datos 
   const handleSearch = async () => {
        if(!formData.rfc){
            setError("Por favor ingresa un RFC");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://localhost:3000/buscar-exacto?tabla=Cliente&campo=RFCClie&informacion=${formData.rfc}&limite=1`, 
                {
                    method : 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (!response.ok){
                throw new Error(`Error en la búsqueda: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
        
            if(data.length === 0){
                setError("No se encontro cliente con ese RFC, tienes que dar de alta el cliente");
                setUserData(null);
            } else {
                setUserData(data[0]);
            }
        } catch (err) {
            setError(err.message);
            setUserData(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-full dark:text-white">
            
            <Section pWidth="15%" divWidth="85%" text="Datos personales" />
            <div className="flex flex-col w-full h-[15%] justify-center items-center">
                
                <div className="flex h-[15%] w-[50%]">
                    <Label w="10%" text="RFC" />
                    <Input
                        name="rfc"
                        border_color={((errors.rfc && !touched.rfc) || formIncomplete) ? 'red' : 'transparent'}
                        w="100%"
                        h="100%"
                        defaultValue={userData?.RFCClie || ""}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                    <button onClick={handleSearch} className="w-[7%] ml-4">
                        <IoSearchSharp className="w-full h-full"  />
                    </button>
                </div>
                
                {userData && !userData.Activo && (
                    <p className="text-red-500 text-xs ml-4 mt-10">El usuario esta desactivado, al final del formulario lo puedes activar.</p>
                )}
               {error && <p className="text-red-500 text-sm ml-4 mt-10">{error}</p>}

                {errors.rfc  && (
                        <p className="text-red-500 text-xs ml-4 mt-2">{errors.rfc}</p>
                    )}
            </div>

            <Section pWidth="10%" divWidth="90%" text="Contacto" />
            <div className="w-full h-[40%] py-5">
                <section className="w-full h-[20%] flex items-center justify-center">
                    <Label w="10%" text="Nombre" />
                    <Input
                        name="nombre"
                        w="80%"
                        h="25%"
                        border_color={ formIncomplete ? 'red' : 'transparent'}
                        defaultValue={userData?.Nombre || ""}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                </section>

                <section className="w-full h-[20%] flex items-center justify-center">
                    
                    <Label w="10%" text="Contacto" />
                    <div className="flex-col h-[25%] w-[40%]">
                        <Input
                            name="contacto"
                            border_color={((errors.contacto && !touched.contacto) || formIncomplete) ? 'red' : 'transparent'}
                            w="100%"
                            h="100%"
                            defaultValue={userData?.Contacto || ""}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            disabled={userData === null}                            
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
                            defaultValue={userData?.Correo || ""}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        {errors.correo &&  (
                            <p className="text-red-500 text-xs ml-4 mt-2">{errors.correo}</p>
                        )}
                    </div>
                </section>
                
                <section className="w-full h-[20%] flex items-center justify-center">
                    <Label w="10%" text="Teléfono" />
                    <div className="flex-col h-[25%] w-[35%]">
                        <Input
                            name="telefono"
                            border_color={((errors.telefono && !touched.telefono) || formIncomplete) ? 'red' : 'transparent'}
                            w="100%"
                            h="100%"
                            type = "number"
                            defaultValue={userData?.Telefono || ""}
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
                            defaultValue={userData?.Celular || ""}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        {errors.celular && (
                            <p className="text-red-500 text-xs ml-4 mt-2">{errors.celular}</p>
                        )}
                    </div>
                </section>

                <section className="w-full h-[20%] flex items-center justify-center">
                    <Label w="10%" text="Dirección" />
                    <Input
                        name="direccion"
                        w="80%"
                        h="25%"
                        border_color={ formIncomplete ? 'red' : 'transparent'}
                        defaultValue={userData?.Direccion || ""}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                </section>
                
                <section className="w-full h-[20%] flex items-center justify-center">
                    <Label w="10%" text="Estado" />
                    <Input
                        name="estado"
                        w="50%"
                        h="25%"
                        border_color={ formIncomplete ? 'red' : 'transparent'}
                        defaultValue={userData?.Estado || ""}
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
                            defaultValue={userData?.CP || ""}
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

            <div className="w-full h-[30%] flex">

                <div className="w-[60%] px-10 ml-28 mt-10 h-full flex flex-col items-center justify-center">
                    <div className="w-full h-[30%] flex">
                        <Label w="10%" text="Condiciones" />
                        <Input
                            name="condiciones"
                            border_color={(formIncomplete) ? 'red' : 'transparent'}
                            w="100%"
                            h="30%"
                            type = "text"
                            defaultValue={userData?.CondicionesPago || ""}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                    </div>

                    <div className="flex w-full h-[30%] mb-6">
                        <Label w="40%" text="Método de envio:"></Label>
                        <div className="w-full h-full px-16">
                            <section className="flex w-[50%] mb-10">
                                <input className="mr-4 scale-150" type="radio" name="envio"   />
                                <p className="text-text dark:text-dark-text font-bold text-[14px] ">Entrega personal</p>
                            </section>
                            <section className="flex w-[50%]">
                                <input className="mr-4 scale-150" type="radio" name="envio"  />
                                <p className="text-text dark:text-dark-text font-bold text-[14px]">Correo eléctronico</p>
                            </section>
                        </div>
                    </div>  
                    
                    <div className="w-full h-[30%] flex">
                        <Label w="10%" text="Activo" />
                        <div className="flex items-start justify-center space-x-8 w-[70%]">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="si"
                                    name="activo"
                                    value="true"
                                    checked={formData.activo === true}
                                    onChange={() => setFormData({ ...formData, activo: true })}
                                    className="form-radio text-blue-600"
                                />
                                <label htmlFor="si" className="ml-2 text-gray-700">Sí</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="no"
                                    name="activo"
                                    value="false"
                                    checked={formData.activo === false}
                                    onChange={() => setFormData({ ...formData, activo: false })}
                                    className="form-radio text-red-600"
                                />
                                <label htmlFor="no" className="ml-2 text-gray-700">No</label>
                            </div>
                        </div>
                    </div>

                    

                </div>
            </div>



            <div className="w-full h-[13%] flex flex-col items-center">

                <div className="w-full h-[20%] flex justify-center">
                    <div className="h-full w-[50%] flex justify-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-botones w-[50%] h-[100%] rounded-3xl text-white font-bold text-[16px]">
                            Actualizar cliente
                        </button>
                    </div>

                </div>

                {success && <p className="text-green-500">Cliente actualizado exitosamente!</p>}

                {error && (
                    <p className="text-red-500 text-sm mt-16 font-bold">
                        Por favor, rellena todos los campos.
                    </p>
                )}
                
                <div className="py-5 w-full flex items-center justify-center">
                    {loading && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-xl flex flex-col items-center shadow-lg">
                                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="mt-3 text-gray-700 font-semibold">Cargando</p>
                            </div>
                        </div>
                    )}
                </div>

            </div>



                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-complemento  dark:bg-dark-complemento px-6 py-4 rounded-3xl shadow-lg w-[50%] h-[40%] border-[4px] border-border dark:border-dark-border flex flex-col items-center justify-center ">

                            <section className="w-full h-[40%] flex justify-center">
                                <img src={UserConfirm} alt="" />
                            </section>

                            <section className="w-full h-[30%] flex items-center justify-center">
                                <p className="font-semibold text-text dark:text-dark-text text-[18px]">¿Seguro que quieres actaulizar al usuario {userData?.Nombre}?</p>
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

export default UserAdmin;
