import client from "@/src/graphQl/config";
import GET_CART_ITEMS_LIST_SHOPPING_SESSION from "@/src/graphQl/queries/getCartItemsByShoppingSession";
import GET_SHOPPING_SESSION_BY_USER from "@/src/graphQl/queries/getShoppingSessionByUser";
import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

// se ocupa ingresar el id del usuario para poder obtener la session y sus respectivos items del carrito,
//calculos de totales y cantidades de productos, retorna un obj con las props
//  {
//         total: number
//         items: array,
//         quantity: number,
//     }
const useCartSummary = ({ userId }) => {
  const [cartData, setCartData] = useState({
    total: 0,
    items: [],
    quantity: 0,
  });
  const [error, setError] = useState(false);
  const [getSession] = useLazyQuery(GET_SHOPPING_SESSION_BY_USER);
  const [getCart] = useLazyQuery(GET_CART_ITEMS_LIST_SHOPPING_SESSION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCartSession = async () => {
      //me trae la session del usuario
      try {
        setLoading(true);
        const { data } = await getSession({
          //llamo la query para traer la shopping session
          variables: { userId },
        });

        if (data) {
          // Si existe la sesión
          const shoppingSession = data.shoppingSessions.data[0];
          const { data: cartItemsData } = await getCart({
            //llamo la query para cartitems de la session
            variables: { shoppingSessionId: shoppingSession.id },
          });
          const cartItems = cartItemsData.cartItems;

          setCartData((prev) => ({
            ...prev,
            total: cartItems.data.reduce((accumulator, item) => {
              return (
                accumulator +
                item.attributes.variant.data.attributes.price *
                  item.attributes.quantity
              );
            }, 0),
            quantity: cartItems.data.reduce((accumulator, item) => {
              return accumulator + item.attributes.quantity;
            }, 0),
            items: cartItems.data.map((item) => {
              return {
                totalItemPrice:
                  item.attributes.variant.data.attributes.price *
                  item.attributes.quantity,
                quantity: item.attributes.quantity,
                ...item,
              };
            }),
          }));
        }
        setLoading(false);
      } catch (error) {
        //Manejo de errores
        console.log(error);
        setError(true);
      }
    };
    if (userId) {
      getCartSession();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return {
    total: cartData.total,
    items: cartData.items,
    quantity: cartData.quantity,
    error,
    loading,
  };
};

export default useCartSummary;
