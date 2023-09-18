import React, { useState } from 'react'
import { addQtyItems,reduceQtyItems } from '@/redux/features/cart-slice';
import { useDispatch } from 'react-redux';
import { BiMinus, BiPlus } from 'react-icons/bi';
const CartQuantityBtn = ({ quantityCartItem, stock }) => {
    const [quantity, setQuantity] = useState(quantityCartItem);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
            dispatch(addQtyItems())
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            dispatch(reduceQtyItems())
        }
    };

    return (

<section className="w-1/4 mx-2 ">
<div className="flex items-center mb-2 ">
  <span className="text-grey">Cantidad:</span>
  <div className="bg-resene rounded-full m-3 w-[120px] flex items-center justify-center p-2 space-x-4">
    <button className=" bg-grey rounded-full text-white">
      <BiMinus onClick={handleDecrement} />
    </button>
    <span>{quantity}</span>
    <button className=" bg-grey rounded-full  text-white">
      <BiPlus onClick={handleIncrement} />
    </button>
  </div>
</div>
</section>

       
    );
}

export default CartQuantityBtn