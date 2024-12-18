import { Link, useNavigate } from "react-router-dom";
import navlogo from "../../components/assets/admin/newnav-logo.svg";
import { useAuth } from "../../context/AuthProvider";
import "./navbar.css";
import ButtonStyle from "../../components/button/ButtonStyle";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar flex items-center justify-between mb-[1px] bg-white p-[15px_60px] shadow-[0px_1px_3px_-2px_#000]">
        <Link to={"/"}>
          <img className="nav-logo w-[200px]" src={navlogo} alt="" />
        </Link>
        <div
          onClick={() => {
            localStorage.removeItem("auth-token");
            logout();
            navigate("/"); // กลับไปหน้า home
          }}
        >
          <ButtonStyle type={"Logout"} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
