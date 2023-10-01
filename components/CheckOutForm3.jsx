import React, { useEffect, useState } from "react";
import paymentRequest from "@/api/tilopay/paymentRequest";
import Spinner from "./Spinner";
import { GET_PAYMENT_DETAILS } from "@/src/graphQl/queries/getPaymentDetails";
import { useQuery } from "@apollo/client";
import { paymentDataForm } from "../app/data/tilopay/transactionData";

export default function CheckOutForm3() {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [formData, setFormData] = useState(paymentDataForm);
  console.log(paymentUrl);
  const userInSession = JSON.parse(localStorage.getItem("userData"));
  const { id, email } = userInSession?.user || {};
  const { loading, error, data } = useQuery(GET_PAYMENT_DETAILS, {
    variables: { userId: id },
  });

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

    // Call fetchData inside a try-catch block
    try {
      fetchData();
    } catch (error) {
      console.error("Error in fetchData:", error);
      // Handle the error as needed
    }
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      const userData = data?.usersPermissionsUser?.data?.attributes;

      if (userData) {
        const {
          firstName,
          lastName,
          users_address: {
            data: { attributes: userAddressAttributes },
          },
          province,
          phoneNumber,
          order_details,
        } = userData;
        // Create an array of order detail objects

        const { data: orderDetailsData } = order_details || { data: [] };
        // Use the find method to search for the order with the specific orderNumber

        // Use filter to find orders with "Pending" status
        const pendingOrderId = orderDetailsData
          .filter((orderDetail) =>
            orderDetail.attributes.status.includes("Pending")
          )
          .map((orderDetail) => orderDetail.id);
        //get the total of the pending order

        const specificOrder = orderDetailsData.find(
          (orderDetail) => orderDetail.id === pendingOrderId.join(",")
        );

        const pendingOrderAmount = specificOrder.attributes.total;
        if (pendingOrderId) {
          // You can access the total and status properties of the specific order

          setFormData({
            amount: pendingOrderAmount,
            billToFirstName: firstName,
            billToLastName: lastName,
            billToAddress: userAddressAttributes.addressLine1,
            billToAddress2: userAddressAttributes.addressLine2,
            billToCity: userAddressAttributes.canton,
            billToState: userAddressAttributes.province,
            billToZipPostCode: userAddressAttributes.postCode,
            billToTelephone: phoneNumber,
            billToEmail: email,
            orderNumber: pendingOrderId.join(","),
          });
        } else {
          // Handle the case where the specific order is not found
          console.log("Specific order not found.");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error]);

  const handlePaymentProceed = () => {
    // Update paymentDataForm with the values from formData
    paymentDataForm.amount = formData.amount;
    paymentDataForm.billToFirstName = formData.billToFirstName;
    paymentDataForm.billToLastName = formData.billToLastName;
    paymentDataForm.billToAddress = formData.billToAddress;
    paymentDataForm.billToAddress2 = formData.billToAddress2;
    paymentDataForm.billToCity = formData.billToCity;
    paymentDataForm.billToState = formData.billToState;
    paymentDataForm.billToZipPostCode = formData.billToZipPostCode;
    paymentDataForm.billToTelephone = formData.billToTelephone;
    paymentDataForm.billToEmail = formData.billToEmail;
    paymentDataForm.orderNumber = formData.orderNumber;

    // You can proceed with the payment logic here
  };
  handlePaymentProceed();
  return (
    <div className="mt-[40px] mx-[30px]">
      <div className="flex w-3/4 justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
        <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
          3
        </div>
        <h1 className="text-xl">Formulario de pago</h1>
      </div>

      <div className="flex justify-center mt-8 mb-8 w-3/4">
        {/* Render the payment button when paymentUrl is available */}
        {loading ? (
          <Spinner />
        ) : error ? (
          <div>Error loading payment details.</div>
        ) : (
          <button
            onClick={paymentUrl}
            className="bg-pink-200 text-white rounded-sm p-2 w-[200px] whitespace-nowrap"
            //disabled={!paymentUrl}
          >
            Proceder al pago
          </button>
        )}
      </div>
    </div>
  );
}
