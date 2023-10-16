"use client";
import ShoppingCart from "@/components/ShoppingCart";
import ProductCard from "@/components/ProductCard";

import CartContainer from "@/components/CartContainer";

export default function CartView() {
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
        <h1 className="flex justify-center text-xl">
          Descubre nuestros productos estrella
        </h1>
        <div className="flex justify-center pt-5">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
