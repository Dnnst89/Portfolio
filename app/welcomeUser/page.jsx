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
      <main className=" flex flex-col items-center ">
        <div className="text-xl">
          {authUser && <p className="mt-10">Bienvenido {authUser.username}</p>}
        </div>

        <div className="grid grid-cols-3 w-34/6 ">
          <ProfileUserCard
            image={datosUsuario}
            alt={"datos de usuario"}
            description={"Datos de usuario"}
            link={""}
          />
          <ProfileUserCard
            image={pedidos}
            alt={"Pedidos"}
            description={"Pedidos"}
            link={"order"}
          />
          <ProfileUserCard
            image={direcciones}
            alt={"datos de usuario"}
            description={"Direcciones"}
            link={""}
          />
        </div>
        <div className="flex justify-center">
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
