import Slider from "react-slick";
import hero_women from "../assets/slide-women.jpg";
import hero_men from "../assets/slide-men.jpg";
import arrow_icon from "../assets/arrow.png";
import "./hero.css";

const Hero = () => {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 3500,
    cssEase: "linear",
  };

  return (
    <Slider
      {...settings}
      className="hero h-screen flex lg:mb-[90px] md:mb-[70px] sm:mb-[50px] mb-[45px]"
    >
      <div>
        <div className="flex relative">
          <div className="hero-left flex flex-col justify-center leading-[1.05] gap-[20px] pl-[180px] relative top-[30vh]">
            <h2 className="text-red-600 text-[15px] tracking-[1px] font-bold">
              NEW ARRIVALS ONLY
            </h2>
            <div className="lg:leading-[88px] md:leading-[80px] leading-[70px] ">
              <p className="text-[#171717] text-[60px] font-semibold">
                New Season
              </p>
              <p className="text-[#171717] text-[60px] font-semibold">
                Women Collections
              </p>
            </div>
            <div className="cursor-pointer hero-lastest-btn flex justify-center items-center gap-[15px] tracking-[3px] w-[195px] h-[52px] lg:mt-[30px] md:mt-[20px] mt-[10px] bg-[#111111] text-[white] text-[13px] font-bold">
              <div>SHOP NOW</div>
              <img className="w-[15px]" src={arrow_icon} alt="" />
            </div>
          </div>
          <div className="hero-right">
            <img
              className="w-full h-screen absolute left-0 top-[-4px] z-[-1] object-cover"
              src={hero_women}
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex">
          <div className="hero-left flex flex-col justify-center leading-[1.1] gap-[20px] pl-[180px] relative top-[30vh]">
            <h2 className="text-red-600 text-[15px] tracking-[1px] font-bold">
              NEW ARRIVALS ONLY
            </h2>
            <div className="lg:leading-[88px] md:leading-[80px] leading-[70px] ">
              <p className="text-[#171717] text-[60px] font-semibold">
                New Season
              </p>
              <p className="text-[#171717] text-[60px] font-semibold">
                Men Collections
              </p>
            </div>
            <div className="cursor-pointer hero-lastest-btn flex justify-center items-center gap-[15px] tracking-[3px] w-[195px] h-[52px] lg:mt-[30px] md:mt-[20px] mt-[10px] bg-[#111111] text-[white] text-[13px] font-bold">
              <div>SHOP NOW</div>
              <img className="w-[15px]" src={arrow_icon} alt="" />
            </div>
          </div>
          <div className="hero-right">
            <img
              className="w-full h-screen absolute left-0 top-0 z-[-1] object-cover"
              src={hero_men}
              alt=""
            />
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Hero;
