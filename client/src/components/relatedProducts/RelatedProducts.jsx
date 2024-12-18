import data_product from "../assets/data";
import Item from "../item/Item";
import "./relatedproducts.css";

const RelatedProducts = () => {
  return (
    <div className="relatedproducts container px-4 mx-auto flex flex-col items-center gap-[10px] mb-[7rem]">
      <h1 className="text-[50px] text-[#171717] font-medium">
        Related Products
      </h1>
      <hr className="w-[200px] h-[6px] rounded-[10px] bg-[#252525]" />
      <div className="grid product-grid mt-[50px]">
        {data_product.map((item, i) => {
          return <Item key={i} product={item} />;
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
