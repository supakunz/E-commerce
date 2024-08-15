import React from 'react'
import './item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='item w-[280px]'>
      <div className='item-warp overflow-hidden relative'>
        <img className='w-[280px] hover:scale-[1.05] transition duration-[0.6s] object-cover' onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
        <Link to={`/product/${props.id}`}>
          <button className='absolute left-[23%] cursor-pointer transition duration-[0.3s] ease-in-out shopcategory-loadmore flex items-center justify-center mx-auto w-[130px] h-[40px] rounded-[75px] bg-[#e6e6e6] text-[#111111] text-[15px] font-normal hover:bg-black hover:text-white'>Quick View</button>
        </Link>
      </div>
      <p className='my-[6px]'>{props.name}</p>
      <div className="item-prices flex gap-[20px]">
        <div className="item-price-new text-[#374151] text-[18px] font-semibold">
          ${props.new_price}
        </div>
        <div className="item-price-old text-[#8c8c8c] text-[18px] font-medium line-through">
          ${props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item