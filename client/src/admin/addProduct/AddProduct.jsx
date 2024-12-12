import { useContext, useState } from "react";
import upload_area from "../../components/assets/admin/upload_area.svg";
import "./addproduct.css";
import Swal from "sweetalert2";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const { getAllProduct } = useContext(ShopContext); // เรียกใช้ data ใน
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "/products/noimage.jpg",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const API_URL = import.meta.env.VITE_APP_API;

  // Function get data จาก form
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProductDetails({ ...productDetails, image: reader.result });
    };
  };

  const Add_Product = async () => {
    // Loading Animation
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

    // Update Products
    await axios
      .put(`${API_URL}/api/products`, productDetails)
      .then((res) => {
        console.log(res);
        Swal.close();
        Swal.fire("Saved!", "", "success");
        setProductDetails({
          name: "",
          image: "/products/noimage.jpg",
          category: "women",
          new_price: "",
          old_price: "",
        });
        setImage(false);
        getAllProduct();
      })
      .catch((err) => {
        console.log(err);
        Swal.close();
        Swal.fire("Update Faild!", "", "error");
        setProductDetails({
          name: "",
          image: "/products/noimage.jpg",
          category: "women",
          new_price: "",
          old_price: "",
        });
        setImage(false);
      });
  };

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
            <option value="women">Kid</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="addproduct-itemfield w-fit text-[#7b7b7b] text-[16px]">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
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
        <button
          onClick={Add_Product}
          className="addproduct-btn mt-[3px] w-[160px] h-[50px] rounded-[6px] bg-[#6079ff] border-none cursor-pointer text-white text-[16px] font-medium"
        >
          ADD
        </button>
      </div>
    </>
  );
};

export default AddProduct;
