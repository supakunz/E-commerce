/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useContext, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../assets/cart_cross_icon.png";
import "./cartitem.css";
import { Link } from "react-router-dom";

const CartItem = () => {
  const {
    all_product,
    cartTotal,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(ShopContext);

  useEffect(() => {
    getTotalCartAmount();
  }, [removeFromCart]);

  // console.log(cartItems);

  return (
    <div className="cartitems m-[100px_170px]">
      <div className="cartitems-format-main grid items-center gap-[75px] py-[20px] text-[#454545] text-[16px] font-semibold grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr]">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className="h-[3px] bg-[#e2e2e2] border-0" />
      {all_product.map((e) => {
        if (cartItems[e.id].total > 0) {
          // เช็ค AllproductID ว่า value ตัวไหนมีค่ามากกว่า 1
          return (
            <div>
              <div className="cartitems-format grid items-center gap-[75px] py-[20px] text-[#454545] text-[15px] font-medium grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr]">
                <img
                  className="carticon-product-icon object-cover"
                  src={e.image}
                  alt=""
                />
                <p>{e.name}</p>
                <p>{e.new_price}</p>
                <div>
                  <button className="cartitems-quantity w-[64px] h-[50px] border-solid border-[2px] border-[#ebebeb] bg-[#FFF]">
                    {cartItems[e.id].total}
                  </button>
                </div>
                <p>${(e.new_price * cartItems[e.id].total).toFixed(2)}</p>
                <div>
                  <img
                    className="cartitems-remove-icon w-[15px] mx-[25px] cursor-pointer"
                    src={remove_icon}
                    onClick={() => {
                      removeFromCart(e.id);
                    }}
                    alt=""
                  />
                </div>
              </div>
              <hr className="h-[3px] bg-[#e2e2e2] border-0" />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down flex my-[70px]">
        <div className="cartitems-total flex-1 flex flex-col mr-[200px] gap-[20px]">
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
            <button className="w-[262px] h-[58px] outline-none border-none bg-black text-[#fff] text-[14px] font-medium cursor-pointer hover:text-[#adadad]">
              PROCEED TO CHECKOUT
            </button>
          </Link>
        </div>
        <div className="cartitems-promocode flex-1 text-[15px] font-medium">
          <p className="text-[#555]">If you a promo code, Enter it here</p>
          <div className="cartitems-promobox flex items-center w-[504px] mt-[15px] pl-[20px] h-[58px] bg-[#eaeaea]">
            <input
              className="border-none outline-none bg-transparent text-[14px] w-[330px] h-[50px]"
              type="text"
              placeholder="promo code"
            />
            <button className="w-[170px] h-[58px] text-[14px] bg-black text-white cursor-pointer hover:text-[#adadad]">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
