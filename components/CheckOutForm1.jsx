"use client";
import { useState } from "react";
import CartDetail from "./CartDetail";

export default function CheckOutForm1() {
  const [formData, setFormData] = useState({
    redirect: "https://localhost:3000/checkout", // Fix the URL format
    key: process.env.NEXT_PUBLIC_TILOPAY_API_KEY,
    amount: "0.55",
    currency: "CRC",
    billToFirstName: "Danny",
    billToLastName: "Soto",
    billToAddress: "Alajuela",
    billToAddress2: "San Rafael",
    billToCity: "Alajuela",
    billToState: "Alajuela",
    billToZipPostCode: "506",
    billToCountry: "CR",
    billToTelephone: "84111915",
    billToEmail: "dnnst89@gmail.com",
    orderNumber: "1",
    capture: "1",
    subscription: "0",
    platform: "api",
    returnData: "dXNlcl9pZD0xMg==",
    hashVersion: "V2",
  });
  return (
    <div className="mt-[40px] mx-[30px]">
      <div className="flex w-3/4 justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
        <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
          {" "}
          1{" "}
        </div>
        <h1 className="text-xl">Información de envío</h1>
      </div>
      <main className="flex ">
        <section className="w-3/4">
          <div className="flex justify-center">
            <section className="w-1/4 flex flex-col p-2 space-y-1">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.billToFirstName}
                onChange={(e) =>
                  setFormData({ ...formData, billToFirstName: e.target.value })
                }
              />
              <label>Correo Electrónico</label>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.billToEmail}
                onChange={(e) =>
                  setFormData({ ...formData, billToEmail: e.target.value })
                }
              />
              <label>País</label>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.billToCountry}
                onChange={(e) =>
                  setFormData({ ...formData, billToCountry: e.target.value })
                }
              />
              <label>Cantón</label>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.billToCity}
                onChange={(e) =>
                  setFormData({ ...formData, billToCity: e.target.value })
                }
              />
              <label>Código Postal</label>
              <input />
              <label>Otras señas</label>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.billToAddress2}
                onChange={(e) =>
                  setFormData({ ...formData, billToAddress2: e.target.value })
                }
              />
            </section>
            <section className="w-1/4 flex flex-col p-2 space-y-1">
              <label>Apellidos</label>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.billToLastName}
                onChange={(e) =>
                  setFormData({ ...formData, billToLastName: e.target.value })
                }
              />
              <label>Teléfono</label>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.billToTelephone}
                onChange={(e) =>
                  setFormData({ ...formData, billToTelephone: e.target.value })
                }
              />
              <label>Provincia</label>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.billToState}
                onChange={(e) =>
                  setFormData({ ...formData, billToState: e.target.value })
                }
              />
              <label>Ciudad</label>
              <input />
              <label>Dirección</label>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.billToAddress}
                onChange={(e) =>
                  setFormData({ ...formData, billToAddress: e.target.value })
                }
              />
            </section>
          </div>
          <div className="flex  justify-center">
            <section className="w-1/4 flex p-2">
              <p className="mr-4 whitespace-nowrap">Factura Electrónica</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
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
    </div>
  );
}
