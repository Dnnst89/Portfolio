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
  currency,
}) => {
  const cart = useSelector((state) => state.cart);
  console.log('subTotal',subTotal)
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

            <p className="text-grey-100">
              {currency
                ? `${currency} ${subTotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  })}`
                : `USD ${subTotal.toFixed(2)}`}
            </p>
          </div>

          {taxes != 0 ? (
            <>
              <div className="flex justify-between ">
                <p>Impuestos:</p>
                <p className="text-grey-100">
                  {currency
                    ? `${currency} ${taxes.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}`
                    : `USD ${taxes.toFixed(2)}`}
                </p>
              </div>
            </>
          ) : null}

          <div className="flex justify-between ">
            <p>Costo de envío:</p>
            <p className="text-grey-100">
              {currency
                ? `${currency} ${deliveryPayment.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}`
                : `USD ${deliveryPayment.toFixed(2)}`}
            </p>
          </div>
          <div className="flex justify-between ">
            {taxes != 0 ? (
              <>
                <p>Costo Total(IVA Incluido):</p>
              </>
            ) : (
              <p>Costo Total:</p>
            )}
            <p className="text-grey-100">
              {currency
                ? `${currency} ${total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}`
                : `USD ${total.toFixed(2)}`}
            </p>
          </div>
          <hr />
        </>
      }
    </div>
  );
};

export default OrderSummary;
