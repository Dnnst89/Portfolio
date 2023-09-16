"use client";
import { useState } from "react";
import Image from "next/image";
import test from "../assets/heart.png";
import { BiPlus, BiMinus, BiX } from "react-icons/bi";

export default function CardView() {
  const [quantity, setQuantity] = useState(1);

  const decreaseCounter = () => {
    if (quantity === 0) return;
    setQuantity((prev) => --prev);
  };

  const increaseCounter = () => {
    setQuantity((prev) => ++prev);
  };

  return (
    <div className="bg-floralwhite">
      <div className="flex justify-center mt-4">
        <h1 className="text-xl">Carrito de compras</h1>
      </div>
      <main className="flex">
        <div className="flex items-center  w-3/4 m-6">
          <section className="flex-3 w-2/4 mx-2">
            <div className="flex items-center">
              <Image
                src={test}
                alt="Detinmarin Logo"
                style={{ width: "140px", height: "140px" }}
              />
              <div className="p-3">
                <h1>Nombre del producto</h1>
                <span className="text-sm text-grey">Ref 000000</span>
              </div>
            </div>
          </section>

          <section className="w-1/4 mx-2 ">
            <div className="flex items-center mb-2 ">
              <span className="text-grey">Cantidad:</span>
              <div className="bg-resene rounded-full m-3 w-[120px] flex items-center justify-center p-2 space-x-4">
                <button className=" bg-grey rounded-full text-white">
                  <BiMinus onClick={decreaseCounter} />
                </button>
                <span>{quantity}</span>
                <button className=" bg-grey rounded-full  text-white">
                  <BiPlus onClick={increaseCounter} />
                </button>
              </div>
            </div>
          </section>

          <section className=" flex w-1/4 mx-2 items-center justify-center ">
            <span>$0,000.00</span>
            <span className="ml-3 text-3xl">
              {/* <BiX /> */}
              🗑
            </span>
          </section>
        </div>
        <CartDetail />
      </main>
    </div>
  );
}

function CartDetail() {
  return (
    <div className="bg-resene rounded-sm">
      <h1>Detalle del carrito</h1>
      <section>
        <p>N artículos</p>
      </section>
    </div>
  );
}
