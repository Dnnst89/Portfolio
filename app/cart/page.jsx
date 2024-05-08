"use client";
import FeaturedProducts from "@/components/FeaturedProducts";
import CartContainer from "@/components/CartContainer";
import useProtectionRoute from "@/hooks/useProtectionRoute";
import  useFromOrderState  from '../../helpers/useFromOrderState';
import "../../styles/fonts.css";

export default function CartView() {

  const { getFromOrderState, updateFromOrder } = useFromOrderState();
  updateFromOrder(false);
  console.log(getFromOrderState());


  useProtectionRoute();
  return (
    <div className="bg-floralwhite flex flex-wrap max-w-screen-xl m-auto justify-center">
      <div className="flex justify-center mt-3">
        <h1 className=" mt-10">Carrito de compras</h1>
      </div>

      <section className="grid p-5 grid-cols-12 w-full max-w-screen-xl m-auto">
        <CartContainer />
      </section>
      {/* ///////////LOS SIGUIENTES DATOS ESTAN QUEMADOS */}
      <section className="w-full">
        <h1 className="flex justify-center text-center pt-10">
          Descubre nuestros productos estrella
        </h1>
        <div className="flex flex-wrap max-w-screen-xl m-auto justify-center">
          <FeaturedProducts />
        </div>
      </section>
    </div>
  );
}
