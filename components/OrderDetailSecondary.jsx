"use client";
import Image from "next/image";
import test from "../app/assets/heart.png";
import CartDetail from "@/components/CartDetail";
import CartProceedPayment from "@/components/CartProceedPayment";
import { useEffect, useState } from "react";
import GET_ORDER_ITEMS_BY_ORDER_ID from "@/src/graphQl/queries/getOrderItemsByOrderId";
import GET_VARIANT_BY_ID from "@/src/graphQl/queries/getVariantByID";
import { useLazyQuery } from "@apollo/client";
import OrderDetailSummary from "./OrderSummary";
import Spinner from "./Spinner";
import OrderSummary from "./OrderSummary";
import { Carousel } from "react-responsive-carousel";
import CarouselImages from "./CarouselImages";
import { isFromOrderDetail } from "@/redux/features/fromOrder-slice";
import { useDispatch, useSelector } from "react-redux";
export default function OrderDetailSecondary({ orderId }) {
  const [orderData, setOrderData] = useState({
    order: {
      orderRef: orderId,
      subtotal: 0,
      taxes: 0,
      total: 0,
      deliveryPayment: 0,
    },
    orderItems: [
      {
        itemRef: 0,
        name: "",
        brand: "",
        price: 0,
        quantity: 0,
        images: [],
        currency: "",
      },
    ],
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getOrderItems] = useLazyQuery(GET_ORDER_ITEMS_BY_ORDER_ID);
  const [getProductByVariant] = useLazyQuery(GET_VARIANT_BY_ID);
  const [orderVariant, setOrderVariant] = useState();
  const [productId, setProductId] = useState();
  let orderVariantTest = "";
  const dispatch = useDispatch();
  dispatch(isFromOrderDetail(true));
  // let productId = "";

  useEffect(() => {
    const getOrdersItemsInfo = async (id) => {
      try {
        //me trae las ordenes e informacion del usuario
        setLoading(true);

        const { data } = await getOrderItems({
          //llamo la query para traer la shopping session
          variables: { orderId: id },
        });

        if (data) {
          const orderInfo = data?.orderDetail?.data;
          setOrderData((prev) => ({
            ...prev,
            order: {
              orderRef: id,
              subtotal:
                orderInfo?.attributes?.payment_detail?.data?.attributes
                  ?.subtotal,
              taxes:
                orderInfo?.attributes?.payment_detail?.data?.attributes?.taxes,
              total:
                orderInfo.attributes?.payment_detail?.data?.attributes?.total,
              deliveryPayment:
                orderInfo.attributes?.payment_detail?.data?.attributes
                  ?.deliveryPayment,
            },
            orderItems: orderInfo?.attributes?.order_items?.data?.map(
              (item) => {
                return {
                  itemRef: item.id,
                  quantity: item.attributes.quantity,
                  name: item.attributes.name,
                  brand: item.attributes.brand,
                  idVariant: item.attributes.variantId,
                  price: item.attributes.price, //se saca el precio de la unica variante que tiene
                  images: item.attributes.images?.data.map(
                    (img) => img.attributes.url
                  ),
                  currency: item.attributes.currency,
                };
              }
            ),
          }));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (orderId) {
      getOrdersItemsInfo(orderId);
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);
  useEffect(() => {
    const fetchData = async (variantId) => {
      try {
        const { data } = await getProductByVariant({
          variables: {
            id: variantId,
          },
        });
        const productId = data?.variant?.data?.attributes?.product?.data?.id;
        setProductId(productId);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    orderData.orderItems.forEach((item) => {
      fetchData(item.idVariant);
    });
  }, [orderData.orderItems]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-resene col-span-12 md:col-span-8 grid grid-cols-12">
      <h1 className="flex justify-center text-xl p-5 col-span-12">
        Pedido N°: {orderData.order.orderRef}
      </h1>
      <div className="col-span-12 grid grid-cols-12">
        <div className="col-span-12 md:col-span-7 md:pr-2 md:pl-2">
          {
            orderData.orderItems.length > 0 ? (
              orderData.orderItems?.map(
                (
                  item,
                  index //si existen items
                ) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 w-full py-3 border-dashed border-grey-200 border-b-[2px]"
                  >
                    <section className="grid grid-cols-12 col-span-8">
                      <div className="grid grid-cols-12 col-span-12 items-center">
                        {item.images.length > 0 ? (
                          <CarouselImages
                            images={item.images}
                            widthImg={100}
                            heightImg={100}
                            classStyle={"rounded-2xl col-span-4"}
                            productId={productId}
                            idVariant={item.idVariant}
                            ItemQt={item.quantity}
                          />
                        ) : (
                          <Image
                            src={test}
                            alt="imagen de producto seleccionado"
                            style={{ width: "100", height: "100" }}
                            className="rounded-xl"
                          />
                        )}
                        <div className="p-3 col-span-6 justify-left">
                          <h1 className="text-lg">{item.name} </h1>
                          <p className="text-xs text-lightblue">{item.brand}</p>
                          <span className="text-xs text-grey">
                            Ref {item.itemRef}
                          </span>
                        </div>
                      </div>
                    </section>
                    <div className="col-span-4 grid items-center">
                      <div>
                        <h1 className="text-sm md:text-xl">
                          N° artículos: {item.quantity}{" "}
                        </h1>
                        <p className="sm:text-sm ">
                          {item.currency
                              ? `${item.currency} ${(
                                  item.price * item.quantity
                                ).toLocaleString("en-US", {
                                  minimumFractionDigits: 2,  
                                  })}`
                              : `USD ${(item.price * item.quantity).toFixed(
                                  2
                                )}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <h1>vacio</h1>
            ) //si no existen items
          }
        </div>
        <section className="lg:border-l-4 lg:border-lightblue  h-fit sm:border-0 col-span-12 md:col-span-5">
          {console.log(orderData.orderItems[0].currency)}
          <OrderSummary
            detailTitle={"Detalle del pedido"}
            quantity={orderData.orderItems.reduce((accumulator, item) => {
              return accumulator + item.quantity;
            }, 0)}
            subTotal={orderData.order.subtotal}
            taxes={orderData.order.taxes}
            total={orderData.order.total}
            deliveryPayment={orderData.order.deliveryPayment}
            currency = {orderData.orderItems[0].currency}
          />
          <CartProceedPayment textButton={"Ver dirección"} page={""} />
        </section>
      </div>
    </div>
  );
}
