import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Shop from "../pages/Shop";
import ShopCategory from "../pages/ShopCategory";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import LoginSignup from "../pages/LoginSingup";
import mens_banner from "../components/assets/banner_mens.png";
import women_banner from "../components/assets/banner_women.png";
import kids_banner from "../components/assets/banner_kids.png";

function UserRoutes() {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route
          path="/mens"
          element={<ShopCategory banner={mens_banner} category="men" />}
        />
        <Route
          path="/womens"
          element={<ShopCategory banner={women_banner} category="women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kids_banner} category="kid" />}
        />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </UserLayout>
  );
}

export default UserRoutes;