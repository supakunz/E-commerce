/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export default function Checkout() {
  const { register, handleSubmit, reset } = useForm();
  const { cartTotal, cartItems, combinedData } = useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTax, setTotalTax] = useState(0); // ราคาสินค้ารวม VAT
  const URL = import.meta.env.VITE_APP_API;
  const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`); // แทนที่ด้วย Stripe Public Key ของคุณ

  const onSubmit = async (data) => {
    const formData = {
      address: [data],
      cart: [...combinedData],
      quantity: totalAmount,
      pricetotal: totalTax,
    };

    await axios
      .post(`${URL}/api/payment`, formData)
      .then(async (res) => {
        const stripe = await stripePromise;
        // Redirect to Checkout
        await stripe.redirectToCheckout({
          sessionId: res.data.id,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleCalculate = () => {
    const vatRate = 0.07; // อัตรา VAT 7%
    const totalPrice = (
      Number(cartTotal) +
      Number(cartTotal) * vatRate
    ).toFixed(2);
    setTotalTax(totalPrice);
  };

  const totalAmounts = () => {
    let data = 0;
    for (const key in cartItems) {
      if (cartItems[key].total > 0) {
        data += cartItems[key].total;
      }
    }
    return setTotalAmount(data);
  };

  useEffect(() => {
    totalAmounts();
    handleCalculate();
  });

  return (
    <div className="overflow-y-hidden">
      <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
        <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
          <div className="flex w-full  flex-col justify-start items-start">
            <div className>
              <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Check out
              </p>
            </div>
            <div className="mt-2">
              <Link
                to={"/cart"}
                className="text-base leading-4 underline  hover:text-gray-800 text-gray-600"
              >
                Back to my cart
              </Link>
            </div>
            <div className="mt-12">
              <p className="text-xl font-semibold leading-5 text-gray-800">
                Shipping Details
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 flex flex-col justify-start items-start w-full space-y-8 "
            >
              <input
                className="px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                name="firstname"
                placeholder="First Name"
                {...register("firstname")}
              />
              <input
                className="px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                name="lastname"
                placeholder="Last Name"
                {...register("lastname")}
              />
              <input
                className="px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                name="address"
                placeholder="Address"
                {...register("address")}
              />
              <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                <div className="w-full">
                  <select
                    className={`shadow z-10 rounded-md bg-white py-3 w-full text-gray-600 focus:outline-none`}
                    name="city"
                    {...register("city")}
                  >
                    <option selected>City</option>
                    <option
                      value={"London"}
                      className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                    >
                      London
                    </option>
                    <option
                      value={"New York"}
                      className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                    >
                      New York
                    </option>
                    <option
                      value={"Bangkok"}
                      className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                    >
                      Bangkok
                    </option>
                  </select>
                </div>
                <div className="relative w-full">
                  <select
                    className={`shadow z-10 rounded-md bg-white py-3 w-full text-gray-600 focus:outline-none`}
                    name="region"
                    {...register("region")}
                  >
                    <option selected>Region(option)</option>
                    <option
                      value={"London"}
                      className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                    >
                      London
                    </option>
                    <option
                      value={"New York"}
                      className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                    >
                      New York
                    </option>
                    <option
                      value={"Bangkok"}
                      className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                    >
                      Bangkok
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                <div className="relative w-full">
                  <select
                    className={`shadow rounded-md absolute z-10 bg-white py-3 w-full text-gray-600 focus:outline-none`}
                    name="country"
                    {...register("country")}
                  >
                    <option selected>Country</option>
                    <option
                      value={"USA"}
                      className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                    >
                      USA
                    </option>
                    <option
                      value={"UK"}
                      className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                    >
                      UK
                    </option>
                    <option
                      value={"TH"}
                      className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 w-full"
                    >
                      TH
                    </option>
                  </select>
                </div>
                <div className="relative w-full">
                  <input
                    className="focus:outline-none rounded-md focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3 w-full"
                    type="text"
                    placeholder="Zip Code"
                    name="zip"
                    {...register("zip")}
                  />
                </div>
              </div>
              <input
                className="focus:outline-none rounded-md focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                placeholder="Phone Number"
                name="phone"
                {...register("phone")}
              />
              <button
                type="submit"
                className="focus:outline-none rounded-lg focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800"
              >
                Proceed to payment
              </button>
            </form>
          </div>
          <div className="flex flex-col rounded-lg justify-start items-start bg-gray-50 w-full p-6 md:p-14">
            <div>
              <h1 className="text-2xl font-semibold leading-6 text-gray-800">
                Order Summary
              </h1>
            </div>
            <div className="flex mt-7 flex-col items-end w-full space-y-6">
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Total items</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  {totalAmount}
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Total Charges</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  ${cartTotal}
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Tax</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  7%
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Sub total </p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  ${totalTax}
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full items-center mt-32">
              <p className="text-xl font-semibold leading-4 text-gray-800">
                Estimated Total{" "}
              </p>
              <p className="text-lg font-semibold leading-4 text-gray-800">
                ${totalTax}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
