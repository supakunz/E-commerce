import Hero from "../components/hero/Hero";
import Offers from "../components/offers/Offers";
import NewLetter from "../components/newLetter/NewLetter";
import FilterProducts from "../components/filter/FitterProducts";
import Banner from "../components/banner/Banner";

const Shop = () => {
  return (
    <div>
      <Hero />
      <Banner />
      <Offers />
      <FilterProducts />
      <NewLetter />
    </div>
  );
};

export default Shop;
