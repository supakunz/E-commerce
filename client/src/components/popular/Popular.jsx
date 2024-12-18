/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import data_product_backup from "../assets/data";
import Item from "../item/Item";
import "./popular.css";

const Popular = () => {
  const [data_product, setData_product] = useState([]);
  const URL = import.meta.env.VITE_APP_API;

  useEffect(() => {
    fetch(`${URL}/popularinwomen`) // fetch data from admin
      .then((req) => req.json())
      .then((data) => {
        setData_product(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="popular flex flex-col items-center gap-[10px] lg:mb-[90px] md:mb-[70px] sm:mb-[50px] mb-[45px] container mx-auto">
      <h1 className="text-[#171717] text-[48px] font-semibold">
        POPULAR IN WOMEN
      </h1>
      <hr className="w-[200px] h-[6px] rounded-[10px] bg-[#252525]" />
      <div className="popular-item mt-[50px] grid grid-cols-4 gap-[30px]">
        {data_product_backup.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
