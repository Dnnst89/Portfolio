"use client";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "@/components/Button";
import Link from "next/link";
export default function UserDataCard({ title, province, username, canton, addressLine1, addressLine2 }) {
  return (
    <div className="bg-resene  flex flex-col items-center h-fit col-span-12 mx-3  md:col-span-7">
      <h1 className=" flex justify-center mt-3 text-xl">{title}</h1>
      <div className=" p-4 h-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
        <section className="bg-floralwhite flex flex-col items-center border-2 border-dashed border-grey-200 rounded-2xl h-[250px] w-[200px]">
          <h2 className="font-semibold mt-8">Nombre: {username} </h2>
          <div className="text-sm space-y-2 pt-3 flex flex-col items-center">
            <div>Provincia: {province}</div>
            <div>Cantón: {canton}</div>
            <div>Dirección 1: {addressLine1}</div>
            <div>Dirección 2: {addressLine2}</div>
          </div>
          <div className="text-pink-200 flex justify-center w-full text-2xl pl-10 pr-10 p-5">
            <Link href={"/address/edit/"}>
              <FaEdit />
            </Link>
            {/* <FaTrash /> */}
          </div>
        </section>
      </div>
      {/* <div className="flex justify-center p-5">
        <Button
          link="/address/addAddress/"
          description="Agregar Dirección"
          bgColor="pink-200"
        />
      </div> */}
    </div>
  );
}
