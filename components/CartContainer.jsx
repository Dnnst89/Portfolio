"use client";

import CartItem from "./CartItem";
import useCartSummary from "@/hooks/useCartSummary";
import useStorage from "@/hooks/useStorage";
import CartDetail from "@/components/CartDetail";
import CartProceedPayment from "@/components/CartProceedPayment";
import { useSelector } from "react-redux";
import CartSpinner from "./CartSpinner";
import { useEffect } from "react";
const CartContainer = () => {
  const { user } = useStorage(); //me trae el usuario de local storage
  const cart = useSelector((state) => state.cart);
  const { items, errors, loading } = useCartSummary({
    userId: user?.id,
  });

  return (
    <>
      <div
        className={`${
          cart.loadingTaxes
            ? "flex flex-col md:col-span-8 col-span-12 relative"
            : "flex flex-col md:col-span-8 col-span-12"
        }`}
      >
        {
          // se muestra el spinner cuando carga sobre el contenido.
          cart.loadingTaxes && (
            <CartSpinner
              styles={"absolute top-1/2 left-1/2 transform z-40"}
              size={"h-10 w-10 mr-3 text-aquamarine animate-spin"}
            />
          )
        }
        {items?.map((item, index) => {
          const variant = item.attributes.variant.data; // Desestructuración aquí
          const variantAtt = variant.attributes;
          const productAtt = variant.attributes.product?.data?.attributes; // Desestructuración aquí

          if (typeof item == "undefined") {
            return (
              <div key={index}>
                {" "}
                <p>error, uno de sus productos agregados ha sido eliminado</p>
              </div>
            );
          }
          return (
            <div key={item.id}>
              <CartItem
                key={item.id}
                cartItemId={item.id}
                features={item.attributes.features}
                quantityCartItem={item.attributes.quantity}
                idVariant={variant.id}
                productName={productAtt.name}
                brand={productAtt.brand}
                description={productAtt.description}
                color={variantAtt.color}
                price={variantAtt.price.toFixed(2)}
                totalPrice={item.totalItemPrice.toFixed(2)}
                stockVariant={variantAtt.stock}
                ageRange={variantAtt.ageRange}
                size={variantAtt.size}
                weight={variantAtt.weight} //el weight es un objeto del peso y la unidad
                images={variantAtt.images.data.map((img) => img.attributes.url)} //se mapea para obtener array de url
                loading={loading}
                error={errors.errorStock}
              />
            </div>
          );
        })}
      </div>
      <div className=" bg-resene rounded-sm col-span-12 md:col-span-4 p-4 h-[500px]  border-l-4 border-lightblue  sticky top-0 z-10">
        <CartDetail detailTitle={"Detalle del carrito"} deliveryPayment={0} />
        {items.length > 0 ? (
          <CartProceedPayment
            textButton={"Proceder al pago"}
            page={"/checkout"}
            error={errors.errorStock}
            isCheckout={false}
          />
        ) : (
          <div className="p-3 space-y-3 border-l-4 border-lightblue">
            <h1>Tu carrito esta vacio</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default CartContainer;
