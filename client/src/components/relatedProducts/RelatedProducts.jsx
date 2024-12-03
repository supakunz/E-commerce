import data_product from "../assets/data";
import Item from "../item/Item";
import "./relatedproducts.css";

const RelatedProducts = () => {
  return (
    <div className="relatedproducts flex flex-col items-center gap-[10px] mb-[10rem]">
      <h1 className="text-[50px] text-[#171717] font-medium">
        Related Products
      </h1>
      <hr className="w-[200px] h-[6px] rounded-[10px] bg-[#252525]" />
      <div className="relatedproducts-item mt-[50px] flex gap-[30px]">
        {data_product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
