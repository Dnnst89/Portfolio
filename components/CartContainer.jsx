'use client';
import React from 'react'
import { useQuery } from '@apollo/client';
import GetCartItemsList from '../src/graphQl/queries/getCartItems';
import CartItem from './CartItem';
const CartContainer = () => {
    const { loading, error, data } = useQuery(GetCartItemsList);

    if(loading) return <p>loading</p>
    
    return (
        <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
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
        </div>
    );
};

export default CartContainer;