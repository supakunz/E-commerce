/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import allproduct from "../components/assets/all_product"; // ** All product **
import { goldhelper } from "../helpers/goldhelper";

// create useContext
export const ShopContext = createContext(null); // ชื่อ Stones ที่จะเรียกใช้

// func get id สินค้าทุกอัน --> setProduct
const getDefaultCart = () => {
  let cart = {};
  // สินค้า max 60 ชิ้น
  for (let index = 0; index < 60 + 1; index++) {
    // จำนวนสินค้าทั้งหมด
    // cart[index] = 0; // { Allproduct_ID (key) : 0 (value) }
    cart[index] = { total: 0, size: "none" };
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [cartTotal, setCartTotal] = useState(0);
  const [all_product, setAll_product] = useState(null || allproduct);
  const [productTotal, setProductTotal] = useState(0);
  const [allusers, setAllusers] = useState([]);
  const [allorders, setAllorders] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const URL = import.meta.env.VITE_APP_API;

  const getAllProduct = async () => {
    await fetch(`${URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setAll_product(data))
      .catch((err) => console.log("Error", err));
  };

  const getAllUsers = async () => {
    await fetch(`${URL}/api/users`)
      .then((resq) => resq.json())
      .then((data) => {
        setAllusers(data);
      })
      .catch((err) => console.log("Error", err));
  };

  const getAllOrders = async () => {
    await fetch(`${URL}/api/payment`)
      .then((resq) => resq.json())
      .then((data) => {
        setAllorders(data);
      })
      .catch((err) => console.log("Error", err));
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  // ** รวม products กับ จำนวน + size
  const combinedData = all_product
    .filter((item) => cartItems[item.id]?.total > 0)
    .map((item) => ({
      ...item,
      ...cartItems[item.id],
    }));

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetch(`${URL}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/from-data",
          "auth-token": `${localStorage.getItem("auth-token")}`, //ส่ง token ไปเพื่อตรวจสอบ
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((req) => req.json())
        .then((data) => setCartItems(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function เพิ่มลบของลงในตะกร้า
  const addToCart = (itemId, size) => {
    // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], total: prev[itemId].total + 1, size },
    }));
    // {cart ( Object จาก getDefaultCart ), key( ID ตัวที่จะเปลี่ยน ) : value( ค่าที่จะรับมาใหม่ +1 ) }

    // ** Check login ** --> have token
    if (localStorage.getItem("auth-token")) {
      fetch(`${URL}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/from-data",
          "auth-token": `${localStorage.getItem("auth-token")}`, //ส่ง token ไปเพื่อตรวจสอบ
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }), // ส่ง id ไปเพื่อตรวจสอบ
      })
        .then((req) => req.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], total: prev[itemId].total - 1 },
    }));
    // {cart ( Object จาก getDefaultCart ), key( ID ตัวที่จะเปลี่ยน ) : value( ค่าที่จะรับมาใหม่ -1 ) }

    // ** Check login ** --> have token
    if (localStorage.getItem("auth-token")) {
      fetch(`${URL}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/from-data",
          "auth-token": `${localStorage.getItem("auth-token")}`, //ส่ง token ไปเพื่อตรวจสอบ
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      });
    }
  };

  // Function เปลี่ยน size product
  const changSize = (itemId, size) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], total: prev[itemId].total, size },
    }));
  };

  // Function รวมราคาสินค้าทั้งหมด * ในตระกร้า
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      // loop สิ้นค้าทั้งหมดที่อยู่ในตะกร้าแล้วเอาไปเทียบกับสิ้นค้าทั้งหมดเพื่อหาผมรวมจำนวนราคา
      if (cartItems[item].total > 0) {
        // ถ้าในตะกร้ามีสินค้ามากกว่า 1 --> setuseState
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item].total;
        setCartTotal(totalAmount.toFixed(2));
      }
      if (totalAmount === 0) {
        // ถ้าในตะกร้ามีสินค้า = 0 --> setuseState(0)
        setCartTotal(0);
      }
      // return totalAmount
    }
  };

  // Function รวมราคา Order ทั้งหมดที่มีการสั่งซื้อ
  const getAllOrderAmount = () => {
    let totalAmount = 0;
    allorders.forEach((price) => {
      totalAmount += Number(price.amount_total);
    });
    const price = (goldhelper(totalAmount) / 35).toFixed(2);
    setOrderTotal(price);
    return price;
  };

  // Function รวมราคา Products ทั้งหมด
  const getAllProductsAmount = () => {
    let totalAmount = 0;
    all_product.forEach((price) => {
      totalAmount += Number(price.new_price);
    });
    const price = totalAmount.toFixed(2);
    setProductTotal(price);
    return price;
  };

  // Function จำนวนสินค้าในตระกร้า
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      totalItem += cartItems[item].total;
    }
    return totalItem;
  };
  // Stones Context
  const contextValue = {
    getTotalCartItems,
    cartTotal,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    setAll_product,
    getAllProduct,
    getAllUsers,
    allusers,
    setAllusers,
    combinedData,
    getAllOrders,
    allorders,
    changSize,
    orderTotal,
    getAllOrderAmount,
    productTotal,
    getAllProductsAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
