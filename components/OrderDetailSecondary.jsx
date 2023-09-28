"use client";
import Image from "next/image";
import test from "../app/assets/heart.png";
import CartDetail from "@/components/CartDetail";
import CartProceedPayment from "@/components/CartProceedPayment";
export default function OrderDetailSecondary({
  pedido,
  nombre,
  brand,
  ref,
  articulos,
}) {
  return (
    <div className="bg-resene">
      <h1 className="flex justify-center text-xl p-5">Pedido N°: {pedido}</h1>
      <div className=" lg:space-x-8 sm:pt- sm:block md:block lg:flex">
        <div>
          <section className=" border-b-2 border-dashed border-grey-200 p-5 h-[125px]">
            <div className="flex lg:space-x-3  sm:space-between">
              <Image
                src={test}
                alt="imagen de producto seleccionado"
                style={{ width: "100px", height: "90px" }}
                className="rounded-xl"
              />
              <div className="flex sm:items-center md:items-baseline lg:items-baseline justify-between sm:p-3  sm:w-full">
                <div className="pr-5">
                  <h1 className="sm:text-sm">Nombre del item{nombre}</h1>
                  <h5 className="text-sm text-lightblue">Brand name{brand}</h5>
                  <h5 className="text-sm">Ref 000000{ref}</h5>
                </div>
                <div>
                  <h1 className="sm:text-sm">N° artículos:{articulos} </h1>
                  <p className="sm:text-sm ">$0,000.0</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="lg:border-l-4 lg:border-lightblue  h-[450px] p-3 sm:border-0">
          <CartDetail detailTitle={"Detalle del pedido"} />
          <CartProceedPayment textButton={"Ver dirección"} page={""} />
        </section>
      </div>
    </div>
  );
}
