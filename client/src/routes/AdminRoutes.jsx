import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Sidebar from "../admin/navbar/sidebar/Sidebar";
import AddProduct from "../admin/addProduct/AddProduct";
import ListProduct from "../admin/listProduct/ListProduct";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import jwtDecode from "jwt-decode";

function AdminRoutes() {
  const { isAuthenticated } = useAuth(); // ตรวจสอบสิทธิ์
  const token = localStorage.getItem("auth-token");

  // -------- ** ตรวจสอบการ Login และแยก Role ----------
  // 1.เมื่อไม่มี token และ login
  if (!token && !isAuthenticated) {
    console.error("No token found");
    return <Navigate to="/login" replace />;
  }

  // 2.เมื่อมี token #login
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    // ตรวจสอบเวลา token กับเวลาจริง
    if (decoded.exp < currentTime) {
      console.error("Token has expired");
      localStorage.removeItem("auth-token");
      return <Navigate to="/login" replace />;
    }

    // ตรวจสอบสิทธิ์การเข้าถึง
    const userRole = decoded.user?.role;
    if (userRole !== "admin") {
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row bg-[#F6F6F6] h-screen">
        <Sidebar />
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
          {/* เพิ่มเส้นทางอื่นๆ ที่ Admin เข้าถึงได้ */}
        </Routes>
      </div>
    </AdminLayout>
  );
}

export default AdminRoutes;
