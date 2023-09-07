import React, { useState } from 'react'

const CartQuantityBtn = ({ quantityCartItem, stock }) => {
    const [quantity, setQuantity] = useState(quantityCartItem);

    const handleIncrement = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
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