import React from 'react'
import Image from 'next/image';
import test from "../app/assets/heart.png";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CartQuantityBtn from './CartQuantityBtn';
import DeleteCartItemBtn from './DeleteCartItemBtn';


const CartItem = ({ cartItemId, idVariant, productName, brand, description, color, price, totalPrice, ageRange, size, weight, images, stockVariant, quantityCartItem, loading }) => {
    return (<>
        <div className="flex items-center py-1">
            <section className="w-2/4 ">
                <div className="flex items-center">
                    <Carousel showArrows={true} showThumbs={false}>
                        {images.map((img, index) => (
                            <div key={index}>
                                <div>
                                    <Image
                                        key={img.id}
                                        src={"http://ec2-54-189-90-96.us-west-2.compute.amazonaws.com:1337" + img}
                                        alt={productName}
                                        style={{ width: "140px", height: "140px" }}
                                        width={140} // Establecer el ancho
                                        height={140} // Establecer el alto
                                    />
                                </div>
                            </div>
                        ))}
                    </Carousel>

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
            {/* <div className="p-4">
            </div>
            <div className=" p-4">
                <p className="text-gray-600">idcart: {cartItemId}</p>
                <p className="text-gray-600">idVariant: {idVariant}</p>
                <p className="text-gray-600">Brand: {brand}</p>
                <p className="text-gray-800 mt-2">Description: {description}</p>
                <p className="text-gray-700 mt-2">Color: {color}</p>
                <p className="text-gray-700">Price: ${price}</p>
                <p className="text-gray-700">Age: {ageRange}</p>
                <p className="text-gray-700">Size: {size}</p>
                <p className="text-gray-700">Weight: {weight.weight} {weight.unitWeight}</p>
            </div> */}
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