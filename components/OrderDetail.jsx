"use client";
import Link from "next/link";
export default function OrderDetail({
  numero,
  nombre,
  provincia,
  ciudad,
  articulos,
}) {
  return (
    <div className="bg-resene w-6/12">
      <h1 className="flex justify-center mt-3 text-xl">Tus pedidos</h1>
      <div className=" p-4 h-auto grid grid-cols-3 gap-4 pt-5">
        <section className="bg-floralwhite flex flex-col items-center border-2 border-dashed border-grey-200 rounded-2xl h-[250px]">
          <h2 className="font-semibold mt-8">N° {numero}hola</h2>
          <div className="text-sm space-y-2 pt-3">
            <div>Nombre:{nombre}</div>
            <div>Provincia:{provincia}</div>
            <div>Ciudad:{ciudad}</div>
            <div>Articulos: {articulos}</div>
          </div>
          <Link href={"/order/orderViewDetail"}>
            <button className="bg-aquamarine mt-3 p-1 rounded-sm text-floralwhite">
              Ver detalle
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
}
