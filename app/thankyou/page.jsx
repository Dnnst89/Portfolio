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

  const [getSession] = useLazyQuery(GET_SHOPPING_SESSION_BY_USER);
  const [getCart] = useLazyQuery(GET_CART_ITEMS_LIST_SHOPPING_SESSION, {
    fetchPolicy: "network-only", // Forzar la consulta directa al servidor
  });

  const { user } = useStorage();
  const { id } = user || {};

  //calling the mutation
  const [updateOrderDetailsStatus] = useMutation(UPDATE_ORDER_DETAILS_STATUS);
  const [deleteCarItem] = useMutation(DELETE_CART_ITEM_MUTATION);
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

          try {
            const { data } = await getSession({
              //llamo la query para traer la shopping session
              variables: { userId: id },
            });

            if (data) {
              // Si existe la sesión
              const shoppingSession = data.shoppingSessions.data[0];
              let currentPage = 1;
              let pageSize = 25;
              let fetchedData = []; // para ir juntando los datos de cada pagina
              let pageCount = 1;

              do {
                console.log(shoppingSession);
                //debemos hacer un primer recorrido ya que el dato paeCount de la consulta es incierto
                const { data: cartItemsData } = await getCart({
                  variables: {
                    shoppingSessionId: shoppingSession.id,
                    page: currentPage,
                    pageSize,
                  },
                });

                const cartItems = cartItemsData.cartItems;
                fetchedData = fetchedData.concat(cartItems.data);
                pageCount = cartItems.meta.pagination.pageCount;
                currentPage++;
              } while (currentPage <= pageCount);
              //}

              // Ahora,se procesa los datos recopilados
              const total = fetchedData.reduce((accumulator, item) => {
                if (
                  item.attributes.variant.data &&
                  item.attributes.variant.data.attributes.product.data
                ) {
                  //debe existir un producto con su respectiva variante
                  return (
                    accumulator +
                    item.attributes.variant.data.attributes.price *
                      item.attributes.quantity
                  );
                }
                return accumulator;
              }, 0);

              console.log("first");
              fetchedData.map((item) => {
                if (
                  item.attributes.variant.data &&
                  item.attributes.variant.data.attributes.product.data
                ) {
                  //debe existir un producto con su respectiva variante

                  const quant = parseInt(item.attributes.quantity);
                  const stock = parseInt(
                    item.attributes.variant.data.attributes.stock
                  );
                  const newStock = stock - quant;

                  /* 
                
                
                try {
                    const cartItemId = item.id;
                    const { data } = deleteCarItem({
                      variables: {
                        id: cartItemId,
                      },
                    });
                  } catch (error) {}
                 */

                  console.log("cantidad", quant);
                  console.log("stock", stock);
                  console.log("nuevo stock", newStock);
                }
                return null; // lo asigno null para filtrarlo luego y no agregarlo a los items
              });
            }
          } catch (error) {
            //Manejo de errores
            setError(true);
          } finally {
          }

          /*
            get rid of the cart session and delete carts items from database
            after that create a new empty cart session
            DC-161 
          */
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
          localStorage.removeItem("createdOrder");
          // Continue with other actions you want to perform on failure
        } catch (error) {
          console.error("Error updating order status:", error);
        }
      }
    }
  };

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
                  <p className="text-sm">Transacción Aprovada</p>
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
