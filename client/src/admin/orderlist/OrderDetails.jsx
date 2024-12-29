/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { goldhelper } from "../../helpers/goldhelper";
import { timehelper } from "../../helpers/timehelper";
import { ShopContext } from "../../context/ShopContext";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setorderDetails] = useState([]);
  const { getAllOrders } = useContext(ShopContext); // เรียกใช้ data ใน

  const getOrderID = async () => {
    await axios(`${import.meta.env.VITE_APP_API}/api/payment/${id}`)
      .then((res) => {
        setorderDetails(res.data);
      })
      .catch((err) => console.log(err));
  };

  const removeOrderID = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Loading...",
          html: "Please wait...",
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading(null);
          },
        });
        await axios
          .delete(`${import.meta.env.VITE_APP_API}/api/payment/${id}`)
          .then((res) => {
            console.log(res.data);
            Swal.close();
            Swal.fire({
              title: "Deleted!",
              text: "Your order has been deleted.",
              icon: "success",
            });
            getAllOrders();
            navigate(-1);
          })
          .catch((err) => {
            console.log(err);
            Swal.close();
            Swal.fire({
              title: "Delete Failed!",
              text: "Please you try again later!",
              icon: "error",
            });
          });
      }
    });
  };

  useEffect(() => {
    getOrderID();
  }, []);

  console.log(orderDetails);

  return (
    <>
      {orderDetails.address && orderDetails.address[0] ? (
        <div className="add-product box-border w-full max-w-[800px] h-full m-[20px_30px] flex flex-col gap-5 ">
          <div className="bg-white rounded-[4px] overflow-hidden">
            <h1 className="text-[1rem] bg-[#ececec] p-[5px_8px] relative">
              Order Details
              <span
                onClick={removeOrderID}
                className="absolute right-5 cursor-pointer"
              >
                Remove
              </span>
            </h1>
            <div className="addproduct-price flex flex-col gap-[10px] p-[8px_8px] text-[15px]">
              <div className="product-itemfield w-full text-[#7b7b7b]">
                <p>Order ID : {orderDetails.order_id}</p>
              </div>
              <div className="addproduct-itemfield w-full text-[#7b7b7b]">
                <p>Oder Status : {orderDetails.status}</p>
              </div>
              <div className="addproduct-itemfield w-full text-[#7b7b7b]">
                <p>Oder Date : {timehelper(orderDetails.date)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[4px] overflow-hidden">
            <h1 className="text-[1rem] bg-[#ececec] p-[5px_8px]">
              Address Information
            </h1>
            <div className="addproduct-price flex flex-col gap-[10px] p-[8px_8px] text-[15px]">
              <div className="product-itemfield w-full grid grid-cols-2 text-[#7b7b7b]">
                <p>FirstName : {orderDetails.address[0].firstname}</p>
                <p>LastName : {orderDetails.address[0].lastname}</p>
              </div>
              <div className="addproduct-itemfield w-full text-[#7b7b7b]">
                <p>Address : {orderDetails.address[0].address}</p>
              </div>
              <div className="product-itemfield w-full grid grid-cols-2 text-[#7b7b7b]">
                <p>City : {orderDetails.address[0].city}</p>
                <p>Country : {orderDetails.address[0].country}</p>
              </div>
              <div className="product-itemfield w-full grid grid-cols-2 text-[#7b7b7b]">
                <p>Zip : {orderDetails.address[0].zip}</p>
                <p>Phone : {orderDetails.address[0].phone}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[4px] overflow-hidden">
            <h1 className="text-[1rem] bg-[#ececec] p-[5px_8px]">Products</h1>
            <div className="addproduct-price flex flex-col gap-[10px] p-[8px_8px] text-[15px]">
              <div className="list-product flex flex-col items-center w-full h-full rounded-[6px] bg-white">
                <div className="listproduct-format-main grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] text-[15px] mb-2 font-medium gap-[10px] w-full text-[#454545]">
                  <p>Produsts</p>
                  <p>Title</p>
                  <p>Size</p>
                  <p>Qty</p>
                  <p>Each</p>
                  <p>Total</p>
                </div>
                <div className="listproduct-allproducts w-full overflow-y-auto max-h-[64vh]">
                  <hr />
                  {orderDetails.products.map((product, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="listproduct-format-main listproduct-format grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] text-[15px] font-medium gap-[10px] w-full py-[10px] text-[#7b7b7b] items-center"
                        >
                          <img
                            src={product.image}
                            alt=""
                            className="listproduct-product-icon h-[80px] m-auto"
                          />
                          <p>{product.name}</p>
                          <p>{product.size}</p>
                          <p>{product.total}</p>
                          <p>${product.new_price.toFixed(2)}</p>
                          <p>
                            ${(product.new_price * product.total).toFixed(2)}
                          </p>
                        </div>
                        <hr />
                      </>
                    );
                  })}
                  <hr />
                  <div className="flex flex-col gap-3 py-3">
                    <div className="listproduct-format-main listproduct-format grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] text-[15px] font-medium gap-[10px] w-full items-center">
                      <p className="col-span-5 justify-self-end">Discount :</p>
                      <p className="col-start-6">$0.00</p>
                    </div>
                    <div className="listproduct-format-main listproduct-format grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] text-[15px] font-medium gap-[10px] w-full items-center">
                      <p className="col-span-5 justify-self-end">
                        Order Total :
                      </p>
                      <p className="text-red-500 col-start-6">
                        ${goldhelper(orderDetails.amount_total / 35)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default OrderDetails;
