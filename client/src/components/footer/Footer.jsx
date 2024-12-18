import payment from "../assets/payment.png.webp";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer flex flex-col justify-center items-center pt-[40px] gap-[50px] bg-[#111111]">
      <div className="grid grid-cols-[1fr_0.5fr_0.5fr_0.5fr] gap-[6rem]">
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-[5px]">
            <p className="text-white text-[25px] font-black">GOZA</p>
            <p className="text-white text-[25px] font-semibold">STORE</p>
          </div>
          <div className="box-content text-[#B2B2B2] lg:text-[15px] md:text-[14px] text-[13px] w-[265px]">
            <p>
              The customer is at the heart of our unique business model, which
              includes design
            </p>
          </div>
          <div>
            <img src={payment} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <p className="text-white lg:text-[15px] md:text-[14px] text-[13px] font-semibold">
            CATEGORIES
          </p>
          <ul className="footer-links flex flex-col list-none gap-[15px] text-[#B2B2B2] lg:text-[15px] md:text-[14px] text-[13px]">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Men</li>
            <li className="cursor-pointer">Women</li>
            <li className="cursor-pointer">Kids</li>
          </ul>
        </div>
        <div className="flex flex-col gap-[20px]">
          <p className="text-white lg:text-[15px] md:text-[14px] text-[13px] font-semibold">
            SHOPPING
          </p>
          <ul className="footer-links flex flex-col list-none gap-[15px] text-[#B2B2B2] lg:text-[15px] md:text-[14px] text-[13px]">
            <li className="cursor-pointer">Contact Us</li>
            <li className="cursor-pointer">Payment Methods</li>
            <li className="cursor-pointer">Delivery</li>
            <li className="cursor-pointer">Exchanges</li>
          </ul>
        </div>
        <div className="flex flex-col gap-[20px]">
          <p className="text-white lg:text-[15px] md:text-[14px] text-[13px] font-semibold">
            HELP
          </p>
          <ul className="footer-links flex flex-col list-none gap-[15px] text-[#B2B2B2] lg:text-[15px] md:text-[14px] text-[13px]">
            <li className="cursor-pointer">Track Order</li>
            <li className="cursor-pointer">Returns</li>
            <li className="cursor-pointer">Shipping</li>
            <li className="cursor-pointer">FAQs</li>
          </ul>
        </div>
      </div>
      <div className="foot-copyright flex flex-col items-center gap-[15px] w-[100%] mb-[15px] text-[#B2B2B2] text-[14px]">
        <hr className="w-[80%] border-none rounded-[10px] h-[1px] bg-[#222222]" />
        <p>
          Copyright @ 2023 - All Right Reserved | made with ❤️ by{" "}
          <p className="text-[#e53637] inline">Supakun Thata</p>
        </p>
      </div>
    </div>
  );
};

export default Footer;
