import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import CREATE_CART_ITEM_MUTATION from "../src/graphQl/queries/createCartItem";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItems, updateQtyItems } from "@/redux/features/cart-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import useCartSummary from "@/hooks/useCartSummary";
import useStorage from "@/hooks/useStorage";

const AddCartItemBtn = ({ quantityItem, idVariant }) => {
    const dispatch = useDispatch();
    const [createCartItem] = useMutation(CREATE_CART_ITEM_MUTATION, {});
    const { user } = useStorage();
    const cartSummary = useCartSummary({ userId: user?.id });

    const handleAdd = () => {
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toISOString();
        createCartItem({

            variables: {
                quantity: quantityItem,
                variantId: idVariant,
                shoppingSessionId: cartSummary.sessionId,
                publishedAt: fechaFormateada,
            },
        })
            .then((response) => {
                // Manejar la respuesta de la mutación aquí, si es necesario
                const newCartItem = response.data.createCartItem.data;
                dispatch(updateQtyItems(cartSummary.quantity + quantityItem))//actualiza la cantidad de items en el state
                dispatch(updateCartItems([...cartSummary.items, newCartItem]));
                toast.success("Se ha agregado un producto");
            })
            .catch((error) => {
                // Manejar errores de la mutación aquí
                toast.error("Ha sucedido un error: " + error);
            });
    };
    return (
        <div>
            {" "}
            <Toaster />
            <button className="text-white text-sm" onClick={handleAdd}>
                Agregar al carrito
            </button>
        </div>
    );
};

export default AddCartItemBtn;
