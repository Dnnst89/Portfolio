"use client";
import Image from "next/image";
import logo from "../app/assets/small-logo.png";
import Link from "next/link";
import "../styles/fonts.css";
import { BiArrowBack } from "react-icons/bi";

export default function CheckOutHeader({ regresar }) {
  return (
    <>
      <div className="bg-resene w-full  grid grid-cols-12 py-3 m-auto">
        <div className="w-full max-w-screen-xl m-auto col-span-4 md:col-span-3 flex justify-center ">
          <Link href={regresar} className=" p-2 ">
            <button className="bg-aquamarine text-white rounded-sm p-2 flex items-center">
              <BiArrowBack className="mr-2" />
              Regresar
            </button>
          </Link>
        </div>
        <div className="col-span-6 flex justify-center">
        <Link href={"/"} className="">
        <Image src={logo} alt="" style={{ width: "auto", height: "80px" }} />
        </Link>
        
        </div>
        
      </div>
    </>
  );
}
