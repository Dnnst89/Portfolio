"use client";
import Image from "next/image";
import test from "../app/assets/heart.png";
import CartDetail from "@/components/CartDetail";
import CartProceedPayment from "@/components/CartProceedPayment";
export default function OrderDetailSecondary({ pedido, numero }) {
  return (
    <div className="bg-resene">
      <h1 className="flex justify-center text-xl p-5">Pedido N°: {pedido}</h1>
      <div className="flex space-x-5">
        <div>
          <section className=" border-b-2 border-dashed border-grey-200 p-5 h-[125px]">
            <div className="flex space-x-3">
              <Image
                src={test}
                alt="imagen de producto seleccionado"
                style={{ width: "100px", height: "90px" }}
                className="rounded-xl"
              />

              <div className="pr-5">
                <h1>Nombre del item</h1>
                <h5 className="text-sm text-lightblue">Brand name</h5>
                <h5 className="text-sm">Ref 000000</h5>
              </div>
              <div>
                <h1>N° artículos:{numero} </h1>
                <p>$0,000.0</p>
              </div>
            </div>
          </section>
        </div>
        <section className="border-l-4 border-lightblue h-[500px] p-3">
          <CartDetail detailTitle={"Detalle del pedido"} />
          <CartProceedPayment textButton={"Ver dirección"} page={""} />
        </section>
      </div>
    </div>
  );
}
