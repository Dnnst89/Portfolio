import React, { useState } from 'react'
import { addQtyItems,reduceQtyItems } from '@/redux/features/cart-slice';
import { useDispatch } from 'react-redux';
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
        
            <div className="flex items-center space-x-2 ">
                <button onClick={handleDecrement} className="px-3 py-1 bg-lightblue text-black rounded-md hover:bg-resene focus:outline-none focus:ring-2 focus:ring-aquamarine">
                    -
                </button>
                <span className="text-xl font-semibold ">{quantity}/{stock}</span>
                <button onClick={handleIncrement} className="px-3 py-1 bg-lightblue text-black rounded-md hover:bg-resene focus:outline-none focus:ring-2 focus:ring-aquamarine"
                >+</button>
            </div>
       
    );
}

export default CartQuantityBtn