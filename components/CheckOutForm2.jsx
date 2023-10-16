"use client";
import Image from "next/image";
import moovin from "../app/assets/moovin.png";
import logo from "../app/assets/tk-logo.png";
import { useState } from "react";
import { CREATE_ORDER } from "@/src/graphQl/queries/createUserOrder";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PENDING_ORDER } from "@/src/graphQl/queries/isOrderPending";
import useStorage from "@/hooks/useStorage";
import CheckOutForm3 from "./CheckOutForm3";

export default function CheckOutForm2({ amount }) {
  const [checktOutForm2Visible, setChecktOutForm2Visible] = useState(false);
  const [createOrder] = useMutation(CREATE_ORDER);
  const { user } = useStorage();
  const { id } = user || {};
  // retrieving pending order if exist
  const { data } = useQuery(GET_PENDING_ORDER, {
    variables: { userId: id, status: "P" },
  });
  // getting pending order
  const status = data?.orderDetails?.data[0]?.attributes?.status;
  // an order might not exist
  const orderNumber = data?.orderDetails?.data[0]?.id;
  const resentPendingOrder = () => {
    // storing ordernumber if exist
    localStorage.setItem("createdOrder", orderNumber);
    setChecktOutForm2Visible(true);
  };

  const handleCreateOrder = async () => {
    const isoDate = new Date().toISOString();
    const { total, subTotal, taxes } = amount;
    try {
      const { data } = await createOrder({
        variables: {
          user_id: id,
          total: total,
          subTotal: subTotal,
          taxes: taxes,
          status: "P", // Pending
          publishedAt: isoDate,
        },
      });

      // if the order not exist we create one
      // After create an order now we can get that pending order
      const orderNumber = await data?.createOrderDetail?.data?.id;
      // Store the orderNumber in localStorage
      localStorage.setItem("createdOrder", orderNumber);
      setChecktOutForm2Visible(true);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="mt-[40px] mx-[30px]">
      <div className="flex w-3/4 justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
        <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
          2
        </div>
        <h1 className="text-xl">Método de envío</h1>
      </div>
      {!checktOutForm2Visible ? (
        <>
          <div className="w-3/4 flex flex-col items-center mt-5 space-y-10">
            <section className="bg-white w-3/4 flex  rounded-t-3xl drop-shadow-lg text-xl">
              <div className=" border-r-2 border-dashed border-grey-200  w-[100px] flex justify-center items-center ml-[10px]">
                <input
                  type="radio"
                  id="moovin"
                  name="del_method"
                  value="MOOVIN"
                  className="w-5 h-5"
                />
              </div>
              <div className="flex  items-center  pl-[90px]">
                <label className="tracking-wider">Envío a través de:</label>
                <Image
                  src={moovin}
                  alt=""
                  style={{ width: "230px", height: "65px" }}
                  className="ml-10"
                />
              </div>
            </section>
            <section className="bg-white w-3/4 flex  rounded-t-3xl drop-shadow-lg text-xl">
              <div className=" border-r-2 border-dashed border-grey-200  w-[100px] flex justify-center items-center ml-[10px]">
                <input
                  type="radio"
                  id="moovin"
                  name="del_method"
                  value="MOOVIN"
                  className="w-5 h-5"
                />
              </div>
              <div className="flex  items-center  pl-[90px]">
                <label className="tracking-wider">Recoger en tienda:</label>
                <Image
                  src={logo}
                  alt=""
                  style={{ width: "150px", height: "65px" }}
                  className="ml-20"
                />
              </div>
            </section>
          </div>
          <div className="flex justify-center mt-8 mb-8 w-3/4 ">
            <button
              onClick={() => {
                status === "P" ? resentPendingOrder() : handleCreateOrder();
              }}
              className="bg-pink-200 text-white rounded-sm p-2 w-[150px] whitespace-nowrap"
            >
              Continuar
            </button>
          </div>
        </>
      ) : (
        <CheckOutForm3 />
      )}
    </div>
  );
}
