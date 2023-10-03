import React, { useEffect, useState } from "react";
import paymentRequest from "@/api/tilopay/paymentRequest";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { GET_PAYMENT_DETAILS } from "@/src/graphQl/queries/getPaymentDetails";
import { useQuery } from "@apollo/client";
import { paymentDataForm } from "@/app/data/tilopay/transactionData";
export default function CheckOutForm3() {
  const router = useRouter();
  const [formData, setFormData] = useState(paymentDataForm);
  const userInSession = JSON.parse(localStorage.getItem("userData"));
  const { id, email } = userInSession?.user || {};
  // total final to pay , WE NEED TO GET IT FROM FACTURAZEN
  const total = parseFloat(0.1);
  const { loading, error, data } = useQuery(GET_PAYMENT_DETAILS, {
    variables: { userId: id },
  });
  // RETRIEVE USER DATA
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
        console.log("form 1 :", userData);
        const { data: orderDetailsData } = order_details || { data: [] };
        // Use the find method to search for the order with the specific orderNumber

        // Use filter to find orders with "Pending" status
        const pendingOrderId = orderDetailsData
          .filter((orderDetail) => orderDetail.attributes.status.includes("P"))
          .map((orderDetail) => orderDetail.id);
        //get the total of the pending order
        const specificOrder = orderDetailsData.find(
          (orderDetail) => orderDetail.id === pendingOrderId.join(",")
        );

        // const pendingOrderAmount = specificOrder.attributes.total;

        if (pendingOrderId) {
          // You can access the total and status properties of the specific order
          // PAYMENT DATA
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
  const paymentUrlPromise = paymentRequest();

  let paymentUrl = "";
  paymentUrlPromise
    .then((result) => {
      paymentUrl = result;
    })
    .catch((error) => {
      console.error("Promise rejected with error:", error);
    });

  return (
    <div className="mt-[40px] mx-[30px]">
      <div className="flex w-3/4 justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
        <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
          3
        </div>
        <h1 className="text-xl">Formulario de pago</h1>
      </div>

      <div className="flex justify-center mt-8 mb-8 w-3/4">
        <button
          onClick={() => router.push(paymentUrl)}
          className="bg-pink-200 text-white rounded-sm p-2 w-[200px] whitespace-nowrap"
        >
          Proceder al pago
        </button>
      </div>
    </div>
  );
}
