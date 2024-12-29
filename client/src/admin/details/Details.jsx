/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import upload_area from "../../components/assets/admin/upload_area.svg";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./details.css";
import { ShopContext } from "../../context/ShopContext";

const Details = () => {
  const [image, setImage] = useState(false);
  const { getAllProduct } = useContext(ShopContext); // เรียกใช้ data ใน
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });

  const API_URL = import.meta.env.VITE_APP_API;

  // Get Product from productID
  const fectInfo = async () => {
    await fetch(`${API_URL}/api/products/${id}`)
      .then((resq) => resq.json())
      .then((data) => {
        setProductDetails({
          ...productDetails,
          name: data[0].name,
          image: data[0].image,
          category: data[0].category,
          new_price: data[0].new_price,
          old_price: data[0].old_price,
        });
      });
  };

  // Update Product from productID
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
        await fetch(`${API_URL}/api/products/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productDetails),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.close();
            Swal.fire("Saved!", "", "success");
            getAllProduct();
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

  // Delete Product
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
        //** Dont remove main products (1-36) image. */
        if (id < 37) {
          return Swal.fire("Unable to delete main products!", "", "error");
        }
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
        await fetch(`${API_URL}/api/products`, {
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
            getAllProduct();
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
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    //** Dont change main products (1-36) image. */
    if (id < 37) {
      return Swal.fire("Unable to update main image!", "", "error");
    }
    setImage(e.target.files[0]);

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProductDetails({ ...productDetails, image: reader.result });
    };
  };

  useEffect(() => {
    fectInfo();
  }, []);

  return (
    <>
      <div className="add-product box-border w-full max-w-[800px] p-[30px_50px] m-[20px_30px] rounded-[6px] bg-white">
        <div className="product-itemfield flex flex-col gap-3 w-full text-[#7b7b7b] text-[16px]">
          <p>Product title</p>
          <input
            className="box-border w-full h-[50px] rounded-[4px] pl-[15px] border-solid border-[1px] text-[14px] border-[#c3c3c3] text-[#7b7b7b]"
            onChange={changeHandler}
            type="text"
            value={productDetails.name}
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-price flex gap-[40px]">
          <div className="addproduct-itemfield flex flex-col gap-3 mt-3 w-full text-[#7b7b7b] text-[16px]">
            <p>Old Price</p>
            <input
              className="box-border w-full h-[50px] rounded-[4px] pl-[15px] border-solid border-[1px] text-[14px] border-[#c3c3c3] text-[#7b7b7b]"
              onChange={changeHandler}
              type="text"
              value={productDetails.old_price}
              name="old_price"
              placeholder="Type here"
            />
          </div>
          <div className="addproduct-itemfield w-full flex flex-col mt-3 gap-3 text-[#7b7b7b] text-[16px]">
            <p>New Price</p>
            <input
              className="box-border w-full h-[50px] rounded-[4px] pl-[15px] border-solid border-[1px] text-[14px] border-[#c3c3c3] text-[#7b7b7b]"
              onChange={changeHandler}
              type="text"
              value={productDetails.new_price}
              name="new_price"
              placeholder="Type here"
            />
          </div>
        </div>
        <div className="addproduct-itemfield w-full mt-3 flex flex-col gap-3 text-[#7b7b7b] text-[16px]">
          <p>Product Category</p>
          <select
            name="category"
            onChange={changeHandler}
            value={productDetails.category}
            className="add-product-selector p-[10px] w-[100px] h-[50px] text-[14px] border-solid border-[1px] border-[#7b7b7b8b] rounded-[4px]"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="addproduct-itemfield w-fit text-[#7b7b7b] text-[16px]">
          <label htmlFor="file-input">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : productDetails.image
                  ? productDetails.image
                  : upload_area
              }
              className="addproduct-thumnail-img h-[120px] w-[120px] rounded-[10px] object-contain my-[15px]"
              alt=""
            />
            {/* URL.createObjectURL() สร้าง Url จาก object file*/}
          </label>
          <input
            onChange={imageHandler}
            className="box-border w-full h-[50px] rounded-[4px] pl-[15px] border-solid border-[1px] text-[14px] border-[#c3c3c3] text-[#7b7b7b]"
            type="file"
            name="image"
            id="file-input"
            hidden
          />
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

export default Details;
