"use client";
import CheckOutForm1 from "@/components/CheckOutForm1";
import CheckOutHeader from "@/components/CheckoutHeader";
import useProtectionRoute from "@/hooks/useProtectionRoute";
const CheckOut = () => {
  useProtectionRoute()
  return (
    <div>
      <CheckOutHeader regresar={"/cart"} />
      <CheckOutForm1 isCheckout />

    </div>
  );
};

export default CheckOut;
