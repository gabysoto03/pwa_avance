import React, { useState } from "react";
import { FaFolderOpen } from "react-icons/fa6"; 

const InputFolder = ({ w, h, border_color, onChange, ...props }) => {
  const [folderPath, setFolderPath] = useState("");
  const [folderHandle, setFolderHandle] = useState(null); 

  const handleSelectFolder = async () => {
    try {
      const folderHandle = await window.showDirectoryPicker();
      const path = await getFolderPath(folderHandle);  

      setFolderPath(path);
      setFolderHandle(folderHandle);  

      if (onChange) {
        onChange({ target: { name: "carpeta", value: path } });
      }
    } catch (error) {
      console.error("Error al seleccionar la carpeta:", error);
    }
  };


  const getFolderPath = async (folderHandle) => {
    let path = folderHandle.name;
    let currentDir = folderHandle;

    return path;
  };

  return (
    <div
      className="relative flex items-center"
      style={{ width: w, height: h }}
    >
      <input
        className="rounded-3xl bg-inputs outline-none px-6 text-[12px] pr-10 cursor-pointer"
        style={{
          width: "100%",
          height: "100%",
          border: `2px solid ${border_color ? border_color : "transparent"}`,
          paddingRight: "40px",
        }}
        type="text"
        value={folderPath}
        readOnly
        onClick={handleSelectFolder} 
        {...props}
      />
      <FaFolderOpen 
        className="absolute right-4 text-orange-300 cursor-pointer"
        size={20}
        onClick={handleSelectFolder} 
      />
    </div>
  );
};

export default InputFolder;
