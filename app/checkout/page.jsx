"use client";
import CheckOutForm1 from "@/components/CheckOutForm1";
import CheckOutForm2 from "@/components/CheckOutForm2";
import CheckOutHeader from "@/components/CheckoutHeader";
import { GET_PAYMENT_DETAILS } from "@/src/graphQl/queries/getPaymentDetails";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { paymentDataForm } from "../data/tilopay/transactionData";
import { CreateOrderDetail } from "@/api/tilopay/CreateOrderDetail";
const CheckOut = () => {
  //upload the payment data to create the order
  const [formData, setFormData] = useState(paymentDataForm);
  const userInSession = JSON.parse(localStorage.getItem("userData"));
  const { id, email } = userInSession?.user || {};
  const CreatedOrder = CreateOrderDetail(id, "0.1");
  console.log("Created Order :", CreatedOrder);
  const { loading, error, data } = useQuery(GET_PAYMENT_DETAILS, {
    variables: { userId: id },
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
        console.log("first", pendingOrderId);
        const specificOrder = orderDetailsData.find(
          (orderDetail) => orderDetail.id === pendingOrderId.join(",")
        );

        // const pendingOrderAmount = specificOrder.attributes.total;

        if (pendingOrderId) {
          // You can access the total and status properties of the specific order

          setFormData({
            amount: "0.1",
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
    <div>
      <CheckOutHeader />
      <CheckOutForm1 />
      <CheckOutForm2 />
    </div>
  );
};

export default CheckOut;
