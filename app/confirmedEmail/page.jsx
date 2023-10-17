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
    <div className="bg-floralwhite p-[100px] flex justify-center">
      <main className="bg-resene border-2 border-dashed border-grey-200 flex flex-col justify-center h-auto p-10">
        <section className="flex justify-center">
          <figure>
            <Image
              src={logo}
              alt="Detinmarin logo"
              style={{ width: "390px", height: "170px" }}
            />
          </figure>
          <>
            <div className="flex flex-col items-end justify-center space-y-3">
              <div className="flex flex-col items-center space-y-1 ml-3">
                <h1 className="text-xl bold">¡Gracias por registrarte!</h1>
                <p className="text-sm">
                  Tu correo se ha confirmado satisfactoriamente{" "}
                </p>
                <button
                  onClick={() =>
                    router.push(
                      "http://detinmarin.s3-website-us-west-2.amazonaws.com/login/"
                    )
                  } // Specify the URL to which you want to navigate
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
