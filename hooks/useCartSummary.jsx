import { updateQtyItems } from "@/redux/features/cart-slice";
import client from "@/src/graphQl/config";
import GET_CART_ITEMS_LIST_SHOPPING_SESSION from "@/src/graphQl/queries/getCartItemsByShoppingSession";
import GET_SHOPPING_SESSION_BY_USER from "@/src/graphQl/queries/getShoppingSessionByUser";
import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// se ocupa ingresar el id del usuario para poder obtener la session y sus respectivos items del carrito,
//calculos de totales y cantidades de productos, retorna un obj con las props
//  {
//         total: number
//         items: array,
//         quantity: number,
//     }
const useCartSummary = ({ userId }) => {
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const [cartData, setCartData] = useState({
    total: 0,
    items: [],
    quantity: 0,
    sessionId: null,
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [getSession] = useLazyQuery(GET_SHOPPING_SESSION_BY_USER);
  const [getCart] = useLazyQuery(GET_CART_ITEMS_LIST_SHOPPING_SESSION, {
    fetchPolicy: "network-only", // Forzar la consulta directa al servidor
  });

  useEffect(() => {
    const getCartSession = async () => {
      //me trae la session del usuario
      setLoading(true);
      try {
        const { data } = await getSession({
          //llamo la query para traer la shopping session
          variables: { userId },
        });

        if (data) {
          // Si existe la sesión
          const shoppingSession = data.shoppingSessions.data[0];
          let currentPage = 1;
          let pageSize = 25;
          let fetchedData = []; // para ir juntando los datos de cada pagina
          let pageCount = 1;

          do {
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

          const quantity = fetchedData.reduce((accumulator, item) => {
            if (
              item.attributes.variant.data &&
              item.attributes.variant.data.attributes.product.data
            ) {
              //debe existir un producto con su respectiva variante
              return accumulator + item.attributes.quantity;
            }
            return accumulator;
          }, 0);

          const items = fetchedData.map((item) => {
            if (
              item.attributes.variant.data &&
              item.attributes.variant.data.attributes.product.data
            ) {
              //debe existir un producto con su respectiva variante
              if (item.attributes.quantity > item.attributes.variant.data.attributes.stock) {//se agrega validacion ITEM <= STOCK
                setError(item.attributes.variant.data)
              } else { setError(null) }
              return {
                totalItemPrice:
                  item.attributes.variant.data.attributes.price *
                  item.attributes.quantity,
                quantity: item.attributes.quantity,
                ...item,
              };

              //se agrega validacion ITEM >= STOCK

            }
            return null; // lo asigno null para filtrarlo luego y no agregarlo a los items
          });

          // Actualiza el estado después de que se hayan procesado todos los datos
          setCartData({
            sessionId: shoppingSession.id,
            total,
            quantity,
            items: items.filter(Boolean), // Filtra elementos nulos
          });
        }
      } catch (error) {
        //Manejo de errores
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      getCartSession();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, cartQuantity]);

  return {
    total: cartData.total,
    items: cartData.items,
    quantity: cartData.quantity,
    error,
    sessionId: cartData.sessionId,
    loading,
  };
};

export default useCartSummary;
