/* eslint-disable react-hooks/exhaustive-deps */
import PaymentLayout from "../layout/PaymentLayout";
import { Routes, Route } from "react-router-dom";
import Payment from "../components/payment/Payment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PaymentRoutes = () => {
  const [paymentData, setPaymentData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  // ดึง query string จาก URL
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id"); // ดึงค่า id

  const getSessionID = async () => {
    await axios(`${import.meta.env.VITE_APP_API}/api/payment/${id}`)
      .then((res) => {
        setPaymentData(res.data);
        if (res.data.status != "complete") {
          navigate(`/payment/cancel?id=${id}`);
          return Swal.fire(
            "Payment Failed",
            "Please you try again later!",
            "error"
          );
        }
        navigate(`/payment/success?id=${id}`);
        Swal.fire(
          "Payment Successful",
          "Thank you for your purchase!",
          "success"
        );
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
    <PaymentLayout>
      <Routes>
        <Route
          path="/success"
          element={<Payment status={true} paymentData={paymentData} />}
        />
        <Route
          path="/cancel"
          element={<Payment status={false} paymentData={paymentData} />}
        />
      </Routes>
    </PaymentLayout>
  );
};

export default PaymentRoutes;
