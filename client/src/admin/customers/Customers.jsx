/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./customers.css";
import { Link } from "react-router-dom";

const Customers = () => {
  const [allusers, setAllusers] = useState([]);
  const URL = import.meta.env.VITE_APP_API;

  const fectInfo = async () => {
    await fetch(`${URL}/api/users`)
      .then((resq) => resq.json())
      .then((data) => {
        setAllusers(data);
        console.log(allusers);
        console.log(data);
      });
  };

  useEffect(() => {
    fectInfo();
  }, []);

  return (
    <>
      <div className="list-product flex flex-col items-center w-full h-full p-[10px_50px] m-[30px] rounded-[6px] bg-white">
        <h1 className="p-4">All Products List</h1>
        <div className="listproduct-format-main grid grid-cols-4 text-[15px] font-medium gap-[10px] w-full py-[20px] text-[#454545]">
          <p>Username</p>
          <p>Email</p>
          <p>Role</p>
          <p>Details</p>
        </div>
        <div className="listproduct-allproducts w-full overflow-y-auto max-h-[64vh]">
          <hr />
          {allusers.map((users, index) => {
            return (
              <>
                <div
                  key={index}
                  className="listproduct-format-main listproduct-format grid grid-cols-4 text-[15px] font-medium gap-[10px] w-full py-[20px] text-[#454545] items-center"
                >
                  <p>{users.name}</p>
                  <p>{users.email}</p>
                  <p>{users.role}</p>
                  <Link to={`${users._id}`}>
                    <p className="cursor-pointer">edit</p>
                  </Link>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Customers;