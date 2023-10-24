"use client";
import OrderFailed from "@/components/OrderFailed";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_ORDER_DETAILS_STATUS } from "@/src/graphQl/queries/updateOrderDetailsStatus";
import { logo } from "../assets/images";
import useStorage from "@/hooks/useStorage";
import { useLazyQuery, useQuery } from "@apollo/client";
import GET_CART_ITEMS_LIST_SHOPPING_SESSION from "@/src/graphQl/queries/getCartItemsByShoppingSession";
import GET_SHOPPING_SESSION_BY_USER from "@/src/graphQl/queries/getShoppingSessionByUser";
import DELETE_CART_ITEM_MUTATION from "@/src/graphQl/queries/deleteCartItem";
import UPDATE_VARIANT_STOCK from "@/src/graphQl/queries/updateVariantStock";
import useCartSummary from "@/hooks/useCartSummary";
import useProtectionRoute from "@/hooks/useProtectionRoute";
import { CREATE_ORDER } from "@/src/graphQl/queries/createUserOrder";
import CREATE_ORDER_ITEM_MUTATION from "@/src/graphQl/queries/createOrderItem";
import { UPDATE_PAYMENT_DETAIL_STATUS } from "@/src/graphQl/queries/updatePaymentDetailStatus";
/*
  recives the Tilopay response , based on the returns params 
  redirects to an certain page.

  IMPORTANT= is posible to change the order number in the url
  clean after response
*/

export default function ThankYouMessage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [paymentId, setPaymentId] = useState();
  const [orderId, setOrderId] = useState();
  const [description, setDescription] = useState();
  useEffect(() => {
    //guardo los datos que responde tilopay en orden
    const searchParams = new URLSearchParams(window?.location?.search);

    if (searchParams.has("code")) {
      //code 1 satisfactorio
      setCode(searchParams.get("code"));
    } else (
      setCode(0)
    )

    if (searchParams.has("description")) {
      //code 1 satisfactorio
      setDescription(searchParams.get("description"));
    } else (
      setCode(0)
    )

    if (searchParams.has("order")) {
      // Verificar si la URL tiene el parámetro "order" que es el id del paymentDetail
      setPaymentId(searchParams.get("order"));
    }

    handleTilopayResponse();
    // eslint-disablece en el enfoque react-hooks/exhaustive-deps
  }, [code]);



  //calling the mutation
  const [updateOrderDetailsStatus] = useMutation(UPDATE_ORDER_DETAILS_STATUS);
  const [updatePaymentDetailStatus] = useMutation(UPDATE_PAYMENT_DETAIL_STATUS);
  const [deleteCarItem] = useMutation(DELETE_CART_ITEM_MUTATION);
  const [updateVariantStock] = useMutation(UPDATE_VARIANT_STOCK);
  const [createOrder] = useMutation(CREATE_ORDER);
  const [createOrderItem] = useMutation(CREATE_ORDER_ITEM_MUTATION);
  const { user } = useStorage();
  const { id } = user || {};
  const { items } = useCartSummary({
    userId: user?.id,
  });


  const handleCartItmes = async () => {
    //se elimina los items de carrito y se actualizan los stocks de los productos
    items.map((item) => {
      if (
        item.attributes.variant.data &&
        item.attributes.variant.data.attributes.product.data
      ) {
        const quant = parseInt(item.attributes.quantity);
        const stock = parseInt(item.attributes.variant.data.attributes.stock);
        const newStock = stock - quant;
        const variant = item.attributes.variant.data.id;
        const cartItemId = item.id;
        console.log(cartItemId);

        try {
          deleteCarItem({
            variables: {
              id: cartItemId,
            },
          });
        } catch (error) { }

        try {
          updateVariantStock({
            variables: {
              id: variant,
              stock: newStock,
            },
          });
        } catch (error) {
          console.log("error");
        }
      }
    });

  };


  ////////////////////////////funciones para crear orden, orderItems y acutalizar paymentDetail/////////

  const creatingOrderItems = (orderId) => {
    const isoDate = new Date().toISOString();
    try {
      items.map(async (item) => {
        const variant = item.attributes.variant.data; // Desestructuración aquí
        const variantAtt = variant.attributes;
        console.log(variantAtt.quantity);
        const { data } = await createOrderItem({
          variables: {
            quantity: item.attributes.quantity,
            variantId: variant.id,
            publishedAt: isoDate,
            orderDetailId: orderId,
          },
        });
      });
    } catch (error) {
      console.log("Error creating: ", error);
    }
  };

  const handleCreateOrder = async (status) => {
    const isoDate = new Date().toISOString();
    try {
      const { data } = await createOrder({
        variables: {
          user_id: id,
          status: status,
          paymentId: paymentId,
          publishedAt: isoDate,
        },

      });
      const orderNumber = await data?.createOrderDetail?.data?.id;
      creatingOrderItems(orderNumber);
      setOrderId(orderNumber)
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleUpdatePayment = async (status) => {
    try {
      // Update the order status for rejected payments
      const { data } = await updatePaymentDetailStatus({
        variables: {
          id: paymentId,
          newStatus: status,
        },
      });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }
  ////////////////////////////////FUNCION PARA MANEJAR LA RESPUESTA DE TILOPAY//////////////////////////////


  const handleTilopayResponse = async () => {

    // Handle the payment data as needed
    if (code) {
      if (code === "1") {
        // Payment was successful
        handleCreateOrder("A")
        handleUpdatePayment("Approved")
        handleCartItmes()// me vacia el carrito y me modifica el stock
      } else {
        // Payment failed
        // Render the description when code is not "1"
        // I need to change the status of ther Payment to failed
        handleUpdatePayment("Failed")
      }
    } else {
      handleUpdatePayment("Cancelled")
    }


  };

  return (
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
                  <p className="text-sm">Transacción Aprovada</p>
                  <p className="text-sm">Ya estamos preparando tu pedido</p>
                </div>
                <div className="bg-white w-[250px] p-3 flex flex-col items-center ml-[20px] rounded-md">
                  <p className="text-grey-100">N° de pedido</p>
                  <p>{orderId}</p>
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
              <OrderFailed description={description ? "Fondos insuficientes" : "Orden cancelada"} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
