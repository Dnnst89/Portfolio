"use client";
import ShoppingCart from "@/components/ShoppingCart";
import ProductCard from "@/components/ProductCard";
import CartDetail from "@/components/CartDetail";
import CartProceedPayment from "@/components/CartProceedPayment";

export default function CartView() {
  return (
    <div className="bg-floralwhite ">
      <div className="flex justify-center mt-3">
        <h1 className="text-xl">Carrito de compras</h1>
      </div>

      <main className="flex p-5">
        <div className="flex flex-col w-3/4">
          <ShoppingCart />
          <ShoppingCart />
          <ShoppingCart />
          <ShoppingCart />
        </div>

        <div className=" bg-resene rounded-sm w-1/4 p-4 h-[500px]">
          
            <CartDetail />
          

          <CartProceedPayment />
        </div>
      </main>
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
