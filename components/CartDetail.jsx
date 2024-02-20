"use client";
import useStorage from "@/hooks/useStorage";
import useCartSummary from "@/hooks/useCartSummary";
import Spinner from "./Spinner";
import { getAccessToken, formatTaxData } from "@/helpers";
import { useCallback, useEffect, useState } from "react";
import { facturationInstace } from "@/src/axios/algoliaIntance/config";
import GET_STORE_INFO from "@/src/graphQl/queries/getStoreInformation";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { isTaxesLoading } from "@/redux/features/cart-slice";

const CartDetail = ({
  isCheckout = false,
  detailTitle = "Detalle del carrito",
  deliveryPayment,
  onChange,
  loading,
  items,
  quantity,
  subTotal,
}) => {
  const { user } = useStorage();
  const dispatch = useDispatch();
  const { data: storeInformation, error: storeInformationError } = useQuery(
    GET_STORE_INFO,
    {
      variables: {
        id: 1,
      },
    }
  );

  const withoutDelivery = 0;
  const currency =
    storeInformation?.storeInformation?.data?.attributes?.currency;
  const [shipment, setShipment] = useState(0);
  const [amounts, setAmounts] = useState({
    total: 0,
    tax: 0,
    currencyType: currency,
    loading: false,
  });
  // const {
  //   loading,
  //   items,
  //   quantity,
  //   total: subTotal,
  // } = useCartSummary({
  //   userId: user?.id,
  // });

  useEffect(() => {
    if (subTotal !== undefined) {
      if (deliveryPayment != 0) {
        const newTotal =
          parseFloat(subTotal) +
          parseFloat(amounts.tax) +
          parseFloat(deliveryPayment);
        const newAmount = {
          tax: amounts.tax,
          total: parseFloat(newTotal),
          loading: false,
          currencyType: currency,
        };

        setAmounts(newAmount);
      } else if (deliveryPayment === withoutDelivery) {
        const newTotal = parseFloat(subTotal) + parseFloat(amounts.tax);
        const newAmount = {
          tax: amounts.tax,
          total: parseFloat(newTotal),
          loading: false,
          currencyType: currency,
        };
        setAmounts(newAmount);
      } else {
        const newTotal = subTotal.toFixed(2) + amounts.tax.toFixed(2);
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
    setShipment(0);
    if (items !== null || items !== null) {
      getTaxCost();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const getTaxCost = async () => {
    setAmounts((prev) => ({
      //mientras obtiene los taxes pone a cargar el loading
      ...prev,
      loading: true,
    }));
    //TODO: dispatch(isTaxesLoading(true))
    dispatch(isTaxesLoading(true)); //
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
      //TODO: dispatch(isTaxesLoading(false))
      dispatch(isTaxesLoading(false));
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
            {
              // Se carga unicamente cuando estamos en checkout
              isCheckout ? (
                <div className="flex justify-between ">
                  <p>Costo de envío:</p>
                  <p className="whitespace-nowrap">
                    {parseFloat(deliveryPayment).toFixed(2)}{" "}
                    {amounts.currencyType}
                  </p>
                </div>
              ) : (
                ""
              )
            }

            <div className="flex flex-col p-4 space-y-3">
              <p className="flex justify-center">Costo Total(IVA Incluido)</p>
              <p className="flex justify-center whitespace-nowrap">
                {amounts?.total.toFixed(2)} {amounts.currencyType}
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
