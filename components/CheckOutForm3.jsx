"use client";
import React, { useEffect, useState, useRef } from "react";
import paymentRequest from "@/api/tilopay/paymentRequest";
import { useRouter } from "next/navigation";
import { GET_PAYMENT_DETAILS } from "@/src/graphQl/queries/getPaymentDetails";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import useStorage from "@/hooks/useStorage";
import useCartSummary from "@/hooks/useCartSummary";
import AlertNotAuth from "./AlertNotAuth";
import Spinner from "./Spinner";
import ReCAPTCHA from "react-google-recaptcha";
import toast, { Toaster } from "react-hot-toast";
import GET_STORE_INFO from "@/src/graphQl/queries/getStoreInformation";
import { GET_USER_ADDRESS } from "@/src/graphQl/queries/getUserAddress";
import { GET_PAYMENT_DETAIL } from "@/src/graphQl/queries/getPaymentDetail";
import { validateID } from "@/helpers";
import { createOrderData, orderMoovin } from "@/api/moovin/createOrder";
import { UPDATE_PAYMENT_DELIVERY_ID } from "@/src/graphQl/queries/updatePaymentDeliveryId";
export default function CheckOutForm3({
  paymentDetailId,
  total,
  estimation,
  items,
  orderNumber,
}) {
  const captchaRef = useRef(true);
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [domain, setDomain] = useState(false);
  const { user } = useStorage();
  const { id, email } = user || {};
  const cartSummary = useCartSummary({
    userId: user?.id,
  });

  const [getUserAddress] = useLazyQuery(GET_USER_ADDRESS);
  // const [getPaymentDetails] = useLazyQuery(GET_PAYMENT_DETAILS);
  const [getPaymentDetail] = useLazyQuery(GET_PAYMENT_DETAIL);
  const [updatePaymentDeliveryId] = useMutation(UPDATE_PAYMENT_DELIVERY_ID);
  // the url return an payment url to redirect the user to Tilopay payment.
  let paymentUrl = "";

  // Retrieve user data
  const { loading, error, data } = useQuery(GET_PAYMENT_DETAILS, {
    variables: { userId: id },
  });

  const { data: storeInformation, error: storeInformationError } = useQuery(
    GET_STORE_INFO,
    {
      variables: {
        id: 1,
      },
    }
  );
  const currency =
    storeInformation?.storeInformation?.data?.attributes?.currency;
  const fetchOrderMoovin = async (orderNumber) => {
    try {
      const paymentUser = data;
      const paymentinfo = await getPaymentDetail({
        //obtengo el paymentDetails, para que cuando refresque la pagina no cree mas ordenes
        variables: { paymentId: paymentDetailId },
      });

      const client = {
        name:
          paymentUser?.usersPermissionsUser?.data?.attributes?.firstName +
          " " +
          paymentUser?.usersPermissionsUser?.data?.attributes?.lastName,
        idType: validateID(
          paymentUser?.usersPermissionsUser?.data?.attributes?.idCard?.idType
        ),
        idNumber:
          paymentUser?.usersPermissionsUser?.data?.attributes?.idCard
            ?.idNumber || 0,
        email: paymentUser?.usersPermissionsUser?.data?.attributes?.email,
        phone: paymentUser?.usersPermissionsUser?.data?.attributes?.phoneNumber,
      };

      const store = storeInformation?.storeInformation?.data?.attributes;
      // console.log("store nueva", store);
      const userAddress = await getUserAddress({
        variables: {
          id: id,
        },
      });

      const deliveryInformation =
        userAddress?.data?.usersPermissionsUser?.data?.attributes?.users_address
          ?.data?.attributes;
      const payment = paymentinfo?.data?.paymentDetail?.data?.attributes;

      /*
     
*/
      if (payment.deliveryMethod === "Envío a través de MOOVIN") {
        /*const shipmentInfo = createData(
          items,
          deliveryInformation.latitude,
          deliveryInformation.longitude
        );
        console.log("sdasdfadfa", shipmentInfo);
        const estimation = await requestEstimation(shipmentInfo);

        deliveryPayment(estimation.amount);
        // const suma = parseFloat(subTotal + taxes);
        const finalAmount = {
          total: parseFloat(subTotal + taxes + estimation.amount),
          subTotal: subTotal,
          taxes: taxes,
        };

        setAmount(finalAmount);
*/
        const datos = createOrderData(
          store,
          items,
          orderNumber,
          client,
          estimation,
          deliveryInformation
        );
        try {
          console.log("datos", datos);
          const order = await orderMoovin(datos);
          console.log("order mooving", order);
          const orderId = parseInt(order.idPackage);
          const paymentId = paymentinfo?.data?.paymentDetail?.data?.id;
          console.log("payment", paymentId);
          await updatePaymentDeliveryId({
            variables: {
              id: paymentId,
              newDeliveryId: orderId,
            },
          });
        } catch (error) {}
      }
    } catch (error) {
      console.log("error creacion orden moovin", error);
    }
  };
  const key =
    process.env.NODE_ENV === "development"
      ? "6LfCrUYoAAAAAPgdh0MpvKzzHvhksbGTM3cP1prU"
      : "6Lea6iEpAAAAALI1Fb34ZuoJN9pUUJd2HykpyLpb";

  useEffect(() => {
    const domain = window?.location;
    setDomain(domain);

    if (!loading && !error) {
      const userData = data?.usersPermissionsUser?.data?.attributes;

      if (userData) {
        const {
          firstName,
          lastName,
          users_address: {
            data: { attributes: userAddressAttributes },
          },
          phoneNumber,
        } = userData;
        // the next step is to send the data to the request
        // we load data into the state
        if (userData) {
          setFormData({
            redirect:
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000/thankyou/"
                : `${process.env.NEXT_PUBLIC_APP_URL}/thankyou/`,
            key: process.env.NEXT_PUBLIC_TILOPAY_API_KEY,
            amount: total,
            currency: currency,
            billToFirstName: firstName,
            billToLastName: lastName,
            billToAddress: userAddressAttributes.addressLine1,
            billToAddress2: userAddressAttributes.addressLine2,
            billToCity: userAddressAttributes.canton,
            billToState: userAddressAttributes.province,
            billToZipPostCode: userAddressAttributes.postCode,
            billToCountry: "CR",
            billToTelephone: phoneNumber,
            billToEmail: email,
            orderNumber: paymentDetailId,
            capture: "1",
            subscription: "1",
            platform: "api",
            returnData: "dXNlcl9pZD0xMg==",
            hashVersion: "V2",
          });
          fetchOrderMoovin(orderNumber);
        } else {
          // Handle the case where the specific order is not found
          console.log("Specific order not found.");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // fetchOrderMoovin(orderNumber);
  }, [data]);

  const handleVerification = async () => {
    paymentUrl = await paymentRequest(formData);

    try {
      if (domain.origin == "https://www.detinmarin.cr") {
        const token = captchaRef.current.getValue();
        if (token) {
          setLoadingBtn(true);
          //verifica que no haya ningun error de stock con la cantidad de productos que lleva
          if (cartSummary.errors.errorStock.length > 0) {
            toast.custom((t) => (
              <AlertNotAuth
                t={t}
                msj={
                  "Lo sentimos ha sucedido un error con tu compra, verifica tus productos"
                }
                newRoute={"/cart"}
              />
            ));
          } else {
            router.push(paymentUrl);
          }
        } else {
          setLoadingBtn(false);
          toast.error("Por favor selecciona la casilla de verificación", {
            autoClose: 5000,
          });
        }
      } else {
        setLoadingBtn(true);
        //verifica que no haya ningun error de stock con la cantidad de productos que lleva
        if (cartSummary.errors.errorStock.length > 0) {
          toast.custom((t) => (
            <AlertNotAuth
              t={t}
              msj={
                "Lo sentimos ha sucedido un error con tu compra, verifica tus productos"
              }
              newRoute={"/cart"}
            />
          ));
        } else {
          router.push(paymentUrl);
        }
      }
    } catch (error) {
      console.error(error);
    }
    // } finally {
    //   setLoadingBtn(false);
    // }
  };
  return (
    <div className="w-full">
      <div></div>
      <div className="flex w-full justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
        <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
          3
        </div>
        <h1 className="text-xl">Formulario de pago</h1>
      </div>{" "}
      {domain.origin == "https://www.detinmarin.cr" ? (
        <div className="flex justify-center m-auto mt-8 mb-8 ">
          <ReCAPTCHA sitekey={key} ref={captchaRef} />
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-center m-auto mt-8 mb-8 w-3/4">
        <button
          onClick={handleVerification}
          className="bg-pink-200 text-white rounded-sm p-2 w-[200px] whitespace-nowrap"
          disabled={loadingBtn} // Disable the button when loading
        >
          {loadingBtn ? <Spinner /> : "Proceder al pago"}
        </button>
      </div>
    </div>
  );
}
