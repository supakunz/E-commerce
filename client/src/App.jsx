import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import PaymentRoutes from "./routes/PaymentRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {/* แยก Route สำหรับ User */}
        <Route path="/*" element={<UserRoutes />} />
        {/* แยก Route สำหรับ Admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        {/* หน้าจ่ายเงิน */}
        <Route path="/payment/*" element={<PaymentRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
