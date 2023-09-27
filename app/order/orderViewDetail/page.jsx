"use client";
import BodyComponent from "@/components/BodyComponent";
import NavigationMenu from "@/components/NavigationMenu";
import OrderDetailSecondary from "@/components/OrderDetailSecondary";
export default function OrderDetail() {
  return (
    <BodyComponent>
      <div className="flex space-x-4 p-10 justify-center">
        <NavigationMenu />
        <OrderDetailSecondary />
      </div>
    </BodyComponent>
  );
}
