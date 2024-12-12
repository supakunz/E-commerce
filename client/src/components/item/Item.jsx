/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./item.css";

const Item = (props) => {
  return (
    <div className="item w-full">
      <div className="item-warp overflow-hidden w-fit relative">
        <img
          className="w-[280px] h-[290px] hover:scale-[1.05] transition duration-[0.6s] object-cover"
          onClick={window.scrollTo(0, 0)}
          src={props.image}
          alt=""
        />
        <Link to={`/product/${props.id}`}>
          <button className="cursor-pointer absolute left-[-1%] right-[1%] transition duration-[0.3s] ease-in-out shopcategory-loadmore flex items-center justify-center mx-auto w-[130px] h-[40px] rounded-[75px] bg-[#e6e6e6] text-[#111111] text-[15px] font-normal hover:bg-black hover:text-white">
            Quick View
          </button>
        </Link>
      </div>
      <p className="my-[6px] text-[#858585]">{props.name}</p>
      <div className="item-prices flex gap-[20px]">
        <div className="item-price-new text-[#666666] text-[16px] font-semibold">
          ${props.new_price}
        </div>
        <div className="item-price-old text-[#666666] text-[16px] font-medium line-through">
          ${props.old_price}
        </div>
      </div>
    </div>
  );
};

export default Item;
