"use client";
import Image from "next/image";
import moovin from "../app/assets/moovin.png";
import { useRouter } from "next/navigation";
export default function CheckOutForm2() {
  const router = useRouter();
  return (
    <div className="mt-[40px] mx-[30px]">
      <div className="flex w-3/4 justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
        <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
          2
        </div>
        <h1 className="text-xl">Método de envío</h1>
      </div>
      <div className="w-3/4 flex justify-center mt-5">
        <div className="bg-white w-3/4 flex  rounded-t-3xl drop-shadow-lg text-xl">
          <div className=" border-r-2 border-dashed border-grey-200  w-[100px] flex justify-center items-center ml-[10px]">
            <input
              type="radio"
              id="moovin"
              name="del_method"
              value="MOOVIN"
              className="w-5 h-5"
            />
          </div>
          <div className="flex  items-center  pl-[90px]">
            <label className="tracking-wider">Envío a través de:</label>
            <Image
              src={moovin}
              alt=""
              style={{ width: "230px", height: "65px" }}
              className="ml-5"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8 mb-8 w-3/4 ">
        <button
          onClick={() => router.push("/proceedPayment")}
          className="bg-pink-200 text-white rounded-sm p-2 w-[150px] whitespace-nowrap"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
