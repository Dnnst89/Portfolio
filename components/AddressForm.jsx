"use client";
import InputForm from "./InputForm";
import Button from "./Button";

export default function AddressForm({ title }) {
  return (
    <div className="w-4/12 bg-resene">
      <h1 className="flex justify-center text-xl m-2">{title}</h1>
      <div className="grid grid-cols-2  p-5 space-x-4">
        <section className="flex flex-col">
          <InputForm label={"Nombre"} htmlFor={"Nombre"} id={"Nombre"} />
          <InputForm
            label={"Correo Electrónico"}
            htmlFor={"Correo"}
            id={"Correo"}
          />
          <InputForm label={"País"} htmlFor={"País"} id={"País"} />
          <InputForm label={"Cantón"} htmlFor={"Cantón"} id={"Cantón"} />
          <InputForm label={"Código Postal"} htmlFor={"Postal"} id={"Postal"} />
          <InputForm label={"Otras señas"} htmlFor={"Señas"} id={"Señas"} />
        </section>
        <section className="flex flex-col">
          <InputForm
            label={"Apellidos"}
            htmlFor={"Apellidos"}
            id={"Apellidos"}
          />
          <InputForm label={"Teléfono"} htmlFor={"Teléfono"} id={"Teléfono"} />
          <InputForm
            label={"Provincia"}
            htmlFor={"Provincia"}
            id={"Provincia"}
          />
          <InputForm label={"Ciudad"} htmlFor={"Ciudad"} id={"Ciudad"} />
          <InputForm
            label={"Dirección"}
            htmlFor={"Dirección"}
            id={"Dirección"}
          />
        </section>
      </div>
      <div className="flex space-x-3 pl-5">
        <label>Factura Electrónica</label>
        <input type="checkbox" className="w-5 h-5 border-pink-500 rounded-lg" />
      </div>
      <div className="grid grid-cols-2  p-5 space-x-4">
        <section className="flex flex-col">
          <InputForm
            label={"Tipo de cédula"}
            htmlFor={"Apellidos"}
            id={"Apellidos"}
          />
          <InputForm
            label={"Nombre comercial"}
            htmlFor={"Teléfono"}
            id={"Teléfono"}
          />
        </section>
        <section className="flex flex-col">
          <InputForm
            label={"Cédula comercial"}
            htmlFor={"Apellidos"}
            id={"Apellidos"}
          />
          <InputForm
            label={"Correo Electrónico"}
            htmlFor={"Teléfono"}
            id={"Teléfono"}
          />
        </section>
      </div>
      <div className="flex justify-center p-5">
        <Button link={""} bgColor={"pink-200"} description={"Guardar"} />
      </div>
    </div>
  );
}
