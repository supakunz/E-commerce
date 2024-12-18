/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Item = ({ product }) => {
  return (
    <div className="relative border-solid border-[1px] border-[#e0e0e0] p-[10px] rounded-md leading-6">
      {product.status && (
        <span
          className={product.status == "SALE" ? "product-tag" : "product-tag2"}
        >
          {product.status}
        </span>
      )}
      <div className="item-warp relative overflow-hidden mb-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[330px] lg:h-[300px] object-top object-cover hover:scale-[1.05] transition duration-[0.6s]"
        />
        <Link to={`/product/${product.id}`}>
          <button
            onClick={() => window.scrollTo(0, 0)}
            className="cursor-pointer absolute left-[-1%] right-[1%] transition duration-[0.3s] ease-in-out shopcategory-loadmore flex items-center justify-center mx-auto w-[130px] h-[40px] rounded-[75px] bg-[#e6e6e6] text-[#111111] text-[15px] font-normal hover:bg-black hover:text-white"
          >
            Quick View
          </button>
        </Link>
      </div>
      <h3 className="product-title">{product.name}</h3>
      <div className="product-rating">
        {product.rating
          ? "★".repeat(product.rating) + "☆".repeat(5 - product.rating)
          : "☆☆☆☆☆"}
      </div>
      <div className="flex gap-4">
        <p className="product-price">${Number(product.new_price).toFixed(2)}</p>
        {product.old_price && (
          <p className="product-price line-through text-gray-400">
            ${Number(product.old_price).toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Item;
