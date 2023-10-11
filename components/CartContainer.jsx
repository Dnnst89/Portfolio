"use client";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import useCartSummary from "@/hooks/useCartSummary";
import toast, { Toaster } from "react-hot-toast";
import useStorage from "@/hooks/useStorage";
import CartDetail from "@/components/CartDetail";
import CartProceedPayment from "@/components/CartProceedPayment";

const CartContainer = () => {
    const { user } = useStorage(); //me trae el usuario de local storage
    const { total, items, quantity, error, loading } = useCartSummary({
        userId: user?.id,
    });
    return (
        <>
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

            <div className="flex flex-col w-3/4">

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
                                error={error}
                            />

                        </div>
                    );
                })}

            </div>
            <div className=" bg-resene rounded-sm w-1/4 p-4 h-[500px]">
                <CartDetail detailTitle={"Detalle del carrito"} />

                <CartProceedPayment
                    textButton={"Proceder al pago"}
                    page={"/checkout"}
                    error={error}
                />
            </div>
        </>
    );
};

export default CartContainer;
