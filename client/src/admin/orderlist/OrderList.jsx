/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import "./orderlist.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { goldhelper } from "../../helpers/goldhelper";
import { timehelper } from "../../helpers/timehelper";

const OrderList = () => {
  const { allorders } = useContext(ShopContext); // เรียกใช้ data ใน
  return (
    <>
      <div className="list-product flex flex-col items-center w-full h-full p-[10px_50px] m-[30px] rounded-[6px] bg-white">
        <h1 className="p-4">All Orders List</h1>
        <div className="listproduct-format-main grid grid-cols-[30%_30%_10%_10%_10%] text-[15px] font-medium gap-[10px] w-full py-[20px] text-[#454545]">
          <p>OrderID</p>
          <p>Purchased On</p>
          <p>Subtotal</p>
          <p>Status</p>
          <p>Action</p>
        </div>
        <div className="listproduct-allproducts w-full overflow-y-auto max-h-[64vh]">
          <hr />
          {allorders.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  className="listproduct-format-main listproduct-format grid grid-cols-[30%_30%_10%_10%_10%] text-[15px] font-medium gap-[10px] w-full py-[20px] text-[#454545] items-center"
                >
                  <p>{item.order_id}</p>
                  <p>{timehelper(item.date)}</p>
                  <p>${(goldhelper(item.amount_total) / 35).toFixed(2)}</p>
                  <p
                    className={`${
                      item.status == "complete"
                        ? "bg-[#9DC527]"
                        : "bg-[#FF9100]"
                    } py-1 mx-2 rounded-md text-white`}
                  >
                    {item.status == "complete" ? "complete" : "pending"}
                  </p>
                  <Link to={`${item.order_id}`}>
                    <p className="cursor-pointer">details</p>
                  </Link>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OrderList;
