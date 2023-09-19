import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { addQtyItems, reduceQtyItems, updateQtyItems } from '@/redux/features/cart-slice';
import { useMutation } from '@apollo/client';
import UPDATE_CART_ITEM_QUANTITY_MUTATION from '@/src/graphQl/queries/updateCartItemQuantity';

const CartQuantityBtn = ({ quantityCartItem, stock, idCartItem }) => {
    const [quantity, setQuantity] = useState(quantityCartItem);
    const dispatch = useDispatch();
    const cartQtyItems = useSelector(state => state.cart.qtyItems);
    const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY_MUTATION);

    const handleIncrement = () => {
        if (quantity < stock) {
            const newQuantity = quantity + 1; //guardo en una nueva cosntante
            setQuantity(newQuantity); //actualizo el state
            dispatch(addQtyItems());//actualizo la store
            updateCartItem(newQuantity); //hago un update en la bd
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            dispatch(reduceQtyItems());
            updateCartItem(newQuantity);
        }
    };

    const updateCartItem = (newQuantity) => {
        updateCartItemQuantity({ variables: { newQuantity, cartItemId: idCartItem } })
            .then((response) => {
                // Manejar la respuesta de la mutación aquí, si es necesario
                
            })
            .catch((error) => {
                // Manejar errores de la mutación aquí
                toast.error('Ha sucedido un error');
            });
    };

    return (
        <section className="w-1/4 mx-2">
            <div className="flex items-center mb-2">
                <span className="text-grey">Cantidad:</span>
                <div className="bg-resene rounded-full m-3 w-[120px] flex items-center justify-center p-2 space-x-4">
                    <button className="bg-grey-200 rounded-full text-white">
                        <BiMinus onClick={handleDecrement} />
                    </button>
                    <span>{quantity}/{stock}</span>
                    <button className="bg-grey-200 rounded-full text-white">
                        <BiPlus onClick={handleIncrement} />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CartQuantityBtn;
