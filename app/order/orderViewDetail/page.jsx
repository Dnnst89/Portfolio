"use client";
import BodyComponent from "@/components/BodyComponent";
import NavigationMenu from "@/components/NavigationMenu";
import OrderDetailSecondary from "@/components/OrderDetailSecondary";
export default function OrderDetail() {
  return (
    <BodyComponent>
      <div className="block sm:space-y-3 sm:block md:space-y-0 md:space-x-4 md:flex lg:space-y-0 lg:flex lg:space-x-4 p-10 justify-center">
        <NavigationMenu />
        <OrderDetailSecondary />
      </div>
    </BodyComponent>
  );
}
