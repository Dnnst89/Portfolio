'use client';
import React from 'react'
import { useQuery } from '@apollo/client';
import GET_CART_ITEMS_LIST from '../src/graphQl/queries/getCartItems';
import CartItem from './CartItem';
import { updateQtyItems } from '@/redux/features/cart-slice';
import { useDispatch } from 'react-redux';

const CartContainer = () => {
    const { loading, error, data } = useQuery(GET_CART_ITEMS_LIST);
    const dispatch = useDispatch()


    if(loading) return <p>loading</p>//carga los items

    ////////////actualizo la cantidad de items en el carrito haciendo la suma
    const totalQuantity = data?.cartItems?.data?.reduce((accumulator, currentItem) => { //me suma la cantidad de items en carrito
        return accumulator + currentItem.attributes.quantity;
      }, 0)
    dispatch(updateQtyItems(totalQuantity)) //me actualiza el estado(cantidad


    return (
        
            <div className="flex flex-col w-3/4">
                {data?.cartItems?.data?.map((item) => {
                    const variant = item.attributes.variant.data; // Desestructuración aquí
                    const variantAtt = variant.attributes;
                    const productAtt = variant.attributes.product.data.attributes; // Desestructuración aquí
                    return (
                        <div key={item.id}>
                        <CartItem
                            key={item.id}
                            cartItemId={item.id}
                            quantityCartItem={item.attributes.quantity}
                            idVariant={variant.id}
                            productName={productAtt.name}
                            brand={productAtt.brand}
                            description={productAtt.description}
                            color={variantAtt.color}
                            price={variantAtt.price}
                            stockVariant={variantAtt.stock}
                            ageRange={variantAtt.ageRange}
                            size={variantAtt.size}
                            weight={variantAtt.weight} //el weight es un objeto del peso y la unidad
                            images={variantAtt.images.data.map(img => img.attributes.url)}//se mapea para obtener array de url
                        />
                        </div>
                    );
                })}
            </div>
        
    );
};

export default CartContainer;