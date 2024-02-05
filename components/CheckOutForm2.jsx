"use client";
import { storeLogo, moovinLogo, correosDeCR } from "../app/assets/images";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import useStorage from "@/hooks/useStorage";
import CheckOutForm3 from "./CheckOutForm3";
import useCartSummary from "@/hooks/useCartSummary";
import { AiOutlineEdit } from "react-icons/ai";
import CREATE_PAYMENT_DETAIL from "@/src/graphQl/queries/createPaymentDetails";
import Spinner from "./Spinner";
import { useForm } from "react-hook-form";
import { requestEstimation, createData } from "@/api/moovin/estimation";
import getTipoCambio from "@/api/cambio/getTipoCambio";
import GET_DELIVERY_CHOICES from "@/src/graphQl/queries/getDeliveryChoices";
import GET_STORE_LOCATION from "@/src/graphQl/queries/getStoreLocation";
import { DeliveryChoice } from "./deliveryChoice";
import coverageArea from "@/api/moovin/coverageArea";
import calculateShippingDistance from "@/helpers/calculateShippingDistance";
export default function CheckOutForm2({
  amount,
  checkbox,
  deliveryPayment,
  setAmount,
  lat,
  lng,
}) {
  const isoDate = new Date().toISOString();
  const [paymentDetailId, setPaymentDetailId] = useState(null);
  const [checktOutForm2Visible, setChecktOutForm2Visible] = useState(false);
  const [blockMoovin, setBlockMoovin] = useState(false);
  const [isMoreThanTwenty, setIsMoreThanTwenty] = useState(false);

  const { total, subTotal, taxes } = amount;
  let paymentDetailResponseId = null;
  const [createPaymentDetail] = useMutation(CREATE_PAYMENT_DETAIL);
  /**
   * Se obtienen las opciones de delivery
   */
  const { data } = useQuery(GET_STORE_LOCATION, {
    variables: {
      id: 1,
    },
  });

  useEffect(() => {
    try {
      if (data && data.storeInformation && data.storeInformation.data) {
        // se obtienen las coordenadas de la tienda fisica.
        const { latitude, longitude } = data.storeInformation.data.attributes;
        // verificamos si la distancia de entrega exede los 20 kilometros
        var isMoreThanTwenty = calculateShippingDistance(
          latitude,
          longitude,
          lat,
          lng
        );
        setIsMoreThanTwenty(isMoreThanTwenty);
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
  //Store Pick Up
  const SPU =
    deliveryChoicesData?.deliveries?.data?.[2]?.attributes?.delivery_code;
  //Precio por distancia correos de costa rica
  const ShortDistancePrice =
    deliveryChoicesData?.deliveries?.data?.[0]?.attributes
      ?.short_distance_price;
  const LongDistancePrice =
    deliveryChoicesData?.deliveries?.data?.[0]?.attributes?.long_distance_price;

  const { user } = useStorage();
  const { id } = user || {};
  const [tipoCambio, setTipoCambio] = useState(null);
  const [estima, setEstima] = useState(null);

  //me traigo los items de carrito para crear los items de la orden
  const { items } = useCartSummary({
    userId: id,
  });
  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const fetchTipoCambio = async () => {
    try {
      // Llama a la función para obtener el tipo de cambio
      const tipoCambioResultado = await getTipoCambio();
      // Almacena el tipo de cambio en el estado del componente
      setTipoCambio(tipoCambioResultado.compra);
    } catch (error) {
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      console.error("Error al obtener el tipo de cambio:", error);
    }
  };
  useEffect(() => {
    try {
      fetchTipoCambio();
    } catch (error) {
      console.log("error", error);
    }
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryPayment]);
  /**
   * Verifica si las cordenadas de entrega estan dentro
   * de las zonas de entrega de moovin
   */
  useEffect(() => {
    const fetchMoovinCoverageData = async () => {
      try {
        // Se envian las coordenadas que provienen de google map
        // ingresadas en el formulario de direccion
        const result = await coverageArea(lat, lng);
        if (result === "ERRORZONE") {
          //Si la zona esta fuera de cobertura se bloquea el componente
          // y se asigna correos de costa rica como default
          setBlockMoovin(true);
        }
      } catch (error) {
        console.error(
          "Se ha producido un error al verificar las zona de cobertura de Moovin",
          error
        );
      }
    };
    fetchMoovinCoverageData();
  }, [lat, lng]);

  const onSubmit = handleSubmit(async (data) => {
    //delivery method - MVN(Moovin)
    if (data.deliveryMethod === MVN) {
      try {
        const shipmentInfo = createData(items, lat, lng);
        const estimation = await requestEstimation(shipmentInfo);
        const deliveryPrice = Math.ceil(
          estimation.optionService[1].amount / tipoCambio
        );

        deliveryPayment(deliveryPrice.toFixed(2));
        const suma = subTotal + taxes + deliveryPrice;
        const finalAmount = {
          total: parseFloat(suma.toFixed(2)),
          subTotal: subTotal,
          taxes: taxes,
        };
        setEstima(estimation.idEstimation);
        setAmount(finalAmount);
        try {
          const paymentDetailResponse = await createPaymentDetail({
            variables: {
              status: "Inicial",
              subTotal: subTotal,
              taxes: taxes,
              total: finalAmount.total,
              invoiceRequired: checkbox,
              deliveryPayment: parseFloat(deliveryPrice),
              deliveryId: parseInt(estimation.idEstimation),
              deliveryMethod: data.deliveryMethod,
              paymentMethod: "Tarjeta Crédito/ Débito",
              publishedAt: isoDate,
            },
          });
          paymentDetailResponseId =
            paymentDetailResponse?.data?.createPaymentDetail?.data?.id;
          setPaymentDetailId(paymentDetailResponseId);
          setChecktOutForm2Visible(true);
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        /* 
          si la respuesta de estimacion de moovin genera un error
          indica que no tienen covertura en el area seleccionada
          en dado caso se bloquea la opcion de moovin
         */
        setBlockMoovin(true);
        console.error(
          `Actualmente Moovin no ofrece servicio en las coordenadas seleccionadas,
         por favor seleccione alguno de los servicios habilitados para el envio de sus artículos.`,
          error
        );
      }
    } else if (data.deliveryMethod === SPU) {
      try {
        const finalAmount = {
          total: parseFloat(subTotal + taxes).toFixed(2),
          subTotal: subTotal,
          taxes: taxes,
        };
        const paymentDetailResponse = await createPaymentDetail({
          variables: {
            status: "Inicial",
            subTotal: subTotal,
            taxes: taxes,
            total: total,
            invoiceRequired: checkbox,
            deliveryPayment: parseFloat(0),
            deliveryId: parseInt(0),
            deliveryMethod: data.deliveryMethod,
            paymentMethod: "Tarjeta Crédito/ Débito",
            publishedAt: isoDate,
          },
        });

        paymentDetailResponseId =
          paymentDetailResponse?.data?.createPaymentDetail?.data?.id;
        setPaymentDetailId(paymentDetailResponseId);
        setAmount(finalAmount);
        deliveryPayment(0);
        setChecktOutForm2Visible(true);
      } catch (error) {
        console.error(error);
      }
    } else if (data.deliveryMethod === CCR) {
      const totalToPay = subTotal + taxes + LongDistancePrice;
      // Cargamos el objeto con los montos originales
      //que el cliente debera pagar.

      const finalPriceToPay = {
        // Total final le agregamos el costo del envio
        total: totalToPay,
        subTotal: subTotal,
        taxes: taxes,
      };
      //Se envia el costo del delivery y se mostrara
      //en detalles del carrito al seleccionarse Correos de Costa Rica.
      deliveryPayment(LongDistancePrice);
      // retornamos el costo final de la transaccion
      setAmount(finalPriceToPay);
      //verificamos si la distancia exede los 20 kilometros
      isMoreThanTwenty.then((result) => {
        if (result === true) {
          //Creamos la mutacion segun los parametros de Correos de Costa Rica.
          //si la distancia de entrega supera los 20 kilometros.
          // TODO: vericar que la estructura del request esta correcto.
          createPaymentDetail({
            variables: {
              status: "Inicial",
              subTotal: subTotal,
              taxes: taxes,
              total: parseFloat(finalPriceToPay.total),
              invoiceRequired: checkbox,
              deliveryPayment: parseFloat(LongDistancePrice),
              deliveryId: parseInt(CCR_ID),
              deliveryMethod: data.deliveryMethod,
              paymentMethod: "Tarjeta Crédito/ Débito",
              publishedAt: isoDate,
            },
          })
            .then((responsePaymentDetail) => {
              // Log the entire response object
              console.log("Full Response:", responsePaymentDetail);

              // Verificamos si la data esta disponible
              if (responsePaymentDetail && responsePaymentDetail.data) {
                // Handle the response data
                console.log("Response Data:", responsePaymentDetail.data);
                setPaymentDetailId(1);
                setChecktOutForm2Visible(true);
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
          const totalToPay = subTotal + taxes + ShortDistancePrice;
          const finalPriceToPay = {
            total: totalToPay,
            subTotal: subTotal,
            taxes: taxes,
          };

          deliveryPayment(ShortDistancePrice);
          setAmount(finalPriceToPay);

          createPaymentDetail({
            variables: {
              status: "Inicial",
              subTotal: subTotal,
              taxes: taxes,
              total: parseFloat(finalPriceToPay.total),
              invoiceRequired: checkbox,
              deliveryPayment: parseFloat(ShortDistancePrice),
              deliveryId: parseInt(CCR_ID),
              deliveryMethod: data.deliveryMethod,
              paymentMethod: "Tarjeta Crédito/ Débito",
              publishedAt: isoDate,
            },
          })
            .then((response) => {
              // Verificamos si la data esta disponible
              if (response && response.data) {
                console.log("Response:", response);
                setPaymentDetailId(1);
                setChecktOutForm2Visible(true);
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
          <DeliveryChoice
            labelName="Recoger en tienda"
            register={register}
            logo={storeLogo}
            valueName="SPU"
            deliveryId={"SPU"}
            className=""
          />
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
              text={"Moovin no se encuetra disponible en el area seleccionada."}
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
              disabled={total === 0}
              className="bg-pink-200 text-white rounded-sm p-2 w-[150px] whitespace-nowrap"
            >
              {total <= 0 ? <Spinner /> : "Continuar"}
            </button>
          </div>
        </form>
      ) : (
        <CheckOutForm3
          paymentDetailId={paymentDetailId}
          total={total}
          estimation={estima}
          items={items}
          orderNumber={paymentDetailId}
        />
      )}
    </div>
  );
}
