import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null); // Estado para la imagen seleccionada
  const [uploading, setUploading] = useState(false); // Estado para el proceso de carga
  const [imageUrl, setImageUrl] = useState(''); // Estado para almacenar la URL de la imagen subida

  // Función para manejar el cambio de archivo cuando se selecciona una imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Verificar si el archivo es una imagen
    if (file && file.type.startsWith('image/')) {
      setImage(file); // Asignamos la imagen seleccionada al estado
    } else {
      alert('Por favor selecciona una imagen');
      setImage(null);
    }
  };

  // Función para manejar la subida de la imagen a Cloudinary
  const handleImageUpload = async () => {
    if (!image) {
      alert('Por favor selecciona una imagen antes de subir');
      return;
    }

    setUploading(true); // Establecemos el estado de carga como verdadero

    const formData = new FormData();
    formData.append('file', image); // Agregamos la imagen seleccionada
    formData.append('upload_preset', 'siaumex-ventas'); // Reemplaza con tu Upload Preset
    formData.append('cloud_name', 'dmvvrvjko'); // Reemplaza con tu Cloud Name

    try {
      // Realizamos la solicitud POST a Cloudinary
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dmvvrvjko/image/upload`,
        formData
      );

      // Cuando la imagen se sube con éxito
      setUploading(false); // Desactivamos el estado de carga
      setImageUrl(res.data.secure_url); // Obtenemos la URL de la imagen subida

      // Aquí puedes agregar la URL a tu base de datos, dependiendo de tu lógica de backend
      console.log('Imagen subida con éxito: ', res.data.secure_url);

    } catch (err) {
      setUploading(false); // Desactivamos el estado de carga en caso de error
      console.error('Error al subir la imagen: ', err);
      alert('Error al subir la imagen');
    }
  };

  return (
    <div>
        
      {/* Input para seleccionar una imagen */}
      <input 
        type="file" 
        accept="image/*" // Permite solo imágenes
        onChange={handleImageChange} // Llama la función al cambiar el archivo
      />
      
      {/* Botón para subir la imagen */}
      <button onClick={handleImageUpload} disabled={uploading}>
        {uploading ? 'Subiendo...' : 'Subir imagen'}
      </button>

      {/* Mostrar la imagen subida si existe */}
      {imageUrl && <img src={imageUrl} alt="Imagen subida" width="300" />}
    </div>
  );
};

export default ImageUpload;
