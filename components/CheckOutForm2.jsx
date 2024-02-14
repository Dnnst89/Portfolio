"use client";
import Image from "next/image";
import moovin from "../app/assets/moovin.png";
import logo from "../app/assets/tk-logo.png";
import { useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import useStorage from "@/hooks/useStorage";
import CheckOutForm3 from "./CheckOutForm3";
import useCartSummary from "@/hooks/useCartSummary";
import { AiOutlineEdit } from "react-icons/ai";
import CREATE_PAYMENT_DETAIL from "@/src/graphQl/queries/createPaymentDetails";
import CREATE_EXCHANGE_RATE from "@/src/graphQl/queries/createExchangeRate";
import UPDATE_EXCHANGE_RATE from "@/src/graphQl/queries/updateExchangeRate";
import GET_EXCHANGE_RATE from "@/src/graphQl/queries/getExchangeRate";
import Spinner from "./Spinner";
import { useForm } from "react-hook-form";
import { createOrderData, orderMoovin } from "@/api/moovin/createOrder";
import { requestEstimation, createData } from "@/api/moovin/estimation";
import getTipoCambio from "@/api/cambio/getTipoCambio";

import toast, { Toaster } from "react-hot-toast";
export default function CheckOutForm2({
  amount,
  checkbox,
  setDeliveryPayment,
  setAmount,
  lat,
  lng,
}) {
  const isoDate = new Date().toISOString();
  const [paymentDetailId, setPaymentDetailId] = useState(null);
  const [checktOutForm2Visible, setChecktOutForm2Visible] = useState(false);
  const { total, subTotal, taxes } = amount;

  let paymentDetailResponseId = null;
  const [createPaymentDetail] = useMutation(CREATE_PAYMENT_DETAIL);
  const [createExchangeRate] = useMutation(CREATE_EXCHANGE_RATE);
  const [updateExchangeRate] = useMutation(UPDATE_EXCHANGE_RATE);
  let exchangeRateResponseId = null;
  const [exchangeRateId, setExchangeRateId] = useState(null);

  const { user } = useStorage();
  const { id } = user || {};
  const [tipoCambio, setTipoCambio] = useState(null);
  const [estima, setEstima] = useState(null);

  //me traigo los items de carrito para crear los items de la orden
  const { items } = useCartSummary({
    userId: id,
  });

    // Se obtiene el tipo de cambio actualizado
      const {
        loading,
        error,
        data,
      } = useQuery(GET_EXCHANGE_RATE)
      

      // 
      //console.log("data",data)
      
      
        
      //setTipoCambio(data["exchangeRates"]["data"][0]["attributes"]["purchase"])
    //console.log("id exchange " ,data?.exchangeRates?.data);
  // const ExchangeRatePurchase = ;
  

  // const fetchEstimation = async () => {
  //   try {
  //     try {
  //       const shipmentInfo = createData(items, lat, lng);
  //       const estimation = await requestEstimation(shipmentInfo);
  //       setDeliveryPayment(estimation.amount);
  //     } catch (error) {}
  //     //   console.log("amount total", amounts.total);
  //     const suma = parseFloat(subTotal + taxes);
  //     const finalAmount = {
  //       total: parseFloat(subTotal + taxes + estimation.amount),
  //       subTotal: subTotal,
  //       taxes: taxes,
  //     };

  //     setAmount(finalAmount);
  //     // console.log("suma", suma);
  //   } catch (error) {
  //     console.error("Error al obtener los datos:", error);
  //     // Puedes manejar el error según tus necesidades
  //   }
  // };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const fetchTipoCambio = async () => {
    try { 
      const exchangeLength = data?.exchangeRates?.data?.length
      const exchangeId = data?.exchangeRates?.data[0]?.id
      // const exchangePurchase = data?.exchangeRates?.data[0]?.attributes.purchase

      // console.log("Exchange length: " , exchangeLength)
      // console.log("exchangeId: ", exchangeId)
      // console.log("exchange purchase", exchangePurchase)
      
      // Llama a la función para obtener el tipo de cambio
      const tipoCambioResultado = await getTipoCambio();
      // Almacena el tipo de cambio en el estado del componente
      setTipoCambio(tipoCambioResultado.compra) 
      try {
        console.log("exchange length:  " , exchangeLength)
      
        if( exchangeLength === 0){
          //console.log(exchangeLength)
        const ExchangeRateResponse = await createExchangeRate({
          variables: {
            purchase: tipoCambioResultado.compra,
            sale: tipoCambioResultado.venta,
            date: isoDate,
            publishedAt: isoDate,
          },
          
        });
        
        exchangeRateResponseId =
        ExchangeRateResponse?.data?.createExchangeRate?.data?.id;
        
        setExchangeRateId(exchangeRateResponseId);
      }
      else{
        //console.log("exchangeLength else")
        updateExchangeRate({//actualizo el registro en base de datos
          variables: {
            exchangeRateId: exchangeId,
            newPurchase: tipoCambioResultado.compra,
            newSale: 560,
            newDate: isoDate,
          },
        });
     }
        
      }  catch (error) {
        console.error(error);
      }
      
    } catch (error) {
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      //setTipoCambio(exchangePurchase);
      console.error("Error al obtener el tipo de cambio:", error);
    }
  };
 
  // useEffect(() => {
  //   // Este efecto se ejecutará cada vez que 'data' cambie
  //   // Aquí puedes realizar las acciones necesarias después de que 'data' se actualice
  //   // Por ejemplo, puedes verificar el nuevo valor de 'length' y realizar acciones en consecuencia
  //   console.log("Nuevo valor de 'length': ", data?.exchangeRates?.data?.length);
  // }, [data]);
  
  useEffect(() => {
    if (!loading ){
      try {
        fetchTipoCambio();
      } catch (error) {
        console.log("error", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading,setDeliveryPayment]);



  const onSubmit = handleSubmit(async (data) => {
    if (data.deliveryMethod != "Recoger en tienda") {
      try {
        const shipmentInfo = createData(items, lat, lng);
        const estimation = await requestEstimation(shipmentInfo);
        const deliveryPrice = Math.ceil(
          estimation.optionService[1].amount / tipoCambio
        );
        setDeliveryPayment(deliveryPrice.toFixed(2));
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
        console.error("Error al obtener los datos:", error);
        toast.error(
          "El lugar seleccionado se encuentra fuera del area de cobertura"
        );
      }
    } else {
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
        setDeliveryPayment(0);
        setChecktOutForm2Visible(true);
      } catch (error) {
        console.error(error);
      }
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
          <div className="w-full flex flex-col items-center mt-5 space-y-10">
            <section className="bg-white w-3/4 flex  rounded-t-3xl drop-shadow-lg text-xl">
              <div className=" border-r-2 border-dashed border-grey-200  w-[100px] flex justify-center items-center ml-[10px]">
                <input
                  type="radio"
                  id="moovin"
                  name="del_method"
                  value="Recoger en tienda"
                  className="w-5 h-5"
                  defaultChecked
                  {...register("deliveryMethod")}
                />
              </div>
              <div className="items-center pl-5 md:pl-[90px] md:flex">
                <label className="text-sm md:text-xl md:tracking-wider">
                  Recoger en tienda:
                </label>
                <Image
                  src={logo}
                  alt=""
                  style={{ width: "auto", height: "65px" }}
                  className="m-auto md:ml-20 py-2"
                />
              </div>
            </section>
            <section className="bg-white w-3/4 flex  rounded-t-3xl drop-shadow-lg text-xl">
              <div className=" border-r-2 border-dashed border-grey-200  w-[100px] flex justify-center items-center ml-[10px]">
                <input
                  type="radio"
                  id="moovin"
                  name="del_method"
                  value="Envío a través de MOOVIN"
                  className="w-5 h-5"
                  {...register("deliveryMethod")}
                />
              </div>
              <div className="items-center pl-5 md:pl-[90px] md:flex">
                <label className="text-sm md:text-xl md:tracking-wider">
                  Envío a través de:
                </label>
                <Image
                  src={moovin}
                  alt=""
                  style={{ width: "auto", height: "65px" }}
                  className="max-h-[50px] md:max-h-[50px] m-auto md:ml-20 py-2"
                />
              </div>
            </section>
          </div>
          <div className="flex justify-center m-auto mt-8 mb-8 w-3/4 ">
            <button
              // onClick={() => {
              //   handleCreatePaymentDetail();
              // }}
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
