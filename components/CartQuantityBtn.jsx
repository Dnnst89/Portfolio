import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { addQtyItems, reduceQtyItems, updateQtyItems } from '@/redux/features/cart-slice';
import { useMutation } from '@apollo/client';
import UPDATE_CART_ITEM_QUANTITY_MUTATION from '@/src/graphQl/queries/updateCartItemQuantity';
import toast, { Toaster } from 'react-hot-toast';

const CartQuantityBtn = ({ quantityCartItem, stock, idCartItem, loading }) => {
    const [quantity, setQuantity] = useState(quantityCartItem);
    const dispatch = useDispatch();
    const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY_MUTATION);

    const handleIncrement = () => {
        if (quantity < stock) {
            const newQuantity = quantity + 1; //guardo en una nueva cosntante
            setQuantity(newQuantity); //actualizo el state
            updateCartItemQuantity({ variables: { newQuantity, cartItemId: idCartItem } })
                .then((response) => {
                    dispatch(addQtyItems());//actualizo la store
                    // Manejar la respuesta de la mutación aquí, si es necesario

                })
                .catch((error) => {
                    // Manejar errores de la mutación aquí
                    toast.error('Ha sucedido un error');
                });
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateCartItemQuantity({ variables: { newQuantity, cartItemId: idCartItem } })
                .then((response) => {
                    dispatch(reduceQtyItems());
                    // Manejar la respuesta de la mutación aquí, si es necesario

                })
                .catch((error) => {
                    // Manejar errores de la mutación aquí
                    toast.error('Ha sucedido un error');
                });

        }
    };

    return (
        <section className="w-1/4 mx-2">
            <Toaster
                containerStyle={{
                    top: 150,
                    left: 20,
                    bottom: 20,
                    right: 20,
                }}
                toastOptions={{
                    success: {
                        style: {
                            background: "#67C3AD",
                        },
                    },
                    error: {
                        style: {
                            background: "#f87171",
                        },
                    },
                }}
            />
            <div className="flex items-center mb-2">
                <span className="text-grey">Cantidad:</span>
                <div className="bg-resene rounded-full m-3 w-[120px] flex items-center justify-center p-2 space-x-4">
                    <button className="bg-grey-200 rounded-full text-white" disabled={loading} onClick={handleDecrement}>
                        <BiMinus />
                    </button>
                    <span>{quantity}/{stock}</span>
                    <button className="bg-grey-200 rounded-full text-white" disabled={loading} onClick={handleIncrement}>
                        <BiPlus />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CartQuantityBtn;
