import React from 'react'
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import CartQuantityBtn from './CartQuantityBtn';
import DeleteBtn from './DeleteBtn';


const CartItem = ({ cartItemId, idVariant, productName, brand, description, color, price, ageRange, size, weight, images, stockVariant, quantityCartItem }) => {
    return (<>
        <div className="bg-white shadow-md rounded-lg overflow-hidden ">
            <div className="p-4">
                <Carousel showArrows={true} showThumbs={false} className="w-full h-auto">
                    {images.map((img, index) => (
                        <div key={index}>
                            <div className="w-80 h-60">
                                <Image
                                    key={img.id}
                                    src={"http://localhost:1337" + img}
                                    alt={productName}

                                    layout="fill" // Esto permite que la imagen llene su contenedor
                                    objectFit="cover" // Esto ajusta la imagen al tamaño del contenedor
                                />
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className=" p-4">
                <h2 className="text-xl font-semibold">Product: {productName}</h2>
                <p className="text-gray-600">idcart: {cartItemId}</p>
                <p className="text-gray-600">idVariant: {idVariant}</p>
                <p className="text-gray-600">Brand: {brand}</p>
                <p className="text-gray-800 mt-2">Description: {description}</p>
                <p className="text-gray-700 mt-2">Color: {color}</p>
                <p className="text-gray-700">Price: ${price}</p>
                <p className="text-gray-700">Age: {ageRange}</p>
                <p className="text-gray-700">Size: {size}</p>
                <p className="text-gray-700">Weight: {weight.weight} {weight.unitWeight}</p>
                <div className="mt-4">
                    <CartQuantityBtn quantityCartItem={quantityCartItem} stock={stockVariant} /> {/* Puedes ajustar el límite según tus necesidades */}
                </div>
            </div>

            {/* Botón para eliminar el producto del carrito */}
            <DeleteBtn
            idItem={cartItemId}/>
        </div>
    </>

    )
}

export default CartItem