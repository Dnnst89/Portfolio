"use client";
import ShoppingCart from "@/components/ShoppingCart";
import ProductCard from "@/components/ProductCard";

import CartContainer from "@/components/CartContainer";

export default function CartView() {
  return (
    <div className="bg-floralwhite ">
      <div className="flex justify-center mt-3">
        <h1 className="text-xl">Carrito de compras</h1>
      </div>

      <main className="flex p-5">
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
