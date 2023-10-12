"use client";
import Image from "next/image";
import logo from "../app/assets/small-logo.png";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export default function CheckOutHeader({ regresar }) {
  return (
    <>
      <div className="bg-resene">
        <Link href={"/"} className=" flex flex-wrap max-w-screen-xl m-auto justify-center p-2">
          <div className="absolute left-9 top-5">
            <Link href={regresar} className=" p-2 ">
              <button className="bg-aquamarine text-white rounded-sm p-2 flex items-center">
                <BiArrowBack className="mr-2" />
                Regresar
              </button>
            </Link>
          </div>
          <Image src={logo} alt="" style={{ width: "180px", height: "80px" }} />
        </Link>
      </div>
    </>
  );
}
