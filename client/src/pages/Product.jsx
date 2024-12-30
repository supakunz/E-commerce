import { useContext } from "react";
import { useParams } from "react-router-dom";
import Breadcrums from "../components/breadcrums/Breadcrums";
import { ShopContext } from "../context/ShopContext";
import ProductDisplay from "../components/productDisplay/ProductDisplay";
import DescriptionBox from "../components/descriptionBox/DescriptionBox";
import RelatedProducts from "../components/relatedProducts/RelatedProducts";
import Loading from "../components/common/Loading";
import NotFound from "../pages/NotFound";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams(); // get params at url

  // กรณีที่ข้อมูลยังโหลดไม่เสร็จ
  if (!all_product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const product = all_product.find((e) => e.id === Number(productId));

  if (!product) {
    return <NotFound />;
  }

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
