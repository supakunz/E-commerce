import { useEffect, useRef, useState } from "react";
import "./newletter.css";
import axios from "axios";

const NewLetter = () => {
  const [getemail, setGetemail] = useState({ email: "" });
  const mailRef = useRef();
  const URL = import.meta.env.VITE_APP_API;

  const changeHandler = (e) => {
    setGetemail({ ...getemail, [e.target.name]: e.target.value });
    // console.log(getemail)
  };

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (e) => {
    alert("Successfully, Thank Your for Subscribe.");
    mailRef.current.value = "";
  };

  useEffect(() => {
    axios(`${URL}/`).then((res) => console.log(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="newsletter w-[80%] h-[40vh] flex flex-col bg-gradient-to-b from-[#E9EAE3] from 0% to-[#e1ffea22] from 60% items-center justify-center m-auto px-[140px] lg:mb-[90px] md:mb-[70px] sm:mb-[50px] mb-[45px] gap-[35px]">
      <div className="flex flex-col items-center gap-[10px]">
        <h1 className="text-[#171717] text-[40px] font-semibold">
          Get Exclusive Offers On Your Email
        </h1>
        <p className="text-red-600 text-[18px] font-semibold">
          Subscribe to our newletter and stay updated
        </p>
      </div>
      <div className="flex items-center justify-between bg-white w-[730px] h-[70px] rounded-[80px] border-solid border-[1px] border-[#e3e3e3]">
        <input
          ref={mailRef}
          onChange={changeHandler}
          className="w-[500px] ml-[30px] border-none outline-none text-[#616161] text-[14px]"
          name="email"
          value={getemail.email}
          type="email"
          placeholder="Your email"
          required
        />
        <button
          onClick={handleSubmit}
          className="w-[210px] h-[70px] rounded-[80px] bg-black tracking-[1px] text-white text-[15px] font-bold cursor-pointer hover:text-[#adadad]"
        >
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
};

export default NewLetter;
