import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import PaymentRoutes from "./routes/PaymentRoutes";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // นำเข้าไฟล์ CSS สำหรับ AOS

function App() {
  useEffect(() => {
    // เริ่มต้นการทำงานของ AOS
    AOS.init({
      duration: 1200, // ระยะเวลาแอนิเมชัน (ms)
      easing: "ease-in-out", // ลักษณะการเคลื่อนไหว
      once: true, // ให้แอนิเมชันทำงานครั้งเดียวเมื่อเลื่อนผ่าน
    });
  }, []);
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
