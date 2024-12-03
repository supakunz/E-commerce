import { useNavigate } from "react-router-dom";
import navlogo from "../../components/assets/admin/nav-logo.svg";
import { useAuth } from "../../context/AuthProvider";
import "./navbar.css";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar flex items-center justify-between mb-[1px] bg-white p-[15px_60px] shadow-[0px_1px_3px_-2px_#000]">
        <img className="nav-logo w-[200px]" src={navlogo} alt="" />
        <button
          onClick={() => {
            localStorage.removeItem("auth-token");
            logout();
            navigate("/"); // กลับไปหน้า home
          }}
          className="w-[95px] bg-black h-[42px] outline-none rounded-[75px] text-[16px] text-white font-medium"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
