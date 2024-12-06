/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./listproduct.css";
import { Link } from "react-router-dom";

const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);

  const URL = import.meta.env.VITE_APP_API;

  const fectInfo = async () => {
    await fetch(`${URL}/api/products`)
      .then((resq) => resq.json())
      .then((data) => {
        setAllproducts(data);
        console.log(allproducts);
        console.log(data);
      });
  };

  useEffect(() => {
    fectInfo();
  }, []);

  return (
    <>
      <div className="list-product flex flex-col items-center w-full h-full p-[10px_50px] m-[30px] rounded-[6px] bg-white">
        <h1 className="p-4">All Products List</h1>
        <div className="listproduct-format-main grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] text-[15px] font-medium gap-[10px] w-full py-[20px] text-[#454545]">
          <p>Produsts</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts w-full overflow-y-auto max-h-[64vh]">
          <hr />
          {allproducts.map((product, index) => {
            return (
              <>
                <div
                  key={index}
                  className="listproduct-format-main listproduct-format grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] text-[15px] font-medium gap-[10px] w-full py-[20px] text-[#454545] items-center"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="listproduct-product-icon h-[80px] m-auto"
                  />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <Link to={`${product.id}`}>
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

export default ListProduct;