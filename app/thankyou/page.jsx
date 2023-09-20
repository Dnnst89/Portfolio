"use client";
import Image from "next/image";
import Link from "next/link";
import tk from "../assets/tk-logo.png";
export default function ThankYouMessage() {
  return (
    <div className="bg-floralwhite  p-[100px] flex justify-center">
      <main className="bg-resene border-2 border-dashed border-grey-200 flex flex-col justify-center h-auto p-10">
        <section className="flex justify-center ">
          <figure className="">
            <Image
              src={tk}
              alt="Detinmarin logo"
              style={{ width: "390px", height: "170px" }}
            />
          </figure>
          <div className=" flex flex-col items-end justify-center space-y-3">
            <div className="flex flex-col items-center space-y-1 ml-3">
              <h1 className="text-xl bold">¡Gracias por tu compra!</h1>
              <p className="text-sm">Ya estamos preparando tu pedido</p>
            </div>
            <div className="bg-white w-[250px] p-3 flex flex-col items-center ml-[20px] rounded-md">
              <p className="text-grey-100">N° de pedido</p>
              <p>0000000000</p>
            </div>
          </div>
        </section>
        <Link
          href={"/checkout"}
          className="flex items-center justify-center pt-10"
        >
          <button className="bg-pink-200 text-white rounded-sm p-2 w-[150px] ">
            Volver
          </button>
        </Link>
      </main>
    </div>
  );
}
