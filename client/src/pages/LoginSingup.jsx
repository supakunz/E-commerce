/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./css/loginsingup.css";

const LoginSingup = () => {
  const [state, setState] = useState("Login");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState([]);
  const URL = import.meta.env.VITE_APP_API;

  // วิธีเก็บค่าจาก Form --> 1. useForm to easy
  const { register, handleSubmit, reset } = useForm();

  // วิธีเก็บค่าจาก Form --> 2. วิธีปกติ
  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  //   email: ""
  // })

  // const changeHandler = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  //   console.log(formData)
  // }

  // **-------- Function Register ---------
  const onSubmit = async (data) => {
    // ** useForm ต้องรับ data

    // Fect API
    // var responseData;
    // await fetch(`${URL}/singup`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/form-data',
    //     'Contect-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data),
    // }).then(resq => resq.json()).then(data => data = setResponseData(data))

    toast.loading("Please wait...");
    // Axios API
    await axios
      .post(`${URL}/singup`, data)
      .then((resq) => {
        let response = resq.data;
        setResponseData(response);
        if (response.success) {
          localStorage.setItem("auth-token", response.token); // save token ที่ส่งมาลง ใน localStorage ของ clien
          reset();
          login(); // อัปเดตสถานะเป็นล็อกอิน
          navigate("/"); // กลับไปหน้า honme
        }
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.response.data.errors, {
          theme: "colored",
        });
        console.log(err.response);
        reset();
      });
  };

  // **-------- Function Login ---------
  const onLogin = async (data) => {
    toast.loading("Please wait...");
    await axios
      .post(`${URL}/login`, data)
      .then((resq) => {
        let response = resq.data;
        console.log(response);
        if (response.success) {
          localStorage.setItem("auth-token", response.token);
          reset();
          login(); // อัปเดตสถานะเป็นล็อกอิน
          const token = localStorage.getItem("auth-token");
          const decoded = jwtDecode(token);
          if (decoded.user.role == "admin") {
            return navigate("/admin"); // เปลี่ยนเส้นทางไปยังแดชบอร์ด
          }
          navigate("/");
        } else {
          toast.dismiss();
          toast.error(response.errors, {
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(responseData)

  return (
    <div className="loginsignup w-[100%] bg-[#999] py-[60px]">
      <div className="loginsignup-container w-[580px] h-[600px] bg-white m-auto p-[32px_60px]">
        <h1 className="text-[30px] font-medium mt-[15px]">{state}</h1>
        <form
          onSubmit={
            state === "Sing Up" ? handleSubmit(onSubmit) : handleSubmit(onLogin)
          }
          action=""
        >
          <div className="loginsignup-fields flex flex-col gap-[29px] mt-[30px]">
            {state === "Sing Up" ? (
              <input
                onChange={() => changeHandler}
                {...register("username")}
                className="h-[62px] w-[100%] pl-[20px] outline-none text-[16px] text-[#5c5c5c] border-solid border-[1px] border-[#c9c9c9]"
                name="username"
                type="text"
                placeholder="Your Name"
                required
              />
            ) : null}
            <input
              onChange={() => changeHandler}
              {...register("email")}
              className="h-[62px] w-[100%] pl-[20px] outline-none text-[16px] text-[#5c5c5c] border-solid border-[1px] border-[#c9c9c9]"
              name="email"
              type="email"
              placeholder="Email Address"
              required
            />
            <input
              onChange={() => changeHandler}
              {...register("password")}
              className="h-[62px] w-[100%] pl-[20px] outline-none text-[16px] text-[#5c5c5c] border-solid border-[1px] border-[#c9c9c9]"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-[100%] h-[62px] text-white bg-black mt-[30px] border-none text-[18px] font-medium cursor-pointer"
          >
            Continue
          </button>
        </form>
        {/* วิธีที่ 2 */}
        {/* <input onChange={changeHandler} className='h-[62px] w-[100%] pl-[20px] outline-none text-[16px] text-[#5c5c5c] border-solid border-[1px] border-[#c9c9c9]' name='email' type="email" placeholder='Email Address' />
        <input onChange={changeHandler} className='h-[62px] w-[100%] pl-[20px] outline-none text-[16px] text-[#5c5c5c] border-solid border-[1px] border-[#c9c9c9]' name='password' type="password" placeholder='Password' /> */}
        {state === "Sing Up" ? (
          <p className="loginsignup-login mt-[20px] text-[#5c5c5c] text-[14px] font-medium">
            Already have an account{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-[#ff4141] font-semibold cursor-pointer"
            >
              {" "}
              Login here{" "}
            </span>
          </p>
        ) : (
          <p className="loginsignup-login mt-[20px] text-[#5c5c5c] text-[14px] font-medium">
            Create an account?
            <span
              onClick={() => {
                setState("Sing Up");
              }}
              className="text-[#ff4141] font-semibold cursor-pointer"
            >
              {" "}
              Click here{" "}
            </span>
          </p>
        )}
        {state === "Sing Up" ? (
          <div className="loginsignup-agree flex items-center my-[20px] gap-[20px] text-[#5c5c5c] text-[14px] font-medium">
            <input type="checkbox" name="" id="" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LoginSingup;
