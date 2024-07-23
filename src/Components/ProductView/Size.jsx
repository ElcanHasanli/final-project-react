import React from "react";

const Size = ({ title, size, click, selected, disabled = false }) => {
  return (
    <li
      className={`font-bold ${
        selected && !disabled
          ? "bg-[#1D1D1D] text-white"
          : "bg-[#E5E5E5] text-black"
      }  w-12 h-[30px] flex items-center justify-center  rounded-2xl ${
        disabled ? "opacity-50" : "opacity-100"
      }`}
      title={title}
      disabled={disabled}
    >
      <button
        onClick={click}
        className={`uppercase w-full h-full rounded-2xl ${
          disabled && "cursor-not-allowed"
        }`}
      >
        {size}
      </button>
    </li>
  );
};

export default Size;
