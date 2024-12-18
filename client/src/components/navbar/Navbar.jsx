import "./navbar.css";
import { useContext, useRef, useState } from "react";
import cart_icon from "../assets/cart_icon.png";
import nav_dropdown from "../assets/nav_dropdown.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthProvider";
import ButtonStyle from "../button/ButtonStyle";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const drop_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar flex justify-between py-[1rem] px-5 shadow-[0px_1px_0px_-2px_black] container mx-auto">
      <Link
        className="flex items-center"
        onClick={() => setMenu("shop")}
        to={"/"}
      >
        <div className="nav-logo flex items-center gap-[5px]">
          <p className="text-[#171717] text-[25px] font-black">GOZA</p>
          <p className="text-[#171717] text-[25px] font-semibold">STORE</p>
        </div>
      </Link>
      <img
        className="nav-dropdown"
        onClick={drop_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul
        ref={menuRef}
        className="nav-menu flex items-center list-none gap-[50px] text-[#111111] text-[17px] font-semibold z-10 "
      >
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link to={"/"}>Home</Link>{" "}
          {menu === "shop" ? <hr style={{ width: "100%" }} /> : <hr />}
        </li>
        <li
          onClick={() => {
            setMenu("men");
          }}
        >
          <Link to={"/mens"}>Men</Link>{" "}
          {menu === "men" ? <hr style={{ width: "100%" }} /> : <hr />}
        </li>
        <li
          onClick={() => {
            setMenu("women");
          }}
        >
          <Link to={"/womens"}>Women</Link>{" "}
          {menu === "women" ? <hr style={{ width: "100%" }} /> : <hr />}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link to={"/kids"}>Kids</Link>{" "}
          {menu === "kids" ? <hr style={{ width: "100%" }} /> : <hr />}
        </li>
      </ul>
      <div className="nav-login-cart flex items-center gap-[45px] cursor-pointer">
        {localStorage.getItem("auth-token") ? (
          <div
            onClick={() => {
              localStorage.removeItem("auth-token");
              logout();
              navigate("/");
            }}
          >
            <ButtonStyle type={"Logout"} />
          </div>
        ) : (
          <Link onClick={() => setMenu(null)} to={"/login"}>
            <ButtonStyle type={"Login"} />
          </Link>
        )}
        <Link onClick={() => setMenu(null)} to={"/cart"}>
          <img className="min-w-[28px]" src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count w-[18px] h-[18px] bg-red-500 flex justify-center items-center rounded-[11px] text-white text-[12px] mt-[-30px] ml-[-53px]">
          {getTotalCartItems()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
