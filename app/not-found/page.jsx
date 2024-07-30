"use client";
import React from "react";
import Link from "next/link";
export default function CartView() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center m-5 flex flex-col justify-center items-center">
        <p>Lo sentimos, ha ocurrido un problema</p>
        <Link href={"/"} className="p-2">
          <button className="bg-aquamarine text-white rounded-sm p-2 flex items-center">
            Ir a inicio
          </button>
        </Link>
      </div>
    </div>
  );
}
