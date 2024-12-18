import exclusive_image from "../assets/slide-exclusive.png";
import arrow_icon from "../assets/arrow.png";
import "./offers.css";

const Offers = () => {
  return (
    <div className="offers container mx-auto w-full relative h-[400px] flex m-auto px-[60px] lg:px-[140px] mb-[35px] mt-[35px] lg:mt-[6rem] xl:mt-[35px] overflow-hidden">
      <div className="offers-left flex flex-col justify-center">
        <h1
          data-aos="fade-right"
          data-aos-delay="0"
          className="text-[#171717] text-[55px] font-semibold"
        >
          Exclusive
        </h1>
        <h1
          data-aos="fade-right"
          data-aos-delay="300"
          className="text-[#171717] text-[55px] font-semibold"
        >
          Offers For You
        </h1>
        <p
          data-aos="fade-right"
          data-aos-delay="600"
          className=" text-red-600 text-[18px] font-bold"
        >
          ONLY ON BEST SELLERS PRODUCTS
        </p>
        <div
          data-aos="fade-right"
          data-aos-delay="900"
          className="cursor-pointer offers-lastest-btn flex justify-center items-center gap-[15px] tracking-[3px] w-[195px] h-[52px] mt-[30px] bg-[#111111] text-[white] text-[13px] font-bold"
        >
          <div>CHECK NOW</div>
          <img className="w-[15px]" src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="offers-right absolute left-0 top-0 w-full h-[400px] z-[-1] px-4">
        <img
          className="w-full object-cover h-full object-top"
          src={exclusive_image}
          alt=""
        />
      </div>
    </div>
  );
};

export default Offers;
