"use client";

import { BsCart4 } from "react-icons/bs";
import { img2 } from "../../assets/images";
import Image from "next/image";
import AccountDropodown from "@/components/AccountDropodown";
import Searchbar from "@/components/Search";
import Link from "next/link";
import useCartSession from "@/hooks/useCartSession";
import { useEffect, useState } from "react";
import useCartSummary from "@/hooks/useCartSummary";
import useStorage from "@/hooks/useStorage";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItems, updateQtyItems } from "@/redux/features/cart-slice";
const NavMenu = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((x) => x.auth);
  const { user } = useStorage();  // hook para obtener el usuario almacenado en el localstorage
  const info = useCartSummary({ userId: user?.id });
  const cartState = useSelector((state) => state.cart);//obtenemos los datos del slice de carrito

  useEffect(() => {

    toast.remove(); //elimina notificaciones anteriores 

  }, [])

  const showAlert = (e) => { //si el usuario no esta autenticado
    if (user?.id && isAuthenticated) return;
    toast.error("Debe iniciar sesión para ingresar al carrito");
  };

  return (
    <header className="grid grid-cols-2 sm:grid-cols-6">
      <div className="flex justify-center items-center mt-[15px] order-1 col-span-1 sm:col-span-1  h-[60px]">
        <Link href={"/"}>
          <Image src={img2} alt="dfskdk" width={120} height={50} />
        </Link>
      </div>

      <div className="py-5 items-center order-3 sm:order-2 col-span-2 sm:col-span-4 h-[60px]">
        {/* {<Searchbar />} */}
      </div>
      <div className="grid grid-cols-2 justify-center items-center  order-2 sm:order-3 col-span-1 sm:col-span-1">
        <div className="">
          <span className=" flex justify-center items-center ">
            <AccountDropodown />
          </span>
        </div>
        <Link
          onClick={showAlert}
          href={user?.id && isAuthenticated ? "/cart" : "/"}
        >
          <div className="flex justify-center items-center ">
            <BsCart4 size={30} color="#67C3AD" />
            {info ? (
              <p className="bg-aquamarine rounded-full px-2 text-white">
                {info.quantity}
              </p>
            ) : (
              <p className="bg-aquamarine rounded-full px-2 text-white">0</p>
            )}
          </div>
        </Link>
      </div>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#67C3AD",
            },
          },
          error: {
            style: {
              background: "#f87171",
            },
          },
        }}
      />
    </header>
  );
};

export default NavMenu;
