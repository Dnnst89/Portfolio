"use client";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckOutForm3({ paymentUrl, description, code }) {
  const router = useRouter();

  // Use useEffect to automatically execute code when code and description are available
  useEffect(() => {
    if (code === "1") {
      // Payment was successful
      toast.success("Payment Successful:", description);

      // Redirect to the payment URL
      //router.push(paymentUrl);
    } else {
      // Payment failed
      toast.error("Payment Failed:", description);
    }
  }, [code, description, router]);

  return (
    <div className="mt-[40px] mx-[30px]">
      <div className="flex w-3/4 justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
        <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
          3
        </div>
        <h1 className="text-xl">Formulario de pago</h1>
      </div>

      <div className="flex justify-center mt-8 mb-8 w-3/4 ">
        {/* Redirect to the payment URL */}
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
