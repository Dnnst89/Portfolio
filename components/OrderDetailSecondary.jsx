"use client";
import Image from "next/image";
import test from "../app/assets/heart.png";
import CartDetail from "@/components/CartDetail";
import CartProceedPayment from "@/components/CartProceedPayment";
import { useEffect, useState } from "react";
import GET_ORDER_ITEMS_BY_ORDER_ID from "@/src/graphQl/queries/getOrderItemsByOrderId";
import { useLazyQuery } from "@apollo/client";
import OrderDetailSummary from "./OrderSummary";
import Spinner from "./Spinner";
import OrderSummary from "./OrderSummary";
import { Carousel } from 'react-responsive-carousel';
import CarouselImages from "./CarouselImages";
export default function OrderDetailSecondary({ orderId }) {

  const [orderData, setOrderData] = useState(
    {
      order: {
        orderRef: orderId,
        subtotal: 0,
        taxes: 0,
        total: 0
      },
      orderItems: [
        {
          itemRef: 0,
          name: "",
          brand: "",
          price: 0,
          quantity: 0,
          images: []
        }
      ],
    }
  )
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [getOrderItems] = useLazyQuery(GET_ORDER_ITEMS_BY_ORDER_ID);

  useEffect(() => {
    const getOrdersItemsInfo = async (id) => {
      try {
        //me trae las ordenes e informacion del usuario
        setLoading(true);

        const { data } = await getOrderItems({
          //llamo la query para traer la shopping session
          variables: { orderId: id },
        });
        console.log(data)
        if (data) {
          const orderInfo = data?.orderDetail?.data
          console.log("orderInfo: ", orderInfo)
          setOrderData((prev) => ({
            ...prev,
            order: {
              orderRef: id,
              subtotal: orderInfo.attributes.subTotal,
              taxes: orderInfo.attributes.taxes,
              total: orderInfo.attributes.total,
            },
            orderItems: orderInfo.attributes.order_items.data.map((item) => {
              return {
                itemRef: item.id,
                quantity: item.attributes.quantity,
                name: item.attributes.product.data.attributes.name,
                brand: item.attributes.product.data.attributes.brand,
                price: item.attributes.product.data.attributes.variants.data[0].attributes.price, //se saca el precio de la unica variante que tiene
                images: item.attributes.product.data.attributes.variants.data[0].attributes.images?.data.map(img => img.attributes.url),
              }

            })
          }))
        }


      } catch (error) {
        setError(error)
      } finally {
        setLoading(false);
      }

    }
    if (orderId) {
      getOrdersItemsInfo(orderId)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])
  if (loading) {
    return <div className="flex justify-center">
      <Spinner />
    </div>
  }

  console.log(orderData)


  return (
    <div className="bg-resene">
      <h1 className="flex justify-center text-xl p-5">Pedido N°: {orderData.order.orderRef}</h1>
      <div className=" lg:space-x-8 sm:pt- sm:block md:block lg:flex">

        <div >
          {orderData.orderItems.length > 0 ? orderData.orderItems?.map((item) => ( //si existen items
            <section key={item.itemRef} className=" border-b-2 border-dashed border-grey-200 p-5 h-[125px]">
              <div className="flex lg:space-x-3  sm:space-between">
                {item.images.length > 0 ?
                  <CarouselImages images={item.images} widthImg={100} heightImg={90} />
                  : (
                    <Image
                      src={test}
                      alt="imagen de producto seleccionado"
                      style={{ width: "100px", height: "90px" }}
                      className="rounded-xl"
                    />
                  )}
                <div className="flex sm:items-center md:items-baseline lg:items-baseline justify-between sm:p-3  sm:w-full">
                  <div className="pr-5">
                    <h1 className="sm:text-sm">Nombre: {item.name} </h1>
                    <h5 className="text-sm text-lightblue">Marca: {item.brand}</h5>
                    <h5 className="text-sm">Ref 000000{item.itemRef}</h5>
                  </div>
                  <div>
                    <h1 className="sm:text-sm">N° artículos: {item.quantity} </h1>
                    <p className="sm:text-sm ">${item.price}</p>
                  </div>
                </div>
              </div>
            </section>

          )) : <h1>vacio</h1>//si no existen items
          }  </div>

        <section className="lg:border-l-4 lg:border-lightblue  h-[450px] p-3 sm:border-0">
          <OrderSummary detailTitle={"Detalle del pedido"} quantity={orderData.orderItems.reduce((accumulator, item) => {
            return accumulator + item.quantity;
          }, 0)} subTotal={orderData.order.subtotal} taxes={orderData.order.taxes} total={orderData.order.total} />
          <CartProceedPayment textButton={"Ver dirección"} page={""} />
        </section>
      </div>
    </div>
  );
}
