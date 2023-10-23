"use client";
import React, { useEffect, useState } from "react";
import paymentRequest from "@/api/tilopay/paymentRequest";
import { useRouter } from "next/navigation";
import { GET_PAYMENT_DETAILS } from "@/src/graphQl/queries/getPaymentDetails";
import { useQuery } from "@apollo/client";
import { paymentDataForm } from "@/app/data/tilopay/transactionData";
import useStorage from "@/hooks/useStorage";
import useCartSummary from "@/hooks/useCartSummary";
import AlertNotAuth from "./AlertNotAuth";
import toast, { Toaster } from "react-hot-toast";

export default function CheckOutForm3({ paymentDetailId }) {
  console.log("-----------", paymentDetailId);
  const router = useRouter();
  const [formData, setFormData] = useState(paymentDataForm);
  const { user } = useStorage();
  const { id, email } = user || {};
  const cartSummary = useCartSummary({
    userId: user?.id,
  });
  // total final to pay , WE NEED TO GET IT FROM FACTURAZEN
  //RETRIEVE STATUS
  // get the order retrieved or created
  // Retrieve user data
  const { loading, error, data } = useQuery(GET_PAYMENT_DETAILS, {
    variables: { userId: id, status: "P" },
  });
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
          phoneNumber,
          order_details,
        } = userData;
        const total = order_details?.data[0]?.attributes?.total;
        // the next step is to send the data to the request
        // we load data into the state
        if (userData) {
          setFormData({
            amount: total,
            billToFirstName: firstName,
            billToLastName: lastName,
            billToAddress: userAddressAttributes.addressLine1,
            billToAddress2: userAddressAttributes.addressLine2,
            billToCity: userAddressAttributes.canton,
            billToState: userAddressAttributes.province,
            billToZipPostCode: userAddressAttributes.postCode,
            billToTelephone: phoneNumber,
            billToEmail: email,
            orderNumber: paymentDetailId,
          });
        } else {
          // Handle the case where the specific order is not found
          console.log("Specific order not found.");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error]);
  // The data is ready to send it to the object that will be
  // called by the request method.
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
  const paymentUrlPromise = paymentRequest();
  // the url return an payment url to redirect the user to Tilopay payment.
  let paymentUrl = "";
  paymentUrlPromise
    .then((result) => {
      paymentUrl = result;
    })
    .catch((error) => {
      console.error("Promise rejected with error:", error);
    });

  const handleVerification = () => {
    //verifica que no haya ningun error de stock con la cantidad de productos que lleva
    if (cartSummary.errors.errorStock.length > 0) {
      toast.custom((t) => (
        <AlertNotAuth
          t={t}
          msj={
            "Lo sentimos ha sucedido un error con tu compra, verifica tus productos"
          }
          newRoute={"/cart"}
        />
      ));
    } else {
      router.push(paymentUrl);
    }
  };

  return (
    <div className="w-full">
      <div>
        <Toaster />
      </div>
      <div className="flex w-full justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
        <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
          3
        </div>
        <h1 className="text-xl">Formulario de pago</h1>
      </div>

      <div className="flex justify-center m-auto mt-8 mb-8 w-3/4">
        <button
          onClick={handleVerification}
          className="bg-pink-200 text-white rounded-sm p-2 w-[200px] whitespace-nowrap"
        >
          Proceder al pago
        </button>
      </div>
    </div>
  );
}
