/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect } from "react";

/* eslint-disable react/prop-types */
const Filter = ({ popular, setFiltered, activeGenre, setActiveGenre }) => {
  // ** เมื่อ State ของ activeGenre มีการเปลี่ยนแปลง ให้ useEffect ทำงาน
  useEffect(() => {
    if (activeGenre === "all") {
      // active === 0
      return setFiltered(popular); // set Data หนังทั้งหมดลงใน filtered
    }
    // active != 0
    const filtered = popular.filter(
      (movie) => movie.tag.includes(activeGenre) // * filter genre_ids #[35, 1] ที่มีค่า เหมือน 35 or 28 ใน array โดยใช้ includes ที่ retrun เป็น boolean
    );
    return setFiltered(filtered); // set Data ที่ผ่านก่ร filter ลงใน filtered
  }, [activeGenre]);
  return (
    <div className="flex justify-center gap-x-[5rem] gap-y-1 text-[#B7B7B7] flex-wrap">
      <button
        className={`${activeGenre === "all" ? "active" : ""} section-title`}
        onClick={() => setActiveGenre("all")}
      >
        All
      </button>
      <button
        className={`${activeGenre === "best" ? "active" : ""} section-title`}
        onClick={() => setActiveGenre("best")}
      >
        Best Sellers
      </button>
      <button
        className={`${activeGenre === "new" ? "active" : ""} section-title`}
        onClick={() => setActiveGenre("new")}
      >
        New Arrivals
      </button>
      <button
        className={`${activeGenre === "hot" ? "active" : ""} section-title`}
        onClick={() => setActiveGenre("hot")}
      >
        Hot Sales
      </button>
    </div>
  );
};

export default Filter;
