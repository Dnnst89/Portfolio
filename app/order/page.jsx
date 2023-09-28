"use client";
import NavigationMenu from "@/components/NavigationMenu";
import OrderDetail from "@/components/OrderDetail";
import BodyComponent from "@/components/BodyComponent";

export default function Order() {
  return (
    <BodyComponent>
      <div className="sm:block md:flex lg:flex sm:space-x-0 md:space-x-4 lg:space-x-4  justify-center p-10">
        <NavigationMenu />
        <OrderDetail />
      </div>
    </BodyComponent>
  );
}
