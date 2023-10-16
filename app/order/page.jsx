"use client";
import NavigationMenu from "@/components/NavigationMenu";
import OrderDetail from "@/components/OrderDetail";
import BodyComponent from "@/components/BodyComponent";

export default function Order() {
  return (
    <BodyComponent>
      <div className="max-w-screen-xl mt-5 md:mt-20 grid grid-cols-12 m-auto">
        <NavigationMenu />
        <OrderDetail />
      </div>
    </BodyComponent>
  );
}
