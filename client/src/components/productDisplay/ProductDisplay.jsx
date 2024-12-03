/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import star_icon from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";
import { ShopContext } from "../../context/ShopContext";
import "./productdisplay.css";

const ProductDisplay = (props) => {
  const { addToCart } = useContext(ShopContext); // เรียกใช้ function ใน Stones
  const { product } = props;

  const size_toggle = (e) => {
    e.target.classList.toggle("select");
  };

  return (
    <div className="productdisplay flex m-[0px_150px]">
      <div className="productdisplay-left flex gap-[17px]">
        <div className="productdisplay-img-list flex flex-col gap-[16px]">
          <img
            className="h-[113px] object-cove"
            src={product.image}
            alt="product_mini"
          />
          <img
            className="h-[113px] object-cove"
            src={product.image}
            alt="product_mini"
          />
          <img
            className="h-[113px] object-cove"
            src={product.image}
            alt="product_mini"
          />
          <img
            className="h-[113px] object-cove"
            src={product.image}
            alt="product_mini"
          />
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img w-[420px] h-[500px] object-cover"
            src={product.image}
            alt="product"
          />
        </div>
      </div>
      <div className="productdisplay-right flex flex-col flex-1 m-[0px_70px]">
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
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new text-[#ff4141]">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit amet consectetur, Quas vitae veniore atque
          expedita veniam laborum voluptas asperiores!
        </div>
        <div className="productdisplay-right-sizes">
          <h1 className="mt-[40px] text-[#656565] text-[20px] font-medium">
            Select Size
          </h1>
          <div className="productdisplay-right-size flex my-[25px] gap-[20px]">
            <div
              onClick={size_toggle}
              className="cursor-pointer p-[18px_24px] bg-[#fbfbfb] rounded-[3px] border-solid border-[#ebebeb] border-[1px]"
            >
              S
            </div>
            <div
              onClick={size_toggle}
              className="cursor-pointer p-[18px_24px] bg-[#fbfbfb] rounded-[3px] border-solid border-[#ebebeb] border-[1px]"
            >
              M
            </div>
            <div
              onClick={size_toggle}
              className="cursor-pointer p-[18px_24px] bg-[#fbfbfb] rounded-[3px] border-solid border-[#ebebeb] border-[1px]"
            >
              L
            </div>
            <div
              onClick={size_toggle}
              className="cursor-pointer p-[18px_24px] bg-[#fbfbfb] rounded-[3px] border-solid border-[#ebebeb] border-[1px]"
            >
              XL
            </div>
            <div
              onClick={size_toggle}
              className="cursor-pointer p-[18px_24px] bg-[#fbfbfb] rounded-[3px] border-solid border-[#ebebeb] border-[1px]"
            >
              XXl
            </div>
          </div>
          <button
            onClick={() => addToCart(product.id)}
            className="p-[18px_38px] hover:text-[#adadad] w-[175px] text-[14px] font-medium text-white bg-black mb-[33px] border-none outline-none cursor-pointer"
          >
            ADD TO CART
          </button>
          <p className="productdisplay-right-category">
            <span className="font-semibold">Category :</span>Women , T-Shirt,
            Crop Top
          </p>
          <p className="productdisplay-right-category">
            <span className="font-semibold">Tags :</span>Modern, Latest
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
