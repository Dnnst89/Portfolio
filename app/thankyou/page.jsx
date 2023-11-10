"use client";
import OrderFailed from "@/components/OrderFailed";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_ORDER_DETAILS_STATUS } from "@/src/graphQl/queries/updateOrderDetailsStatus";
import { logo } from "../assets/images";
import useStorage from "@/hooks/useStorage";
import { useQuery } from "@apollo/client";
import GET_CART_ITEMS_LIST_SHOPPING_SESSION from "@/src/graphQl/queries/getCartItemsByShoppingSession";
import GET_SHOPPING_SESSION_BY_USER from "@/src/graphQl/queries/getShoppingSessionByUser";
import DELETE_CART_ITEM_MUTATION from "@/src/graphQl/queries/deleteCartItem";
import { GET_PAYMENT_DETAIL } from "@/src/graphQl/queries/getPaymentDetail";
import { GET_PAYMENT_DETAILS } from "@/src/graphQl/queries/getPaymentDetails";
import { GET_CONSECUTIVE_NUMBER } from "@/src/graphQl/queries/getConsecutiveNumber";
//import { GET_CONSECUTIVE_NUMBER } from "@/src/graphQl/queries/getConsecutiveNumber";
import UPDATE_VARIANT_STOCK from "@/src/graphQl/queries/updateVariantStock";
import useCartSummary from "@/hooks/useCartSummary";
import useProtectionRoute from "@/hooks/useProtectionRoute";
import { CREATE_ORDER } from "@/src/graphQl/queries/createUserOrder";
import CREATE_ORDER_ITEM_MUTATION from "@/src/graphQl/queries/createOrderItem";
import { UPDATE_PAYMENT_DETAIL_STATUS } from "@/src/graphQl/queries/updatePaymentDetailStatus";
import {
  getAccessToken,
  formatTaxData,
  formatItemInvoice,
  createKey,
  createConsecutiveNumber,
  InvoiceInformation,
  validateID,
  formatBillSumary,
} from "@/helpers";

import { facturationInstace } from "@/src/axios/algoliaIntance/config";
import GET_ORDER_ITEMS_BY_ORDER_ID from "@/src/graphQl/queries/getOrderItemsByOrderId";
import GET_STORE_INFO from "@/src/graphQl/queries/getStoreInformation";
import { CREATE_ELECTRONIC_INVOICE } from "@/src/graphQl/queries/createElectronicInvoice";
import { CREATE_ORDER_EMAIL } from "@/src/graphQl/queries/sendEmail";
import { GET_USER_ADDRESS } from "@/src/graphQl/queries/getUserAddress";

/*
  recives the Tilopay response , based on the returns params 
  redirects to an certain page.

  IMPORTANT= is posible to change the order number in the url
  clean after response
*/

