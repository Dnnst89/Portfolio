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

  return (
    <div>
      <a>ss</a>
    </div>
  );
};
export default InvoiceDetail;
