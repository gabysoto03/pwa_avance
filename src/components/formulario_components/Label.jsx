import React from "react";

const Label = ({ w, text, ...props }) => {
    return (
      <p
        className={`flex justify-end px-3 text-[16px] font-bold text-text`}
        style={{ width: w }}
        {...props} 
      >
        {text}
      </p>
    );
  };
  
  export default Label;