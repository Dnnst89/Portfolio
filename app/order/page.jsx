"use client";
import NavigationMenu from "@/components/NavigationMenu";
import OrderDetail from "@/components/OrderDetail";
import BodyComponent from "@/components/BodyComponent";

export default function Order() {
  return (
    <BodyComponent>
      <div className="flex space-x-4 justify-center p-10">
        <NavigationMenu />
        <OrderDetail />
      </div>
    </BodyComponent>
  );
}
