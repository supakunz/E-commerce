/* eslint-disable react/prop-types */

// import { useState } from "react";

const Input = (props) => {
  // const [showpassword, setShowpassword] = useState(false);
  const { name, type, placeholder, register, error } = props;
  return (
    <div>
      <input
        {...register(name)}
        className={`h-[62px] w-[100%] pl-[20px] outline-none text-[16px] text-[#5c5c5c] border-solid border-[1px] ${
          error ? "border-red-500" : "border-[#c9c9c9]"
        }`}
        name={name}
        type={type}
        placeholder={placeholder}
        required
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
