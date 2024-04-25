"use client";
import useStorage from "@/hooks/useStorage";
import useCartSummary from "@/hooks/useCartSummary";
import Spinner from "./Spinner";
import { getAccessToken, formatTaxData } from "@/helpers";
import { useEffect, useState } from "react";
import { facturationInstace } from "@/src/axios/algoliaIntance/config";
import GET_STORE_INFO from "@/src/graphQl/queries/getStoreInformation";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { isTaxesLoading } from "@/redux/features/cart-slice";

const CartDetail = ({
  isCheckout = false,
  detailTitle = "Detalle del carrito",
  deliveryPayment,
  paymentAmount,
  showDeliveryPayment,
}) => {
  const { user } = useStorage();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
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
  const [amounts, setAmounts] = useState({
    total: 0,
    tax: 0,
    currencyType: currency,
    loading: false,
  });
  const {
    items,
    quantity,
    total: subTotal,
  } = useCartSummary({
    userId: user?.id,
  });

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

  /**
   * Verifica si la entidad requiere el calculo de impuesto.
   */
  useEffect(() => {
    if (cart.showTaxes) {   
      getTaxCost();
      console.log(amounts);
    } else {
      /**
       * Se envía la data necesaria al setAmounts para mostrar
       * los valores en la tabla del detalle del carrito
       */
      setAmounts({
        tax: 0,
        total: subTotal,
        loading: false,
        currencyType: currency,
      });
      /**
       * si esta en el checkout, se envía la data al método handlePaymentAmount(formOne),
       * data necesaria para proceder al pago final
       */
      if (isCheckout) {
        paymentAmount({
          total: subTotal,
          taxes: 0,
          subTotal,
        });
      }
      dispatch(isTaxesLoading(false));
    }
  }, [quantity]);

  const getTaxCost = async () => {
    setAmounts((prev) => ({
      ...prev,
      loading: true,
    }));

    try {
      if (!items.length) {
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
        total: parseFloat(data?.billSummary?.totalDocument).toLocaleString('en-US',{maximumFractionDigits: 0 }),
        tax: parseFloat(data?.billSummary?.totalTax).toLocaleString('en-US',{maximumFractionDigits: 0 }),
      }));
      alert(data?.billSummary?.totalDocument);
      if (isCheckout) {
        paymentAmount({
        total: parseFloat(data?.billSummary?.totalDocument).toLocaleString('en-US',{maximumFractionDigits: 0 }),
        tax: parseFloat(data?.billSummary?.totalTax).toLocaleString('en-US',{maximumFractionDigits: 0 }),
          subTotal,
        });
      }
    } catch (error) {
      console.error(
        "La solicitud de impuestos ha presentado un error.",
        error
      );
    } finally {
      setAmounts((prev) => ({
        ...prev,
        loading: false,
      }));
    }
    dispatch(isTaxesLoading(false));
  };

  return (
    <div className="p-3 md:space-y-3">
      <h2 className="tittle flex justify-center">{detailTitle}</h2>
      {!cart.loadingTaxes ? (
        <>
          <div className="flex justify-between ">
            <p className="whitespace-nowrap">N° artículos:</p>
            <p className="whitespace-nowrap">{quantity}</p>
          </div>
          <div className="flex justify-between ">
            <p>Subtotal:</p>
            <p className="whitespace-nowrap">
              {parseFloat(subTotal).toLocaleString('en-US',{maximumFractionDigits: 0 })} &nbsp;
              {amounts.currencyType}
            </p>
          </div>

          <div className="flex justify-between border-dashed border-grey-200 border-b-[2px] pb-3">
            {cart.showTaxes ? (
              <>
                <p>Impuestos:</p>
                <p className="whitespace-nowrap">
                  {parseFloat(amounts.tax).toLocaleString('en-US',{maximumFractionDigits: 0 })} {amounts.currencyType}
                </p>
              </>
            ) : null}
          </div>

          <>
            {
              // Se carga unicamente cuando estamos en checkout
              showDeliveryPayment ? (
                <div className="flex justify-between ">
                  <p>Costo de envío:</p>
                  <p className="whitespace-nowrap">
                    {parseFloat(deliveryPayment).toLocaleString('en-US', { minimumFractionDigits: 0})}{" "}
                    {amounts.currencyType}
                  </p>
                </div>
              ) : (
                ""
              )
            }

            <div className="flex flex-col p-4 space-y-3">
              {cart.showTaxes ? (
                <p className="flex justify-center">
                  Costo Total (IVA Incluido):
                </p>
              ) : (
                <p className="flex justify-center">Costo Total:</p>
              )}
              <p className="flex justify-center whitespace-nowrap">
                {parseFloat(amounts?.total).toLocaleString('en-US',{maximumFractionDigits: 0 })} {amounts.currencyType}
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
