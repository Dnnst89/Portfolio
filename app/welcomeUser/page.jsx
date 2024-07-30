"use client";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import ProfileUserCard from "@/components/ProfileUserCard";
import BodyComponent from "@/components/BodyComponent";
import datosUsuario from "../assets/datosUsuario 1.png";
import pedidos from "../assets/pedidos.png";
import direcciones from "../assets/direcciones.png";
import { updateShoppingSession } from "@/redux/features/cart-slice";
import { useRouter } from "next/navigation";

const WelcomeUser = () => {
  const authUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const router = useRouter();
 
  const handleLogout = () => {
    router.push("/");
    router.refresh();
    dispatch(logout());
    dispatch(updateShoppingSession(null));
    localStorage.removeItem("userData");
    localStorage.removeItem("cartSession");
    document.cookie = "userData=null";
    // Recargar la página para que no quede data basura
    window.location.reload();
  };
  return (
    <BodyComponent>
      <main className=" grid grid-cols-12 items-center max-w-screen-xl m-auto">
        <div className="text-xl col-span-12">
          {authUser && (
            <h1 className="mt-10 text-center">
              Bienvenido {authUser.username}
            </h1>
          )}
        </div>

        <div className="col-span-12 flex flex-wrap max-w-screen-xl m-auto justify-center pt-5">
          <ProfileUserCard
            image={datosUsuario}
            alt={"datos de usuario"}
            description={"Datos de usuario"}
            link={"/personalData"}
          />
          <ProfileUserCard
            image={pedidos}
            alt={"Pedidos"}
            description={"Pedidos"}
            link={"/order"}
          />
          <ProfileUserCard
            image={direcciones}
            alt={"datos de usuario"}
            description={"Direcciones"}
            link={"/address"}
          />
        </div>
        <div className="flex justify-center col-span-12">
          <button
            className="bg-pink-200 text-white p-3 sm:p-1 md:p-1 md:text-sm lg:text-sm lg:p-3 rounded-sm mt-10"
            onClick={() => handleLogout()}
          >
            CERRAR SESIÓN
          </button>
        </div>
      </main>
    </BodyComponent>
  );
};
export default WelcomeUser;
