"use client";
import useStorage from "@/hooks/useStorage";
import useCartSummary from "@/hooks/useCartSummary";
import Spinner from "./Spinner";
import { getAccessToken, formatTaxData } from "@/helpers";
import { useCallback, useEffect, useState } from "react";
import { facturationInstace } from "@/src/axios/algoliaIntance/config";
import GET_STORE_INFO from "@/src/graphQl/queries/getStoreInformation";
import { useQuery } from "@apollo/client";

const CartDetail = ({
  isCheckout = false,
  detailTitle = "Detalle del carrito",
  deliveryPayment,
  onChange,
}) => {
  const { user } = useStorage();
  const { data: storeInformation, error: storeInformationError } = useQuery(
    GET_STORE_INFO,
    {
      variables: {
        id: 1,
      },
    }
  );

  const currency =
    storeInformation?.storeInformation?.data?.attributes?.currency;
  const [shipment, setShipment] = useState(0);
  const [amounts, setAmounts] = useState({
    total: 0,
    tax: 0,
    currencyType: currency,
    loading: false,
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
    if (subTotal !== undefined) {
      if (deliveryPayment != 0) {
        const newTotal = subTotal + amounts.tax + deliveryPayment;
        const newAmount = {
          tax: amounts.tax,
          total: newTotal,
          loading: false,
          currencyType: currency,
        };
        setAmounts(newAmount);
      } else {
        console.log("first");
        const newTotal = subTotal + amounts.tax;
        const newAmount = {
          tax: amounts.tax,
          total: newTotal,
          loading: false,
          currencyType: currency,
        };
        setAmounts(newAmount);
      }
    }
    //fetchEstimation();
  }, [deliveryPayment]); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  useEffect(() => {
    console.log("q", quantity);
    setShipment(0);

    getTaxCost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const getTaxCost = async () => {
    setAmounts((prev) => ({
      //mientras obtiene los taxes pone a cargar el loading
      ...prev,
      loading: true,
    }));
    try {
      if (!items.length) {
        // si no hay items se pone por default todo en 0
        setAmounts((prev) => ({
          ...prev,
          total: 0,
          tax: 0,
        }));
      }
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
        total: parseFloat(data?.billSummary?.totalDocument.toFixed(2)),
        tax: parseFloat(data?.billSummary?.totalTax.toFixed(2)),
      }));
      if (isCheckout) {
        onChange({
          total: parseFloat(data?.billSummary?.totalDocument.toFixed(2)),
          taxes: parseFloat(data?.billSummary?.totalTax.toFixed(2)),
          subTotal,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAmounts((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  return (
    <div className="p-3 md:space-y-3">
      <h2 className="tittle flex justify-center">{detailTitle}</h2>
      {!loading && !amounts.loading ? (
        <>
          <div className="flex justify-between ">
            <p className="whitespace-nowrap">N° artículos</p>
            <p className="whitespace-nowrap">{quantity}</p>
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
            <p className="whitespace-nowrap">
              {subTotal.toFixed(2)} &nbsp;
              {amounts.currencyType}
            </p>
          </div>
          <div className="flex justify-between border-dashed border-grey-200 border-b-[2px] pb-3">
            <p>Impuestos:</p>
            <p className="whitespace-nowrap">
              {amounts.tax} {amounts.currencyType}
            </p>
          </div>

          <>
            <div className="flex justify-between ">
              <p>Costo de envío:</p>
              <p className="whitespace-nowrap">
                {deliveryPayment} {amounts.currencyType}
              </p>
            </div>
            <div className="flex flex-col p-4 space-y-3">
              <p className="flex justify-center">Costo Total(IVA Incluido)</p>
              <p className="flex justify-center whitespace-nowrap">
                {amounts?.total} {amounts.currencyType}
              </p>
            </div>
          </>
        </>
      ) : (
        <div className="flex justify-center">
          <p>Calculando costos</p>
          <Spinner />
        </div>
      )}
    </div>
  );
};
export default CartDetail;