export default function ThankYouMessage() {
  const router = useRouter();
  //states
  const [code, setCode] = useState("");
  const [paymentId, setPaymentId] = useState();
  const [orderId, setOrderId] = useState();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [description, setDescription] = useState();
  //calling the mutation
  const [updatePaymentDetailStatus] = useMutation(UPDATE_PAYMENT_DETAIL_STATUS);
  const [deleteCarItem] = useMutation(DELETE_CART_ITEM_MUTATION);
  const [updateVariantStock] = useMutation(UPDATE_VARIANT_STOCK);
  const [createOrder] = useMutation(CREATE_ORDER);
  const [createElectronicInvoice] = useMutation(CREATE_ELECTRONIC_INVOICE);

  const [getConsecutiveNumber] = useLazyQuery(GET_CONSECUTIVE_NUMBER);
  const [createOrderItem] = useMutation(CREATE_ORDER_ITEM_MUTATION);
  const [getPaymentDetail] = useLazyQuery(GET_PAYMENT_DETAIL);
  const [getPaymentDetails] = useLazyQuery(GET_PAYMENT_DETAILS);
  const [getOrderItemsByOrderId] = useLazyQuery(GET_ORDER_ITEMS_BY_ORDER_ID);
  const [getStoreInformation] = useLazyQuery(GET_STORE_INFO);

  // const { user } = useStorage();
  // const { id } = user || {};

  const [createOrderEmail] = useMutation(CREATE_ORDER_EMAIL);
  const [getUserAddress] = useLazyQuery(GET_USER_ADDRESS);

  // const { user } = useStorage();
  // const { id } = user || {};
  const { items, loading, quantity } = useCartSummary({
    //me traigo los items que hay en carrito con el hook
    userId: userId,
  });

  useEffect(() => {
    //guardo los datos que responde tilopay en orden
    const searchParams = new URLSearchParams(window?.location?.search);

    const userData = JSON.parse(localStorage.getItem("userData")); //datos de user
    const userDataId = userData?.user?.id;
    const userDataName = userData?.user?.username;
    const userDataEmail = userData?.user?.email;
    if (userDataId) {
      setUserId(userDataId);
    }
    if (userDataName) {
      setUserName(userDataName);
    }
    if (userDataEmail) {
      setUserEmail(userDataEmail);
    }
    if (searchParams.has("code")) {
      //code 1 satisfactorio
      setCode(searchParams.get("code"));
    } else setCode(0);

    if (searchParams.has("description")) {
      //code 1 satisfactorio
      setDescription(searchParams.get("description"));
    } else setCode(0);

    if (searchParams.has("order")) {
      // Verificar si la URL tiene el parámetro "order" que es el id del paymentDetail
      setPaymentId(searchParams.get("order"));
    }
    // createInvoice(551);
    handleTilopayResponse();
    // eslint-disablece en el enfoque react-hooks/exhaustive-deps
  }, [loading]);

  const handleCartItems = async () => {
    //se elimina los items de carrito y se actualizan los stocks de los productos
    items.map((item) => {
      if (
        item.attributes.variant.data &&
        item.attributes.variant.data.attributes.product.data
      ) {
        const quant = parseInt(item.attributes.quantity);
        const stock = parseInt(item.attributes.variant.data.attributes.stock);
        const newStock = stock - quant;
        const variant = item.attributes.variant.data.id;
        const cartItemId = item.id;

        try {
          deleteCarItem({
            variables: {
              id: cartItemId,
            },
          });
        } catch (error) {}

        try {
          updateVariantStock({
            variables: {
              id: variant,
              stock: newStock,
            },
          });
        } catch (error) {
          console.log("error");
        }
      }
    });
  };

  ////////////////////////////funciones para crear orden, orderItems y acutalizar paymentDetail/////////

  const handleCreateOrder = async (status) => {
    const isoDate = new Date().toISOString();
    try {
      const paymentinfo = await getPaymentDetail({
        //obtengo el paymentDetails, para que cuando refresque la pagina no cree mas ordenes
        variables: { paymentId },
      });
      const { data: userAddress, error: addressError } = await getUserAddress({
        variables: {
          id: userId,
        },
      });

      if (addressError)
        return console.log(
          "Lo sentimos, ha ocurrido un error al cargar los datos"
        );
      console.log(
        "first",
        userAddress.usersPermissionsUser.data.attributes.users_address.data
          .attributes
      );
      const province =
        userAddress.usersPermissionsUser.data.attributes.users_address.data
          .attributes.province;
      const canton =
        userAddress.usersPermissionsUser.data.attributes.users_address.data
          .attributes.canton;
      const addressLine1 =
        userAddress.usersPermissionsUser.data.attributes.users_address.data
          .attributes.addressLine1;

      const total = paymentinfo?.data?.paymentDetail?.data?.attributes?.total;
      const tax = paymentinfo?.data?.paymentDetail?.data?.attributes?.taxes;
      const subtotal =
        paymentinfo?.data?.paymentDetail?.data?.attributes?.subtotal;
      const orderStatus =
        paymentinfo?.data?.paymentDetail?.data?.attributes?.status;
      const orderPayment =
        paymentinfo?.data?.paymentDetail?.data?.attributes?.order_detail?.data; //me da la orden asociada al pago

      if (orderPayment === null && orderStatus === "Inicial") {
        // si no tiene orden le asigno una
        try {
          const { data } = await createOrder({
            //creo la orden asociada la payment
            variables: {
              user_id: userId,
              status: status,
              paymentId: paymentId,
              publishedAt: isoDate,
            },
          });
          const orderNumber = data?.createOrderDetail?.data?.id;
          setOrderId(orderNumber);
          await creatingOrderItems(orderNumber);
          const jsonString = JSON.stringify(items);
          const jsonData = JSON.parse(jsonString);
          // jsonData es ahora un objeto JavaScript que puedes usar
          console.log(jsonData);
          sendOrderEmail(
            total,
            tax,
            subtotal,
            orderNumber,
            quantity,
            userName,
            province,
            canton,
            addressLine1,
            userEmail,
            jsonData
          );

          handleCartItems();
          createInvoice(orderNumber);
        } catch (error) {
          console.error("Error creating order:", error);
        }
      } else {
        //no creo otra orden, asigno la que ya tiene
        setOrderId(orderPayment.id);
      }
    } catch (error) {
      console.log("Error getting paymentDetail: ", error);
    }
  };

  const sendOrderEmail = async (
    total,
    tax,
    subtotal,
    orderNumber,
    totalProducts,
    userName,
    province,
    canton,
    addressLine1,
    email,
    products
  ) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Los meses comienzan desde 0, por lo que sumamos 1.
    const day = currentDate.getDate();
    const formattedDate =
      year +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (day < 10 ? "0" : "") +
      day;
    const shipping = 0.0;

    const { data: emailInfo, error: sendEmailError } = await createOrderEmail({
      variables: {
        userName: userName,
        email: email,
        orderNumber: orderNumber,
        date: formattedDate,
        totalProducts: totalProducts,
        subtotal: subtotal,
        tax: tax,
        shipping: shipping,
        total: total,
        province: province,
        canton: canton,
        addressLine1: addressLine1,
        products: products,
      },
    });
    if (sendEmailError)
      return toast.error(
        "Lo sentimos, ha ocurrido un error al enviar el correo",
        {
          autoClose: 5000,
        }
      );
  };

  const creatingOrderItems = async (orderId) => {
    // me trae los items del carrito y los almaceno en la orden
    const isoDate = new Date().toISOString();
    if (orderId) {
      let orderItems = items.map(async (item) => {
        try {
          const variant = item?.attributes?.variant?.data; // Desestructuración aquí
          const variantAtt = variant?.attributes;
          const { data } = await createOrderItem({
            variables: {
              quantity: item?.attributes?.quantity,
              variantId: parseInt(variant?.id), //este dato es un INT no un ID
              publishedAt: isoDate,
              orderDetailId: orderId,
              price: variantAtt.price,
              name: variantAtt.product.data.attributes.name,
              brand: variantAtt.product.data.attributes.brand,
              cabys: variantAtt.product.data.attributes.cabys,
              imagesIds: variantAtt.images.data.map((img) => img.id),
            },
          });
          return data?.OrderItemEntity?.data;
        } catch (error) {
          console.log("Error creating orderItem: ", error);
        }
      });
      console.log(orderItems);
      return orderItems;
    }
  };

  const handleUpdatePayment = async (status) => {
    try {
      // actualiza el estado del payment
      const { data } = await updatePaymentDetailStatus({
        variables: {
          id: paymentId,
          newStatus: status,
        },
      });
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };
  ////////////////////////////////FUNCION PARA MANEJAR LA RESPUESTA DE TILOPAY//////////////////////////////

  const handleTilopayResponse = async () => {
    // Handle the payment data as needed
    if (code) {
      if (code === "1") {
        // Payment was successful
        await handleCreateOrder("A");
        await handleUpdatePayment("Approved");
        // await sendOrderEmail()
        //await handleCartItmes(); // me vacia el carrito y me modifica el stock
      } else {
        // Payment failed
        // I need to change the status of ther Payment to failed
        await handleUpdatePayment("Failed");
      }
    } else {
      await handleUpdatePayment("Cancelled");
    }
  };
  ////////////////////////////////FUNCION PARA CREAR LA FACTURA ELECTRONICA//////////////////////////////
  const createInvoice = async (orderId) => {
    //  const key = createKey(1, "3101491212");
    try {
      const PaymentDetail = await getPaymentDetail({
        variables: {
          paymentId: paymentId,
        },
      });

      const required =
        PaymentDetail.data.paymentDetail.data.attributes.invoiceRequired;
      const billSummary = {
        total: PaymentDetail?.data?.paymentDetail?.data?.attributes?.total,
        subtotal:
          PaymentDetail?.data?.paymentDetail?.data?.attributes?.subtotal,
        taxes: PaymentDetail?.data?.paymentDetail?.data?.attributes?.taxes,
      };
      if (required) {
        try {
          const { data } = await getOrderItemsByOrderId({
            variables: {
              orderId: orderId,
            },
          });

          const resultado =
            data?.orderDetail?.data?.attributes.order_items?.data;

          try {
            if (!resultado.length) return;
            const token = await getAccessToken();
            const formatedItems = formatTaxData(items);
            const body = {
              serviceDetail: {
                lineDetails: [...formatedItems],
              },
            };
            const feeResult = await facturationInstace.post(
              `/utils/get-detail-line?access_token=${token}`,
              body
            );

            const imp = feeResult?.data?.serviceDetail?.lineDetails;
            const inv = formatItemInvoice(resultado, imp);

            try {
              /*const store = {
                accountId: "de7a8bf8-63d4-427e-99ce-5870c2ffc338",
                name: "Félix Ojeda Ortiz",
                type: "03",
                number: "155822450521",
                commercialName: "",
                province: "2",
                country: "01",
                district: "01",
                neighborhood: "01",
                otherSigns: "Monserrat",
                email: "yoloyulios@gmail.com",
                ActivityCode: "721001",
              };
              */
              const result = await getStoreInformation({
                variables: {
                  id: 1,
                },
              });

              const paymentUser = await getPaymentDetails({
                variables: {
                  userId: userId,
                },
              });

              const cliente =
                paymentUser?.data?.usersPermissionsUser?.data?.attributes
                  ?.email;

              const client = {
                name:
                  paymentUser?.data?.usersPermissionsUser?.data?.attributes
                    ?.firstName +
                  " " +
                  paymentUser?.data?.usersPermissionsUser?.data?.attributes
                    ?.lastName,
                idType: validateID(
                  paymentUser?.data?.usersPermissionsUser?.data?.attributes
                    ?.idCard?.idType
                ),
                idNumber:
                  paymentUser?.data?.usersPermissionsUser?.data?.attributes
                    ?.idCard?.idNumber,
                email:
                  paymentUser?.data?.usersPermissionsUser?.data?.attributes
                    ?.email,
              };
              const store = result?.data?.storeInformation?.data?.attributes;

              const number = await getConsecutiveNumber({
                variables: {
                  page: 1,
                  pageSize: 1,
                },
              });
              const InvoiceNumber =
                number?.data?.electronicInvoices?.data[0]?.attributes
                  ?.consecutive;
              const key = createKey(InvoiceNumber, store.IdNumber);
              const consecutive = createConsecutiveNumber(InvoiceNumber);
              const bodyInvoice = {
                accountId: store.accountId,
                document: {
                  ...InvoiceInformation(store, client, key, consecutive),
                  serviceDetail: {
                    lineDetails: [...inv],
                  },
                  otherCharges: [],
                  billSummary: {
                    ...formatBillSumary(billSummary, "1.000", "CRC"),
                  },
                  referenceInformation: [],
                  others: {
                    textOthers: [],
                  },
                },
                posTicket: false,
                additionalInfo: {
                  nameDoc: "Factura Electrónica",
                  legendFooter:
                    "Emitida conforme a lo establecido en la resolución de Facturación Electrónica, No.\\nDGT-R-033-2019 del 27 de junio de 2019 de la Dirección General de Tributación.",
                  fileName: "155822450521-FE-" + consecutive,
                },
                returnCompleteAnswer: false,
              };
              console.log("cuerpo json", bodyInvoice);
              const InvoiceResult = await facturationInstace.post(
                `document/electronic-invoice?access_token=${token}`,
                bodyInvoice
              );

              console.log("respuesta factura", InvoiceResult);
              try {
                const isoDate = new Date().toISOString();
                const resulta = await getStoreInformation({
                  variables: {
                    id: 1,
                  },
                });
                const activity = parseInt(
                  resulta?.data?.storeInformation?.data?.attributes
                    ?.ActivityCode
                );

                const invoiceId = await createElectronicInvoice({
                  variables: {
                    order: orderId,
                    consecutive: consecutive,
                    keyInvoice: key,
                    activityCode: activity,
                    publishedAt: isoDate,
                  },
                });
              } catch (error) {
                console.log("error", error);
              }
            } catch (error) {}
          } catch (error) {}
        } catch (error) {
          console.log("error crear factura", error);
        }
      }
    } catch (error) {
      console.log("error crear factura", error);
    }
  };

  return paymentId ? (
    <div className="bg-floralwhite p-[100px] flex justify-center">
      <main className="bg-resene border-2 border-dashed border-grey-200 grid md:flex md:flex-col justify-center h-auto p-10">
        <section className="grid md:flex justify-center ">
          <figure>
            <Image
              src={logo}
              alt="Detinmarin logo"
              style={{ width: "auto", height: "170px" }}
            />
          </figure>

          {parseInt(code) === 1 ? (
            <>
              <div className="flex flex-col items-end justify-center space-y-3">
                <div className="flex flex-col items-center space-y-1 ml-3">
                  <h1 className="text-xl bold">¡Gracias por tu compra!</h1>
                  <p className="text-sm">Transacción Aprobada</p>
                  <p className="text-sm">Ya estamos preparando tu pedido</p>
                </div>
                <div className="bg-white w-[250px] p-3 flex flex-col items-center ml-[20px] rounded-md">
                  <p className="text-grey-100">N° de pedido</p>
                  <p>{orderId}</p>
                </div>

                <button
                  onClick={() => {
                    router.push("/");
                  }} // Specify the URL to which you want to navigate
                  className="bg-pink-200 text-white rounded-sm p-2 w-[150px]"
                >
                  Volver
                </button>
              </div>
            </>
          ) : (
            <>
              <OrderFailed
                description={description ? description : "Orden cancelada"}
              />
            </>
          )}
        </section>
      </main>
    </div>
  ) : null;
}
