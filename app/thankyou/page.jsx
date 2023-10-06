"use client";
import OrderFailed from "@/components/OrderFailed";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_ORDER_DETAILS_STATUS } from "@/src/graphQl/queries/updateOrderDetailsStatus";
import { logo } from "../assets/images";
/*
  recives the Tilopay response , based on the returns params 
  redirects to an certain page.

  IMPORTANT= is posible to change the order number in the url
  clean after response
*/

export default function ThankYouMessage(params) {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [order, setOrder] = useState("");
  //calling the mutation
  const [updateOrderDetailsStatus] = useMutation(UPDATE_ORDER_DETAILS_STATUS);

  useEffect(() => {
    handleTilopayResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.searchParams]);

  const handleTilopayResponse = async () => {
    if (params?.searchParams?.code) {
      // Get query parameters from the URL
      const { code, description, auth, order } = params.searchParams;
      // Set the description in the component state
      setDescription(description);
      setCode(code);
      setOrder(order);
      // Handle the payment data as needed
      if (code === "1") {
        // Payment was successful
        console.log("Pago exitoso ");
        // I need to change the status of ther order to approved
        try {
          const { data } = await updateOrderDetailsStatus({
            variables: {
              id: order,
              newStatus: "A", // Approved
            },
          });
        } catch (error) {
          console.error("Error updating order status:", error);
        }
      } else {
        // Payment failed
        // Render the description when code is not "1"
        console.log("No se ha podido realizar el pago");
        // I need to change the status of ther order to rejected
        try {
          // Update the order status for rejected payments
          const { data } = await updateOrderDetailsStatus({
            variables: {
              id: order,
              newStatus: "C", //Cancelled
            },
          });

          // Continue with other actions you want to perform on failure
        } catch (error) {
          console.error("Error updating order status:", error);
        }
      }
    }
  };
  localStorage.removeItem("createdOrder");
  return code ? (
    <div className="bg-floralwhite p-[100px] flex justify-center">
      <main className="bg-resene border-2 border-dashed border-grey-200 flex flex-col justify-center h-auto p-10">
        <section className="flex justify-center">
          <figure>
            <Image
              src={logo}
              alt="Detinmarin logo"
              style={{ width: "390px", height: "170px" }}
            />
          </figure>

          {parseInt(code) === 1 ? (
            <>
              <div className="flex flex-col items-end justify-center space-y-3">
                <div className="flex flex-col items-center space-y-1 ml-3">
                  <h1 className="text-xl bold">¡Gracias por tu compra!</h1>
                  <p className="text-sm">{description}</p>
                  <p className="text-sm">Ya estamos preparando tu pedido</p>
                </div>
                <div className="bg-white w-[250px] p-3 flex flex-col items-center ml-[20px] rounded-md">
                  <p className="text-grey-100">N° de pedido</p>
                  <p>{order}</p>
                </div>
                <button
                  onClick={() => router.push("/")} // Specify the URL to which you want to navigate
                  className="bg-pink-200 text-white rounded-sm p-2 w-[150px]"
                >
                  Volver
                </button>
              </div>
            </>
          ) : (
            <>
              <OrderFailed description={description} />
            </>
          )}
        </section>
      </main>
    </div>
  ) : null;
}
