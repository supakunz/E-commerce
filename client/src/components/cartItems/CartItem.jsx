/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useContext, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Link } from "react-router-dom";
import "./cartitem.css";

const CartItem = () => {
  const {
    all_product,
    cartTotal,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    addToCart,
    changSize,
  } = useContext(ShopContext);

  useEffect(() => {
    getTotalCartAmount();
  }, [removeFromCart]);

  return (
    <div className="cartitems container mx-auto my-[100px] px-4">
      {/* ------------------- Cart List ------------------- */}
      <div className="overflow-x-scroll overflow-y-auto lg:overflow-x-hidden max-h-[33rem]">
        <div className="cartitems-format-main min-w-[50rem] grid items-center gap-[75px] py-[20px] text-[#454545] text-[16px] font-semibold grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Size</p>
          <p>Total</p>
        </div>
        <hr className="h-[3px] bg-[#e2e2e2] border-0 min-w-[50rem]" />
        {all_product.map((e) => {
          if (cartItems[e.id].total > 0) {
            // เช็ค AllproductID ว่า value ตัวไหนมีค่ามากกว่า 1
            return (
              <div className="min-w-[50rem]">
                <div className="cartitems-format grid items-center gap-[75px] py-[20px] text-[#454545] text-[15px] font-medium grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]">
                  <div>
                    <img
                      className="rounded-[0.3rem] carticon-product-icon object-cover w-full h-full max-w-[60px] object-top"
                      src={e.image}
                      alt=""
                    />
                  </div>
                  <p>{e.name}</p>
                  <p>${e.new_price.toFixed(2)}</p>
                  <div className="flex justify-center items-center gap-2">
                    <span
                      className="rounded-[0.3rem] cursor-pointer text-[25px] h-[25px] w-[25px] flex items-center justify-center border-solid border-[2px] border-[#ebebeb]"
                      onClick={() => addToCart(e.id, cartItems[e.id].size)}
                    >
                      +
                    </span>
                    <button className="rounded-[0.3rem] cartitems-quantity w-[58px] h-[44px] border-solid border-[2px] border-[#ebebeb] bg-[#FFF]">
                      {cartItems[e.id].total}
                    </button>
                    <span
                      onClick={() => removeFromCart(e.id)}
                      className="rounded-[0.3rem] cursor-pointer text-[25px] h-[26px] w-[25px] flex items-center justify-center border-solid border-[2px] border-[#ebebeb]"
                    >
                      -
                    </span>
                  </div>
                  <div>
                    <select
                      className={`shadow z-10 rounded-[0.3rem] bg-white py-2 text-gray-600 focus:outline-none w-[50px] ${
                        cartItems[e.id].size == "none"
                          ? "pointer-events-none"
                          : ""
                      }`}
                      name="size"
                      value={cartItems[e.id].size}
                      onChange={(event) => changSize(e.id, event.target.value)}
                    >
                      <option
                        value={"S"}
                        className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                      >
                        S
                      </option>
                      <option
                        value={"M"}
                        className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                      >
                        M
                      </option>
                      <option
                        value={"L"}
                        className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                      >
                        L
                      </option>
                      <option
                        value={"XL"}
                        className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                      >
                        XL
                      </option>
                      <option
                        value={"XXL"}
                        className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                      >
                        XXL
                      </option>
                      {cartItems[e.id].size == "none" && (
                        <option
                          value={"none"}
                          className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                        >
                          -
                        </option>
                      )}
                    </select>
                  </div>
                  <p>${(e.new_price * cartItems[e.id].total).toFixed(2)}</p>
                </div>
                <hr className="h-[3px] bg-[#e2e2e2] border-0" />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* ------------------- Ckeckout Section ------------------- */}
      <div className="cartitems-down flex my-[70px] gap-[5rem]">
        <div className="cartitems-total flex-1 flex flex-col max-w-[35rem] gap-[20px]">
          <h1 className="text-[24px] font-semibold">Order Summary</h1>
          <div>
            <div className="cartitems-total-item flex justify-between py-[15px]">
              <p>Subtatal</p>
              <p>${cartTotal}</p>
            </div>
            <hr />
            <div className="cartitems-total-item flex justify-between py-[15px]">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item flex justify-between py-[15px]">
              <h3 className="text-[19px] font-semibold">Total</h3>
              <h3 className="text-[19px] font-semibold">${cartTotal}</h3>
            </div>
          </div>
          <Link to={"/checkout"}>
            <button
              onClick={() => window.scrollTo(0, 0)}
              className="w-[262px] rounded-lg h-[58px] outline-none border-none bg-black text-[#fff] text-[14px] font-medium cursor-pointer hover:text-[#adadad]"
            >
              PROCEED TO CHECKOUT
            </button>
          </Link>
        </div>
        <div className="cartitems-promocode flex-1 text-[15px] font-medium">
          <p className="text-[#555]">If you a promo code, Enter it here</p>
          <div className="rounded-lg overflow-hidden cartitems-promobox flex items-center max-w-[504px] mt-[15px] pl-[20px] h-[58px] bg-[#eaeaea]">
            <input
              className="border-none outline-none bg-transparent text-[14px] w-[330px] h-[50px]"
              type="text"
              placeholder="promo code"
            />
            <button className="w-[170px] h-[58px] rounded-lg text-[14px] bg-black text-white cursor-pointer hover:text-[#adadad]">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
