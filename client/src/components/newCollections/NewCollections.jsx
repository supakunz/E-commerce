/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Item from "../item/Item";
import "./newcollection.css";
import new_collections_backup from "../assets/new_collections";

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);
  const URL = import.meta.env.VITE_APP_API;

  useEffect(() => {
    fetch(`${URL}/newcollections`) // fetch data from admin
      .then((req) => req.json())
      .then((data) => setNew_collection(data));
  }, []);

  return (
    <div className="new-collections  flex flex-col items-center gap-[20px] lg:mb-[90px] md:mb-[70px] sm:mb-[50px] mb-[45px]">
      <h1 className="text-[#171717] text-[48px] font-semibold">
        NEW COLLECTIONS
      </h1>
      <hr className="w-[200px] h-[6px] rounded-[10px] bg-[#252525]" />
      <div className="collections grid grid-cols-4 mt-[50px] gap-[30px]">
        {new_collections_backup.map((item, i) => {
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

export default NewCollections;
