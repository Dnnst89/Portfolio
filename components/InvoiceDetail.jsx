"use client";
import useStorage from "@/hooks/useStorage";
import useCartSummary from "@/hooks/useCartSummary";
import Spinner from "./Spinner";
import { getAccessToken, formatTaxData } from "@/helpers";
import { useCallback, useEffect, useState } from "react";
import { facturationInstace } from "@/src/axios/algoliaIntance/config";

const InvoiceDetail = ({
  isCheckout = false,
  detailTitle = "Detalle del carrito",
  onChange,
}) => {
  const { user } = useStorage();
  const [amounts, setAmounts] = useState({
    total: 0,
    tax: 0,
    currencyType: "CRC",
  });
  const {
    loading,
    items,
    quantity,
    total: subTotal,
  } = useCartSummary({
    userId: user?.id,
  });

  useEffect(() => {
    getTaxCost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items?.length]);

  const getInvoice = async () => {
    if (!items.length) return;
    const token = await getAccessToken();
    const formatedItems = formatTaxData(items);
    const body = {
      accountId: "de7a8bf8-63d4-427e-99ce-5870c2ffc338",
      document: {
        key: "50611052315582245052100200001010000001158183568224",
        activityCode: "721001",
        consecutiveNumber: "00200001010000001158",
        issueDate: "2023-05-11T20:14:19.000Z",
        issuer: {
          name: "Félix Ojeda Ortiz",
          id: {
            type: "03",
            number: "155822450521",
          },
          commercialName: "",
          address: {
            province: "2",
            country: "01",
            district: "01",
            neighborhood: "01",
            otherSigns: "Monserrat",
          },
          email: "yoloyulios@gmail.com",
        },
        receptor: {
          name: "Luis Alberto Rojas Bonilla",
          id: {
            type: "01",
            number: "123456789",
          },
          email: "mayeko96@gmail.com",
        },
        saleCondition: "01",
        creditTerm: "0",
        paymentMethod: ["01"],
        serviceDetail: {
          lineDetails: [...formatedItems],
        },

        //fin del document
      }, //fin de body
    };
    const { data } = await facturationInstace.post(
      `/utils/get-detail-line?access_token=${token}`,
      body
    );
    setAmounts((prev) => ({
      ...prev,
      total: data?.billSummary?.totalDocument,
      tax: data?.billSummary?.totalTax,
    }));
    if (isCheckout) {
      onChange({
        total: data?.billSummary?.totalDocument,
        taxes: data?.billSummary?.totalTax,
        subTotal,
      });
    }
  };

  return (
    <div>
      <a>ss</a>
    </div>
  );
};
export default InvoiceDetail;
