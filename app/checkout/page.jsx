"use client";
import Image from "next/image";
import "../../styles/checkout.page.css";
import CartDetail from "@/components/CartDetail";
import moovin from "../assets/moovin.png";

export default function CheckOut() {
  return (
    <div className="mt-[40px] mx-[30px]">
      <div className="flex w-3/4 justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
        <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
          {" "}
          1{" "}
        </div>
        <h1>Información de envío</h1>
      </div>
      <main className="flex ">
        <section className="w-3/4">
          <div className="flex justify-center">
            <section className="w-1/4 flex flex-col p-2 space-y-1">
              <label>Nombre</label>
              <input />
              <label>Correo Electrónico</label>
              <input />
              <label>País</label>
              <input />
              <label>Cantón</label>
              <input />
              <label>Código Postal</label>
              <input />
              <label>Otras señas</label>
              <input />
            </section>
            <section className="w-1/4 flex flex-col p-2 space-y-1">
              <label>Apellidos</label>
              <input />
              <label>Teléfono</label>
              <input />
              <label>Provincia</label>
              <input />
              <label>Ciudad</label>
              <input />
              <label>Dirección</label>
              <input />
            </section>
          </div>
          <div className="flex  justify-center">
            <section className="w-1/4 flex p-2">
              <p className="mr-4 whitespace-nowrap">Factura Electrónica</p>
              <label className="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </section>
            <section className="w-1/4 flex p-2"></section>
          </div>
          <div className="flex justify-center">
            <section className="w-1/4 flex flex-col p-2  space-y-1">
              <label>Tipo De Cédula</label>
              <input />
              <label>Nombre Comercial</label>
              <input />
            </section>
            <section className="w-1/4 flex flex-col p-2  space-y-1">
              <label>Cédula Comercial</label>
              <input />
              <label>Correo Electrónico</label>
              <input />
            </section>
          </div>
        </section>
        <div className=" bg-resene rounded-sm w-1/4 h-[350px] ml-[25px] mt-[-80px]">
          <div className="flex flex-col space-y-3 ">
            <CartDetail />
          </div>
        </div>
      </main>
      <div className="flex justify-center mt-8 mb-8 w-3/4 ">
        <button className="bg-pink-200 text-white rounded-sm p-2 w-[150px] whitespace-nowrap">
          Continuar
        </button>
      </div>
      <DeliveryMethod />
    </div>
  );
}

function DeliveryMethod() {
  return (
    <div className=" ">
      <div className="flex w-3/4 justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
        <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
          {" "}
          2{" "}
        </div>
        <h1>Método de envío</h1>
      </div>
      <div className="w-3/4 flex justify-center mt-5 bg-pink-100">
        <div className="bg-white w-3/4 flex justify-center items-center rounded-t-3xl drop-shadow-lg text-xl">
          <input
            type="radio"
            id="moovin"
            name="del_method"
            value="MOOVIN"
            className="mr-[100px]"
          />
          <label className="tracking-wider">Envío a través de:</label>
          <Image
            src={moovin}
            alt=""
            style={{ width: "230px", height: "65px" }}
            className="ml-5"
          />
        </div>
      </div>
      <div className="flex justify-center mt-8 mb-8 w-3/4 ">
        <button className="bg-pink-200 text-white rounded-sm p-2 w-[150px] whitespace-nowrap">
          Continuar
        </button>
      </div>
    </div>
  );
}
