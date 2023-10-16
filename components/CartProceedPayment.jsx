"use client";
import Link from "next/link";
export default function CartProceedPayment({ textButton, page, error }) {
  return (
    <div className="flex flex-col p-4 space-y-3">

      <div className="flex justify-between ">
        <p>Entrega Estimada:</p>
        <p className="text-grey-100">DD/MM/AA</p>
      </div>
      <p className="flex justify-center text-sm text-grey-100 whitespace-nowrap">
        *Detalle acerca de la fecha de entrega*
      </p>
      <div className="m-auto">
        <Link href={page}>
          <button
            className={`bg-pink-200 text-white rounded-sm p-2 w-[200px] whitespace-nowrap ${error ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            disabled={error}
          >
            {textButton}
          </button>
        </Link>
      </div>

      {error ? <p className={`text-orange w-full text-center`}>Hay un problema en tu carrito</p> : <p className={`text-green w-full text-center`}>Listo para proceder el pago</p>}

    </div>
  );
}
