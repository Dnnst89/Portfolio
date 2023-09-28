import paymentRequest from "@/api/tilopay/paymentRequest";
import CheckOutForm1 from "@/components/CheckOutForm1";
import CheckOutForm2 from "@/components/CheckOutForm2";
import CheckOutForm3 from "@/components/CheckOutForm3";
import CheckOutHeader from "@/components/CheckoutHeader";
import { redirect } from "next/navigation";

// workin visa card 5100270000000023
// insuficient founds card 4112 6134 5159 1116
const CheckOut = async (params) => {
  // Get query parameters from the URL
  const { code, description, auth, order } = await params.searchParams;

  // Function to handle the payment response
  const handlePaymentResponse = () => {
    // Handle the payment data as needed
    if (code === "1") {
      // Payment was successful
      console.log("Payment Successful:", description);
      redirect("/checkout"); //redirect to thankyou here
    } else {
      // Payment failed
      redirect("/checkout"); // redirect to payment failed here
    }
  };

  // Call the function to handle the payment response
  handlePaymentResponse();

  const paymentUrl = await paymentRequest();
  return (
    <div>
      <CheckOutHeader />
      <CheckOutForm1 />
      <CheckOutForm2 />
      <CheckOutForm3
        paymentUrl={paymentUrl}
        description={description}
        code={code}
      />
    </div>
  );
};

export default CheckOut;
