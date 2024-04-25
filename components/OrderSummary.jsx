import React from "react";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

const OrderSummary = ({
  detailTitle,
  quantity,
  subTotal,
  taxes,
  total,
  deliveryPayment,
}) => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="p-3 space-y-3">
      {
        <>
          <h1 className=" flex justify-center">{detailTitle}</h1>

          <div className="flex justify-between ">
            <p className="whitespace-nowrap ">N° artículos</p>
            <p className="text-grey-100">{quantity}</p>
          </div>
          <div className="flex justify-between ">
            <p>Subtotal:</p>
            <p className="text-grey-100">${subTotal}</p>
          </div>

          {taxes != 0 ? (
            <>
              <div className="flex justify-between ">
                <p>Impuestos:</p>
                <p className="text-grey-100">${taxes}</p>
              </div>
            </>
          ) : null}

          <div className="flex justify-between ">
            <p>Costo de envío:</p>
            <p className="text-grey-100">${parseFloat(deliveryPayment).toLocaleString('en-US', { minimumFractionDigits: 0})}</p>
          </div>
          <div className="flex justify-between ">
            {taxes != 0 ? (
              <>
                <p>Costo Total(IVA Incluido):</p>
              </>
            ) : (
              <p>Costo Total:</p>
            )}
            <p className="text-grey-100">${total}</p>
          </div>
          <hr />
        </>
      }
    </div>
  );
};

export default OrderSummary;
