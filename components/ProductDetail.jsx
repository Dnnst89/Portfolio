"use client";
import { useState } from "react";
import Image from "next/image";
import { BiPlus, BiMinus } from "react-icons/bi";
import "@/styles/detail.page.css";
import Link from "next/link";
import AddCartItemBtn from "./AddCartItemBtn";
import ProductImage from "./ProductImage";

const loader = ({ src }) => {
  return `https://img.freepik.com/vector-gratis/${src}`;
};

const loaderImage = ({ src }) => {
  return `http://ec2-54-189-90-96.us-west-2.compute.amazonaws.com:1337${src}`;
};
function ProductDetail({ name, description, sku, variants, materials }) {
  const [quantity, setQuantity] = useState(1);

  let images = 0;
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
  const shortDescrption = description.split(",")[0];

  return (
    <>
      <div className="bg-floralwhite" target="_blank" rel="noopener noreferrer">
        <div className=" p-5 flex ">
          {/* imagen principal grande */}
          <div className="w-6/12 flex justify-center">
            {images.length > 0 ? (
              <ProductImage
                key={variants[0].attributes.images.data[0].id}
                url={images[0].attributes.url}
                width={"450"}
                height={"800"}
                className={"rounded-xl mx-2"}
              />
            ) : null}
          </div>
          {/* parte derecha de la imagen principal grande*/}
          <div className="w-6/12 flex flex-col">
            <h2 className="flex justify-end text-sm">Ref {sku}</h2>
            <h1 className="mb-3 text-xl">{name}</h1>
            <p>{shortDescrption}...</p>
            <a onClick={() => handleClick()}>
              <button className="flex justify-start text-lightblue mb-3">
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
                    className="rounded-xl mr-3"
                  />
                  <p>
                    Tipo de material : <br />
                    {materials.length > 0 ? materials[0].attributes.name : null}
                  </p>
                </div>
                <div className="flex mt-5 items-center">
                  <Image
                    loader={loaderImage}
                    priority={true}
                    width="50"
                    height="50"
                    src="/uploads/Asset_4_2_f88170fa82.png"
                    alt="tailwind logo"
                    className="rounded-xl mr-3"
                  />
                  <p className="">
                    Color:
                    <span className="m-2">
                      {variants.length > 0
                        ? variants[0].attributes.color
                        : null}
                    </span>
                  </p>
                </div>

                <div className="flex mt-5 items-center">
                  <Image
                    loader={loaderImage}
                    priority={true}
                    width="50"
                    height="50"
                    src="/uploads/Asset_4_2_f88170fa82.png"
                    alt="tailwind logo"
                    className="rounded-xl mr-3"
                  />
                  <p>
                    Tamaño:
                    <span className="m-2">
                      {variants.length > 0 ? variants[0].attributes.size : null}
                    </span>
                  </p>
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
                    className="rounded-xl mr-3"
                  />
                  <p>
                    Rango de edades:
                    <br />
                    {variants.length > 0
                      ? variants[0].attributes.ageRange
                      : null}
                  </p>
                </div>

                <div className="flex mt-5 items-center">
                  <Image
                    loader={loaderImage}
                    priority={true}
                    width="50"
                    height="50"
                    src="/uploads/Asset_4_2_f88170fa82.png"
                    alt="tailwind logo"
                    className="rounded-xl mr-3"
                  />
                  <p>
                    Stock:
                    <span className="m-2">
                      {variants.length > 0
                        ? variants[0].attributes.stock
                        : null}
                    </span>
                  </p>
                </div>

                <div className="flex mt-5 items-center">
                  <Image
                    loader={loaderImage}
                    priority={true}
                    width="50"
                    height="50"
                    src="/uploads/Asset_4_2_f88170fa82.png"
                    alt="tailwind logo"
                    className="rounded-xl mr-3"
                  />
                  <p>
                    Peso:
                    <span className="m-2">
                      {variants.length > 0 &&
                      variants[0].attributes.weight != null
                        ? variants[0].attributes.weight.weight +
                          variants[0].attributes.weight.unitWeight
                        : null}
                    </span>
                  </p>
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
                {/* <AddCartItemBtn quantity={quantity} idVariant={variantId} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductDetail;
