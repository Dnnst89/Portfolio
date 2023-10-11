"use client";
import ShoppingCart from "@/components/ShoppingCart";
import ProductCard from "@/components/ProductCard";
import CartDetail from "@/components/CartDetail";
import CartProceedPayment from "@/components/CartProceedPayment";
import CartContainer from "@/components/CartContainer";

export default function CartView() {
  return (
    <div className="bg-floralwhite flex flex-wrap max-w-screen-xl m-auto justify-center">
      <div className="flex justify-center mt-3">
        <h1 className=" mt-10">Carrito de compras</h1>
      </div>

      <main className="grid p-5 grid-cols-12 w-full">
        <CartContainer />

        <div className=" bg-resene rounded-sm col-span-3 p-4 h-[500px]">
          <CartDetail detailTitle={"Detalle del carrito"} />

          <CartProceedPayment
            textButton={"Proceder al pago"}
            page={"/checkout"}
          />
        </div>
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
