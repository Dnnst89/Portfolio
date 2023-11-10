"use client";
import Image from "next/image";
import moovin from "../app/assets/moovin.png";
import logo from "../app/assets/tk-logo.png";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import useStorage from "@/hooks/useStorage";
import CheckOutForm3 from "./CheckOutForm3";
import useCartSummary from "@/hooks/useCartSummary";
import { AiOutlineEdit } from "react-icons/ai";
import CREATE_PAYMENT_DETAIL from "@/src/graphQl/queries/createPaymentDetails";
import Spinner from "./Spinner";
import { useForm } from "react-hook-form";

export default function CheckOutForm2({ amount, checkbox }) {
  const isoDate = new Date().toISOString();
  const [paymentDetailId, setPaymentDetailId] = useState(null);
  const [checktOutForm2Visible, setChecktOutForm2Visible] = useState(false);
  const { total, subTotal, taxes } = amount;
  let paymentDetailResponseId = null;
  const [createPaymentDetail] = useMutation(CREATE_PAYMENT_DETAIL);
  const { user } = useStorage();
  const { id } = user || {};
  //me traigo los items de carrito para crear los items de la orden
  const { items } = useCartSummary({
    userId: id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data.deliveryMethod)
    try {
      const paymentDetailResponse = await createPaymentDetail({
        variables: {
          status: "Inicial",
          subTotal: subTotal,
          taxes: taxes,
          total: total,
          invoiceRequired: checkbox,
          deliveryMethod: data.deliveryMethod,
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
                <label className="text-sm md:text-xl md:tracking-wider">Recoger en tienda:</label>
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
                <label className="text-sm md:text-xl md:tracking-wider">Envío a través de:</label>
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
        <CheckOutForm3 paymentDetailId={paymentDetailId} total={total} />
      )}
    </div>
  );
}
