"use client";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "@/components/Button";
import Link from "next/link";
export default function UserDataCard(props) {
  return (
    <div className="bg-resene w-12/12 sm:w-3/6 md:w-3/6 lg:w-6/12">
      <h1 className=" flex justify-center mt-3 text-xl">{props.title}</h1>
      <div className=" p-4 h-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
        <section className="bg-floralwhite flex flex-col items-center border-2 border-dashed border-grey-200 rounded-2xl h-[250px] w-[200px]">
          <h2 className="font-semibold mt-8">Nombre apellido{props.name} </h2>
          <div className="text-sm space-y-2 pt-3 flex flex-col items-center">
            <div>telefono:{props.phone}</div>
            <div>Provincia:{props.province}</div>
            <div>Ciudad:{props.city}</div>
            <div>Factura E: Sí/No:{props.bill} </div>
          </div>
          <div className="text-pink-200 flex justify-between w-full text-2xl pl-10 pr-10 p-5">
            <Link href={"/address/edit/"}>
              <FaEdit />
            </Link>
            <FaTrash />
          </div>
        </section>
      </div>
      <div className="flex justify-center p-5">
        <Button
          link="/address/addAddress/"
          description="Agregar Dirección"
          bgColor="pink-200"
        />
      </div>
    </div>
  );
}
