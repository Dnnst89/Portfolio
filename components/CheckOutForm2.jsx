"use client";
import Image from "next/image";
import moovin from "../app/assets/moovin.png";
import logo from "../app/assets/tk-logo.png";
import { useEffect, useState } from "react";
import { CREATE_ORDER } from "@/src/graphQl/queries/createUserOrder";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PENDING_ORDER } from "@/src/graphQl/queries/isOrderPending";
import useStorage from "@/hooks/useStorage";
import CheckOutForm3 from "./CheckOutForm3";
import { UPDATE_ORDER } from "@/src/graphQl/queries/updateTotal";
export default function CheckOutForm2({ amount }) {
  const [myOrderNumber, setMyOrderNumber] = useState(null);
  let retrievedOrderNumber = null;
  const [checktOutForm2Visible, setChecktOutForm2Visible] = useState(false);
  const { total, subTotal, taxes } = amount;
  const [createOrder] = useMutation(CREATE_ORDER);
  const [updateOrder] = useMutation(UPDATE_ORDER);
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
  const resentPendingOrder = async () => {
    // storing ordernumber if exist
    /**
     * if the order exist we need to update the
     * amount of the order everytime the user
     * decides to change the order
     */
    try {
      const { data } = await updateOrder({
        variables: {
          order_Id: orderNumber,
          total: total,
          subTotal: subTotal,
          taxes: taxes,
        },
      });
      retrievedOrderNumber = data?.updateOrderDetail?.data?.id;
      console.log("order updated", retrievedOrderNumber);
      // Now that you have the updated order number
      setMyOrderNumber(retrievedOrderNumber);
      //localStorage.setItem("createdOrder", orderNumber);
      setChecktOutForm2Visible(true);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleCreateOrder = async () => {
    const isoDate = new Date().toISOString();
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
      setMyOrderNumber(orderNumber);
      setChecktOutForm2Visible(true);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
        <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
          2
        </div>
        <h1 className="text-xl">Método de envío</h1>
      </div>
      {!checktOutForm2Visible ? (
        <>
          <div className="w-full flex flex-col items-center mt-5 space-y-10">
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
                  style={{ width: "auto", height: "65px" }}
                  className="ml-10 py-2"
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
                  defaultChecked
                />
              </div>
              <div className="flex  items-center  pl-[90px]">
                <label className="tracking-wider">Recoger en tienda:</label>
                <Image
                  src={logo}
                  alt=""
                  style={{ width: "auto", height: "65px" }}
                  className="ml-20 py-2"
                />
              </div>
            </section>
          </div>
          <div className="flex justify-center m-auto mt-8 mb-8 w-3/4 ">
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
        <CheckOutForm3 myOrderNumber={myOrderNumber} />
      )}
    </div>
  );
}
