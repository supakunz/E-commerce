import Sidebar from "./navbar/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./addProduct/AddProduct";
import ListProduct from "./listProduct/ListProduct";
import "./admin.css";

const Admin = () => {
  return (
    <>
      <div className="admin flex">
        <Sidebar />
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
        </Routes>
      </div>
    </>
  );
};

export default Admin;
