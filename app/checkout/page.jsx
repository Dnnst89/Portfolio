import paymentRequest from "@/api/tilopay/paymentRequest";
import CheckOutForm1 from "@/components/CheckOutForm1";
import CheckOutForm2 from "@/components/CheckOutForm2";
import CheckOutForm3 from "@/components/CheckOutForm3";
import CheckOutHeader from "@/components/CheckoutHeader";
const CheckOut = async (params) => {
  // Get query parameters from the URL
  const { code, description, auth, order } = params.searchParams;
  console.log("Params :", code);
  // Function to handle the payment response
  const handlePaymentResponse = () => {
    // Handle the payment data as needed
    if (code === "1") {
      // Payment was successful
      console.log("Payment Successful:", description);

      // You can update your order status or take other actions here
    } else {
      // Payment failed
      console.error("Payment Failed:", description);
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
      <CheckOutForm3 paymentUrl={paymentUrl} />
    </div>
  );
};

export default CheckOut;
