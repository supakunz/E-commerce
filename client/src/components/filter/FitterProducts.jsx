/* eslint-disable no-unused-vars */
import { useState } from "react";
import Filter from "./Filter";
import "./style.css";

// * Create Filter Animation
import { AnimatePresence, motion } from "framer-motion";
import Item from "../item/Item";

const products = [
  {
    id: 11,
    name: "Crop V-Neck Top",
    new_price: "20.50",
    old_price: "21.45",
    image: "/products/product_11.png",
    tag: ["new", "hot"],
    status: "NEW",
    rating: 3,
  },
  {
    id: 10,
    name: "Pink T-Shirt with Zara",
    new_price: "26.85",
    old_price: "27.55",
    image: "/products/product_10.png",
    tag: ["best", "hot"],
    rating: 3,
  },
  {
    id: 2,
    name: "DressBerry Hooded",
    new_price: "18.49",
    old_price: "21.56",
    image: "/products/product_2.png",
    tag: ["best", "new"],
    status: "SALE",
    rating: 3,
  },
  {
    id: 5,
    name: "Clovia Black Crop Top",
    new_price: "23.45",
    old_price: "25.58",
    image: "/products/product_5.png",
    tag: ["new", "hot"],
    rating: 4,
  },
  {
    id: 23,
    name: "Bomber Jacket",
    new_price: "32.00",
    old_price: "32.99",
    image: "/products/product_23.png",
    tag: ["best", "hot"],
    rating: 3,
  },
  {
    id: 21,
    name: "Waterproof Rain Jacket",
    new_price: "30.15",
    old_price: "30.99",
    image: "/products/product_21.png",
    tag: ["best", "new"],
    status: "SALE",
    rating: 4,
  },
  {
    id: 28,
    name: "Sweatshirt",
    new_price: "29.33",
    old_price: "29.99",
    image: "/products/product_28.png",
    tag: ["hot", "best"],
    rating: 3.5,
  },
  {
    id: 9,
    name: "Harriet V-Neck Top",
    new_price: "26.59",
    old_price: "27.55",
    image: "/products/product_9.png",
    tag: ["new", "hot"],
    rating: 4,
  },
];

const FilterProducts = () => {
  const [popular, setPopular] = useState(products); // Data ของหนังทั้งหมด
  const [filtered, setFiltered] = useState([]); // Data ของหนังที่ filter แล้ว
  const [activeGenre, setActiveGenre] = useState("all"); // Action เพื่อเลือกประเภทของหนัง
  return (
    <>
      {/* Main */}
      <div className="best-sellers-section container mx-auto flex flex-col gap-6">
        <Filter
          popular={popular}
          setFiltered={setFiltered}
          activeGenre={activeGenre}
          setActiveGenre={setActiveGenre}
        />
        <motion.div layout className="grid product-grid">
          <AnimatePresence>
            {filtered.map((product) => (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                layout
                key={product.id}
              >
                <Item product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default FilterProducts;
