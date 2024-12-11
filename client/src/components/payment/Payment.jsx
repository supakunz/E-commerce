/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { timehelper } from "../../helpers/timehelper";
import { goldhelper } from "../../helpers/goldhelper";
import Swal from "sweetalert2";

/* eslint-disable react/prop-types */
export default function Payment({ status }) {
  const [paymentData, setPaymentData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  // ดึง query string จาก URL
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id"); // ดึงค่า id

  const getSessionID = async () => {
    await axios(`${import.meta.env.VITE_APP_API}/api/payment/${id}`)
      .then((res) => {
        Swal.fire(
          "Payment Successful",
          "Thank you for your purchase!",
          "success"
        );
        setPaymentData(res.data);
        if (res.data.status != "complete") {
          return navigate(`/payment/cancel?id=${id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/cart");
        Swal.fire("Server Error", "Please you try again later!", "error");
      });
  };

  useEffect(() => {
    getSessionID();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <a href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </a>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow text-center p-4 md:p-6">
        {status ? (
          <CircleCheckIcon className="h-16 w-16 text-green-500" />
        ) : (
          <CircleFailedIcon />
        )}
        <h1 className="mt-4 text-2xl font-semibold">
          {status ? "Payment Successful" : "Payment Failed"}
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {status
            ? "Thank you for your purchase!"
            : "Please you try again later!"}
        </p>
        <div className="mt-6 border rounded-lg p-4 w-full max-w-md">
          <div className="flex justify-between text-sm">
            <span>Amount Paid:</span>
            <span className="font-medium">
              ฿ {goldhelper(paymentData.amount_total)}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Date & Time:</span>
            <span className="font-medium">{timehelper(paymentData.date)}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Reference Number:</span>
            <span className="font-medium">{paymentData.order_id}</span>
          </div>
        </div>
        <a
          onClick={() => (status ? navigate("/cart") : navigate(-1))}
          className={`mt-6 inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-white cursor-pointer ${
            status
              ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              : "bg-red-500 hover:bg-red-600 focus:ring-red-400"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2`}
          // prefetch={false}
        >
          {status ? "Return to Homepage" : "Try Again"}
        </a>
      </main>
      <footer className="flex items-center justify-center h-14 border-t">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; 2024 GOZA STORE. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CircleFailedIcon(props) {
  return (
    <svg {...props} width={70} height={70} xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="27" stroke="red" strokeWidth="6" fill="none" />
      <line
        x1="28"
        y1="28"
        x2="42"
        y2="42"
        stroke="red"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="28"
        x2="28"
        y2="42"
        stroke="red"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
