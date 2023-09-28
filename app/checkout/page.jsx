import paymentRequest from "@/api/tilopay/paymentRequest";
import CheckOutForm1 from "@/components/CheckOutForm1";
import CheckOutForm2 from "@/components/CheckOutForm2";
import CheckOutForm3 from "@/components/CheckOutForm3";
import CheckOutHeader from "@/components/CheckoutHeader";
import FailedPayment from "@/components/FailedPayment";
import { redirect } from "next/navigation";

// workin visa card 5100270000000023
// insuficient founds card 4112 6134 5159 1116
const CheckOut = async (params) => {
  const paymentUrl = await paymentRequest();
  // Get query parameters from the URL
  const { code, description, auth, order } = params.searchParams;
  console.log("params:", code);
  // State variable to control the visibility of the failedPayment component
  let isFailedPayment = false;

  // Handle the payment data as needed
  if (code === "1") {
    // Payment was successful
    console.log("Pago exitoso :", description);
    redirect("/thanyou");
  } else {
    // Payment failed
    console.error("No se ha pidido realizar el pago:", description);
    // Render the description when code is not "1"
    isFailedPayment = true;
  }

  return (
    <div>
      {isFailedPayment && <FailedPayment description={description} />}
      <CheckOutHeader />
      <CheckOutForm1 />
      <CheckOutForm2 />
      <CheckOutForm3 paymentUrl={paymentUrl} />
    </div>
  );
};

export default CheckOut;
