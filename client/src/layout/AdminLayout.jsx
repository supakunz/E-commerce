/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import NavAdmin from "../admin/navbar/Navbar";

function AdminLayout({ children }) {
  return (
    <div>
      <NavAdmin />
      <main>
        {children}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
