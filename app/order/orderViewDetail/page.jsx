"use client";
import BodyComponent from "@/components/BodyComponent";
import NavigationMenu from "@/components/NavigationMenu";
import OrderDetailSecondary from "@/components/OrderDetailSecondary";
import useProtectionRoute from "@/hooks/useProtectionRoute";
import { useState } from "react";
import { useEffect } from "react";
export default function OrderDetail({ params }) {
  const [orderId, setOrderId] = useState()
  useProtectionRoute();
  useEffect(() => {
    setOrderId(window.location.search.split("=")[1])

  }, [])

  return (
    <BodyComponent>
      <div className="max-w-screen-xl mt-5 md:mt-20 grid grid-cols-12 m-auto">
        <NavigationMenu />
        <OrderDetailSecondary orderId={orderId} />
      </div>
    </BodyComponent>
  );
}
