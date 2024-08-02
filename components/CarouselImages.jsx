import Image from "next/image";
import React, { useEffect } from "react";
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

  const dataInfo = orderData?.orderItems;
  useEffect(() => {
    dispatch(clearPurchasedProducts()); // Limpia los productos anteriores

    dataInfo.forEach((item) => {
      dispatch(
        setPurchasedProduct({
          __typename: "OrderItem",
          variantId: item.idVariant,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          brand: item.brand,
          currency: item.currency,
        })
      );
    });
  }, [dispatch, dataInfo]);
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
