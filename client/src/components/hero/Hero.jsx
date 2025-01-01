import Slider from "react-slick";
import hero_women from "../assets/slide-women.jpg";
import hero_men from "../assets/slide-men.jpg";
import arrow_icon from "../assets/arrow.png";
import "./hero.css";
import { useState } from "react";
import { useEffect } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState({
    part1: false,
    part2: false,
    part3: false,
    part4: false,
  });

  useEffect(() => {
    // Fade in on initial render
    setTimeout(() => setIsVisible((prev) => ({ ...prev, part1: true })), 200);
    setTimeout(() => setIsVisible((prev) => ({ ...prev, part2: true })), 400);
    setTimeout(() => setIsVisible((prev) => ({ ...prev, part3: true })), 600);
    setTimeout(() => setIsVisible((prev) => ({ ...prev, part4: true })), 800);
  }, []);

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 6500,
    cssEase: "linear",
    beforeChange: () => {
      setIsVisible({ part1: false, part2: false, part3: false, part4: false }); // รีเซ็ตคลาสก่อนเปลี่ยนสไลด์
    },
    afterChange: () => {
      // เรียกใช้ setTimeout หลังจากสไลด์เปลี่ยน
      setTimeout(() => setIsVisible((prev) => ({ ...prev, part1: true })), 200);
      setTimeout(() => setIsVisible((prev) => ({ ...prev, part2: true })), 400);
      setTimeout(() => setIsVisible((prev) => ({ ...prev, part3: true })), 600);
      setTimeout(() => setIsVisible((prev) => ({ ...prev, part4: true })), 800);
    },
  };

  return (
    <Slider
      {...settings}
      className="hero min-h-[38rem] lg:mb-[90px] md:mb-[70px] sm:mb-[50px] mb-[45px]"
    >
      <div className="h-screen">
        <div className="flex relative">
          <div
            className={`hero-left flex flex-col justify-center leading-[1.1] gap-[20px] pl-[20px] lg:pl-[50px] xl:pl-[100px] 2xl:pl-[140px] relative top-[30vh] container mx-auto`}
          >
            <h2
              className={`fade-text ${
                isVisible.part1 ? "visible" : ""
              } text-red-600 text-[15px] font-bold`}
            >
              NEW ARRIVALS ONLY
            </h2>
            <div className="hero-content lg:leading-[88px] md:leading-[80px] leading-[70px] ">
              <p
                className={`fade-text ${
                  isVisible.part2 ? "visible" : ""
                } text-[#171717] text-[60px] font-semibold`}
              >
                New Season
              </p>
              <p
                className={`fade-text ${
                  isVisible.part3 ? "visible" : ""
                } text-[#171717] text-[60px] font-semibold`}
              >
                Men Collections
              </p>
            </div>
            <div
              className={`cursor-pointer fade-text ${
                isVisible.part4 ? "visible" : ""
              } hero-lastest-btn flex justify-center items-center gap-[15px] tracking-[3px] w-[195px] h-[52px] lg:mt-[30px] md:mt-[20px] mt-[10px] bg-[#111111] text-[white] text-[13px] font-bold`}
            >
              <div>SHOP NOW</div>
              <img className="w-[15px]" src={arrow_icon} alt="" />
            </div>
          </div>
          <div className="hero-right">
            <img
              className="w-full h-screen min-h-[38rem] absolute left-0 top-0 z-[-1] object-cover"
              src={hero_men}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="h-screen">
        <div className="flex relative">
          <div
            className={`hero-left flex flex-col justify-center leading-[1.05] gap-[20px] pl-[20px] lg:pl-[50px] xl:pl-[100px] 2xl:pl-[140px] relative top-[30vh] container mx-auto`}
          >
            <h2
              className={`fade-text ${
                isVisible.part1 ? "visible" : ""
              } text-red-600 text-[15px] font-bold tracking-[1px]`}
            >
              NEW ARRIVALS ONLY
            </h2>
            <div className="lg:leading-[88px] md:leading-[80px] leading-[70px] ">
              <p
                className={`fade-text ${
                  isVisible.part2 ? "visible" : ""
                } text-[#171717] text-[60px] font-semibold`}
              >
                New Season
              </p>
              <p
                className={`fade-text ${
                  isVisible.part3 ? "visible" : ""
                } text-[#171717] text-[60px] font-semibold`}
              >
                Women Collections
              </p>
            </div>
            <div
              className={`cursor-pointer fade-text ${
                isVisible.part4 ? "visible" : ""
              } hero-lastest-btn flex justify-center items-center gap-[15px] tracking-[3px] w-[195px] h-[52px] lg:mt-[30px] md:mt-[20px] mt-[10px] bg-[#111111] text-[white] text-[13px] font-bold`}
            >
              <div>SHOP NOW</div>
              <img className="w-[15px]" src={arrow_icon} alt="" />
            </div>
          </div>
          <div className="hero-right">
            <img
              className="w-full h-screen absolute left-0 top-0 z-[-1] object-cover"
              src={hero_women}
              alt=""
            />
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Hero;
