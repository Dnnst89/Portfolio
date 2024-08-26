"use client";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Asegúrate de importar los estilos
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setPurchasedProduct,
  clearPurchasedProducts,
} from "../redux/features/purchasedItemsSlice";

function CarouselImages({
  altText,
  images,
  widthImg,
  heightImg,
  classStyle,
  productId,
  idVariant,
  ItemQt,
  orderData,
}) {
  const dispatch = useDispatch();
  const [currentCurrency, setCurrentCurrency] = useState(null);
  const [currentAmount, setCurrentAmount] = useState(null);


  // Retrieve existing items from localStorage
  useEffect(() => {
    const dataInfo = orderData?.orderItems;

    if (dataInfo?.[0]?.currency != null && dataInfo?.[0]?.currency!= "$" ) {
      console.log("que me trae data",dataInfo?.[0])
      setCurrentCurrency(dataInfo[0].currency);
      const originalPrice = dataInfo?.[0]?.price; // Suponiendo que dataInfo[0].price contiene el valor original
      const priceWithTax = originalPrice * 1.13; // Aumenta el precio en un 13%
      // Limitar a 2 decimales
      const priceWithTwoDecimals = parseFloat(priceWithTax.toFixed(2));
     // Establecer el valor calculado con 2 decimales
      setCurrentAmount(priceWithTwoDecimals);


    } else {
      setCurrentCurrency("$");
      const originalPrice = dataInfo?.[0]?.price; // Suponiendo que dataInfo[0].price contiene el valor original
      const priceWithTax = originalPrice * 1.13; // Aumenta el precio en un 13%
      // Limitar a 2 decimales
      const priceWithTwoDecimals = parseFloat(priceWithTax.toFixed(2));
     // Establecer el valor calculado con 2 decimales
      setCurrentAmount(priceWithTwoDecimals);
      console.log("que me trae data",dataInfo?.[0])
    }
    
    if (orderData?.orderItems) {
      // Retrieve and parse existing items from localStorage
      const existingItemsString = localStorage.getItem("purchasedItemStored");
      let existingItems = [];

      if (existingItemsString) {
        try {
          existingItems = JSON.parse(existingItemsString);
          // Ensure existingItems is an array
          if (!Array.isArray(existingItems)) {
            existingItems = [];
          }
        } catch (e) {
          console.error("Failed to parse localStorage data:", e);
          existingItems = [];
        }
      }

      // Find the specific item based on idVariant
      const product = orderData.orderItems.find(
        (item) => item.idVariant === idVariant
      );

      if (product) {
        const purchasedProduct = {
          __typename: "OrderItem",
          variantId: product.idVariant,
          quantity: product.quantity,
          price: product.price,
          name: product.name,
          brand: product.brand,
          currency: product.currency,
        };
        // Check if the product already exists in the existing items
        const existingIndex = existingItems.findIndex(
          (item) => item.variantId === idVariant
        );

        if (existingIndex > -1) {
          // Update the existing item
          existingItems[existingIndex] = purchasedProduct;
        } else {
          // Add the new item
          existingItems.push(purchasedProduct);
        }

        // Store the updated items in localStorage
        localStorage.setItem(
          "purchasedItemStored",
          JSON.stringify(existingItems)
        );
      } else {
        console.error("Product with idVariant not found in dataInfo.");
        // Optionally clear localStorage if no product is found
        localStorage.removeItem("purchasedItemStored");
      }
    }
  }, [orderData, idVariant]);
  return (
    <Carousel
      className={"col-span-6"}
      showArrows={true}
      showThumbs={false}
      showStatus={false}
    >
      {images.map((img, index) => (
        <div key={index}>
          <Link
            href={{
              pathname: "/detail",
              query: {
                productId: productId,
                idVariant: idVariant,
                ItemQt: ItemQt,
                currency:currentCurrency,
                amount:currentAmount
              },
            }}
          >
            <div>
              <Image
                src={img}
                alt={altText}
                style={{ width: `${widthImg}px`, height: `${heightImg}px` }}
                width={widthImg} // Establecer el ancho
                height={heightImg} // Establecer el alto
                className={classStyle}
              />
            </div>
          </Link>
        </div>
      ))}
    </Carousel>
  );
}
export default CarouselImages;
