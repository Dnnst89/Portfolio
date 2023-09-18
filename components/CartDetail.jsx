"use client";

import { useSelector } from "react-redux";

export default function CartDetail() {
  const { cartQtyItems } = useSelector(state => state.cart) //obtengo la cantidad de items que tengo en carrito
  return (
    <div className="flex flex-col space-y-3">
      <h1 className=" flex justify-center">Detalle del carrito</h1>

      <div className="flex justify-between ">
        <p className="whitespace-nowrap ">N° artículos</p>
        <p className="text-grey">{cartQtyItems}</p>
      </div>
      
      <div className="flex justify-between ">
        <p>Subtotal:</p>
        <p className="text-grey">$0,000.00</p>
      </div>
      <div className="flex justify-between ">
        <p>Costo de envío:</p>
        <p className="text-grey">$0,000.00</p>
      </div>
      <hr />
      <div className="flex flex-col p-4 space-y-3">
        <p className="flex justify-center">Costo Total(IVA Incluido)</p>
        <p className="flex justify-center">$0,000.00</p>
      </div>
    </div>
  );
}
