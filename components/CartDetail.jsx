"use client";
export default function CartDetail() {
  return (
    <div className="p-3 space-y-3">
      <h1 className=" flex justify-center">Detalle del carrito</h1>

      <div className="flex justify-between ">
        <p className="whitespace-nowrap ">N° artículos</p>
        <p className="text-grey-100">$0,000.00</p>
      </div>
      {/* input de codigo promocional comentado en caso de que se quiera usr en elfuturo ===> */}
      {/* <div className="flex justify-center">
        <input
          placeholder="Codigo promocional"
          className="rounded-l-lg text-center"
        />
        <button className="bg-aquamarine p-2 rounded-r-lg w-[60px]">OK</button>
      </div> */}
      <div className="flex justify-between ">
        <p>Subtotal:</p>
        <p className="text-grey-100">$0,000.00</p>
      </div>
      <div className="flex justify-between ">
        <p>Costo de envío:</p>
        <p className="text-grey-100">$0,000.00</p>
      </div>
      <hr />
      <div className="flex flex-col p-4 space-y-3">
        <p className="flex justify-center">Costo Total(IVA Incluido)</p>
        <p className="flex justify-center text-grey-100">$0,000.00</p>
      </div>
    </div>
  );
}
