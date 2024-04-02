"use client";

import { BsCart4 } from "react-icons/bs";
import { img2 } from "../../assets/images";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import AccountDropodown from "@/components/AccountDropodown";
import Searchbar from "@/components/Search";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import useCartSession from "@/hooks/useCartSession";
import { useEffect, useState } from "react";
import useCartSummary from "@/hooks/useCartSummary";
import useStorage from "@/hooks/useStorage";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import NavCategories from "@/app/layouts/includes/NavCategories";
import { updateCartItems, updateQtyItems } from "@/redux/features/cart-slice";
import GET_ERROR_INFO from "@/src/graphQl/queries/getErrorInfo";
const NavMenu = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((x) => x.auth);
  const { user } = useStorage(); // hook para obtener el usuario almacenado en el localstorage
  const info = useCartSummary({ userId: user?.id });
  const cartState = useSelector((state) => state.cart); //obtenemos los datos del slice de carrito
  const { data: errorMessage } = useQuery(GET_ERROR_INFO, {
    variables: { id: 5 },
  });
  useEffect(() => {
    toast.remove(); //elimina notificaciones anteriores
  }, []);

  const showAlert = (e) => {
    //si el usuario no esta autenticado
    if (user?.id && isAuthenticated) return;
    toast.error(errorMessage.errorInformation.data.attributes.error_message);
  };

  return (
    <header className="bg-floralwhite">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex sm:justify-start w-fit md:w-full">
            <div className="flex-shrink-0  md:pr-7 items-center">
              <Link href={`/`}>
                <Image src={img2} alt="Detinmarin" width={120} height={50} />
              </Link>
            </div>
            <div className="hidden sm:ml-1 items-center justify-between sm:flex md:w-full">
              <div className="flex space-x-4 w-full">
                <div className="items-center justify-between hidden w-full md:flex md:w-full md:order-1">
                  <Searchbar />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center pr-2 max-w-[220px] md:min-w-[250px] md:pr-0">
            <div className="grid grid-cols-6 justify-end items-center  order-2 sm:order-3">
              <div className="col-span-4">
                <span className=" flex justify-center items-center ">
                  <AccountDropodown />
                </span>
              </div>
              <Link
                onClick={showAlert}
                href={user?.id && isAuthenticated ? "/cart" : "/"}
                className="col-span-2 max-w-[100px] pl-2"
              >
                <div className="flex justify-center md:justify-start items-center ">
                  <BsCart4 size={30} color="#67C3AD" />

                  <p
                    aria-label={`Cantidad de productos ${info.quantity}, botón de carrito`}
                    className="bg-aquamarine rounded-full w-2/5 md:w-2/6 text-white text-center"
                  >
                    {info ? <span>{info.quantity}</span> : <span>0</span>}
                  </p>
                </div>
              </Link>
            </div>
            <Toaster
              containerStyle={{
                top: 150,
                left: 20,
                bottom: 20,
                right: 20,
              }}
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
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <div className="items-center justify-between m-auto w-4/5 md:flex md:w-full md:order-1">
            <Searchbar />
          </div>
        </div>
      </div>
      <NavCategories />
    </header>
  );
};

export default NavMenu;
