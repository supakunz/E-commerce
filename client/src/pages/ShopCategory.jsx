/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/item/Item";
import "./css/shopcategory.css";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// * Create Filter Animation
import { AnimatePresence, motion } from "framer-motion";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext); // เรียกใช้ data ใน
  const [sortby, setSortby] = useState("All");
  const [showing, setShowing] = useState(0);
  const [explore, setExplore] = useState(8);
  const [totalProduct, setTotalProduct] = useState(all_product.length);

  useEffect(() => {
    const total = all_product.filter(
      (item) => props.category === item.category
    );
    const arry = total.slice(0, explore);
    setShowing(arry.length);
  }, [props, explore]);

  return (
    <div className="shop-category container mx-auto px-4">
      {/* ------------------- Banner ------------------- */}
      <img
        className="shopcategory-banner block my-[30px] w-full"
        src={props.banner}
        alt="branner"
      />

      {/* ------------------- Filter ------------------- */}
      <div className="flex justify-between items-center mb-[30px]">
        <p>
          <span className="font-medium">Showing 1-{showing}</span> out of{" "}
          {totalProduct} products
        </p>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="shopcategory-sort inline-flex w-full justify-center gap-x-1.5 rounded-[40px] bg-white px-[20px] py-[10px] text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-[#888] hover:bg-gray-50">
              Sort by
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  onClick={() => setSortby("All")}
                >
                  All
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  onClick={() => setSortby("Low")}
                >
                  Price-low to high
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  onClick={() => setSortby("High")}
                >
                  Price-high to low
                </a>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>

      {/* ------------------- Products List ------------------- */}
      <motion.div className="grid product-grid">
        <AnimatePresence>
          {all_product
            .sort((a, b) =>
              sortby === "High"
                ? b.new_price - a.new_price
                : null || sortby === "Low"
                ? a.new_price - b.new_price
                : null || sortby === "All"
                ? a.id - b.id
                : null
            )
            .filter((item) => props.category === item.category)
            .map((item, i) => {
              if (i < showing) {
                return (
                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0 }}
                    exit={{ opacity: 0, scale: 0 }}
                    layout
                    key={item.id}
                  >
                    <Item product={item} />
                  </motion.div>
                );
              } else {
                null;
              }
            })}
        </AnimatePresence>
      </motion.div>

      {/* ------------------- Loading Button  ------------------- */}
      <div
        onClick={() => setExplore(explore + 4)}
        className="cursor-pointer transition duration-[0.3s] ease-in-out shopcategory-loadmore flex items-center justify-center  my-[100px] mx-auto w-[190px] h-[48px] rounded-[75px] bg-[#e6e6e6] text-[#111111] text-[15px] font-bold hover:bg-black hover:text-white"
      >
        LOAD MORE
      </div>
    </div>
  );
};

export default ShopCategory;
