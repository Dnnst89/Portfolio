import paymentRequest from "@/api/tilopay/paymentRequest";
import CheckOutForm1 from "@/components/CheckOutForm1";
import CheckOutForm2 from "@/components/CheckOutForm2";
import CheckOutForm3 from "@/components/CheckOutForm3";
import CheckOutHeader from "@/components/CheckoutHeader";

const CheckOut = async () => {
  const paymentUrl = await paymentRequest();
  console.log(paymentUrl);
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
