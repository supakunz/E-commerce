import exclusive_image from "../assets/slide-exclusive.jpg";
import arrow_icon from "../assets/arrow.png";
import "./offers.css";

const Offers = () => {
  return (
    <div className="offers w-[79%] relative h-[60vh] flex m-auto px-[140px] lg:mb-[90px] md:mb-[70px] sm:mb-[50px] mb-[45px] overflow-hidden">
      <div className="offers-left flex flex-col justify-center">
        <h1 className="text-[#171717] text-[55px] font-semibold">Exclusive</h1>
        <h1 className="text-[#171717] text-[55px] font-semibold">
          Offers For You
        </h1>
        <p className=" text-red-600 text-[18px] font-bold">
          ONLY ON BEST SELLERS PRODUCTS
        </p>
        <div className="cursor-pointer offers-lastest-btn flex justify-center items-center gap-[15px] tracking-[3px] w-[195px] h-[52px] mt-[30px] bg-[#111111] text-[white] text-[13px] font-bold">
          <div>CHECK NOW</div>
          <img className="w-[15px]" src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="offers-right">
        <img
          className="w-full h-[120%] absolute left-5 top-0 z-[-1] object-cover"
          src={exclusive_image}
          alt=""
        />
      </div>
    </div>
  );
};

export default Offers;
