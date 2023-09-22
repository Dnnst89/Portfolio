import client from '@/src/graphQl/config';
import GET_CART_ITEMS_LIST_SHOPPING_SESSION from '@/src/graphQl/queries/getCartItemsByShoppingSession';
import GET_SHOPPING_SESSION_BY_USER from '@/src/graphQl/queries/getShoppingSessionByUser';
import React, { useEffect, useState } from 'react'


const useCartSummary = ({ userId }) => {


    const [cartData, setCartData] = useState({
        total: 0,
        items: [],
        quantity: 0,
    })
    const [error, setError] = useState(false)


    useEffect(() => {
        getCartSession()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])


    if (userId) return null //si no recibe un usuario retorna null

    const getCartSession = async () => {//me trae la session del usuario
        try {


            const { data } = await client.query({ //llamo la query para traer la shopping session
                query: GET_SHOPPING_SESSION_BY_USER,
                variables: { userId },
            });
            console.log(userId)
            console.log(data)
            if (data) { // Si existe la sesión
                const shoppingSession = data.shoppingSessions.data[0];
                const { data: cartItemsData } = await client.query({ //llamo la query para cartitems de la session
                    query: GET_CART_ITEMS_LIST_SHOPPING_SESSION,
                    variables: { shoppingSessionId: shoppingSession.id },
                });
                const cartItems = cartItemsData.cartItems;

                setCartData(prev => ({
                    ...prev,
                    total: cartItems.reduce((accumulator, item) => {
                        return accumulator + item.attributes.variant.data.attributes.price * item.attributes.quantity
                    }, 0),
                    quantity: cartItems.reduce((accumulator, item) => {
                        return accumulator + item.attributes.quantity
                    }, 0),
                    items: cartItems.data.map(item => {
                        return {
                            totalItemPrice: item.attributes.variant.data.attributes.price * item.attributes.quantity,
                            quantity: item.attributes.quantity,
                            ...item
                        }
                    })
                }))

            }
        }
        catch (error) {
            //Manejo de errores
            setError(true)
        }
    }

    return {
        total: cartData.total,
        items: cartData.items,
        quantity: cartData.quantity,
        error
    }
};

export default useCartSummary