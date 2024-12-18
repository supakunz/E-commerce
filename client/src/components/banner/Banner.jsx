import "./style.css";

const Banner = () => {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-y-[2.5rem] lg:gap-0 lg:grid-cols-2">
          <div className="lg:col-span-2 flex justify-center md:justify-end">
            <div className="banner-box relative right-0 lg:right-[5rem]">
              <div className="mb-3 md:mb-0">
                <img src="/banner/banner-1.jpg" alt="" />
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="1200"
                className="md:absolute top-[10rem] -left-[16rem] lg:-left-[13rem]"
              >
                <h2 className="text-[36px] font-bold md:max-w-[18rem] mb-2">
                  Clothing Collections 2030
                </h2>
                <a
                  className="shop-btn text-[13px] font-bold uppercase tracking-[0.3em]"
                  href="#"
                >
                  Shop now
                </a>
              </div>
            </div>
          </div>
          <div className="lg:row-start-2 flex justify-center md:justify-start lg:justify-end">
            <div className="banner-box relative lg:-top-[5rem] lg:right-16">
              <div className="mb-4 w-full lg:w-[23rem] xl:w-full">
                <img src="/banner/banner-2.jpg" alt="" />
              </div>
              <div data-aos="fade-right" data-aos-duration="2000">
                <h2 className="text-[36px] font-bold mb-2">Accessories</h2>
                <a
                  className="shop-btn text-[13px] font-bold uppercase tracking-[0.3em]"
                  href="#"
                >
                  Shop now
                </a>
              </div>
            </div>
          </div>
          <div className="lg:row-start-2 flex md:justify-end justify-center">
            <div className="banner-box flex flex-col md:flex-row justify-center md:justify-end relative lg:top-[6rem]">
              <div className="mb-4 md:mb-0 md:justify-start">
                <img src="/banner/banner-3.jpg" alt="" />
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1200"
                className="md:absolute top-[8rem] xl:top-[9rem] -left-[13rem] lg:-left-[3rem] xl:-left-[11rem]"
              >
                <h2 className="text-[36px] font-bold w-full md:max-w-[18rem] mb-2">
                  Shoes Spring 2030
                </h2>
                <a
                  className="shop-btn text-[13px] font-bold uppercase tracking-[0.3em]"
                  href="#"
                >
                  Shop now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
