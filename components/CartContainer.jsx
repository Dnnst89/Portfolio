"use client";
import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import GET_CART_ITEMS_LIST from "../src/graphQl/queries/getCartItems";
import CartItem from "./CartItem";
import { updateQtyItems } from "@/redux/features/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import GET_CART_ITEMS_LIST_SHOPPING_SESSION from "@/src/graphQl/queries/getCartItemsByShoppingSession";
import useCartSession from "@/hooks/useCartSession";
import useSession from "@/hooks/useSession";
import useCartSummary from "@/hooks/useCartSummary";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import AlertNotAuth from "./AlertNotAuth";
import useStorage from "@/hooks/useStorage";

const CartContainer = () => {
    const router = useRouter();
    const state = useSelector((x) => x.cart);


    const { user } = useStorage();//me trae el usuario de local storage
    const {
        total,
        items,
        quantity,
        error
    } = useCartSummary({ userId: user?.id });

    return (
        <><Toaster
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
            <div className="flex flex-col w-3/4">
                {items?.map((item) => {
                    const variant = item.attributes.variant.data; // Desestructuración aquí
                    const variantAtt = variant.attributes;
                    const productAtt = variant.attributes.product.data.attributes; // Desestructuración aquí
                    return (
                        <div key={item.id}>
                            <CartItem
                                key={item.id}
                                cartItemId={item.id}
                                quantityCartItem={item.attributes.quantity}
                                idVariant={variant.id}
                                productName={productAtt.name}
                                brand={productAtt.brand}
                                description={productAtt.description}
                                color={variantAtt.color}
                                price={variantAtt.price}
                                totalPrice={item.totalItemPrice}
                                stockVariant={variantAtt.stock}
                                ageRange={variantAtt.ageRange}
                                size={variantAtt.size}
                                weight={variantAtt.weight} //el weight es un objeto del peso y la unidad
                                images={variantAtt.images.data.map(img => img.attributes.url)}//se mapea para obtener array de url
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default CartContainer;
