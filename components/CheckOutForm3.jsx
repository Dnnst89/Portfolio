"use client";
import { useEffect, useState } from "react";
import paymentRequest from "@/api/tilopay/paymentRequest";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
/*
  we should store the order number otherwise we cant continue with the
  payment.
  order detail is going have three states
  1- approved = payment successful
  2- error = insuficient founds
  3- pendiente = because we should get an order number to continue.

  ---- Process to get donde the payment ----
  step 1 - get the data i need to insert the order
  - user id - user in sesion
  - total - any
  - payment_id - any
  - state - defualt
*/
// workin visa card 5100270000000023
// insuficient founds card 4112 6134 5159 1116
export default function CheckOutForm3() {
  const [paymentUrl, setPaymentUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = await paymentRequest();
        setPaymentUrl(url);
      } catch (error) {
        console.error("Error fetching payment URL:", error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-[40px] mx-[30px]">
      <div className="flex w-3/4 justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
        <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
          3
        </div>
        <h1 className="text-xl">Formulario de pago</h1>
      </div>

      <div className="flex justify-center mt-8 mb-8 w-3/4 ">
        {/* Render the payment button when paymentUrl is available */}

        <a href={paymentUrl ?? ""}>
          <button className="bg-pink-200 text-white rounded-sm p-2 w-[200px] whitespace-nowrap">
            {paymentUrl ? "Proceder al pago " : <Spinner />}
          </button>
        </a>
      </div>
    </div>
  );
}
