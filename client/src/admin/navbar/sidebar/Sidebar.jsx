import { Link } from "react-router-dom";
import add_product_icon from "../../../components/assets/admin/Product_Cart.svg";
import list_product_icon from "../../../components/assets/admin/Product_list_icon.svg";
import customer_icon from "../../../components/assets/admin/customers.svg";
import orderlist_icon from "../../../components/assets/admin/order_list.svg";
import dashboard_icon from "../../../components/assets/admin/dashboard.svg";

import "./sidebar.css";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar flex flex-col bg-white py-[30px] gap-[20px] w-full max-w-[250px]">
        <Link to={"/admin"} className="">
          <div className="sidebar-item flex items-center justify-center gap-[20px] cursor-pointer mx-[20px] p-[5px_10px] rounded-[6px] bg-[#f6f6f6]">
            <img width={28} src={dashboard_icon} alt="" />
            <p>Dashboards</p>
          </div>
        </Link>
        <Link to={"addproduct"} className="">
          <div className="sidebar-item flex items-center justify-center gap-[20px] cursor-pointer mx-[20px] p-[5px_10px] rounded-[6px] bg-[#f6f6f6]">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
          </div>
        </Link>
        <Link to={"listproduct"} className="">
          <div className="sidebar-item flex items-center justify-center gap-[20px] cursor-pointer mx-[20px] p-[5px_10px] rounded-[6px] bg-[#f6f6f6]">
            <img src={list_product_icon} alt="" />
            <p>Product List</p>
          </div>
        </Link>
        <Link to={"customers"} className="">
          <div className="sidebar-item flex items-center justify-center gap-[20px] cursor-pointer mx-[20px] p-[5px_10px] rounded-[6px] bg-[#f6f6f6]">
            <img src={customer_icon} alt="" width={35} />
            <p>Customers</p>
          </div>
        </Link>
        <Link to={"orders"} className="">
          <div className="sidebar-item flex items-center justify-center gap-[20px] cursor-pointer mx-[20px] p-[5px_10px] rounded-[6px] bg-[#f6f6f6]">
            <img src={orderlist_icon} alt="" width={35} />
            <p>Orders List</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
