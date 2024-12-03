/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import ScrollTop from "../components/scrolltop/ScrollTop";
import Footer from "../components/footer/Footer";

function UserLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>
        {children}
        <Outlet />
      </main>
      <ScrollTop />
      <Footer />
    </div>
  );
}

export default UserLayout;
