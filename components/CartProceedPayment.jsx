"use client";
import Link from "next/link";
export default function CartProceedPayment() {
  return (
    <div className="flex flex-col p-4 space-y-3">
      <div className="flex justify-between ">
        <p>Entrega Estimada:</p>
        <p className="text-grey">DD/MM/AA</p>
      </div>
      <p className="flex justify-center text-sm text-grey whitespace-nowrap">
        *Detalle acerca de la fecha de entrega*
      </p>

      <Link className="flex justify-center" href={"/checkout"}>
        <button className="bg-pink-200 text-white rounded-sm p-2 w-[200px] whitespace-nowrap">
          Proceder al pago
        </button>
      </Link>
    </div>
  );
}
