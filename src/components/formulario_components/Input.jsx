import React from "react";

const Input = ({ w, h, border_color, type, ...props }) => {

    const tipo = type || 'text';

  return (
    <input
     className={`rounded-3xl bg-inputs outline-none px-6 text-[12px] appearance-none ${tipo === "number" ? "no-spinner" : ""}`}
      style={{
        width: w,
        height: h,
        border: `2px solid ${border_color ? border_color : 'transparent'}`,
      }}
      type= {tipo}
      {...props}
    />
  );
};

export default Input;
