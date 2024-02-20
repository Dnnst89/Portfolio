"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
export default function CartProceedPayment({ textButton, page, error }) {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="flex flex-col p-4 space-y-3">
      <div className="flex justify-between ">
        <p>Entrega Estimada:</p>
        <p className="whitespace-nowrap">48 horas hábiles</p>
      </div>
      <p className="flex justify-center text-sm whitespace-nowrap">
        *Detalle acerca de la fecha de entrega*
      </p>
      <div className="m-auto">
        <Link href={page}>
          <button
            role="button"
            className={`bg-pink-200 text-white rounded-sm p-2 w-[200px] whitespace-nowrap ${
              error?.length > 0 ? "cursor-not-allowed" : "cursor-pointer" //si el arreglo de errores tiene algun id d eun item que este provocando errores
            }`}
            disabled={error?.length > 0 || cart.loadingTaxes}
          >
            {error?.length > 0 || cart.loadingTaxes
              ? "Procesando..."
              : textButton}
          </button>
        </Link>
      </div>
      {error?.length > 0 ? ( //si el arreglo de errores tiene algun id deun item que este provocando errores
        <p className={`text-orange w-full text-center`}>
          Hay un problema en tu carrito
        </p>
      ) : null}
    </div>
  );
}
