import { login } from "@/api/tilopay/login";
import CheckOutForm1 from "@/components/CheckOutForm1";
import CheckOutForm2 from "@/components/CheckOutForm2";
import CheckOutForm3 from "@/components/CheckOutForm3";
import CheckOutHeader from "@/components/CheckoutHeader";

const PAYMENT_URL = process.env.NEXT_PUBLIC_TILOPAY_PROCESS_TO_PAYMENT;
const KEY = process.env.NEXT_PUBLIC_TILOPAY_API_KEY;

const CheckOut = async () => {
  // try {
  const access_token = await login();

  // Construct the request body as JSON
  const requestBody = {
    redirect: "https://localhost:3000/checkout", // Fix the URL format
    key: KEY,
    amount: "1.00",
    currency: "USD",
    billToFirstName: "Danny",
    billToLastName: "Soto",
    billToAddress: "San Jose",
    billToAddress2: "Catedral",
    billToCity: "JS",
    billToState: "SJ",
    billToZipPostCode: "10061",
    billToCountry: "CR",
    billToTelephone: "88888888",
    billToEmail: "dnnst89@gmail.com",
    orderNumber: "1212122",
    capture: "1",
    subscription: "0",
    platform: "api",
    returnData: "dXNlcl9pZD0xMg==",
    hashVersion: "V2",
  };

  const headers = {
    Authorization: `Bearer ${access_token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const response = await fetch(PAYMENT_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody), // Convert the request body to JSON
  });

  // if (response.ok) {
  const paymentData = await response.json();
  console.log("Payment Data:", paymentData);

  //   // Redirect to the payment URL
  //   window.location.href = paymentData.url;

  return (
    <div>
      <CheckOutHeader />
      <CheckOutForm1 />
      <CheckOutForm2 />
      <CheckOutForm3 paymentUrl={paymentData.url} />
    </div>
  );
  //} else {
  console.error("An error occurred:", response);

  // Log the response text for more information
  console.log("----------------");
  const errorText = await response.text();
  console.error("Response Text:", errorText);

  throw new Error("Failed to make the payment.");
};
// } catch (error) {
//   console.error("Error requesting access data:", error);
// }
//};

export default CheckOut;
