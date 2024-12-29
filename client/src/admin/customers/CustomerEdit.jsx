/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ShopContext } from "../../context/ShopContext";
// import "./details.css";

const CustomerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAllUsers } = useContext(ShopContext); // เรียกใช้ data ใน
  const [usersDetails, setusersDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const URL = import.meta.env.VITE_APP_API;

  // GetData from productID
  const fectInfo = async () => {
    await fetch(`${URL}/api/users/${id}`)
      .then((resq) => resq.json())
      .then((data) => {
        setusersDetails({
          ...usersDetails,
          name: data[0].name,
          email: data[0].email,
          role: data[0].role,
        });
      });
  };

  // GetData from productID
  const updateInfo = async () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: "Loading...",
          html: "Please wait...",
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading(null);
          },
        });
        await fetch(`${URL}/api/users/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usersDetails),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.close();
            Swal.fire("Saved!", "", "success");
            getAllUsers();
            navigate(-1);
          })
          .catch((err) => {
            console.log(err);
            Swal.close();
            Swal.fire("Update Faild!", "", "error");
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  // Delete Data from productID
  const remove_product = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Loading...",
          html: "Please wait...",
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading(null);
          },
        });
        await fetch(`${URL}/api/users`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.close();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            getAllUsers();
            navigate(-1);
          })
          .catch((err) => {
            console.log(err);
            Swal.close();
            Swal.fire("Delete Faild!", "", "error");
          });
      }
    });
  };

  // Function get data จาก form
  const changeHandler = (e) => {
    setusersDetails({ ...usersDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fectInfo();
  }, []);

  return (
    <>
      <div className="add-product box-border w-full max-w-[800px] p-[30px_50px] m-[20px_30px] rounded-[6px] bg-white">
        <div className="product-itemfield flex flex-col gap-3 w-full text-[#7b7b7b] text-[16px]">
          <p>Username</p>
          <input
            className="box-border w-full h-[50px] rounded-[4px] pl-[15px] border-solid border-[1px] text-[14px] border-[#c3c3c3] text-[#7b7b7b]"
            onChange={changeHandler}
            type="text"
            value={usersDetails.name}
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-price flex gap-[40px]">
          <div className="addproduct-itemfield flex flex-col gap-3 mt-3 w-full text-[#7b7b7b] text-[16px]">
            <p>Email</p>
            <input
              className="box-border w-full h-[50px] rounded-[4px] pl-[15px] border-solid border-[1px] text-[14px] border-[#c3c3c3] text-[#7b7b7b]"
              onChange={changeHandler}
              type="email"
              value={usersDetails.email}
              name="email"
              placeholder="Type here"
            />
          </div>
          <div className="addproduct-itemfield w-full flex flex-col mt-3 gap-3 text-[#7b7b7b] text-[16px]">
            <p>New Password</p>
            <input
              className="box-border w-full h-[50px] rounded-[4px] pl-[15px] border-solid border-[1px] text-[14px] border-[#c3c3c3] text-[#7b7b7b]"
              onChange={changeHandler}
              type="text"
              value={usersDetails.password}
              name="password"
              placeholder="Type here"
            />
          </div>
        </div>
        <div className="addproduct-itemfield w-full mt-3 flex flex-col gap-3 text-[#7b7b7b] text-[16px]">
          <p>Role</p>
          <select
            name="role"
            onChange={changeHandler}
            value={usersDetails.role}
            className="add-product-selector p-[10px] w-[100px] h-[50px] text-[14px] border-solid border-[1px] border-[#7b7b7b8b] rounded-[4px]"
          >
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
        </div>
        <div className="flex gap-5 mt-5">
          <button
            onClick={updateInfo}
            className="addproduct-btn mt-[3px] w-[160px] h-[50px] rounded-[6px] bg-[#6079ff] border-none cursor-pointer text-white text-[16px] font-medium"
          >
            UPDATE
          </button>
          <button
            onClick={remove_product}
            className="addproduct-btn mt-[3px] w-[160px] h-[50px] rounded-[6px] bg-red-500 border-none cursor-pointer text-white text-[16px] font-medium"
          >
            DELETE
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomerEdit;
