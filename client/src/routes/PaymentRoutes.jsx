import PaymentLayout from "../layout/PaymentLayout";
import { Routes, Route } from "react-router-dom";
import Payment from "../components/payment/Payment";

const PaymentRoutes = () => {
  return (
    <PaymentLayout>
      <Routes>
        <Route path="/success" element={<Payment status={true} />} />
        <Route path="/cancel" element={<Payment status={false} />} />
      </Routes>
    </PaymentLayout>
  );
};

export default PaymentRoutes;
