import React from "react";

export default function PersonalDataForm() {
  return (
    <div className="bg-resene w-6/12 flex flex-col items-center pb-[50px]">
      <h1 className="text-xl  m-2">Tus datos</h1>
      <div className="flex justify-center w-11/12">
        <section className="w-6/12 p-5 space-y-2">
          <div className="mb-4">
            <label htmlFor="user">Nombre de usuario:</label>
            <input
              className="py-1 w-full rounded-lg border-2 border-grey-300/40 outline-none bg-grey-400 mb-3"
              id="user"
              placeholder="este espacio no se edita"
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              className="py-1 w-full rounded-lg border-2 border-grey-300/40 outline-pink-200/30"
              id="password"
            />
          </div>
        </section>
        <section className="w-6/12 p-5 space-y-2">
          <div className="mb-4">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              className="py-1 w-full rounded-lg border-2 border-grey-300/40 outline-none bg-grey-400 mb-3"
              id="email"
              placeholder="este espacio no se edita"
            />
          </div>
          <div>
            <label htmlFor="resetpassword">Nueva contraseña:</label>
            <input
              className="py-1 w-full rounded-lg border-2 border-grey-300/40 outline-pink-200/30"
              id="resetpassword"
            />
          </div>
        </section>
      </div>
      <div className="flex justify-center relative top-200p">
        <button className="flex justify-center rounded-lg py-2 px-5 transition-colors text-white bg-pink-200">
          Guardar
        </button>
      </div>
    </div>
  );
}
