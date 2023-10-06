import React from 'react'
import Image from 'next/image';
import test from "../app/assets/heart.png";

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CartQuantityBtn from './CartQuantityBtn';
import DeleteCartItemBtn from './DeleteCartItemBtn';
import CarouselImages from './CarouselImages';


const CartItem = ({ cartItemId, idVariant, productName, brand, description, color, price, totalPrice, ageRange, size, weight, images, stockVariant, quantityCartItem, loading }) => {
    return (<>
        <div className="flex items-center py-1">
            <section className="w-2/4 ">
                <div className="flex items-center">
                    {images.length > 0 ?
                        <CarouselImages images={images} widthImg={140} heightImg={140} />
                        : (
                            <Image
                                src={test}
                                alt="imagen de producto seleccionado"
                                style={{ width: "140px", height: "140px" }}
                                className="rounded-xl"
                            />
                        )}

                    <div className="p-3">
                        <h1>Producto: {productName}</h1>
                        <h1>Marca: {brand}</h1>
                        <span className="text-sm text-grey">Ref {idVariant}</span>
                    </div>
                </div>
            </section>
            <div className="mt-4" >
                <CartQuantityBtn quantityCartItem={quantityCartItem} stock={stockVariant} idCartItem={cartItemId} loading={loading} /> {/* Puedes ajustar el límite según tus necesidades */}
            </div>
            <section className=" flex w-1/4 mx-2 items-center justify-center ">
                <span className='mx-2'>Precio Unitario: ${price.toFixed(2)}</span>
                <span className='mx-2'>Precio Total: ${totalPrice.toFixed(2)}</span>
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