import React from 'react'
import Spinner from './Spinner';

const OrderSummary = ({ detailTitle, quantity, subTotal, taxes, total }) => {
    return (
        <div className="p-3 space-y-3">
            {
                <>
                    <h1 className=" flex justify-center">{detailTitle}</h1>

                    <div className="flex justify-between ">
                        <p className="whitespace-nowrap ">N° artículos</p>
                        <p className="text-grey-100">{quantity}</p>
                    </div>
                    <div className="flex justify-between ">
                        <p>Subtotal:</p>
                        <p className="text-grey-100">${subTotal}</p>
                    </div>
                    <div className="flex justify-between ">
                        <p>Impuestos:</p>
                        <p className="text-grey-100">${taxes}</p>
                    </div>
                    <div className="flex justify-between ">
                        <p>Costo Total(IVA Incluido):</p>
                        <p className="text-grey-100">${total}</p>
                    </div>
                    <hr />
                </>
            }
        </div>
    );
}

export default OrderSummary