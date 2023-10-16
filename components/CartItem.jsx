import React, { useEffect } from 'react'
import Image from 'next/image';
import test from "../app/assets/heart.png";

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CartQuantityBtn from './CartQuantityBtn';
import DeleteCartItemBtn from './DeleteCartItemBtn';
import CarouselImages from './CarouselImages';
import { useSelector } from 'react-redux';


const CartItem = ({ cartItemId, idVariant, productName, brand, description, color, price, totalPrice, ageRange, size, weight, images, stockVariant, quantityCartItem, loading, error }) => {



    return (<>
        <div className="grid grid-cols-12 w-full py-3 border-dashed border-grey-200 border-b-[2px]">
            <section className="grid grid-cols-12 col-span-4">
                <div className="grid grid-cols-12 col-span-12 items-center">
                    {images.length > 0 ?
                        <CarouselImages  images={images} widthImg={140} heightImg={140} classStyle={'rounded-2xl col-span-6'} />
                        : (
                            <Image
                                src={test}
                                alt={productName}
                                style={{ width: "140px", height: "140px" }}
                                className='col-span-6'
                            />
                        )}

                    <div className="p-3 col-span-6">
                        <h1 className='text-lg'>{productName}</h1>
                        <p className='text-xs text-lightblue'>{brand}</p>
                        <span className="text-xs text-grey">Ref {idVariant}</span>
                    </div>
                </div>
            </section>
            {error?.id == idVariant ? <p className="animate-shake-x text-red-500 text-orange">
                * Stock Insuficiente
            </p> : null}
            <div className="mt-4" >
                <CartQuantityBtn quantityCartItem={quantityCartItem} stock={stockVariant} idCartItem={cartItemId} loading={loading} /> {/* Puedes ajustar el límite según tus necesidades */}
            </div>
            <section className="grid grid-cols-12 col-span-5 ">
                <div className='grid grid-cols-6 col-span-6 place-content-center '>
                    <span className='text-xs mx-2 col-start-2 col-span-6'>Precio Unitario: ${price.toFixed(2)}</span>

                    <span className='mx-2 font-bold col-start-2 col-span-6'>Precio Total: ${totalPrice.toFixed(2)}</span>
                </div>
                {/* Botón para eliminar el producto del carrito */}
                <DeleteCartItemBtn
                    idItem={cartItemId}
                    qtyItem={quantityCartItem} />
            </section>

        </div>
    </>

    )
}

export default CartItem