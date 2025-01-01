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
import Input from "../components/common/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 character(s)")
    .max(20, "Username must be no more than 20 characters(s)")
    .regex(/^[a-zA-Z0-9]+$/, {
      // อนุญาตเฉพาะตัวอักษรและตัวเลข
      message: "Username must not contain special characters",
    })
    .optional(),
  email: z.string().email(),
  password: z
    .string()
    .min(7)
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Password can contain only letters, numbers, _ and -",
    }),
});

const LoginSingup = () => {
  const [state, setState] = useState("Login");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState([]);
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const URL = import.meta.env.VITE_APP_API;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsCursorVisible(false); // ทำให้เคอร์เซอร์หาย
    }
  };

  const handleFocus = () => {
    setIsCursorVisible(true); // เคอร์เซอร์กลับมาหลังจากการคลิก
  };

  // วิธีเก็บค่าจาก Form --> 1. useForm to easy
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

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
    setIsCursorVisible(false); // ทำให้เคอร์เซอร์กลับมาหลังส่งฟอร์ม
    toast.loading("Please wait...");
    // Axios API
    await axios
      .post(`${URL}/api/users`, data)
      .then((resq) => {
        let response = resq.data;
        setResponseData(response);
        if (response.success) {
          localStorage.setItem("auth-token", response.token); // save token ที่ส่งมาลง ใน localStorage ของ clien
          reset();
          login(); // อัปเดตสถานะเป็นล็อกอิน
          const token = localStorage.getItem("auth-token");
          const decoded = jwtDecode(token);
          if (decoded.user.role == "admin") {
            return navigate("/admin"); // เปลี่ยนเส้นทางไปยังแดชบอร์ด
          }
          navigate("/");
        }
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.response.data.errors, {
          theme: "colored",
        });
        console.log(err.response);
        reset();
      })
      .finally(() => setIsCursorVisible(true)); // ทำให้เคอร์เซอร์กลับมาเมื่อการส่งฟอร์มเสร็จ)
  };

  // **-------- Function Login ---------
  const onLogin = async (data) => {
    setIsCursorVisible(false); // ทำให้เคอร์เซอร์กลับมาหลังส่งฟอร์ม
    toast.loading("Please wait...");
    await axios
      .post(`${URL}/api/users/login`, data)
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
      })
      .finally(() => setIsCursorVisible(true));
  };

  return (
    <div className="loginsignup w-[100%] bg-[#999] py-[60px]">
      <div className="loginsignup-container w-full max-w-[580px] min-h-[600px] rounded-lg bg-white m-auto p-[32px_60px]">
        <h1 className="text-[30px] font-medium mt-[15px]">{state}</h1>
        <form
          onSubmit={
            state === "Sing Up" ? handleSubmit(onSubmit) : handleSubmit(onLogin)
          }
          action=""
        >
          <div className="loginsignup-fields flex flex-col gap-[29px] mt-[30px]">
            {state === "Sing Up" ? (
              <Input
                name={"username"}
                type={"text"}
                placeholder={"Your Name"}
                register={register}
                error={errors?.username?.message}
                handleKeyDown={handleKeyDown}
                handleFocus={handleFocus}
                isCursorVisible={isCursorVisible}
              />
            ) : null}
            <Input
              name={"email"}
              // type={"email"}
              placeholder={"Email Address"}
              register={register}
              error={errors?.email?.message}
              handleKeyDown={handleKeyDown}
              handleFocus={handleFocus}
              isCursorVisible={isCursorVisible}
            />
            <Input
              name={"password"}
              type={"password"}
              placeholder={"Password"}
              register={register}
              error={errors?.password?.message}
              handleKeyDown={handleKeyDown}
              handleFocus={handleFocus}
              isCursorVisible={isCursorVisible}
            />
          </div>
          <button
            type="submit"
            className="w-[100%] rounded-lg h-[62px] text-white bg-black mt-[30px] border-none text-[18px] font-medium cursor-pointer"
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
            <input type="checkbox" name="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LoginSingup;
