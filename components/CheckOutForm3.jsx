"use client";
import React, { useEffect, useState, useRef } from "react";
import paymentRequest from "@/api/tilopay/paymentRequest";
import { useRouter } from "next/navigation";
import { GET_PAYMENT_DETAILS } from "@/src/graphQl/queries/getPaymentDetails";
import { useQuery } from "@apollo/client";
import useStorage from "@/hooks/useStorage";
import useCartSummary from "@/hooks/useCartSummary";
import AlertNotAuth from "./AlertNotAuth";
import Spinner from "./Spinner";
import ReCAPTCHA from "react-google-recaptcha";
import toast, { Toaster } from "react-hot-toast";
import GET_STORE_INFO from "@/src/graphQl/queries/getStoreInformation";

export default function CheckOutForm3({ paymentDetailId, total }) {
  const captchaRef = useRef(true);
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { user } = useStorage();
  const { id, email } = user || {};
  const cartSummary = useCartSummary({
    userId: user?.id,
  });
  // the url return an payment url to redirect the user to Tilopay payment.
  let paymentUrl = "";

  // Retrieve user data
  const { loading, error, data } = useQuery(GET_PAYMENT_DETAILS, {
    variables: { userId: id },
  });

  const { data: storeInformation, error: storeInformationError } = useQuery(GET_STORE_INFO, {
    variables: {
      id: 1,
    },
  });
  const currency = storeInformation?.storeInformation?.data?.attributes?.currency;


  const key = process.env.NODE_ENV === "development" ?
    "6LfCrUYoAAAAAPgdh0MpvKzzHvhksbGTM3cP1prU" :
    "6Lea6iEpAAAAALI1Fb34ZuoJN9pUUJd2HykpyLpb"


  useEffect(() => {
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
        } else {
          // Handle the case where the specific order is not found
          console.log("Specific order not found.");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const handleVerification = async () => {

    const token = captchaRef.current.getValue();
    paymentUrl = await paymentRequest(formData);

    try {
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
      </div>
      {" "}
      <div className="flex justify-center m-auto mt-8 mb-8 ">


        <ReCAPTCHA
          sitekey={key}
          ref={captchaRef}
        />
      </div>
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
