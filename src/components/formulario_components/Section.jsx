import React from "react";

const Section = ({ pWidth, divWidth, text, ...props }) => {
    return (
      <section className="w-full h-[3%] flex" {...props}>
        <p
          className={`h-full flex items-end justify-center text-text text-[14px] font-bold mt-2`}
          style={{ width: pWidth }}
        >
          {text}
        </p>
        <div
          className={`h-[98%] border-b-[2px] border-b-text mr-4`}
          style={{ width: divWidth }}
        ></div>
      </section>
    );
  };
  
  export default Section;
  