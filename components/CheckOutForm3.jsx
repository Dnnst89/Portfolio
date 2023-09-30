"use client";
import { useEffect, useState } from "react";
import paymentRequest from "@/api/tilopay/paymentRequest";
import Spinner from "./Spinner";
import { GET_PAYMENT_DETAILS } from "@/src/graphQl/queries/getPaymentDetails";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_ORDER_DETAILS_STATUS } from "@/src/graphQl/queries/updateOrderDetailsStatus";
import { paymentDataForm } from "../app/data/tilopay/transactionData";

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
  - state - pending

  detalles*****
  - cuando la orden es rechazada se puede volver a realizar el pago
  con ese mismo numero de orden
  - if the payment had been approved the user cant tilapya
  says the the order is duplicate
  - in summary we need to create the order end update the status only


  *****
  verificar cuando los datos que se ingresan son incorrectos 
*/
// working visa card 5100270000000023
// insuficient founds card 4112 6134 5159 1116

const handlePaymentProceed = async (userData, updateOrderDetailsStatus) => {
  console.log("from method", userData, updateOrderDetailsStatus);
  try {
    // Assuming you have the order details ID and new status from somewhere
    const orderId = "your-order-details-id";
    const newStatus = "approved"; // Change this based on your logic

    // Use the mutation to update the order details status
    const { data } = await updateOrderDetailsStatus({
      variables: {
        userId: id, // User ID
        orderDetailsId: orderId, // Order Details ID
        newStatus: newStatus,
      },
    });

    // Extract the data from the query
    const userData = data?.usersPermissionsUser?.data?.attributes;

    // Generate the updated payment data

    // The data object will contain the result of the mutation
    console.log("Updated order details status:", data);

    // Handle the result as needed
  } catch (error) {
    console.error("Error updating order details status:", error);
    // Handle the error as needed
  }
};

export default function CheckOutForm3() {
  const [paymentUrl, setPaymentUrl] = useState(null);

  //const [updateOrderDetailsStatus] = useMutation(UPDATE_ORDER_DETAILS_STATUS);
  //------------------------------------------------------
  // Retrieve user data from localStorage
  const userInSession = JSON.parse(localStorage.getItem("userData"));
  // get the user data from storage
  const { id } = userInSession?.user || {};
  // get the user from api
  const { loading, error, data } = useQuery(GET_PAYMENT_DETAILS, {
    variables: { userId: id },
  });
  //extract the data from the query
  const userData = data?.usersPermissionsUser?.data?.attributes;
  //handlePaymentProceed(userData, updateOrderDetailsStatus);
  console.log("from here", userData);
  //update the paymentdata and export it to payment request
  generateUpdatedPaymentData(userData);
  //---------------------------------------------

  //----------------------------------------------------

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

        <button
          onClick={handlePaymentProceed}
          className="bg-pink-200 text-white rounded-sm p-2 w-[200px] whitespace-nowrap"
        >
          {paymentUrl ? "Proceder al pago " : <Spinner />}
        </button>
      </div>
    </div>
  );
}
function generateUpdatedPaymentData(userData) {
  console.log("hellloooo", userData);
  return {
    ...paymentDataForm,
    amount: userData?.total,
    billToFirstName: userData?.firstName,
    billToLastName: userData?.lastName,
    billToAddress: userData?.address1,
    billToAddress2: userData?.address2,
    billToCity: userData?.country,
    billToState: userData?.province,
    billToZipPostCode: userData?.post_code,
    billToTelephone: userData?.phone_number,
    billToEmail: userData?.email,
    orderNumber: userData?.order_detail_id,
  };
}
