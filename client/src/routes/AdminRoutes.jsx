import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Sidebar from "../admin/navbar/sidebar/Sidebar";
import AddProduct from "../admin/addProduct/AddProduct";
import ListProduct from "../admin/listProduct/ListProduct";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import jwtDecode from "jwt-decode";
import Details from "../admin/details/Details";
import Customers from "../admin/customers/Customers";
import CustomerEdit from "../admin/customers/CustomerEdit";
import OrderList from "../admin/orderlist/OrderList";
import OrderDetails from "../admin/orderlist/OrderDetails";
import Dashboard from "../admin/dashboard/Dashboard";

function AdminRoutes() {
  const { isAuthenticated } = useAuth(); // ตรวจสอบสิทธิ์
  const token = localStorage.getItem("auth-token");

  // -------- ** ตรวจสอบการ Login และแยก Role ----------
  // 1.เมื่อไม่มี token และ ไม่ login
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
      <div className="flex flex-col md:flex-row bg-[#F6F6F6] min-h-[89vh]">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct">
            <Route path="/listproduct" element={<ListProduct />} />
            <Route path=":id" element={<Details />} />
          </Route>
          <Route path="/customers">
            <Route path="/customers" element={<Customers />} />
            <Route path=":id" element={<CustomerEdit />} />
          </Route>
          <Route path="/orders">
            <Route path="/orders" element={<OrderList />} />
            <Route path=":id" element={<OrderDetails />} />
          </Route>
          {/* เพิ่มเส้นทางอื่นๆ ที่ Admin เข้าถึงได้ */}
        </Routes>
      </div>
    </AdminLayout>
  );
}

export default AdminRoutes;
