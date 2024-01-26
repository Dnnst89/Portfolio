"use client";
import Image from "next/image";
import { storeLogo, moovinLogo } from "../app/assets/images";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import useStorage from "@/hooks/useStorage";
import CheckOutForm3 from "./CheckOutForm3";
import useCartSummary from "@/hooks/useCartSummary";
import { AiOutlineEdit } from "react-icons/ai";
import CREATE_PAYMENT_DETAIL from "@/src/graphQl/queries/createPaymentDetails";
import Spinner from "./Spinner";
import { useForm } from "react-hook-form";
import { createOrderData, orderMoovin } from "@/api/moovin/createOrder";
import { requestEstimation, createData } from "@/api/moovin/estimation";
import getTipoCambio from "@/api/cambio/getTipoCambio";

import toast, { Toaster } from "react-hot-toast";
import { DeliveryChoice } from "./deliveryChoice";
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

  const { total, subTotal, taxes } = amount;
  let paymentDetailResponseId = null;
  const [createPaymentDetail] = useMutation(CREATE_PAYMENT_DETAIL);
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

  const fetchEstimation = async () => {
    try {
      try {
        const shipmentInfo = createData(items, lat, lng);
        const estimation = await requestEstimation(shipmentInfo);
        deliveryPayment(estimation.amount);
      } catch (error) {}
      //   console.log("amount total", amounts.total);
      const suma = parseFloat(subTotal + taxes);
      const finalAmount = {
        total: parseFloat(subTotal + taxes + estimation.amount),
        subTotal: subTotal,
        taxes: taxes,
      };

      setAmount(finalAmount);
      // console.log("suma", suma);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      // Puedes manejar el error según tus necesidades
    }
  };
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

  const onSubmit = handleSubmit(async (data) => {
    if (data.deliveryMethod != "Recoger en tienda") {
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
        deliveryPayment(0);
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
        <form>
          <DeliveryChoice
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
            storeLogo={storeLogo}
          />
          <DeliveryChoice
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
            storeLogo={moovinLogo}
          />
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
