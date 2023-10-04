"use client";
import InputForm from "./InputForm";
import CartDetail from "./CartDetail";

export default function CheckOutForm1() {
  return (
    <div className="mt-[40px] mx-[30px]">
      <div className="flex w-3/4 justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
        <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
          1
        </div>
        <h1 className="text-xl">Información de envío</h1>
      </div>
      <main className="flex ">
        <section className="w-3/4">
          <div className="flex justify-center">
            <section className="w-1/4 flex flex-col p-2">
              <InputForm label={"Nombre"} htmlFor={"name"} id={"name"} />
              <InputForm
                label={"Correo Electrónico"}
                htmlFor={"email"}
                id={"email"}
              />
              <InputForm label={"País"} htmlFor={"country"} id={"country"} />
              <InputForm label={"Cantón"} htmlFor={"canton"} id={"canton"} />
              <InputForm label={"Código Postal"} htmlFor={"zip"} id={"zip"} />
              <InputForm label={"Segunda Dirección"} htmlFor={"2"} id={"2"} />
            </section>
            <section className="w-1/4 flex flex-col p-2">
              <InputForm
                label={"Apellidos"}
                htmlFor={"lastname"}
                id={"lastname"}
              />
              <InputForm label={"Teléfono"} htmlFor={"phone"} id={"phone"} />
              <InputForm
                label={"Provincia"}
                htmlFor={"provincia"}
                id={"provincia"}
              />
              <InputForm label={"Ciudad"} htmlFor={"city"} id={"city"} />
              <InputForm
                label={"Dirección"}
                htmlFor={"direction"}
                id={"direction"}
              />
            </section>
          </div>
          <div className="flex justify-center">
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
            <section className="w-1/4 flex flex-col p-2  ">
              <InputForm
                label={"Tipo De Cédula"}
                htmlFor={"cedula"}
                id={"cedula"}
              />
              <InputForm
                label={"Nombre Comercial"}
                htmlFor={"businessname"}
                id={"businessname"}
              />
            </section>
            <section className="w-1/4 flex flex-col p-2">
              <InputForm
                label={"Cédula Comercial"}
                htmlFor={"businessid"}
                id={"businessid"}
              />
              <InputForm
                label={"Correo Electrónico"}
                htmlFor={"email2"}
                id={"email2"}
              />
            </section>
          </div>
        </section>
        <div className=" bg-resene rounded-sm w-1/4 h-[350px] ml-[25px] mt-[-80px]">
          <div className="flex flex-col space-y-3 ">
            <CartDetail detailTitle={"Detalle del carrito"} />
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
