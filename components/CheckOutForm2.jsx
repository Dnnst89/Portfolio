"use client";
import { logo, moovinLogo, correosDeCR } from "../app/assets/images";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import useStorage from "@/hooks/useStorage";
import CheckOutForm3 from "./CheckOutForm3";
import useCartSummary from "@/hooks/useCartSummary";
import { AiOutlineEdit } from "react-icons/ai";
import CREATE_PAYMENT_DETAIL from "@/src/graphQl/queries/createPaymentDetails";
import Spinner from "./Spinner";
import { useForm } from "react-hook-form";
import requestEstimation from "@/api/moovin/estimation";
import createEstimationMoovinRequest from "@/api/moovin/createEstimationMoovinRequest";
import getTipoCambio from "@/api/cambio/getTipoCambio";
import GET_DELIVERY_CHOICES from "@/src/graphQl/queries/getDeliveryChoices";
import GET_STORE_LOCATION from "@/src/graphQl/queries/getStoreLocation";
import CREATE_EXCHANGE_RATE from "@/src/graphQl/queries/createExchangeRate";
import UPDATE_EXCHANGE_RATE from "@/src/graphQl/queries/updateExchangeRate";
import GET_EXCHANGE_RATE from "@/src/graphQl/queries/getExchangeRate";
import { DeliveryChoice } from "./deliveryChoice";
import coverageArea from "@/api/moovin/coverageArea";
import calculateShippingDistance from "@/helpers/calculateShippingDistance";
import { CgArrowLongRight } from "react-icons/cg";
import { useSelector } from "react-redux";
import { MOOVIN_ERROR, MOOVIN_RESPONSE } from "@/helpers/messageTypes";
import useFetchMoovinCoverageData from "@/hooks/useFetchMoovinCoverageData";
import { useLocalCurrencyContext } from "@/src/context/useLocalCurrency";
import { UPDATE_PAYMENT_DETAIL_ORDER } from "@/src/graphQl/queries/UpdatePaymentDetailOrder";
import orderGenerator from "@/helpers/orderGenerator";
import useUpdatePaymentDetailOrder from "@/hooks/useUpdatePaymentDetailOrder";
export default function CheckOutForm2({
  amount,
  checkbox,
  handleDeliveryPayment,
  setAmount,
  lat,
  lng,
  handleCheckout,
}) {
  // if true send LocalCurrencyPrice as price for products else send variant price
  const useLocalCurrency = useLocalCurrencyContext();
  const isoDate = new Date().toISOString();

  const [checktOutForm2Visible, setChecktOutForm2Visible] = useState(false);
  const [isMoreThanDeliveryRange, setIsMoreThanDeliveryRange] = useState(false);
  const [orderGenerated, setOrderGenerated] = useState(null);
  //Exchange rate
  const [createExchangeRate] = useMutation(CREATE_EXCHANGE_RATE);
  const [updateExchangeRate] = useMutation(UPDATE_EXCHANGE_RATE);
  const [updatePaymentDatailOrder] = useMutation(UPDATE_PAYMENT_DETAIL_ORDER);
  const [paymentDetailId, setPaymentDetailId] = useState(null);
  let exchangeRateResponseId = null;
  const [exchangeRateId, setExchangeRateId] = useState(null);
  //Obtenemos el estado de los regalos que se van a envolver
  //seleccionamos la etiqueta que se mostrar en el correo
  const { selectedGifts } = useSelector((state) => state.selectedGifts);
  const selectedGiftsLabels = selectedGifts.map((gift) => gift.label);
  const selectedGiftsString = selectedGiftsLabels.join(", ");

  const { total, subtotal, taxes } = amount;

  let paymentDetailResponseId = null;
  const [createPaymentDetail] = useMutation(CREATE_PAYMENT_DETAIL);
  // llamamos al metodo que genera el numero de orden
  const orderNumber = orderGenerator();
  const {
    updateOrder,
    data: updatedorder,
    error: updatedOrderError,
  } = useUpdatePaymentDetailOrder();
  // se toma la orden final desde strapi que se enviara a tilopay
  const finalOrderNumber =
    updatedorder?.updatePaymentDetail?.data?.attributes?.orderNumber;
  /**
   * Se obtienen las opciones de delivery
   */
  const { data } = useQuery(GET_STORE_LOCATION, {
    variables: {
      id: 1,
    },
  });
  const { loading: load, data: exchangeRate } = useQuery(GET_EXCHANGE_RATE, {});

  useEffect(() => {
    try {
      handleCheckout(true);
      if (data && data.storeInformation && data.storeInformation.data) {
        // se obtienen las coordenadas de la tienda fisica.
        const { latitude, longitude, delivey_distance_range } =
          data.storeInformation.data.attributes;

        // verificamos si la distancia de entrega exede los 20 kilometros
        var isMoreThanDeliveryRange = calculateShippingDistance(
          latitude,
          longitude,
          delivey_distance_range,
          lat,
          lng
        );
        setIsMoreThanDeliveryRange(isMoreThanDeliveryRange);
      }
    } catch (error) {
      console.error("Error processing data:", error);
    }
  }, [data, lat, lng]);

  const {
    loading,
    error,
    data: deliveryChoicesData,
  } = useQuery(GET_DELIVERY_CHOICES);

  //Correos de Costa Rica
  const CCR =
    deliveryChoicesData?.deliveries?.data?.[0]?.attributes?.delivery_code;
  // Correos de Costa Rica Id
  const CCR_ID = deliveryChoicesData?.deliveries?.data?.[0]?.id;

  //Moovin
  const MVN =
    deliveryChoicesData?.deliveries?.data?.[1]?.attributes?.delivery_code;
  const MVN_ID = deliveryChoicesData?.deliveries?.data?.[0]?.id;
  //Store Pick Up
  const SPU =
    deliveryChoicesData?.deliveries?.data?.[2]?.attributes?.delivery_code;
  //Precio por distancia correos de costa rica
  const ShortDistancePrice = useLocalCurrency
    ? deliveryChoicesData?.deliveries?.data?.[0]?.attributes
        ?.short_distance_price
    : deliveryChoicesData?.deliveries?.data?.[3]?.attributes
        ?.short_distance_price;

  const LongDistancePrice = useLocalCurrency
    ? deliveryChoicesData?.deliveries?.data?.[0]?.attributes
        ?.long_distance_price
    : deliveryChoicesData?.deliveries?.data?.[3]?.attributes
        ?.long_distance_price;

  // Dias estimados para la entrega de Correos de Costa Rica
  const LongEstimatedDelivery =
    deliveryChoicesData?.deliveries?.data?.[0]?.attributes
      ?.long_estimate_delivery_date;
  const ShortEstimatedDelivery =
    deliveryChoicesData?.deliveries?.data?.[0]?.attributes
      ?.short_estimate_delivery_date;
  // Entrega estimada para Moovin
  const MoovinEstimatedDelivery =
    deliveryChoicesData?.deliveries?.data?.[1]?.attributes
      ?.short_estimate_delivery_date;

  const { user } = useStorage();
  const { id } = user || {};
  const [tipoCambio, setTipoCambio] = useState(null);
  const [estima, setEstima] = useState(null);

  //me traigo los items de carrito para crear los items de la orden
  const { items } = useCartSummary({
    userId: id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
  } = useForm();
  const fetchTipoCambio = async () => {
    try {
      const tipoCambioResultado = await getTipoCambio();

      // Almacena el tipo de cambio en el estado del componente
      setTipoCambio(tipoCambioResultado.compra);

      updateExchangeRate({
        //actualizo el registro en base de datos
        variables: {
          exchangeRateId: 1,
          newPurchase: tipoCambioResultado.compra,
          newSale: tipoCambioResultado.venta,
          newDate: isoDate,
        },
      });
    } catch (error) {
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      setTipoCambio(exchangeRate?.exchangeRates?.data[0]?.attributes?.purchase);
    }
  };
  useEffect(() => {
    if (!load) {
      try {
        fetchTipoCambio();
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [load]);

  /**
   * Hook
   * Verifica si las cordenadas estan dentro
   * de las zonas de entrega de moovin
   */
  const { blockMoovin, moovinMessageError, isMoovinAvailable } =
    useFetchMoovinCoverageData(lat, lng);
  const onSubmit = handleSubmit(async (data) => {
    //delivery method - MVN(Moovin)
    if (data.deliveryMethod === MVN) {
      try {
        /**
         *  se crea el formato para hacer  para hacer la peticion del costo de envio a Moovin
         */

        const moovinShipmentRequestData = createEstimationMoovinRequest(
          items,
          lat,
          lng
        );
        const estimation = await requestEstimation(moovinShipmentRequestData);
        // Verificamos que el servicio sea tipo Route
        const routeOption = estimation.optionService.find(
          (option) => option.type === MOOVIN_RESPONSE.OPTION_SERVICE_TYPE
        );
        if (routeOption) {
          //obtenemos el costo del delivery
          // const deliveryPrice = Math.ceil(routeOption.amount/1000)*1000;
          const deliveryPrice = useLocalCurrency
            ? Math.ceil(routeOption.amount / 1000) * 1000
            : Math.ceil(routeOption.amount / tipoCambio);
          /**
           * - Metodo llamado en FormOne
           * - Modifica el estado del deliveryPayment
           * - se envia unicamente cuando moovin tiene disponibilidad.
           */
          handleDeliveryPayment(deliveryPrice);

          const suma = subtotal + taxes + deliveryPrice;

          const finalAmount = {
            total: parseFloat(suma),
            subtotal: subtotal,
            taxes: taxes,
          };

          setEstima(estimation.idEstimation);
          setAmount(finalAmount);

          try {
            const paymentDetailResponse = await createPaymentDetail({
              variables: {
                status: "Inicial",
                subtotal: subtotal,
                taxes: taxes,
                total: finalAmount.total,
                invoiceRequired: checkbox,
                deliveryPayment: parseFloat(deliveryPrice),
                deliveryId: parseInt(MVN_ID),
                deliveryMethod: data.deliveryMethod,
                paymentMethod: "Tarjeta Crédito/ Débito",
                publishedAt: isoDate,
                gift: selectedGiftsString,
                //Inicialmente se envia encero,a la espera de la
                //generacion del id de la orden que se toma como
                //referencia el pk de la tabla.
                orderNumber: 1234,
                estimate_delivery_date: MoovinEstimatedDelivery,
              },
            });

            paymentDetailResponseId =
              paymentDetailResponse?.data?.createPaymentDetail?.data?.id;
            // se toma el primary de la orden para localizarla en el checkout 3
            setPaymentDetailId(paymentDetailResponseId);
            //se muestra el checkout 3
            setChecktOutForm2Visible(true);
            //se llama al hook que actualiza la orden
            // se le pasan los parametros necesarios
            if (paymentDetailResponseId) {
              updateOrder(paymentDetailResponseId, orderNumber);
            }
          } catch (error) {
            console.error("Ne se ha podido crear la orden", error);
          }
        }
      } catch (error) {
        console.error(MOOVIN_RESPONSE.ERROR_DEFAULT, error, error);
      }
    } else if (data.deliveryMethod === SPU) {
      try {
        const finalAmount = {
          total: subtotal + taxes,
          subtotal: subtotal,
          taxes: taxes,
        };
        setAmount(finalAmount);

        const paymentDetailResponse = await createPaymentDetail({
          variables: {
            status: "Inicial",
            subtotal: subtotal,
            taxes: taxes,
            total: finalAmount.total,
            invoiceRequired: checkbox,
            deliveryPayment: parseFloat(0),
            deliveryId: parseInt(0),
            deliveryMethod: data.deliveryMethod,
            paymentMethod: "Tarjeta Crédito/ Débito",
            publishedAt: isoDate,
            gift: selectedGiftsString,
            orderNumber: 12421455,
          },
        });

        paymentDetailResponseId =
          paymentDetailResponse?.data?.createPaymentDetail?.data?.id;
        setPaymentDetailId(paymentDetailResponseId);
        setAmount(finalAmount);
        handleDeliveryPayment(0);
        setChecktOutForm2Visible(true);
      } catch (error) {
        console.error(error);
      }
    } else if (data.deliveryMethod === CCR) {
      const totalToPay = subtotal + taxes + LongDistancePrice;
      // Cargamos el objeto con los montos originales
      //que el cliente debera pagar.

      const finalPriceToPay = {
        // Total final le agregamos el costo del envio
        total: totalToPay,
        subtotal: subtotal,
        taxes: taxes,
      };

      //Se envia el costo del delivery y se mostrara
      //en detalles del carrito al seleccionarse Correos de Costa Rica.
      handleDeliveryPayment(LongDistancePrice);
      // retornamos el costo final de la transaccion
      setAmount(finalPriceToPay);
      //verificamos si la distancia exede los 20 kilometros
      isMoreThanDeliveryRange.then((result) => {
        if (result === true) {
          //Creamos la mutacion segun los parametros de Correos de Costa Rica.
          //si la distancia de entrega supera los 20 kilometros.
          // TODO: vericar que la estructura del request esta correcto.

          createPaymentDetail({
            variables: {
              status: "Inicial",
              subtotal: subtotal,
              taxes: taxes,
              total: finalPriceToPay.total,
              invoiceRequired: checkbox,
              deliveryPayment: parseFloat(LongDistancePrice),
              deliveryId: parseInt(CCR_ID),
              deliveryMethod: data.deliveryMethod,
              paymentMethod: "Tarjeta Crédito/ Débito",
              publishedAt: isoDate,
              estimate_delivery_date: LongEstimatedDelivery,
              gift: selectedGiftsString,
              orderNumber: 12421455,
            },
          })
            .then((responsePaymentDetail) => {
              // Verificamos si la data esta disponible
              if (responsePaymentDetail && responsePaymentDetail.data) {
                const paymentDetailResponseId =
                  responsePaymentDetail?.data?.createPaymentDetail?.data?.id;
                setPaymentDetailId(paymentDetailResponseId);
                setChecktOutForm2Visible(true);
                // se toma el primary de la orden para localizarla en el checkout
                //se llama al hook que actualiza la orden
                // se le pasan los parametros necesarios
                if (paymentDetailResponseId) {
                  updateOrder(paymentDetailResponseId, orderNumber);
                }
              }
            })
            .catch((error) => {
              console.error(
                "Se ha producido un error al calcular el envio por correos de Costa Rica. ",
                error
              );
            });
        } else {
          // si la distancia no exede los 20 kilometros
          const totalToPay = subtotal + taxes + ShortDistancePrice;
          // Cargamos el objeto con los montos originales
          //que el cliente debera pagar.

          const finalPriceToPay = {
            // Total final le agregamos el costo del envio
            total: totalToPay,
            subtotal: subtotal,
            taxes: taxes,
          };
          handleDeliveryPayment(ShortDistancePrice);
          setAmount(finalPriceToPay);

          createPaymentDetail({
            variables: {
              status: "Inicial",
              subtotal: subtotal,
              taxes: taxes,
              total: finalPriceToPay.total,
              invoiceRequired: checkbox,
              deliveryPayment: parseFloat(ShortDistancePrice),
              deliveryId: parseInt(CCR_ID),
              deliveryMethod: data.deliveryMethod,
              paymentMethod: "Tarjeta Crédito/ Débito",
              publishedAt: isoDate,
              estimate_delivery_date: ShortEstimatedDelivery,
              gift: selectedGiftsString,
              orderNumber: 12421455,
            },
          })
            .then((response) => {
              // Verificamos si la data esta disponible
              if (response && response.data) {
                const paymentDetailResponseId =
                  response?.data?.createPaymentDetail?.data?.id;
                setPaymentDetailId(paymentDetailResponseId);
                setChecktOutForm2Visible(true);
                if (paymentDetailResponseId) {
                  updateOrder(paymentDetailResponseId, orderNumber);
                }
              }
            })
            .catch((error) => {
              console.error(
                "Se ha producido un error al calcular el envio por correos de Costa Rica. ",
                error
              );
            });
        }
      });
    }
  });
  return (
    <div className="w-full">
      <div className="flex justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200 min-w-[375px]">
        <div className="flex justify-center items-center min-w-[375px]  max-w-[375px] m-auto  justify-between  px-3">
          <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
            2
          </div>
          <h1 className="text-xl min-w-[210px]">Método de envío</h1>
          {checktOutForm2Visible ? (
            <div>
              <button
                className="ml-8"
                onClick={() => setChecktOutForm2Visible(false)}
              >
                <AiOutlineEdit
                  style={{
                    color: "orange",
                  }}
                  size={35}
                />
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {!checktOutForm2Visible ? (
        <form onSubmit={onSubmit}>
          {false && ( // Cambia 'false' a 'true' cuando desees mostrar este DeliveryChoice
            <DeliveryChoice
              labelName="Recoger en tienda"
              register={register}
              logo={logo}
              valueName="SPU"
              deliveryId={"SPU"}
              className=""
              disabled={true}
            />
          )}
          {!blockMoovin ? (
            <DeliveryChoice
              labelName={"Envío a través de"}
              register={register}
              logo={moovinLogo}
              valueName="MVN"
              deliveryId={"MVN"}
              className=""
            />
          ) : (
            <DeliveryChoice
              labelName={"Envío a través de"}
              register={register}
              logo={moovinLogo}
              valueName="MVN"
              deliveryId={"MVN"}
              blockMoovin={blockMoovin}
              className="bg-[#e9ecef]"
              text={moovinMessageError}
            />
          )}

          {
            <DeliveryChoice
              labelName={"Correos de Costa Rica"}
              register={register}
              logo={correosDeCR}
              valueName="CCR"
              deliveryId={"CCR"}
              className=""
            />
          }

          <div className="flex justify-center m-auto mt-8 mb-8 w-3/4 ">
            <button
              type="submit"
              disabled={!isDirty || total === 0}
              className={`${
                !isDirty
                  ? "cursor-default bg-grey-200"
                  : "cursor-pointer bg-pink-200 "
              } rounded-sm p-2 w-[150px] whitespace-nowrap text-white`}
              title={`${!isDirty ? "Seleccione un método de envío" : ""}`}
            >
              {total <= 0 ? <Spinner /> : "Continuar"}
            </button>
          </div>
        </form>
      ) : (
        <CheckOutForm3
          paymentDetailId={paymentDetailId}
          total={total.toFixed(2)}
          estimation={estima}
          items={items}
          orderNumber={finalOrderNumber}
        />
      )}
    </div>
  );
}
