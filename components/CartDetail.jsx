"use client";
import useStorage from "@/hooks/useStorage";
import useCartSummary from "@/hooks/useCartSummary";
import Spinner from "./Spinner";
// import { getAccessToken } from "@/helpers";
import { useEffect } from "react";

<<<<<<< HEAD
const CartDetail = ({ isCheckout = false, detailTitle }) => {
=======
const CartDetail = ({
  isCheckout = false,
  detailTitle = "Detalle del carrito",
}) => {
>>>>>>> dev
  const { user } = useStorage();

  const {
    loading,
    items,
    quantity,
    total: subTotal,
  } = useCartSummary({
    userId: user?.id,
  });

  useEffect(() => {
    // getAccessToken();
    getTaxCost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items?.length]);

  const getTaxCost = () => {
    const lineDetails = items?.map((item) => {
      return {
        measurementUnit: "Sp",
        unitaryPrice: item?.attributes?.variant?.data?.attributes?.price,
        qty: item?.quantity,
        cabys:
          item?.attributes?.variant?.data?.attributes?.product?.data?.attributes
            ?.cabys,
      };
    });
    const body = {
      serviceDetail: {
        lineDetails,
      },
    };
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
          <div className="flex justify-between ">
            <p>Costo de envío:</p>
            <p className="text-grey-100">$0,000.00</p>
          </div>
          <hr />
          {isCheckout ? (
            <div className="flex flex-col p-4 space-y-3">
              <p className="flex justify-center">Costo Total(IVA Incluido)</p>
              <p className="flex justify-center text-grey-100">$0,000.00</p>
            </div>
          ) : null}
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
