/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./newletter.css";

const NewLetter = () => {
  const [getemail, setGetemail] = useState({ email: "" });
  const mailRef = useRef();
  const URL = import.meta.env.VITE_APP_API;

  const changeHandler = (e) => {
    setGetemail({ ...getemail, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank Your for Subscribe.", {
      theme: "colored",
    });
    mailRef.current.value = "";
  };

  useEffect(() => {
    axios(`${URL}/`).then((res) => console.log(res.data));
  }, []);

  return (
    <section className="px-4">
      <div className="newsletter container min-h-[20rem] h-[40vh] flex flex-col bg-gradient-to-b from-[#E9EAE3] from 0% to-[#e1ffea22] from 60% items-center justify-center m-auto px-[140px] my-[40px] gap-[35px]">
        <div className="flex flex-col items-center gap-[10px] mb-0 lg:mb-5 xl:mb-0">
          <h1
            data-aos="fade-left"
            data-aos-delay="0"
            className="text-[#171717] text-[40px] font-semibold"
          >
            Get Exclusive Offers On Your Email
          </h1>
          <p
            data-aos="fade-left"
            data-aos-delay="300"
            className="text-red-600 text-[20px] font-semibold"
          >
            Subscribe to our newletter and stay updated
          </p>
        </div>
        <form
          data-aos="fade-left"
          data-aos-delay="600"
          onSubmit={handleSubmit}
          className="flex items-center justify-between bg-white w-[730px] h-[70px] rounded-[80px] border-solid border-[1px] border-[#e3e3e3]"
        >
          <input
            ref={mailRef}
            onChange={changeHandler}
            className="w-[500px] ml-[30px] border-none outline-none text-[#616161] text-[14px]"
            name="email"
            value={getemail.email}
            type="email"
            placeholder="Enter your email here"
            required
          />
          <button
            type="submit"
            className="w-[210px] h-[70px] rounded-[80px] bg-black tracking-[1px] text-white text-[15px] font-bold cursor-pointer hover:text-[#adadad]"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewLetter;
