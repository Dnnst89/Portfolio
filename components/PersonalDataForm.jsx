import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";


const PersonalDataForm = () => {

  const authUser = useSelector((state) => state.auth.user);

  return (
    <div className="bg-resene  flex flex-col items-center h-fit col-span-12 mx-3  md:col-span-7">
      <h1 className="m-2">Tus datos</h1>
      <div className="flex justify-center w-11/12">
        <section className="w-full p-5 grid grid-cols-6 gap-3">
          <div className="col-span-6 md:col-span-3">
            <label>Nombre de usuario:</label>
            {authUser && <input
              className="py-1 w-full rounded-lg border-2 border-grey-300/40 outline-none bg-grey-400 mb-3  px-2"
              placeholder={authUser.username}
              readOnly
            />}
          </div>
          <div className="col-span-6 md:col-span-3">
            <label>Correo Electrónico:</label>
            {authUser && <input
              className="py-1 w-full rounded-lg border-2 border-grey-300/40 outline-none bg-grey-400 mb-3  px-2"
              placeholder={authUser.email}
              readOnly
            />}
          </div>
          <div className="col-span-6">
            <p className="text-center text-sm hover:underline cursor-pointer text-lightblue mb-3 grid col-span-12 md:col-span-12 w-2/4 m-auto">
              <Link href="/forgotPassword">Cambiar contraseña</Link>
            </p>
          </div>
        </section>
      </div>
      
    </div>
  );
}
export default PersonalDataForm;
