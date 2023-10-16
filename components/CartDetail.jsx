"use client";
import useStorage from "@/hooks/useStorage";
import useCartSummary from "@/hooks/useCartSummary";
import Spinner from "./Spinner";
import { getAccessToken, formatTaxData } from "@/helpers";
import { useCallback, useEffect, useState } from "react";
import { facturationInstace } from "@/src/axios/algoliaIntance/config";

const CartDetail = ({
  isCheckout = false,
  detailTitle = "Detalle del carrito",
  onChange,
}) => {
  const { user } = useStorage();
  const [amounts, setAmounts] = useState({
    total: 0,
    tax: 0,
    currencyType: "CRC",
  });
  const {
    loading,
    items,
    quantity,
    total: subTotal,
  } = useCartSummary({
    userId: user?.id,
  });

  useEffect(() => {
    getTaxCost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items?.length]);

  const getTaxCost = async () => {
    if (!items.length) return;
    const token = await getAccessToken();
    const formatedItems = formatTaxData(items);
    const body = {
      serviceDetail: {
        lineDetails: [...formatedItems],
      },
    };
    const { data } = await facturationInstace.post(
      `/utils/get-detail-line?access_token=${token}`,
      body
    );
    setAmounts((prev) => ({
      ...prev,
      total: data?.billSummary?.totalDocument,
      tax: data?.billSummary?.totalTax,
    }));
    if (isCheckout) {
      onChange({
        total: data?.billSummary?.totalDocument,
        taxes: data?.billSummary?.totalTax,
        subTotal,
      });
    }
  };

  return (
    <div className="p-3 space-y-3">
      {!loading ? (
        <>
          <h1 className=" flex justify-center">{detailTitle}</h1>

          <div className="flex justify-between ">
            <p className="whitespace-nowrap ">N° artículos</p>
            <p className="text-grey-100">{quantity}</p>
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
            <p className="text-grey-100">${subTotal}</p>
          </div>
          <div className="flex justify-between border-dashed border-grey-200 border-b-[2px] pb-3">
            <p>Costo de envío:</p>
            <p className="text-grey-100">$0,000.00</p>
          </div>

          <>
            <div className="flex justify-between ">
              <p>Impuestos:</p>
              <p className="text-grey-100">
                {amounts.tax} {amounts.currencyType}
              </p>
            </div>
            <div className="flex flex-col p-4 space-y-3">
              <p className="flex justify-center">Costo Total(IVA Incluido)</p>
              <p className="flex justify-center text-grey-100">
                {amounts?.total}
                {amounts.currencyType}
              </p>
            </div>
          </>
        </>
      ) : (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
export default CartDetail;
