/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import star_icon from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";
import { ShopContext } from "../../context/ShopContext";
import "./productdisplay.css";

const ProductDisplay = (props) => {
  const [sizeProduct, setSizeProduct] = useState("S");
  const { addToCart } = useContext(ShopContext); // เรียกใช้ function ใน Stones
  const { product } = props;

  const size_toggle = (e) => {
    setSizeProduct(e.target.value);
  };

  useEffect(() => {
    if (product.category === "other") {
      setSizeProduct("none");
    }
  }, []);

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-[3rem] xl:gap-0">
      {/* ----------------- Image Content ----------------- */}
      <div className="flex gap-[17px] justify-center md:justify-end lg:justify-center flex-row-reverse md:flex-col-reverse lg:flex-row">
        <div className="productdisplay-img-list flex flex-col md:flex-row lg:flex-col gap-[16px]">
          <img
            className="h-[113px] object-cover"
            src={product.image}
            alt="product_mini"
          />
          <img
            className="h-[113px] object-cover"
            src={product.image}
            alt="product_mini"
          />
          <img
            className="h-[113px] object-cover"
            src={product.image}
            alt="product_mini"
          />
          <img
            className="h-[113px] object-cover"
            src={product.image}
            alt="product_mini"
          />
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img w-[420px] h-full object-cover"
            src={product.image}
            alt="product"
          />
        </div>
      </div>

      {/* ----------------- Description Content ----------------- */}
      <div className="flex flex-col">
        <h1 className="text-[30px] text-[#3d3d3d] font-semibold">
          {product.name}
        </h1>
        <div className="productdisplay-right-stars flex items-center mt-[10px] gap-[5px] text-[#1c1c1c] text-[14px]">
          <img className="inline" src={star_icon} alt="star" />
          <img className="inline" src={star_icon} alt="star" />
          <img className="inline" src={star_icon} alt="star" />
          <img className="inline" src={star_icon} alt="star" />
          <img className="inline" src={star_dull_icon} alt="star" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices flex my-[35px] gap-[30px] text-[22px] font-semibold">
          <div className="productdisplay-right-price-old text-[#818181] line-through">
            ${product.old_price.toFixed(2)}
          </div>
          <div className="productdisplay-right-price-new text-[#ff4141]">
            ${product.new_price.toFixed(2)}
          </div>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur, Quas vitae veniore atque
          expedita veniam laborum voluptas asperiores!
        </div>
        <div className="productdisplay-right-sizes">
          {product.category !== "other" && (
            <div>
              <h1 className="mt-[40px] text-[#656565] text-[20px] font-medium">
                Select Size
              </h1>
              <div className="flex mt-[40px] gap-[20px] gap-y-[3.4rem] flex-wrap">
                {["S", "M", "L", "XL", "XXL"].map((size, index) => (
                  <div key={index}>
                    <input
                      checked={size === sizeProduct} // กำหนด checked เมื่อ size เท่ากับ "S"
                      onChange={size_toggle}
                      type="radio"
                      name="size-radio"
                      id={`${size}-radio`}
                      value={`${size}`}
                      className="hidden"
                    />
                    <label
                      htmlFor={`${size}-radio`}
                      className="cursor-pointer p-[18px_24px] bg-[#fbfbfb] rounded-lg border-solid border-[#ebebeb] border-[1px]"
                    >
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={() => addToCart(product.id, sizeProduct)}
            className="p-[18px_38px] rounded-lg hover:text-[#adadad] w-[175px] text-[14px] font-medium text-white bg-black mb-[33px] border-none outline-none cursor-pointer mt-[40px]"
          >
            ADD TO CART
          </button>
          <p>
            <span className="font-semibold">Category :</span>{" "}
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </p>
          <p>
            <span className="font-semibold">Tags :</span>Modern, Latest
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
