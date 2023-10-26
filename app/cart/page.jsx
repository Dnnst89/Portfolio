"use client";
import ShoppingCart from "@/components/ShoppingCart";
import FeaturedProducts from "@/components/FeaturedProducts";

import CartContainer from "@/components/CartContainer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useProtectionRoute from "@/hooks/useProtectionRoute";
import "../../styles/fonts.css";

export default function CartView() {
  useProtectionRoute()
  return (
    <div className="bg-floralwhite flex flex-wrap max-w-screen-xl m-auto justify-center">
      <div className="flex justify-center mt-3">
        <h1 className=" mt-10">Carrito de compras</h1>
      </div>

      <main className="grid p-5 grid-cols-12 w-full max-w-screen-xl m-auto">
        <CartContainer />


      </main>
      {/* ///////////LOS SIGUIENTES DATOS ESTAN QUEMADOS */}
      <div>
        <h1 className="flex justify-center text-xl text-center">
          Descubre nuestros productos estrella
        </h1>
        <div className="flex flex-wrap max-w-screen-xl m-auto justify-center">
        <FeaturedProducts />
        </div>
      </div>
    </div>
  );
}
