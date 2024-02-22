import React, { useEffect, useState } from "react";
import Image from "next/image";
import test from "../app/assets/heart.png";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import CartQuantityBtn from "./CartQuantityBtn";
import DeleteCartItemBtn from "./DeleteCartItemBtn";
import CarouselImages from "./CarouselImages";
import { useSelector } from "react-redux";
import {useQuery } from "@apollo/client";
import PRODUCT_ID_CARTITEM_QUERY from "@/src/graphQl/queries/getProductIdFromCartItem";
import Link from "next/link";
import { useRouter } from "next/navigation";


const CartItem = ({
  cartItemId,
  idVariant,
  productName,
  brand,
  description,
  color,
  price,
  totalPrice,
  ageRange,
  size,
  weight,
  images,
  stockVariant,
  quantityCartItem,
  loading,
  error,
}) => {
  const cart = useSelector((state) => state.cart);

  // const [productId, setProductId] = useState(null);
  const{ data, loading: productIdLoading}= useQuery(PRODUCT_ID_CARTITEM_QUERY,{
      variables: {
        cartItemId: cartItemId
      }
  });

  const productId = data?.cartItem?.data?.attributes?.variant?.data?.attributes?.product?.data?.id;


  return (
    <>
      <div
        className={`${
          cart.loadingTaxes
            ? ` opacity-40 grid grid-cols-12 w-full py-3 border-dashed border-grey-200 border-b-[2px]`
            : "grid grid-cols-12 w-full py-3 border-dashed border-grey-200 border-b-[2px]"
        }`}
      >
        <section className="grid grid-cols-12 col-span-12 md:col-span-4">
          <div className="grid grid-cols-12 col-span-12 items-center">
          
         
            {images.length > 0 ? (
              <CarouselImages
                altText={productName}
                images={images}
                widthImg={140}
                heightImg={140}
                classStyle={"rounded-2xl"}
              />
            ) : (
              <Image 
                src={test}
                alt={productName}
                style={{ width: "140px", height: "140px" }}
                className="col-span-6"
              />
            )}

            <div className="p-3 col-span-6">
            {!productIdLoading ? (
              <Link role="link" href={{ pathname: "/detail", query: { productId } }}>
                 <h1 className="text-lg">{productName}</h1>
              </Link>
              ) : (
                <h1 className="text-lg">{productName}</h1>
              )}
              <p className="text-xs text-lightblue">{brand}</p>
              <span className="text-xs text-grey">Ref {idVariant}</span>
            </div>
          </div>
        </section>
        <div className="col-span-12 m-auto md:col-span-3">
          {error.some((item) => item === idVariant) ? (
            <p className="animate-shake-x text-red-500 text-orange">
              * Stock Insuficiente
            </p>
          ) : null}
          <div className="mt-4">
            <CartQuantityBtn
              quantityCartItem={quantityCartItem}
              stock={stockVariant}
              idCartItem={cartItemId}
              loading={loading}
            />{" "}
            {/* Puedes ajustar el límite según tus necesidades */}
          </div>
        </div>
        <section className="grid grid-cols-12 col-span-12 md:col-span-5 ">
          <div className="grid grid-cols-6 col-span-10 md:col-span-6 place-content-center ">
            <span className="text-xs mx-2 col-start-2 col-span-6">
              Precio Unitario: ${price}
            </span>

            <span className="mx-2 font-bold col-start-2 col-span-6">
              Precio Total: ${totalPrice}
            </span>
          </div>
          {/* Botón para eliminar el producto del carrito */}
          <DeleteCartItemBtn idItem={cartItemId} qtyItem={quantityCartItem} />
        </section>
      </div>
    </>
  );
};

export default CartItem;
