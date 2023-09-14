"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import ProductDetailTable from "./ProductDetailSecondary";
import { BiPlus, BiMinus } from "react-icons/bi";
import "@/styles/detail.page.css";
import Link from "next/link";

const loader = ({ src }) => {
  return `https://img.freepik.com/vector-gratis/${src}`;
};

const loaderImage = ({ src }) => {
  return `http://localhost:1337${src}`;
};
function ProductDetail({name, description, defaultPrice, sku, url}) {
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomReviews = () => getRandomNumber(5, 100);
  const getRandomStars = () => Math.random() + getRandomNumber(3, 4);

  const [quantity, setQuantity] = useState(1);

  const decreaseCounter = () => {
    if (quantity === 0) return;
    setQuantity((prev) => --prev);
  };

  const increaseCounter = () => {
    setQuantity((prev) => ++prev);
  };
  const handleClick = () => {
    // Find the element you want to scroll to
    const element = document.querySelector("#detail-table");

    // Scroll to the element
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="bg-floralwhite" target="_blank" rel="noopener noreferrer">
        <div className=" p-5 flex">
          {/* imagen principal grande */}
          <div className="w-6/12 flex justify-center">
            <Image
              loader={loaderImage}
              priority={true}
              width="500"
              height="800"
              src={url}
              alt="tailwind logo"
              className="rounded-xl"
            />
          </div>
          {/* parte derecha de la imagen principal grande*/}
          <div className="w-6/12 flex flex-col">
            <h2 className="flex justify-end">Ref {sku}</h2>
            <h1 className="mb-3">{name}</h1>
            <p>
             {description}
            </p>
            <a onClick={() => handleClick()}>
              <button className="flex justify-start text-lightblue">
                Leer mas
              </button>
            </a>
            {/* imagenes iconos y caracteristicas */}
            <div className="  flex">
              {/* primera caja */}
              <div className="w-3/6">
                <div className="flex mt-5">
                  <Image
                    loader={loader}
                    priority={true}
                    width="50"
                    height="50"
                    src="comienzo_53876-25533.jpg?w=360"
                    alt="tailwind logo"
                    className="rounded-xl"
                  />
                  <p>Caracteristica del producto</p>
                </div>

                <div className="flex mt-5">
                  <Image
                    loader={loader}
                    priority={true}
                    width="50"
                    height="50"
                    src="comienzo_53876-25533.jpg?w=360"
                    alt="tailwind logo"
                    className="rounded-xl"
                  />
                  <p>Caracteristica del producto</p>
                </div>

                <div className="flex mt-5">
                  <Image
                    loader={loader}
                    priority={true}
                    width="50"
                    height="50"
                    src="comienzo_53876-25533.jpg?w=360"
                    alt="tailwind logo"
                    className="rounded-xl"
                  />
                  <p>Caracteristica del producto</p>
                </div>
              </div>
              {/* segunda caja */}
              <div className=" w-3/6">
                <div className="flex mt-5">
                  <Image
                    loader={loader}
                    priority={true}
                    width="50"
                    height="50"
                    src="comienzo_53876-25533.jpg?w=360"
                    alt="tailwind logo"
                    className="rounded-xl"
                  />
                  <p>Caracteristica del producto</p>
                </div>

                <div className="flex mt-5">
                  <Image
                    loader={loader}
                    priority={true}
                    width="50"
                    height="50"
                    src="comienzo_53876-25533.jpg?w=360"
                    alt="tailwind logo"
                    className="rounded-xl"
                  />
                  <p>Caracteristica del producto</p>
                </div>

                <div className="flex mt-5">
                  <Image
                    loader={loader}
                    priority={true}
                    width="50"
                    height="50"
                    src="comienzo_53876-25533.jpg?w=360"
                    alt="tailwind logo"
                    className="rounded-xl"
                  />
                  <p>Caracteristica del producto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //imagenes debajo de la principal */}
        <div className="flex ">
          <div className="flex h-32  w-6/12 justify-center">
            <Image
              loader={loaderImage}
              priority={true}
              width="125"
              height="100"
              src={url}
              alt="tailwind logo"
              className="rounded-xl mx-2"
            />
            <Image
              loader={loaderImage}
              priority={true}
              width="125"
              height="100"
              src={url}
              alt="tailwind logo"
              className="rounded-xl mx-2"
            />
            <Image
              loader={loaderImage}
              priority={true}
              width="125"
              height="100"
              src={url}
              alt="tailwind logo"
              className="rounded-xl mx-2"
            />
          </div>
          {/* precio, cantidad y carrito */}
          <div className=" w-6/12 flex justify-between items-center p-4">
            <span className="font-bold">₡ {defaultPrice}</span>
            <div className="flex flex-col items-end p-3">
              <div className="flex items-center mb-2 ">
                <span className="text-grey">Cantidad:</span>
                <div className="bg-resene rounded-full m-1 ">
                  <button className="mb-2 bg-grey rounded-full text-white m-4">
                    <BiMinus onClick={decreaseCounter} />
                  </button>
                  <span>{quantity}</span>
                  <button className="mb-2 bg-grey rounded-full  text-white m-4">
                    <BiPlus onClick={increaseCounter} />
                  </button>
                </div>
              </div>
              <div className="bg-aquamarine rounded-sm p-3  mx-4">
                <button className="text-white text-sm">
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductDetail;
