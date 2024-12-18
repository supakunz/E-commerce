import "./descriptionbox.css";

const DescriptionBox = () => {
  return (
    <div>
      <div className="descriptionbox my-[100px] container mx-auto px-4">
        <div className="description-navigator flex">
          <div className="description-nav-box flex items-center justify-center text-[14px] font-medium w-[161px] h-[60px] border-solid border-[1px] border-[#d0d0d0]">
            Description
          </div>
          <div className="description-nav-box fade bg-[#FBFBFB] text-[#555] flex items-center justify-center text-[14px] font-medium w-[161px] h-[60px] border-solid border-[1px] border-[#d0d0d0]">
            Reviews (122)
          </div>
        </div>
        <div className="descriptionbox-description flex flex-col p-[40px] pb-[65px] gap-[25px] border-solid border-[1px] border-[#D0D0D0]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
          molestiae, saepe pariatur temporibus adipisci explicabo mollitia
          reprehenderit sed, quasi perferendis dolores fugit dicta minus
          expedita laudantium a iusto. Consequuntur, nesciunt. Officia eius ipsa
          vero minima, recusandae ratione! Quia qui enim fugiat placeat debitis
          reprehenderit reiciendis quidem. Eius nesciunt suscipit, alias nihil
          nostrum, omnis vero, recusandae tempore sed ipsam molestiae impedit.
          Ab quo voluptatibus.
        </div>
      </div>
    </div>
  );
};

export default DescriptionBox;
