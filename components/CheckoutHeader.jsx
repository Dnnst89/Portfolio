"use client";
import Image from "next/image";
import logo from "../app/assets/small-logo.png";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export default function CheckOutHeader({ regresar }) {
  return (
    <>
      <div className="bg-resene flex">
        <div className="flex items-end">
          <Link href={regresar} className=" p-2">
            <button className="bg-aquamarine text-white rounded-sm p-2 flex items-center">
              <BiArrowBack className="mr-2" />
              Regresar
            </button>
          </Link>
        </div>
        <div className=" w-10/12 flex justify-center p-2">
          <Image
            src={logo}
            alt=""
            style={{ width: "180px", height: "80px" }}
            className=""
          />
        </div>
      </div>
    </>
  );
}
