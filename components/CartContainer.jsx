"use client";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import useCartSummary from "@/hooks/useCartSummary";
import toast, { Toaster } from "react-hot-toast";
import useStorage from "@/hooks/useStorage";
import CartDetail from "@/components/CartDetail";
import CartProceedPayment from "@/components/CartProceedPayment";
import { useDispatch, useSelector } from "react-redux";
import { updateQtyItems } from "@/redux/features/cart-slice";

const CartContainer = () => {
    const { user } = useStorage(); //me trae el usuario de local storage
    const { total, items, quantity, errors, loading } = useCartSummary({
        userId: user?.id,
    });

    const dispatch = useDispatch();

    return (
        <>
            <div className="flex flex-col md:col-span-8 col-span-12">
                {items?.map((item, index) => {
                    const variant = item.attributes.variant.data; // Desestructuración aquí
                    const variantAtt = variant.attributes;
                    const productAtt = variant.attributes.product?.data?.attributes; // Desestructuración aquí
                    if (typeof item == "undefined") {
                        return (<div key={index}> <p>error, uno de sus productos agregados ha sido eliminado</p></div>)
                    }
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
                                loading={loading}
                                error={errors.errorStock}
                            />
                        </div>
                    );
                })}
            </div>
            <div className=" bg-resene rounded-sm col-span-12 md:col-span-4 p-4 h-[500px]  border-l-4 border-lightblue">
                <CartDetail detailTitle={"Detalle del carrito"} />
                {items.length > 0 ? <CartProceedPayment
                    textButton={"Proceder al pago"}
                    page={"/checkout"}
                    error={errors.errorStock}
                /> :
                    <div className="p-3 space-y-3 border-l-4 border-lightblue">
                        <h1>Tu carrito esta vacio</h1>
                    </div>
                }
            </div>
        </>
    );
};

export default CartContainer;
