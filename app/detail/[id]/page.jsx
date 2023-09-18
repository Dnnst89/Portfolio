"use client";
import { useEffect, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import "./../../../styles/detail.page.css";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomReviews = () => getRandomNumber(5, 100);
const getRandomStars = () => Math.random() + getRandomNumber(3, 4);

export default function Post({ params }) {
  const [product, setProduct] = useState(null);
  const { id } = params;

  useEffect(() => {
    if (!id) return null;

    fetch(
      `https://6TQCC8J5LB.algolia.net/1/indexes/development_api::product.product/${id}`,
      {
        headers: {
          "X-Algolia-Api-Key": "5a6490a15e1b2c9a3c53d7f8328c3f8d",
          "X-Algolia-Application-Id": "6TQCC8J5LB",
        },
      }
    )
      .then((res) => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return null;

  const { name } = product;

  console.log(product);

  return (
    <main>
      <ProductDetail />
      <ProductDetailTable />
      <RelatedItems />
    </main>
  );
}

function ProductDetail() {
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
            <img
              width="500"
              height="800"
              src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
              alt="tailwind logo"
              className="rounded-xl w-100 h-800"
            />
          </div>
          {/* parte derecha de la imagen principal grande*/}
          <div className="w-6/12 flex flex-col">
            <h2 className="flex justify-end">Ref 000</h2>
            <h1 className="mb-3">Nombre del producto</h1>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
                  <img
                    width="50"
                    height="50"
                    src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
                    alt="tailwind logo"
                    className="rounded-full mx-2"
                  />
                  <p>Caracteristica del producto</p>
                </div>

                <div className="flex mt-5">
                  <img
                    width="50"
                    height="50"
                    src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
                    alt="tailwind logo"
                    className="rounded-full mx-2"
                  />
                  <p>Caracteristica del producto</p>
                </div>

                <div className="flex mt-5">
                  <img
                    width="50"
                    height="50"
                    src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
                    alt="tailwind logo"
                    className="rounded-full mx-2"
                  />
                  <p>Caracteristica del producto</p>
                </div>
              </div>
              {/* segunda caja */}
              <div className=" w-3/6">
                <div className="flex mt-5">
                  <img
                    width="50"
                    height="50"
                    src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
                    alt="tailwind logo"
                    className="rounded-full mx-2"
                  />
                  <p>Caracteristica del producto</p>
                </div>

                <div className="flex mt-5">
                  <img
                    width="50"
                    height="50"
                    src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
                    alt="tailwind logo"
                    className="rounded-full mx-2"
                  />
                  <p>Caracteristica del producto</p>
                </div>

                <div className="flex mt-5">
                  <img
                    width="50"
                    height="50"
                    src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
                    alt="tailwind logo"
                    className="rounded-full mx-2"
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
            <img
              width="125"
              height="100"
              src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
              alt="tailwind logo"
              className="rounded-xl mx-2"
            />
            <img
              width="125"
              height="100"
              src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
              alt="tailwind logo"
              className="rounded-xl mx-2"
            />
            <img
              width="125"
              height="100"
              src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
              alt="tailwind logo"
              className="rounded-xl mx-2"
            />
          </div>
          {/* precio, cantidad y carrito */}
          <div className=" w-6/12 flex justify-between items-center p-4">
            <span className="font-bold">$58.00</span>
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
                <Link href={"/cart"}>
                  <button className="text-white text-sm">
                    Agregar al carrito
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductDetailTable() {
  return (
    <main className="bg-resene" id="detail-table">
      <section className="flex m-5 gap-5 description-section pt-10">
        <h1 className="m-1 text-lg">Descripción</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </section>
      <section className="mt-2 size-section description-section">
        <h1 className="text-lg mr-5">Reviews</h1>
        <table>
          <tbody className="tbody-clases">
            <tr className="border-b-[1px] border-grey flex gap-[257px] ">
              <th>Nombre</th>
              <th>Puntuacion</th>
              <th>Comentario</th>
            </tr>
            <tr className="border-b-[1px] border-grey flex gap-[200px]">
              <td className="td-starts">Alexandra</td>
              <td>
                <div class="flex items-center td-starts">
                  <svg
                    class="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    4.95 out of 5
                  </p>
                </div>
              </td>
              <td>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </td>
            </tr>
            <tr className="border-b-[1px] border-grey flex gap-[200px]">
              <td className="td-starts">Alexandra</td>
              <td>
                <div class="flex items-center td-starts">
                  <svg
                    class="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    4.95 out of 5
                  </p>
                </div>
              </td>
              <td>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}

function RelatedItems() {
  return (
    <div>
      <div className="flex justify-center p-6">
        <h1 className="text-lg shadow-text">
          Encuentra nuestros articulos relacionados
        </h1>
      </div>
      <section className="flex justify-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </div>
  );
}
