"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { logo } from "../assets/images";
/*
  Response after confirmed email
*/

export default function ThankYouMessage() {
  const router = useRouter();
  return (
    <div className="bg-floralwhite flex justify-center max-w-screen-xl m-auto pt-20">
      <main className="bg-resene border-2 border-dashed border-grey-200 flex flex-col justify-center h-auto p-10 w-full">
        <section className="justify-center grid md:flex space-y-5 ">
          <figure>
            <Image
              src={logo}
              alt="Detinmarin logo"
              style={{ width: "auto", height: "170px" }}
            />
          </figure>
          <>
            <div className="flex flex-col items-end justify-center space-y-3">
              <div className="flex flex-col items-center space-y-2 md:ml-3">
                <h1 className="text-xl bold text-center">¡Gracias por registrarte!</h1>
                <p className="text-sm text-center">
                  Tu correo se ha confirmado satisfactoriamente{" "}
                </p>
                <button
                  onClick={() =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_APP_URL}/login/`
                    )
                  }
                  className="bg-pink-200 text-white rounded-sm p-2 w-[150px]"
                >
                  Volver
                </button>
              </div>
            </div>
          </>
        </section>
      </main>
    </div>
  );
}
