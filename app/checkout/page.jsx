import { login } from "@/api/tilopay/login";
import CheckOutForm1 from "@/components/CheckOutForm1";
import CheckOutForm2 from "@/components/CheckOutForm2";
import CheckOutForm3 from "@/components/CheckOutForm3";
import CheckOutHeader from "@/components/CheckoutHeader";
import { paymentDataForm } from "../data/tilopay/transactionData";
const PAYMENT_URL = process.env.NEXT_PUBLIC_TILOPAY_PROCESS_TO_PAYMENT;

const CheckOut = async () => {
  const token = await login();

  // object structured based on the response
  let payment_response = {
    type: "",
    html: "",
    url: "",
  };

  /*
    - Login to make the call to Tilopay and make the payment
  */
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(PAYMENT_URL, {
      method: "POST",
      headers,
      body: paymentDataForm, // Ensure `transactionData` is defined somewhere
    });

    console.log("Response:", response);

    if (response.status === 200) {
      const paymentData = await response.json();
      console.log("Payment Data:", paymentData);

      payment_response = paymentData.url;

      // Redirect to the payment URL
      return (
        <div>
          <CheckOutHeader />
          <CheckOutForm1 />
          <CheckOutForm2 />
          <CheckOutForm3 payment_response={payment_response.url} />
        </div>
      );
    } else {
      console.error("An error occurred:", response);

      // Log the response text for more information
      const errorText = await response.text();
      console.error("Response Text:", errorText);

      throw new Error("Failed to make the payment.");
    }
  } catch (error) {
    console.error("Error requesting access data:", error);
  }
};

export default CheckOut;
