"use client";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import CREATE_CART_ITEM_MUTATION from "../src/graphQl/queries/createCartItem";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItems, updateQtyItems } from "@/redux/features/cart-slice";

import useStorage from "@/hooks/useStorage";
import UPDATE_CART_ITEM_QUANTITY_MUTATION from "@/src/graphQl/queries/updateCartItemQuantity";

const AddItemBtn = ({ quantityItem, idVariant, cartItems, cartQuantity, sessionId, user }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((x) => x.auth);
    const [createCartItem] = useMutation(CREATE_CART_ITEM_MUTATION, {});
    const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY_MUTATION);
    const handleAdd = () => {
        //filtro los items para verificar si ya ese producto fue agregado, si fue agregado, se actualiza los  item en el carrito
        //si no esta en los items del carrito se crea o agrega como uno nuevo
        if (!user?.id && !isAuthenticated) {
            toast.error("Debe iniciar sesión para agregar este producto al carrito")
        } else {


            const itemFiltrado = cartItems.find((item) => item.attributes.variant.data.id === idVariant);
            const fechaActual = new Date();
            const fechaFormateada = fechaActual.toISOString();
            if (itemFiltrado) {//si el item esta en carrito
                const newQuantity = quantityItem + itemFiltrado.quantity
                console.log(itemFiltrado.id + " " + newQuantity)
                if (newQuantity > itemFiltrado.attributes.variant.data.attributes.stock) {
                    toast.error('No puedes agregar mas de este producto al carrito');
                } else {
                    updateCartItemQuantity({
                        variables: {
                            newQuantity: newQuantity,
                            cartItemId: itemFiltrado.id
                        }
                    })
                        .then((response) => {
                            dispatch(updateQtyItems(cartQuantity + quantityItem))
                            toast.success("Se ha actulizado un producto");

                            // Manejar la respuesta de la mutación aquí, si es necesario

                        })
                        .catch((error) => {
                            // Manejar errores de la mutación aquí
                            console.log(error)
                            toast.error('Ha sucedido un error:' + error);
                        });
                }


            } else {//si el item nunca se ha agregado al carrito
                console.log("item no duplicado");
                createCartItem({ //se crea un nuevo item en el carrito
                    variables: {
                        quantity: quantityItem,
                        variantId: idVariant,
                        shoppingSessionId: sessionId,
                        publishedAt: fechaFormateada,
                    },
                })
                    .then((response) => {
                        // Manejar la respuesta de la mutación aquí, si es necesario
                        const newCartItem = response.data.createCartItem.data;
                        dispatch(updateQtyItems(cartQuantity + quantityItem))//actualiza la cantidad de items en el state
                        dispatch(updateCartItems([...cartItems, newCartItem]));
                        toast.success("Se ha agregado un producto");
                    })
                    .catch((error) => {
                        // Manejar errores de la mutación aquí
                        toast.error("Ha sucedido un error: " + error);
                    });
            }
        }



    };
    return (
        <div>
            {" "}
            <Toaster
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
            <button className="text-white text-sm" onClick={handleAdd}>
                Agregar al carrito
            </button>
        </div>
    );
};

export default AddItemBtn;
