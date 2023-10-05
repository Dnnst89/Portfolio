"use client";
import BodyComponent from "@/components/BodyComponent";
import NavigationMenu from "@/components/NavigationMenu";
import OrderDetailSecondary from "@/components/OrderDetailSecondary";

import { useState } from "react";
import { useEffect } from "react";
export default function OrderDetail({ params }) {
  const [orderId, setOrderId] = useState()

  useEffect(() => {
    setOrderId(window.location.search.split("=")[1])

  }, [])

  return (
    <BodyComponent>
      <div className="block sm:space-y-3 sm:block md:space-y-0 md:space-x-4 md:flex lg:space-y-0 lg:flex lg:space-x-4 p-10 justify-center">
        <NavigationMenu />
        <OrderDetailSecondary orderId={orderId} />
      </div>
    </BodyComponent>
  );
}
