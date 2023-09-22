"use client";
import { useState } from "react";
import Image from "next/image";
import { BiPlus, BiMinus } from "react-icons/bi";
import "@/styles/detail.page.css";
import Link from "next/link";
import AddCartItemBtn from "./AddCartItemBtn";

const loader = ({ src }) => {
  return `https://img.freepik.com/vector-gratis/${src}`;
};

const loaderImage = ({ src }) => {
  return `http://ec2-54-189-90-96.us-west-2.compute.amazonaws.com:1337${src}`;
};
function ProductDetail({ name, description, sku, variants, materials }) {
  const [quantity, setQuantity] = useState(1);

  let images;
  if (variants.length > 0) {
    images = variants[0].attributes.images.data;
  }

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
            {variants.length > 0 ? (
              <ProductImage
                key={variants[0].attributes.images.data[0].id}
                url={variants[0].attributes.images.data[0].attributes.url}
                width={"500"}
                height={"800"}
                className={"rounded-xl mx-2"}
              />
            ) : null}
          </div>
          {/* parte derecha de la imagen principal grande*/}
          <div className="w-6/12 flex flex-col">
            <h2 className="flex justify-end">Ref {sku}</h2>
            <h1 className="mb-3">{name}</h1>
            <p>{description}</p>
            <a onClick={() => handleClick()}>
              <button className="flex justify-start text-lightblue">
                Leer mas
              </button>
            </a>
            {/* imagenes iconos y caracteristicas */}
            <div className="flex">
              {/* primera caja */}
              <div className="w-3/6">
                <div className="flex mt-5 items-center">
                  <Image
                    loader={loaderImage}
                    priority={true}
                    width="50"
                    height="50"
                    src="/uploads/Asset_4_2_f88170fa82.png"
                    alt="tailwind logo"
                    className="rounded-xl"
                  />
                  {materials.length > 0 ? (
                    <p>Tipo de material: {materials[0].attributes.name}</p>
                  ) : null}
                </div>

                <div className="flex mt-5 items-center">
                  <Image
                    loader={loaderImage}
                    priority={true}
                    width="50"
                    height="50"
                    src="/uploads/Asset_4_2_f88170fa82.png"
                    alt="tailwind logo"
                    className="rounded-xl"
                  />
                  {variants.length > 0 ? (
                    <p>Color: {variants[0].attributes.color}</p>
                  ) : null}
                </div>

                <div className="flex mt-5 items-center">
                  <Image
                    loader={loaderImage}
                    priority={true}
                    width="50"
                    height="50"
                    src="/uploads/Asset_4_2_f88170fa82.png"
                    alt="tailwind logo"
                    className="rounded-xl"
                  />
                  {variants.length > 0 ? (
                    <p>Tamaño: {variants[0].attributes.size}</p>
                  ) : null}
                </div>
              </div>
              {/* segunda caja */}
              <div className=" w-3/6">
                <div className="flex mt-5 items-center">
                  <Image
                    loader={loaderImage}
                    priority={true}
                    width="50"
                    height="50"
                    src="/uploads/Asset_4_2_f88170fa82.png"
                    alt="tailwind logo"
                    className="rounded-xl"
                  />
                  {variants.length > 0 ? (
                    <p>Rango de edades: {variants[0].attributes.ageRange}</p>
                  ) : null}
                </div>

                <div className="flex mt-5 items-center">
                  <Image
                    loader={loaderImage}
                    priority={true}
                    width="50"
                    height="50"
                    src="/uploads/Asset_4_2_f88170fa82.png"
                    alt="tailwind logo"
                    className="rounded-xl"
                  />
                  {variants.length > 0 ? (
                    <p>Stock: {variants[0].attributes.stock}</p>
                  ) : null}
                </div>

                <div className="flex mt-5 items-center">
                  <Image
                    loader={loaderImage}
                    priority={true}
                    width="50"
                    height="50"
                    src="/uploads/Asset_4_2_f88170fa82.png"
                    alt="tailwind logo"
                    className="rounded-xl"
                  />
                  {variants.length > 0 ? (
                    <p>
                      Peso: {variants[0].attributes.weight.weight}{" "}
                      {variants[0].attributes.weight.unitWeight}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //imagenes debajo de la principal */}
        <div className="flex ">
          <div className="flex h-32  w-6/12 justify-center">
            {images
              ? images.map((item) => {
                return (
                  <ProductImage
                    key={item.id}
                    url={item.attributes.url}
                    width={"125"}
                    height={"100"}
                    className={"rounded-xl mx-2"}
                  />
                );
              })
              : null}
          </div>
          {/* precio, cantidad y carrito */}
          <div className=" w-6/12 flex justify-between items-center p-4">
            <span className="font-bold">
              ₡ {variants.length > 0 ? variants[0].attributes.price : null}
            </span>
            <div className="flex flex-col items-end p-3">
              <div className="flex items-center mb-2 ">
                <span className="text-grey">Cantidad:</span>
                <div className="bg-resene rounded-full m-3 w-[120px] flex items-center justify-center p-2 space-x-4">
                  <button className=" bg-grey-100 rounded-full text-white">
                    <BiMinus onClick={decreaseCounter} />
                  </button>
                  <span>{quantity}</span>
                  <button className=" bg-grey-100 rounded-full  text-white">
                    <BiPlus onClick={increaseCounter} />
                  </button>
                </div>
              </div>
              <div className="bg-aquamarine rounded-sm p-3  mx-4">
                <AddCartItemBtn quantity={quantity} idVariant={variantId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductDetail;
